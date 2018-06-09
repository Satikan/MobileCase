using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using MobileCase.DBHelper;
using MobileCase.Models;

namespace MobileCase.DBHelper
{
    interface IProductData
    {
        string InsertProductGroup(ProductsGroup item);
        DataSet ListProductGroup();
        DataSet ViewProductGroup(int id);
        string UpdateProductGroup(ProductsGroup item);
        string DeletedProductGroup(int id);
        string InsertProduct();
        DataSet ListProduct();
        DataSet ViewProduct(int id);
        DataSet ViewManageProductGroup(int id);
        DataSet ViewDetailManageProductGroup(int id, int ProductGroupID);
        string UpdateProduct();
        string InsertProductGroupAccess(List<Products> item);
        string DeletedProduct(int id);
    }

    public class ProductData : IProductData
    {
        string errMsg = "";

        public static Image ScaleImage(Image image, int maxWidth, int maxHeight)
        {
            var newImage = new Bitmap(maxWidth, maxHeight);

            using (var graphics = Graphics.FromImage(newImage))
                graphics.DrawImage(image, 0, 0, maxWidth, maxHeight);

            return newImage;
        }

        public string InsertProductGroup(ProductsGroup item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                DataTable dt = DBHelper.List("\r\n SELECT CASE WHEN MAX(ProductGroupID) IS NULL THEN 1 ELSE MAX(ProductGroupID)+1 END AS MaxID FROM productgroup ", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());
                string strSQL = "\r\n INSERT INTO productgroup(ProductGroupID, ProductGroupCode, ProductGroupName)";
                strSQL += "\r\n value(" + MaxID + ",'" + item.ProductGroupCode + "','" + item.ProductGroupName + "');";
                DBHelper.Execute(strSQL, objConn);
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            objConn.Close();
            return errMsg;
        }

        public DataSet ListProductGroup()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT * FROM productgroup WHERE Deleted = 0";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "ProductGroup";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet ViewProductGroup(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT * FROM productgroup WHERE Deleted = 0 ";
            if (id > 0)
            {
                strSQL += "\r\n AND ProductGroupID = " + id;
            }
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "ProductGroupByID";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public string UpdateProductGroup(ProductsGroup item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE productgroup SET " +
                    "\r\n ProductGroupCode='" + item.ProductGroupCode + "'" +
                    "\r\n ,ProductGroupName='" + item.ProductGroupName + "'" +
                    "\r\n WHERE ProductGroupID=" + item.ProductGroupID + ";";

                DBHelper.Execute(strSQL, objConn);
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            objConn.Close();
            return errMsg;
        }

        public string DeletedProductGroup(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE productgroup SET " +
                    "\r\n Deleted=1 " +
                    "\r\n WHERE ProductGroupID=" + id + ";";

                DBHelper.Execute(strSQL, objConn);
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            objConn.Close();
            return errMsg;
        }

        public string InsertProduct()
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                Products item = new Products();
                //item.ProductGroupID = HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"]);
                item.ProductCode = HttpContext.Current.Request.Unvalidated.Form["ProductCode"] == null ? item.ProductCode : HttpContext.Current.Request.Unvalidated.Form["ProductCode"];
                item.ProductPrice = HttpContext.Current.Request.Unvalidated.Form["ProductPrice"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductPrice"]);
                item.ProductName = HttpContext.Current.Request.Unvalidated.Form["ProductName"] == null ? item.ProductName : HttpContext.Current.Request.Unvalidated.Form["ProductName"];
                //item.ProductQuantity = HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"]);

                CultureInfo invC = System.Globalization.CultureInfo.InvariantCulture;
                string strSQL = "";
                DataTable dt = DBHelper.List("\r\n SELECT CASE WHEN MAX(ProductID) IS NULL THEN 1 ELSE MAX(ProductID)+1 END AS MaxID FROM product", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());

                string pathImage = "ImageProduct/";
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["file"];
                    bool folderExists = Directory.Exists(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    string namefile = "Product" + String.Format("{0:00000}", MaxID) + "_" + DateTime.Now.ToString("yyyyMMddHHmm") + Path.GetExtension(httpPostedFile.FileName);
                    //string newnamefile = "Product" + String.Format("{0:00000}", MaxID) + "_" + DateTime.Now.ToString("yyyyMMddHHmm") + "_n" + Path.GetExtension(httpPostedFile.FileName);

                    if (!folderExists)
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    }
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), namefile);
                    httpPostedFile.SaveAs(fileSavePath);
                    pathImage += namefile;

