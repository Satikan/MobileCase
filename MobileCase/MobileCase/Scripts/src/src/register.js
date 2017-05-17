app.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {

    $http.get("api/Members/Province").then(function (data) {
        $scope.Province = data.data.provinces;
    });

    $scope.register = function () {
        var register = {
            "MemberRoleID": 3,
            "UserName": $scope.username,
            "Password": $scope.password,
            "FirstName": $scope.firstnames,
            "LastName": $scope.lastnames,
            "Address": $scope.address,
            "District": $scope.district,
            "City": $scope.city,
            "Province": $scope.province,
            "ZipCode": $scope.zipcode,
            "Mobile": $scope.mobile,
            "Email": $scope.email
        }
        
        $http.post("api/Members/Register", register).then(function (data) {
            swal({
                title: 'ลงทะเบียนเรียบร้อย',
                text: "คุณได้เป็นสมาชิกเรียบร้อยแล้ว",
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