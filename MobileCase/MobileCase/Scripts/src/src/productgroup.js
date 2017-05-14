app.controller('ProductGroupController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {

    $scope.GetProductGroup = function () {
        $http.get("api/Products/ListProductGroup").then(function (data) {
            $scope.ProductGroup = data.data.ProductGroup;
        });
    }

    $scope.GetEditProductGroup = function () {
        $http.get("api/Products/ViewProductGroup/" + $stateParams.id).then(function (data) {
            $scope.ProductGroupByID = data.data.ProductGroupByID[0];
        });
    }

    $scope.AddProductGroup = function () {
        var addProductGroup = {
            "ProductGroupCode": $scope.ProductGroupCode,
            "ProductGroupName": $scope.ProductGroupName
        }

        $http.post("api/Products/InsertProductGroup", addProductGroup).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/productgroup";
            })
        });
    }

    $scope.EditProductGroup = function () {
        var editProductGroup = {
            "ProductGroupID": $scope.ProductGroupByID.ProductGroupID,
            "ProductGroupCode": $scope.ProductGroupByID.ProductGroupCode,
            "ProductGroupName": $scope.ProductGroupByID.ProductGroupName
        }

        $http.post("api/Products/UpdateProductGroup", editProductGroup).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/productgroup";
            })
        });
    }

    $scope.DeleteProductGroup = function (ProductGroupID) {
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
            $http.get("api/Products/DeletedProductGroup/" + ProductGroupID).then(function (data) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ข้อมูลของคุณได้ทำการลบเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    $scope.GetProductGroup();
                })
            });
        })
    }

    $scope.PageEditProductGroup = function (ProductGroupID) {
        window.location = "#/editproductgroup/" + ProductGroupID;
    }
}
])