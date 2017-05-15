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
    public class OrdersController : ApiController
    {
        static readonly IOrderData repository = new OrderData();

        [HttpPost]
        [ActionName("InsertOrder")]
        public string PostInsertOrder(Orders item)
        {
            return repository.InsertOrder(item);
        }

        [HttpGet]
        [ActionName("ListOrder")]
        public DataSet GetListOrder()
        {
            return repository.ListOrder();
        }

        [HttpPost]
        [ActionName("DeletedOrder")]
        public string PostDeletedOrder(Orders item)
        {
            return repository.DeletedOrder(item);
        }
    }
}