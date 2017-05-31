using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace MobileCase.DBHelper
{
    public class DBHelper
    {
        private static string szDbUser = "root";
        private static string szDbPassword = "root";

        //private static string szDbUser = "caseiphone";
        //private static string szDbPassword = "c@se_iph0ne";

        public static MySqlConnection ConnectDb(ref string errMsg)
        {
            // string connStrFmt = "Data Source={0}; Initial Catalog={1};User ID={2}; Password={3}";
            //    string connString = string.Format(connStrFmt, ConfigurationManager.AppSettings["DBServer"], ConfigurationManager.AppSettings["DBName"], szDbUser, szDbPassword);

            string connString = "Server=" + ConfigurationManager.AppSettings["DBServer"] + ";DATABASE=" + ConfigurationManager.AppSettings["DBName"] + ";Uid="+ szDbUser + ";PASSWORD="+ szDbPassword + ";Port=" + ConfigurationManager.AppSettings["Port"] + ";Connect Timeout=60000;default command timeout=60000;AllowUserVariables=True;";
            try
            {
                var conn = new MySqlConnection(connString);
                conn.Open();
                return conn;
            }
            catch (Exception ex)
            {
                errMsg = ex.ToString();
                return null;
            }
        }

        public static DataTable List(string query, MySqlConnection conn)
        {
            var dt = new DataTable();
            var MySqlCommand = new MySqlCommand(query, conn);
            var dataAdapter = new MySqlDataAdapter(MySqlCommand);
            dataAdapter.SelectCommand.CommandTimeout = 0;
            dataAdapter.Fill(dt);
            return dt;
        }

        public static DataTable List(string query, MySqlConnection conn, MySqlTransaction sqlTransaction)
        {
            var dt = new DataTable();
            var MySqlCommand = new MySqlCommand(query, conn, sqlTransaction);
            var dataAdapter = new MySqlDataAdapter(MySqlCommand);
            dataAdapter.SelectCommand.CommandTimeout = 0;
            dataAdapter.Fill(dt);
            return dt;
        }

        public static int Execute(string query, MySqlConnection conn)
        {
            int i = 0;
            var MySqlCommand = new MySqlCommand(query, conn);
            i = MySqlCommand.ExecuteNonQuery();
            return (i > 0) ? i : 0;
        }

        public static int Execute(string query, MySqlConnection conn, MySqlTransaction sqlTransaction)
        {
            int i = 0;
            var MySqlCommand = new MySqlCommand(query, conn, sqlTransaction);
            i = MySqlCommand.ExecuteNonQuery();
            return (i > 0) ? i : 0;
        }

        public static void Close(MySqlConnection conn)
        {

            conn.Close();
        }
    }
}