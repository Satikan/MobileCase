app.controller('MainController', ['$scope', '$rootScope', '$state', '$stateParams', '$filter',
    function ($scope, $rootScope, $state, $stateParams, $filter) {
    $rootScope.permission = localStorage.getItem('Permission');
    $rootScope.firstname = localStorage.getItem('FirstName');
    $rootScope.lastname = localStorage.getItem('LastName');

    var date = new Date();
    $scope.newdate = $filter('date')(new Date(), 'dd, MMMM yyyy');

    $scope.logout = function () {
        localStorage.clear();
        $rootScope.permission = localStorage.getItem('Permission');
        window.location = "#/";
    }
}
])