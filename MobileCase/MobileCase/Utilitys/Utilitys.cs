using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace MobileCase.Utilitys
{
    public class Utilitys
    {

        public static String ReplaceString(String text)
        {
            String data;
            if (String.IsNullOrEmpty(text))
            {
                text = "";
            }
            data = text.Replace("'", "''");
            data = data.Replace("\\", "\\\\");
            data = data.Replace("'-'", "");
            data = data.Replace("''", "");
            data = data.Replace("'&'", "");
            data = data.Replace("'*'", "");
            data = data.Replace("' or''-'", "");
            data = data.Replace("' or 'x'='x", "");
            data = data.Replace("' or 'x'='x", "");

            return data;
        }

        public static String HashPassword(String password)
        {
            String strHash = null;
            String passwordFormat = "SHA1";
            strHash = FormsAuthentication.HashPasswordForStoringInConfigFile(password, passwordFormat);
            return strHash;
        }

    }
}