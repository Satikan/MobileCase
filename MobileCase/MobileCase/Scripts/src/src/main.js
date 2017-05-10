app.controller('MainController', ['$scope', function ($scope) {
    localStorage.setItem('personal', 0);
    $scope.permissionpersonal = localStorage.getItem('personal');
}
])