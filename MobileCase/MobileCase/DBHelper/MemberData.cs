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
    public interface IMemberData
    {
        DataSet ListMembers();
        DataTable Login(string username, string password);
        string Register(Members item);
        DataSet Province();
    }

    public class MemberData : IMemberData
    {
        string errMsg = "";
        
        public DataSet ListMembers()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT m.*,r.RoleName FROM  member m "
                + "\r\n LEFT JOIN role r ON m.RoleID=r.RoleID "
                + "\r\n WHERE m.Deleted=0 AND r.Deleted=0;";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "Member";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet Province()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "";
            strSQL = "\r\n Select * From  provinces Where LangID=2;";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "provinces";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataTable Login(string username, string password)
        {
            username = Utilitys.Utilitys.ReplaceString(username);
            password = Utilitys.Utilitys.ReplaceString(password);
            password = Utilitys.Utilitys.HashPassword(password);
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            string strSQL = "\r\n SELECT MemberID,RoleID,FirstName,LastName " +
                        "\r\n FROM member " +
                        "\r\n WHERE UserName='" + username + "'" +
                        "\r\n AND Password='" + password + "'" +
                        "\r\n AND Deleted=0;";
            DataTable dt = DBHelper.List(strSQL, objConn);
            objConn.Close();

            return dt;
        }

        public string Register(Members item)
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "";
                DataTable dt = DBHelper.List("\r\n Select CASE WHEN Max(MemberID) IS NULL THEN 1 ELSE Max(MemberID)+1 END AS MaxID   From  member ", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());
                string Password = Utilitys.Utilitys.HashPassword(item.Password);

                strSQL = "\r\n INSERT INTO member (MemberID,RoleID,UserName,Password,FirstName,LastName,Address,District,City " +
                                       "\r\n ,Province,ZipCode,Mobile,Email)VALUES(" + MaxID + "," + item.MemberRoleID + ",'" + item.UserName + "','" + Password +
                                       "','" + item.FirstName + "','" + item.LastName + "','" + item.Address + "','" + item.District + "','" + item.City +
                                       "'," + item.Province + ",'" + item.ZipCode + "','" + item.Mobile + "','" + item.Email + "');";

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
