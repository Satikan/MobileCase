using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MobileCase.Models
{
    public class Members
    {
        public int MemberID { get; set; }
        public int MemberRoleID { get; set; }
        public string MemberLink { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public int Province { get; set; }
        public string ZipCode { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public int Deleted { get; set; }
    }
}