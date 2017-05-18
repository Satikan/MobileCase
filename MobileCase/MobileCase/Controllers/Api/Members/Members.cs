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

        [HttpGet]
        [ActionName("ViewMembers")]
        public DataSet GetViewMembers(int id)
        {
            return repository.ViewMembers(id);
        }

        [HttpPost]
        [ActionName("login")]
        public DataTable PostLogin(Members item)
        {
            return repository.Login(item.UserName, item.Password);
        }

        [HttpPost]
        [ActionName("Register")]
        public string PostRegister(Members item)
        {
            return repository.Register(item);
        }

        [HttpPost]
        [ActionName("ForgotPassword")]
        public int PostForgotPassword(Members item)
        {
            return repository.ForgotPassword(item);
        }

        [HttpPost]
        [ActionName("ResetPassword")]
        public string PostResetPassword(Members item)
        {
            return repository.ResetPassword(item);
        }

        [HttpPost]
        [ActionName("UpdateMember")]
        public string PostUpdateMember(Members item)
        {
            return repository.UpdateMember(item);
        }

        [HttpGet]
        [ActionName("DeletedMember")]
        public string GetDeletedMember(int id)
        {
            return repository.DeletedMember(id);
        }

        [HttpPost]
        [ActionName("UpdatePassword")]
        public string PostUpdatePassword(Members item)
        {
            return repository.UpdatePassword(item);
        }

        [HttpGet]
        [ActionName("Province")]
        public DataSet GetProvince()
        {
            return repository.Province();
        }
    }
}