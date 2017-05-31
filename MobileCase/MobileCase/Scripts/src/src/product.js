app.controller('ProductController', ['$scope', '$rootScope', '$http', '$stateParams', 'Upload', '$state',
    function ($scope, $rootScope, $http, $stateParams, Upload, $state) {
    $rootScope.permission = localStorage.getItem('Permission');
    $scope.quantity = 1;

    $http.get("api/Products/ListProductGroup").then(function (data) {
        $scope.ProductGroup = data.data.ProductGroup;
    });

    $scope.GetProduct = function () {
        $http.get("api/Products/ListProduct").then(function (data) {
            $scope.Product = data.data.Product;
        });
    }

    $scope.GetDetailProduct = function () {
        $http.get("api/Products/ViewProduct/" + Number($stateParams.id)).then(function (data) {
            $scope.ProductByID = data.data.ProductByID[0];
        });
    }

    $scope.AddProduct = function () {
        Upload.upload({
            url: 'api/Products/InsertProduct',
            data: {
                ProductGroupID: $scope.productgroup,
                ProductCode: $scope.productcode,
                ProductName: $scope.productname,
                ProductPrice: $scope.productprice,
                ProductQuantity: $scope.productquantity,
                file: $scope.picFile,
            }
        }).then(function (resp) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                window.location = "#/product";
            })
        }, function (resp) {
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
    }

    $scope.EditProduct = function () {

        var values = $scope.ProductByID.ProductPicture.split("/");
        var valueProductPicture = values[1];

        if ($scope.picFile == undefined) {
            console.log(valueProductPicture)
            Upload.upload({
                url: 'api/Products/UpdateProduct',
                data: {
                    ProductID: $scope.ProductByID.ProductID,
                    ProductGroupID: $scope.ProductByID.ProductGroupID,
                    ProductCode: $scope.ProductByID.ProductCode,
                    ProductName: $scope.ProductByID.ProductName,
                    ProductPrice: $scope.ProductByID.ProductPrice,
                    ProductQuantity: $scope.ProductByID.ProductQuantity,
                    ProductPicture: valueProductPicture
                }
            }).then(function (resp) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    window.location = "#/product";
                })
            }, function (resp) {
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
        else {
            Upload.upload({
                url: 'api/Products/UpdateProduct',
                data: {
                    ProductID: $scope.ProductByID.ProductID,
                    ProductGroupID: $scope.ProductByID.ProductGroupID,
                    ProductCode: $scope.ProductByID.ProductCode,
                    ProductName: $scope.ProductByID.ProductName,
                    ProductPrice: $scope.ProductByID.ProductPrice,
                    ProductQuantity: $scope.ProductByID.ProductQuantity,
                    file: $scope.picFile,
                }
            }).then(function (resp) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    window.location = "#/product";
                })
            }, function (resp) {
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }

    $scope.DeleteProduct = function (ProductID) {
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
            $http.get("api/Products/DeletedProduct/" + ProductID).then(function (data) {
                swal({
                    title: 'ดําเนินการเรียบร้อย',
                    text: "ข้อมูลของคุณได้ทำการลบเรียบร้อยแล้ว",
                    type: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ตกลง'
                }).then(function () {
                    $scope.GetProduct();
                })
            });
        })
    }

    $scope.PageEditProduct = function (ProductID) {
        window.location = "#/editproduct/" + ProductID;
    }

    $scope.selectProductGroup = function (value) {
        $scope.filterByProductGroupID = value;
    }

    $scope.SaveOrder = function () {
        var saveorder = {
            "ProductID": $scope.ProductByID.ProductID,
            "ProductGroupID": $scope.ProductByID.ProductGroupID,
            //"ProductQuantity": ($scope.ProductByID.ProductQuantity - $scope.quantity),
            "MemberID": Number(localStorage.getItem("MemberID")),
            "Amount": $scope.quantity,
            "StatusID": 1
        }

        $http.post("api/Orders/InsertOrder", saveorder).then(function (data) {
            swal({
                title: 'ดําเนินการเรียบร้อย',
                text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
                type: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
            }).then(function () {
                $http.get("api/Orders/ListOrder/" + Number(localStorage.getItem('MemberID'))).then(function (data) {
                    $rootScope.NumberOrder = data.data.ListOrder.length;
                    $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                });
                window.location = "#/";
            })
        });
    }
}
])