using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using MobileCase.DBHelper;
using MobileCase.Models;
using System.Globalization;

namespace MobileCase.Controllers
{
    public class MembersController : ApiController
    {
        static readonly IMemberData repository = new MemberData();

        [HttpGet]
        [ActionName("ListMembers")]
        public DataSet GetListMembers()
        {
            return repository.ListMembers();
        }
    }
}