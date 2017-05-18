app.controller('LoginController', ['$scope', '$rootScope', '$http', '$stateParams', function ($scope, $rootScope, $http, $stateParams) {
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

    $scope.ForgotPassword = function () {
        var forgotpassword = {
            "Email": $scope.email
        };

        $http.post("api/Members/ForgotPassword", forgotpassword).then(function (data) {
            if (data.data == 0) {
                swal(
                    'ผิดพลาด',
                    'อีเมลล์ของคุณไม่มีอยู่ในระบบ',
                    'error'
                )
            }
            else if (data.data == 1) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ระบบได้ทำการส่งลิ้งเปลี่ยนแปลงรหัสผ่านใหม่ทางเมลล์ของคุณ",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    window.location = "#/";
                })
            }
        });
    }

    $scope.ResetPassword = function () {
        var resetpassword = {
            "MemberLink": $stateParams.id,
            "Password": $scope.Password
        };

        $http.post("api/Members/ResetPassword", resetpassword).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ระบบได้ทำการเปลี่ยนแปลงรหัสผ่านใหม่เรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/";
            })
        });
    }
}
])