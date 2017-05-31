app.controller('MainController', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', '$http',
    function ($scope, $rootScope, $state, $stateParams, $filter, $http) {
    $rootScope.permission = localStorage.getItem('Permission');
    $rootScope.firstname = localStorage.getItem('FirstName');
    $rootScope.lastname = localStorage.getItem('LastName');

    var date = new Date();
    $scope.newdate = $filter('date')(new Date(), 'dd, MMMM yyyy');

    $http.get("api/Orders/ListOrder/" + Number(localStorage.getItem('MemberID'))).then(function (data) {
        $rootScope.NumberOrder = data.data.ListOrder.length;
    });

    $scope.logout = function () {
        localStorage.clear();
        $rootScope.permission = localStorage.getItem('Permission');
        window.location = "#/";
    }

    $scope.gotoindex = function () {
        window.location = "#/";
        location.reload();
    }

    $scope.gotoproductgroup = function () {
        window.location = "#/productgroup";
        location.reload();
    }

    $scope.gotoproduct = function () {
        window.location = "#/product";
        location.reload();
    }

    $scope.gotoorder = function () {
        window.location = "#/order";
        location.reload();
    }

    $scope.gotomember = function () {
        window.location = "#/member";
        location.reload();
    }

    $scope.gotocontact = function () {
        window.location = "#/contact";
        location.reload();
    }
}
])