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
        string InsertOrder(Orders item);
        DataSet ListOrder();
        string DeletedOrder(Orders item);
    }

    public class OrderData : IOrderData
    {
        string errMsg = "";

        public string InsertOrder(Orders item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            int i = 0;
            string strSQL = "";

            try
            {
                DataTable dt = DBHelper.List("\r\n SELECT CASE WHEN MAX(OrderID) IS NULL THEN 1 ELSE MAX(OrderID)+1 END AS MaxID FROM orderproduct ", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());
                strSQL = "\r\n SELECT * FROM orderproduct WHERE ProductID =" + item.ProductID + ";";
                DataTable dtOrder = DBHelper.List(strSQL, objConn);

                if (dtOrder.Rows.Count > 0)
                {
                    for (i = 0; i < dtOrder.Rows.Count; i++)
                    {
                        strSQL = "\r\n UPDATE orderproduct set Amount=" + (Convert.ToInt32(dtOrder.Rows[i]["Amount"].ToString()) + item.Amount) + ";";
                    }
                    DBHelper.Execute(strSQL, objConn);
                    strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                    DBHelper.Execute(strSQL, objConn);
                }
                else
                {
                    strSQL = "\r\n INSERT INTO orderproduct(orderID, ProductID, ProductGroupID, MemberID, Amount, StatusID)";
                    strSQL += "\r\n value(" + MaxID + "," + item.ProductID + "," + item.ProductGroupID + "," + item.MemberID + "," + item.Amount + "," + item.StatusID + ");";
                    DBHelper.Execute(strSQL, objConn);
                    strSQL = "\r\n UPDATE product SET ProductQuantity=" + item.ProductQuantity + " WHERE ProductID=" + item.ProductID + ";";
                    DBHelper.Execute(strSQL, objConn);
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

        public DataSet ListOrder()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT op.OrderID, p.ProductID, p.ProductCode, p.ProductName, p.ProductPrice, op.Amount, s.StatusName FROM orderproduct op "
                + "\r\n INNER JOIN member m ON op.MemberID = m.MemberID "
                + "\r\n INNER JOIN product p ON op.ProductID = p.ProductID "
                + "\r\n INNER JOIN productgroup pg ON op.ProductGroupID = pg.ProductGroupID "
                + "\r\n INNER JOIN status s ON op.StatusID = s.StatusID "
                + "\r\n WHERE op.Deleted = 0 AND op.StatusID = 1;";
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
    }
}
