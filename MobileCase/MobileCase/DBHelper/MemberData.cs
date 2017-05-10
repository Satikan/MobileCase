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
    interface IMemberData
    {
        DataSet ListMembers();
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
    }
}
