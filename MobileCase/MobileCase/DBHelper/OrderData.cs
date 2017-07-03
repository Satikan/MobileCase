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
    interface IOrderData
    {
        string InsertOrder(List<Orders> item);
        DataSet ListOrder(int id);
        string DeletedOrder(Orders item);
        DataSet OrderFromMember();
        string SentProduct(int id);
    }

    public class OrderData : IOrderData
    {
        string errMsg = "";

        public string InsertOrder(List<Orders> item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            int i = 0;
            int j = 0;
            int k= 0;
            int h = 0;
            string strSQL = "";

            try
            {
                if (item.Count > 0) {
                    for (i = 0; i < item.Count; i++) {
                        DataTable dt = DBHelper.List("\r\n SELECT CASE WHEN MAX(OrderID) IS NULL THEN 1 ELSE MAX(OrderID)+1 END AS MaxID FROM orderproduct ", objConn);
                        int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());
                        strSQL = "\r\n SELECT * FROM orderproduct WHERE StatusID = 2 AND Deleted = 0 AND MemberID = " + item[i].MemberID + ";";
                        DataTable dtCheckStatus = DBHelper.List(strSQL, objConn);
                        if (dtCheckStatus.Rows.Count > 0)
                        {
                            for (j = 0; j < dtCheckStatus.Rows.Count; j++)
                            {
                                strSQL = "\r\n UPDATE orderproduct set Deleted = 1;";
                            }
                            DBHelper.Execute(strSQL, objConn);

                            strSQL = "\r\n SELECT * FROM orderproduct WHERE Deleted = 0 AND ProductID = " + item[i].ProductID + " AND ProductGroupID = " + item[i].ProductGroupID + " AND MemberID = " + item[i].MemberID + ";";
                            DataTable dtOrder = DBHelper.List(strSQL, objConn);

                            if (dtOrder.Rows.Count > 0)
                            {
                                for (k = 0; k < dtOrder.Rows.Count; k++)
                                {
                                    strSQL = "\r\n UPDATE orderproduct set Amount=" + (Convert.ToInt32(dtOrder.Rows[k]["Amount"].ToString()) + item[i].Amount) +
                                             "\r\n WHERE Deleted = 0 AND ProductID = " + item[i].ProductID + " AND ProductGroupID = " + item[i].ProductGroupID + " AND MemberID = " + item[i].MemberID + ";";
                                }
                                DBHelper.Execute(strSQL, objConn);
                                //strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                                //DBHelper.Execute(strSQL, objConn);
                            }
                            else
                            {
                                strSQL = "\r\n INSERT INTO orderproduct(orderID, ProductID, ProductGroupID, MemberID, Amount, StatusID)";
                                strSQL += "\r\n value(" + MaxID + "," + item[i].ProductID + "," + item[i].ProductGroupID + "," + item[i].MemberID + "," + item[i].Amount + "," + item[i].StatusID + ");";
                                DBHelper.Execute(strSQL, objConn);
                                //strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                                //DBHelper.Execute(strSQL, objConn);
                            }
                        }
                        else
                        {
                            strSQL = "\r\n SELECT * FROM orderproduct WHERE Deleted = 0 AND ProductID = " + item[i].ProductID + " AND ProductGroupID = " + item[i].ProductGroupID + " AND MemberID = " + item[i].MemberID + ";";
                            DataTable dtOrder = DBHelper.List(strSQL, objConn);

                            if (dtOrder.Rows.Count > 0)
                            {
                                for (h = 0; h < dtOrder.Rows.Count; h++)
                                {
                                    strSQL = "\r\n UPDATE orderproduct set Amount=" + (Convert.ToInt32(dtOrder.Rows[h]["Amount"].ToString()) + item[i].Amount) +
                                             "\r\n WHERE Deleted = 0 AND ProductID = " + item[i].ProductID + " AND ProductGroupID = " + item[i].ProductGroupID + " AND MemberID = " + item[i].MemberID + ";";
                                }
                                DBHelper.Execute(strSQL, objConn);
                                //strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                                //DBHelper.Execute(strSQL, objConn);
                            }
                            else
                            {
                                if (item[i].Amount != 0) {
                                    strSQL = "\r\n INSERT INTO orderproduct(orderID, ProductID, ProductGroupID, MemberID, Amount, StatusID)";
                                    strSQL += "\r\n value(" + MaxID + "," + item[i].ProductID + "," + item[i].ProductGroupID + "," + item[i].MemberID + "," + item[i].Amount + "," + item[i].StatusID + ");";
                                    DBHelper.Execute(strSQL, objConn);
                                }
                                //strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                                //DBHelper.Execute(strSQL, objConn);
                            }
                        }

                        errMsg = "Success!!";
                    }
                }
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            objConn.Close();
            return errMsg;
        }

        public DataSet ListOrder(int id)
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT op.OrderID, p.ProductID, p.ProductCode, p.ProductName, pg.ProductGroupName, p.ProductPrice, p.ProductPicture, op.Amount, s.StatusID, s.StatusName, m.MemberID, CONCAT(m.FirstName, ' ', m.LastName) AS FullName FROM orderproduct op "
                + "\r\n INNER JOIN member m ON op.MemberID = m.MemberID "
                + "\r\n INNER JOIN product p ON op.ProductID = p.ProductID "
                + "\r\n INNER JOIN productgroup pg ON op.ProductGroupID = pg.ProductGroupID "
                + "\r\n INNER JOIN status s ON op.StatusID = s.StatusID "
                + "\r\n WHERE op.Deleted = 0 AND op.StatusID IN (1,2) AND op.MemberID = " + id + ";";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "ListOrder";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public string DeletedOrder(Orders item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            string strSQL = "";

            try
            {
                strSQL = "\r\n UPDATE orderproduct SET StatusID=3, Deleted=1 WHERE OrderID=" + item.OrderID + ";";
                DBHelper.Execute(strSQL, objConn);
                DataTable dt = DBHelper.List("\r\n SELECT ProductQuantity FROM product WHERE ProductID =" + item.ProductID, objConn);
                int ProductQuantity = Convert.ToInt32(dt.Rows[0]["ProductQuantity"].ToString());
                strSQL = "\r\n UPDATE product SET ProductQuantity=" + (ProductQuantity + item.Amount) + " WHERE ProductID=" + item.ProductID + ";";
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

        public DataSet OrderFromMember()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT op.MemberID, CONCAT(m.FirstName, ' ', m.LastName) AS FullName, m.Mobile, m.Address, m.District, m.City, p.ProvinceName, m.ZipCode FROM orderproduct  op "
                + "\r\n INNER JOIN member m ON op.MemberID = m.MemberID "
                + "\r\n INNER JOIN provinces p ON m.Province = p.ProvinceID "
                + "\r\n WHERE op.StatusID = 1 AND op.Deleted = 0 AND p.LangID = 2 "
                + "\r\n GROUP BY op.MemberID ";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "OrderFromMember";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public string SentProduct(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE orderproduct SET " +
                    "\r\n StatusID=2 " +
                    "\r\n WHERE MemberID=" + id + ";";

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
