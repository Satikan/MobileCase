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
        string UpdateProduct();
        string DeletedProduct(int id);
    }

    public class ProductData : IProductData
    {
        string errMsg = "";

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
                string strSQL = "\r\n UPDATE  productgroup SET " +
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
                string strSQL = "\r\n UPDATE  productgroup SET " +
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
                item.ProductGroupID = HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"]);
                item.ProductCode = HttpContext.Current.Request.Unvalidated.Form["ProductCode"] == null ? item.ProductCode : HttpContext.Current.Request.Unvalidated.Form["ProductCode"];
                item.ProductPrice = HttpContext.Current.Request.Unvalidated.Form["ProductPrice"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductPrice"]);
                item.ProductName = HttpContext.Current.Request.Unvalidated.Form["ProductName"] == null ? item.ProductName : HttpContext.Current.Request.Unvalidated.Form["ProductName"];
                item.ProductQuantity = HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"]);

                CultureInfo invC = System.Globalization.CultureInfo.InvariantCulture;
                string strSQL = "";
                DataTable dt = DBHelper.List("\r\n SELECT CASE WHEN MAX(ProductID) IS NULL THEN 1 ELSE MAX(ProductID)+1 END AS MaxID FROM product", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());

                string pathImage = "ImageProduct/";
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["file"];
                    bool folderExists = Directory.Exists(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    string newnamefile = "Product" + String.Format("{0:00000}", MaxID) + Path.GetExtension(httpPostedFile.FileName);

                    if (!folderExists)
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    }
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), newnamefile);
                    httpPostedFile.SaveAs(fileSavePath);

                    if (File.Exists(fileSavePath))
                    {
                        pathImage += newnamefile;
                    }
                    else
                    {
                        pathImage += "no_image_product.png";
                    }
                }
                else
                {
                    pathImage += "no_image_product.png";
                }

                strSQL = "\r\n INSERT INTO product (ProductID,ProductGroupID,ProductCode,ProductPrice,ProductName,ProductQuantity,ProductPicture)VALUES("
                         + MaxID + "," + item.ProductGroupID + ",'" + item.ProductCode + "'," + item.ProductPrice + ",'" + item.ProductName + "'," + item.ProductQuantity + ",'" + pathImage + "');";

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

        public DataSet ListProduct()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT p.ProductID,p.ProductCode,p.ProductName,p.ProductPrice,p.ProductQuantity,p.ProductPicture,pg.ProductGroupID,pg.ProductGroupName FROM product p "
                + "\r\n INNER JOIN productgroup pg ON p.ProductGroupID = pg.ProductGroupID "
                + "\r\n WHERE p.Deleted=0 AND pg.Deleted=0;";
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
            string strSQL = "\r\n SELECT p.ProductID,p.ProductGroupID,p.ProductCode,p.ProductName,p.ProductPrice,p.ProductPicture,p.ProductQuantity,pg.ProductGroupName FROM product p ";
            strSQL += "INNER JOIN productgroup pg ON p.ProductGroupID = pg.ProductGroupID ";
            strSQL += "WHERE p.Deleted = 0 ";
            if (id > 0)
            {
                strSQL += "\r\n AND p.ProductID = " + id;
            }
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "ProductByID";
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
                item.ProductGroupID = HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductGroupID"]);
                item.ProductCode = HttpContext.Current.Request.Unvalidated.Form["ProductCode"] == null ? item.ProductCode : HttpContext.Current.Request.Unvalidated.Form["ProductCode"];
                item.ProductPrice = HttpContext.Current.Request.Unvalidated.Form["ProductPrice"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductPrice"]);
                item.ProductName = HttpContext.Current.Request.Unvalidated.Form["ProductName"] == null ? item.ProductName : HttpContext.Current.Request.Unvalidated.Form["ProductName"];
                item.ProductQuantity = HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"] == null ? 0 : Convert.ToInt16(HttpContext.Current.Request.Unvalidated.Form["ProductQuantity"]);

                CultureInfo invC = System.Globalization.CultureInfo.InvariantCulture;
                string pathImage = "ImageProduct/";
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["file"];
                    bool folderExists = Directory.Exists(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    string newnamefile = "Product" + String.Format("{0:00000}", item.ProductID) + Path.GetExtension(httpPostedFile.FileName);

                    if (!folderExists)
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/ImageProduct/"));
                    }
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/ImageProduct/"), newnamefile);
                    httpPostedFile.SaveAs(fileSavePath);

                    if (File.Exists(fileSavePath))
                    {
                        pathImage += newnamefile;
                    }
                    else
                    {
                        pathImage += "no_image_product.png";
                    }
                }
                else
                {
                    pathImage += "no_image_product.png";
                }

                string strSQL = "\r\n UPDATE product SET " +
                          "\r\n ProductGroupID=" + item.ProductGroupID +
                          "\r\n ,ProductCode='" + item.ProductCode + "'" +
                          "\r\n ,ProductPrice=" + item.ProductPrice +
                          "\r\n ,ProductName='" + item.ProductName + "'" +
                          "\r\n ,ProductPicture='" + pathImage + "'" +
                          "\r\n ,ProductQuantity=" + item.ProductQuantity +
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

        public string DeletedProduct(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE  product SET " +
                    "\r\n Deleted=1 " +
                    "\r\n WHERE ProductID=" + id + ";";

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
    }
}