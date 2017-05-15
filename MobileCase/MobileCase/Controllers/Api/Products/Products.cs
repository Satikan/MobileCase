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
    public class ProductsController : ApiController
    {
        static readonly IProductData repository = new ProductData();

        [HttpGet]
        [ActionName("ListProductGroup")]
        public DataSet GetListProductGroup()
        {
            return repository.ListProductGroup();
        }

        [HttpGet]
        [ActionName("ViewProductGroup")]
        public DataSet GetViewProductGroup(int id)
        {
            return repository.ViewProductGroup(id);
        }

        [HttpPost]
        [ActionName("InsertProductGroup")]
        public string PostInsertProductGroup(ProductsGroup item)
        {
            return repository.InsertProductGroup(item);
        }

        [HttpPost]
        [ActionName("UpdateProductGroup")]
        public string PostUpdateProductGroup(ProductsGroup item)
        {
            return repository.UpdateProductGroup(item);
        }

        [HttpGet]
        [ActionName("DeletedProductGroup")]
        public string GetDeletedProductGroup(int id)
        {
            return repository.DeletedProductGroup(id);
        }

        [HttpGet]
        [ActionName("ListProduct")]
        public DataSet GetListProduct()
        {
            return repository.ListProduct();
        }

        [HttpGet]
        [ActionName("ViewProduct")]
        public DataSet GetViewProduct(int id)
        {
            return repository.ViewProduct(id);
        }

        [HttpPost]
        [ActionName("InsertProduct")]
        public string PostInsertProduct()
        {
            return repository.InsertProduct();
        }

        [HttpPost]
        [ActionName("UpdateProduct")]
        public string PostUpdateProduct()
        {
            return repository.UpdateProduct();
        }

        [HttpGet]
        [ActionName("DeletedProduct")]
        public string GetDeletedProduct(int id)
        {
            return repository.DeletedProduct(id);
        }
    }
}