                    //if (File.Exists(fileSavePath))
                    //{
                    //    using (var image = Image.FromFile(fileSavePath))
                    //    //using (var newImage = ScaleImage(image, 250, 250))
                    //    {
                    //        var newImagePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), newnamefile);

                    //        image.Save(newImagePath, ImageFormat.Png);
                    //    }
                    //    pathImage += newnamefile;
                    //}
                    //else
                    //{
                    //    pathImage += "no_image_product.png";
                    //}
                }
                else
                {
                    pathImage += "no_image_product.png";
                }

                strSQL = "\r\n INSERT INTO product (ProductID,ProductCode,ProductPrice,ProductName,ProductPicture)VALUES("
                         + MaxID + ",'" + item.ProductCode + "'," + item.ProductPrice + ",'" + item.ProductName + "','" + pathImage + "');";
                DBHelper.Execute(strSQL, objConn);

                DataTable dtProductAccess = DBHelper.List("\r\n SELECT CASE WHEN MAX(ProductGroupAccessID) IS NULL THEN 1 ELSE MAX(ProductGroupAccessID)+1 END AS MaxID FROM productgroupaccess", objConn);
                int MaxProductAccessID = Convert.ToInt32(dtProductAccess.Rows[0]["MaxID"].ToString());

                strSQL = "\r\n SELECT * FROM productgroup;";
                DataTable dtProductGroup = DBHelper.List(strSQL, objConn);

                if (dtProductGroup.Rows.Count > 0) {
                    for (int i = 0; i < dtProductGroup.Rows.Count; i++)
                    {
                        strSQL = "\r\n INSERT INTO productgroupaccess (ProductGroupAccessID,ProductID,ProductGroupID,ProductQuantity)VALUES("
                         + (MaxProductAccessID + i) + "," + MaxID + "," + dtProductGroup.Rows[i]["ProductGroupID"] + ",0);";
                        DBHelper.Execute(strSQL, objConn);
                    }
                }

                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            objConn.Close();
            return errMsg;
        }

        public DataSet ListProduct()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT ProductID,ProductCode,ProductName,ProductPrice,ProductPicture FROM product "
                + "\r\n WHERE Deleted=0;";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "Product";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet ViewProduct(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT ProductID,ProductCode,ProductName,ProductPrice,ProductPicture FROM product ";
            strSQL += "WHERE Deleted = 0 ";
            if (id > 0)
            {
                strSQL += "\r\n AND ProductID = " + id;
            }
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "ProductByID";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet ViewManageProductGroup(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT p.ProductID,p.ProductName,pg.ProductGroupID,pg.ProductGroupName,p.ProductPrice,pga.ProductQuantity FROM productgroupaccess pga "
                + "\r\n INNER JOIN product p ON p.ProductID = pga.ProductID "
                + "\r\n INNER JOIN productgroup pg ON pg.ProductGroupID = pga.ProductGroupID ";
            if (id > 0)
            {
                strSQL += "\r\n WHERE pga.ProductID = " + id;
            }
            strSQL += "\r\n ORDER BY pg.ProductGroupID";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "MangeProductGroup";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet ViewDetailManageProductGroup(int id, int ProductGroupID)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT p.ProductID,p.ProductName,pg.ProductGroupID,pg.ProductGroupName,p.ProductPrice,pga.ProductQuantity FROM productgroupaccess pga "
                + "\r\n INNER JOIN product p ON p.ProductID = pga.ProductID "
                + "\r\n INNER JOIN productgroup pg ON pg.ProductGroupID = pga.ProductGroupID ";
            if (id > 0)
            {
                strSQL += "\r\n WHERE pga.ProductID = " + id + " AND pga.ProductGroupID = " + ProductGroupID + ";";
            }
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "DetailManageProductGroup";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public string UpdateProduct()
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                Products item = new Products();
                item.ProductID = HttpContext.Current.Request.Unvalidated.Form["ProductID"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductID"]);
                //item.ProductGroupID = HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"]);
                item.ProductCode = HttpContext.Current.Request.Unvalidated.Form["ProductCode"] == null ? item.ProductCode : HttpContext.Current.Request.Unvalidated.Form["ProductCode"];
                item.ProductPrice = HttpContext.Current.Request.Unvalidated.Form["ProductPrice"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductPrice"]);
                item.ProductName = HttpContext.Current.Request.Unvalidated.Form["ProductName"] == null ? item.ProductName : HttpContext.Current.Request.Unvalidated.Form["ProductName"];
                //item.ProductQuantity = HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"]);
                item.ProductPicture = HttpContext.Current.Request.Unvalidated.Form["ProductPicture"] == null ? item.ProductPicture : HttpContext.Current.Request.Unvalidated.Form["ProductPicture"];

                CultureInfo invC = System.Globalization.CultureInfo.InvariantCulture;
                string pathImage = "ImageProduct/";
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["file"];
                    bool folderExists = Directory.Exists(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    string namefile = "Product" + String.Format("{0:00000}", item.ProductID) + "_" + DateTime.Now.ToString("yyyyMMddHHmm") + Path.GetExtension(httpPostedFile.FileName);
                    //string newnamefile = "Product" + String.Format("{0:00000}", item.ProductID) + "_" + DateTime.Now.ToString("yyyyMMddHHmm") + "_n" + Path.GetExtension(httpPostedFile.FileName);

                    if (!folderExists)
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    }
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), namefile);
                    httpPostedFile.SaveAs(fileSavePath);
                    pathImage += namefile;

                    //if (File.Exists(fileSavePath))
                    //{
                    //    using (var image = Image.FromFile(fileSavePath))
                    //    using (var newImage = ScaleImage(image, 250, 250))
                    //    {
                    //        var newImagePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), newnamefile);

                    //        newImage.Save(newImagePath, ImageFormat.Png);
                    //    }
                    //    pathImage += newnamefile;
                    //}
                    //else
                    //{
                    //    pathImage += "no_image_product.png";
                    //}
                }
                else
                {
                    pathImage += item.ProductPicture;
                }

                string strSQL = "\r\n UPDATE product SET " +
                          "\r\n ProductCode='" + item.ProductCode + "'" +
                          "\r\n ,ProductPrice=" + item.ProductPrice +
                          "\r\n ,ProductName='" + item.ProductName + "'" +
                          "\r\n ,ProductPicture='" + pathImage + "'" +
                          "\r\n WHERE ProductID = " + item.ProductID + ";";

                DBHelper.Execute(strSQL, objConn);
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            objConn.Close();
            return errMsg;
        }

        public string InsertProductGroupAccess(List<Products> item)
        {
            string strSQL = null;
            int i = 0;
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                if (item.Count > 0)
                {
                    for (i = 0; i < item.Count; i++)
                    {
                        strSQL = "\r\n UPDATE productgroupaccess SET " +
                                        "\r\n ProductQuantity=" + item[i].ProductQuantity +
                                        "\r\n WHERE ProductGroupID=" + item[i].ProductGroupID + " AND ProductID=" + item[i].ProductID + ";";

                        DBHelper.Execute(strSQL, objConn);
                    }
                }
                
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            objConn.Close();
            return errMsg;
        }

        public string DeletedProduct(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE product SET " +
                    "\r\n Deleted=1 " +
                    "\r\n WHERE ProductID=" + id + ";";
                DBHelper.Execute(strSQL, objConn);

                string strSQL1 = "\r\n DELETE FROM productgroupaccess " +
                    "\r\n WHERE ProductID=" + id + ";";
                DBHelper.Execute(strSQL1, objConn);

                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            objConn.Close();
            return errMsg;
        }
        
    }
}