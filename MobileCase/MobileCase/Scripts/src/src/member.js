app.controller('MemberController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $http.get("api/Members/Province").then(function (data) {
        $scope.Province = data.data.provinces;
    });

    $scope.GetListMember = function () {
        $http.get("api/Members/ListMembers").then(function (data) {
            $scope.ListMember = data.data.Member;
        });
    }

    $scope.GetEditMember = function () {
        $http.get("api/Members/ViewMembers/" + $stateParams.id).then(function (data) {
            $scope.MemberByID = data.data.MemberByID[0];
        });
    }

    $scope.GetEditProfile = function () {
        $http.get("api/Members/ViewMembers/" + Number(localStorage.getItem('MemberID'))).then(function (data) {
            $scope.MemberByID = data.data.MemberByID[0];
        });
    }

    $scope.EditMember = function () {
        var editmember = {
            "MemberID": $scope.MemberByID.MemberID,
            "FirstName": $scope.MemberByID.FirstName,
            "LastName": $scope.MemberByID.LastName,
            "Email": $scope.MemberByID.Email,
            "Mobile": $scope.MemberByID.Mobile,
            "Address": $scope.MemberByID.Address,
            "District": $scope.MemberByID.District,
            "City": $scope.MemberByID.City,
            "Province": $scope.MemberByID.Province,
            "ZipCode": $scope.MemberByID.ZipCode
        }

        $http.post("api/Members/UpdateMember", editmember).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/member";
            })
        });
    }

    $scope.DeleteMember = function (MemberID) {
        swal({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณไม่สามารถกู้ข้อมูลกลับมาได้!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิก',
        }).then(function () {
            $http.get("api/Members/DeletedMember/" + MemberID).then(function (data) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ข้อมูลของคุณได้ทำการลบเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    $scope.GetListMember();
                })
            });
        })
    }

    $scope.EditProfile = function () {
        var editprofile = {
            "MemberID": Number(localStorage.getItem('MemberID')),
            "FirstName": $scope.MemberByID.FirstName,
            "LastName": $scope.MemberByID.LastName,
            "Email": $scope.MemberByID.Email,
            "Mobile": $scope.MemberByID.Mobile,
            "Address": $scope.MemberByID.Address,
            "District": $scope.MemberByID.District,
            "City": $scope.MemberByID.City,
            "Province": $scope.MemberByID.Province,
            "ZipCode": $scope.MemberByID.ZipCode
        }

        $http.post("api/Members/UpdateMember", editprofile).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                localStorage.setItem('FirstName', $scope.MemberByID.FirstName);
                localStorage.setItem('LastName', $scope.MemberByID.LastName);
                location.reload();
            })
        });
    }

    $scope.EditPassword = function () {
        var editpassword = {
            "MemberID": Number(localStorage.getItem('MemberID')),
            "UserName": $scope.username,
            "Password": $scope.newpassword
        }

        $http.post("api/Members/UpdatePassword", editpassword).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                localStorage.setItem('FirstName', $scope.MemberByID.FirstName);
                localStorage.setItem('LastName', $scope.MemberByID.LastName);
                location.reload();
            })
        });
    }
    
    $scope.PageEditMember = function (MemberID) {
        window.location = "#/editmember/" + MemberID;
    }
}
])