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
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;
using MobileCase.DBHelper;
using MobileCase.Models;

namespace MobileCase.DBHelper
{
    public interface IMemberData
    {
        DataSet ListMembers();
        DataSet ViewMembers(int id);
        DataTable Login(string username, string password);
        string Register(Members item);
        int ForgotPassword(Members item);
        string ResetPassword(Members item);
        string UpdateMember(Members item);
        string UpdatePassword(Members item);
        string DeletedMember(int id);
        DataSet Province();
    }

    public class MemberData : IMemberData
    {
        string errMsg = "";
        
        public DataSet ListMembers()
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT m.*, r.RoleName, p.ProvinceName FROM  member m "
                + "\r\n LEFT JOIN role r ON m.RoleID=r.RoleID "
                + "\r\n INNER JOIN provinces p ON p.ProvinceID = m.Province "
                + "\r\n WHERE m.Deleted=0 AND m.RoleID=3 AND r.Deleted=0 AND p.LangID = 2 "
                + "\r\n ORDER BY m.FirstName AND m.LastName;";
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "Member";
            ds.Tables.Add(dt);
            objConn.Close();

            return ds;
        }

        public DataSet ViewMembers(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            DataSet ds = new DataSet();
            string strSQL = "\r\n SELECT * FROM member WHERE Deleted = 0 ";
            if (id > 0)
            {
                strSQL += "\r\n AND MemberID = " + id;
            }
            DataTable dt = DBHelper.List(strSQL, objConn);
            dt.TableName = "MemberByID";
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
                DataTable dt = DBHelper.List("\r\n Select CASE WHEN Max(MemberID) IS NULL THEN 1 ELSE Max(MemberID)+1 END AS MaxID From member ", objConn);
                int MaxID = Convert.ToInt32(dt.Rows[0]["MaxID"].ToString());
                string MemberLink = Utilitys.Utilitys.HashPassword(dt.Rows[0]["MaxID"].ToString());
                string Password = Utilitys.Utilitys.HashPassword(item.Password);

                strSQL = "\r\n INSERT INTO member (MemberID,MemberLink,RoleID,UserName,Password,FirstName,LastName,Address,District,City " +
                                       "\r\n ,Province,ZipCode,Mobile,Email)VALUES(" + MaxID + ",'" + MemberLink + "'," + item.MemberRoleID + ",'" + item.UserName + "','" + Password +
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

        public int ForgotPassword(Members item)
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);
            int statusId = 0;

            try
            {
                string strSQL = "";
                strSQL = "\r\n SELECT * FROM member WHERE Email = '" + item.Email + "';";
                DataTable dtCheckEmail = DBHelper.List(strSQL, objConn);
                if (dtCheckEmail.Rows.Count > 0)
                {
                    string MemberLink = dtCheckEmail.Rows[0]["MemberLink"].ToString();

                    var mail = new MailMessage("CaseiphoneCheaps@gmail.com", item.Email);

                    string body = "กดที่ลิ้งค์นี้ : "+ System.Configuration.ConfigurationManager.AppSettings["UrlServer"] + "/#/resetpassword/" + MemberLink + "";
                    mail.Subject = "ลืมรหัสผ่าน";
                    mail.Body = body;
                    mail.IsBodyHtml = false;
                    var smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("CaseiphoneCheaps@gmail.com", "caseiphoneaef");
                    smtp.Port = 587;
                    smtp.Send(mail);

                    statusId = 1;
                }
                else
                {
                    statusId = 0;
                }
                errMsg = "Success!!";
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            objConn.Close();

            return statusId;
        }

        public string ResetPassword(Members item)
        {

            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string Password = Utilitys.Utilitys.HashPassword(item.Password);
                string strSQL = "\r\n UPDATE member SET " +
                    "\r\n Password='" + Password + "'" +
                    "\r\n WHERE MemberLink='" + item.MemberLink + "';";

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

        public string UpdateMember(Members item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE member SET " +
                    "\r\n FirstName='" + item.FirstName + "'" +
                    "\r\n ,LastName='" + item.LastName + "'" +
                    "\r\n ,Email='" + item.Email + "'" +
                    "\r\n ,Mobile='" + item.Mobile + "'" +
                    "\r\n ,Address='" + item.Address + "'" +
                    "\r\n ,District='" + item.District + "'" +
                    "\r\n ,City='" + item.City + "'" +
                    "\r\n ,Province=" + item.Province +
                    "\r\n ,ZipCode='" + item.ZipCode + "'" +
                    "\r\n WHERE MemberID=" + item.MemberID + ";";

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

        public string DeletedMember(int id)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string strSQL = "\r\n UPDATE member SET " +
                    "\r\n Deleted=1 " +
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

        public string UpdatePassword(Members item)
        {
            MySqlConnection objConn = DBHelper.ConnectDb(ref errMsg);

            try
            {
                string Password = Utilitys.Utilitys.HashPassword(item.Password);
                string strSQL = "\r\n UPDATE member SET " +
                    "\r\n UserName='" + item.UserName + "'" +
                    "\r\n ,Password='" + Password + "'" +
                    "\r\n WHERE MemberID=" + item.MemberID + ";";

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
