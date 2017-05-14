app.controller('LoginController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.Login = function () {
        var login = {
            "UserName": $scope.UserName,
            "Password": $scope.Password
        };

        $http.post("api/Members/login", login).then(function (data) {
            if (data.data.length === 0) {
                localStorage.setItem('Permission', 0);
                $scope.usernotfound = 1;
            }
            else {
                if (data.data[0].FirstName === null) {
                    data.data[0].FirstName = "";
                }
                if (data.data[0].LastName === null) {
                    data.data[0].LastName = "";
                }
                $scope.usernotfound = 0;
                localStorage.setItem('Permission', data.data[0].RoleID);
                localStorage.setItem('MemberID', data.data[0].MemberID);
                localStorage.setItem('FirstName', data.data[0].FirstName);
                localStorage.setItem('LastName', data.data[0].LastName);
                window.location = "#/";
            }
            $rootScope.permission = localStorage.getItem('Permission');
            $rootScope.firstname = localStorage.getItem('FirstName');
            $rootScope.lastname = localStorage.getItem('LastName');
        });
    }
}
])