app.controller('OrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.GetListOrder = function () {
        $http.get("api/Products/ListOrder").then(function (data) {
            $scope.ListOrder = data.data.ListOrder;
            $scope.StatusOrder = data.data.ListOrder[0].StatusName;
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
    
}
])