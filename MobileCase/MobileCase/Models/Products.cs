using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MobileCase.Models
{
    public class ProductsGroup
    {
        public int ProductGroupID { get; set; }
        public string ProductGroupCode { get; set; }
        public string ProductGroupName { get; set; }
    }

    public class Products
    {
        public int ProductID { get; set; }
        public int ProductGroupID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public Decimal ProductPrice { get; set; }
        public string ProductPicture { get; set; }
        public int ProductQuantity { get; set; }
    }

    public class Orders
    {
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public int ProductGroupID { get; set; }
        public int ProductQuantity { get; set; }
        public int MemberID { get; set; }
        public int Amount { get; set; }
        public int StatusID { get; set; }
    }
}