app.controller('OrderController', ['$scope', '$rootScope', '$http', '$stateParams', '$state', function ($scope, $rootScope, $http, $stateParams, $state) {
    $scope.GetListOrder = function () {
        $http.get("api/Orders/ListOrder/" + Number(localStorage.getItem('MemberID'))).then(function (data) {
            $scope.ListOrder = data.data.ListOrder;
            $rootScope.NumberOrder = data.data.ListOrder.length;
            $scope.StatusOrder = data.data.ListOrder[0].StatusName;
        });
    }

    $scope.GetOrderByMember = function () {
        $http.get("api/Orders/ListOrder/" + Number($stateParams.id)).then(function (data) {
            $scope.ListOrderByMember = data.data.ListOrder;
            $scope.FullName = data.data.ListOrder[0].FullName;
            console.log(data);
        });
    }

    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.ListOrder.length; i++) {
            var ListOrders = $scope.ListOrder[i];
            total += (ListOrders.Amount * ListOrders.ProductPrice);
        }
        return total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");;
    }

    $scope.getTotalOrderByMember = function () {
        var total = 0;
        for (var i = 0; i < $scope.ListOrderByMember.length; i++) {
            var ListOrderByMembers = $scope.ListOrderByMember[i];
            total += (ListOrderByMembers.Amount * ListOrderByMembers.ProductPrice);
            //total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        return total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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

    $scope.GetOrderFromMember = function () {
        $http.get("api/Orders/OrderFromMember").then(function (data) {
            $scope.OrderFromMember = data.data.OrderFromMember;
        });
    }

    $scope.SentProduct = function () {
        $http.get("api/Orders/SentProduct/" + Number($stateParams.id)).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "สินค้าได้ทำการจัดส่งเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/order";
            })
        });
    }

    $scope.PageDetailOrder = function (MemberID) {
        window.location = "#/detailorder/" + MemberID;
    }
}
])