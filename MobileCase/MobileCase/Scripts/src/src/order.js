app.controller('OrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.GetListOrder = function () {
        $http.get("api/Orders/ListOrder").then(function (data) {
            $scope.ListOrder = data.data.ListOrder;
            $scope.StatusOrder = data.data.ListOrder[0].StatusName;
            console.log(data);
        });
    }

    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.ListOrder.length; i++) {
            var ListOrders = $scope.ListOrder[i];
            total += (ListOrders.Amount * ListOrders.ProductPrice);
        }
        return total;
    }

    $scope.DeleteOrder = function (OrderID, ProductID, Amount) {
        swal({
            title: 'คุณแน่ใจหรือไม่?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิก',
        }).then(function () {
            var deleteorder = {
                "OrderID": OrderID,
                "ProductID": ProductID,
                "Amount": Amount
            }

            $http.post("api/Orders/DeletedOrder", deleteorder).then(function (data) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "สินค้าของคุณได้ทำการลบเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    $scope.GetListOrder();
                })
            });
        })
    }
}
])