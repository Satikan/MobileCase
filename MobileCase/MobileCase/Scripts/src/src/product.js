app.controller('ProductController', ['$scope', '$rootScope', '$http', '$stateParams', 'Upload', '$state', '$uibModal', '$document',
    function ($scope, $rootScope, $http, $stateParams, Upload, $state, $uibModal, $document) {
        var $ctrl = this;
        $ctrl.items = ['item1', 'item2', 'item3'];

        $ctrl.animationsEnabled = true;

        $ctrl.open = function (ProductID) {
            $http.get("api/Products/ViewProduct/" + Number(ProductID)).then(function (data) {
                $scope.ProductByID = data.data.ProductByID[0];

                $http.get("api/Products/ViewManageProductGroup/" + Number(ProductID)).then(function (data) {
                    $scope.ViewMangeProductGroup = [];

                    for (var i = 0; i < data.data.MangeProductGroup.length; i++) {
                        var pushData = data.data.MangeProductGroup[i];
                        pushData.Amount = 0;
                        pushData.MemberID = Number(localStorage.getItem("MemberID"));
                        pushData.StatusID = 1;
                        $scope.ViewMangeProductGroup.push(pushData);
                    }

                    var ItemManageProduct = {
                        "ProductByID": $scope.ProductByID,
                        "ViewMangeProductGroup": $scope.ViewMangeProductGroup
                    }

                    var modalInstance = $uibModal.open({
                        animation: $ctrl.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        controllerAs: '$ctrl',
                        resolve: {
                            items: function () {
                                return ItemManageProduct;
                            }
                        }
                    });
                });
            });
        };
        
        $rootScope.permission = localStorage.getItem('Permission');

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

            $http.get("api/Products/ViewManageProductGroup/" + Number($stateParams.id)).then(function (data) {
                $scope.ViewMangeProductGroup = [];
                for (var i = 0; i < data.data.MangeProductGroup.length; i++) {
                    var pushData = data.data.MangeProductGroup[i];
                    pushData.Amount = 0;
                    pushData.MemberID = Number(localStorage.getItem("MemberID"));
                    pushData.StatusID = 1;
                    $scope.ViewMangeProductGroup.push(pushData);
                }
            });
        }

        $scope.GetMangeProductGroup = function () {
            $http.get("api/Products/ViewManageProductGroup/" + Number($stateParams.id)).then(function (data) {
                $scope.MangeProductGroup = data.data.MangeProductGroup;
            });
        }

        $scope.GetDetailManageProductGroup = function () {
            $http.get("api/Products/ViewDetailManageProductGroup/" + Number($stateParams.id) + "?ProductGroupID=" + Number($stateParams.productgroupid)).then(function (data) {
                $scope.DetailManageProductGroup = data.data.DetailManageProductGroup[0];
            });
        }

        $scope.EditManageProductGroup = function () {
            $http.post("api/Products/InsertProductGroupAccess", $scope.MangeProductGroup).then(function (data) {
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
            });
        }

        $scope.AddProduct = function () {
            Upload.upload({
                url: 'api/Products/InsertProduct',
                data: {
                    //ProductGroupID: $scope.productgroup,
                    ProductCode: $scope.productcode,
                    ProductName: $scope.productname,
                    ProductPrice: $scope.productprice,
                    //ProductQuantity: $scope.productquantity,
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
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

        $scope.EditProduct = function () {

            var values = $scope.ProductByID.ProductPicture.split("/");
            var valueProductPicture = values[1];

            if ($scope.picFile == undefined) {
                Upload.upload({
                    url: 'api/Products/UpdateProduct',
                    data: {
                        ProductID: $scope.ProductByID.ProductID,
                        //ProductGroupID: $scope.ProductByID.ProductGroupID,
                        ProductCode: $scope.ProductByID.ProductCode,
                        ProductName: $scope.ProductByID.ProductName,
                        ProductPrice: $scope.ProductByID.ProductPrice,
                        //ProductQuantity: $scope.ProductByID.ProductQuantity,
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
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
            else {
                Upload.upload({
                    url: 'api/Products/UpdateProduct',
                    data: {
                        ProductID: $scope.ProductByID.ProductID,
                        //ProductGroupID: $scope.ProductByID.ProductGroupID,
                        ProductCode: $scope.ProductByID.ProductCode,
                        ProductName: $scope.ProductByID.ProductName,
                        ProductPrice: $scope.ProductByID.ProductPrice,
                        //ProductQuantity: $scope.ProductByID.ProductQuantity,
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

        $scope.PageManageProductGroup = function (ProductID) {
            window.location = "#/manageproductgroup/" + ProductID;
        }

        $scope.PageEditManageProductGroup = function (ProductID, ProductGroupID) {
            window.location = "#/editmanageproductgroup/" + ProductID + "/" + ProductGroupID;
        }

        $scope.selectProductGroup = function (value) {
            $scope.filterByProductGroupID = value;
        }

        //$scope.SaveOrder = function () {
        //    $http.post("api/Orders/InsertOrder", $scope.ViewMangeProductGroup).then(function (data) {
        //        swal({
        //            title: 'ดําเนินการเรียบร้อย',
        //            text: "ข้อมูลของคุณได้ทำการบันทึกเรียบร้อยแล้ว",
        //            type: 'success',
        //            showCancelButton: false,
        //            allowOutsideClick: false,
        //            confirmButtonColor: '#3085d6',
        //            confirmButtonText: 'ตกลง'
        //        }).then(function () {
        //            $http.get("api/Orders/ListOrder/" + Number(localStorage.getItem('MemberID'))).then(function (data) {
        //                $rootScope.NumberOrder = data.data.ListOrder.length;
        //            });
        //        })
        //    });
        //}
    }
]);

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items, $scope, $rootScope, $http) {
    var $ctrl = this;
    $scope.ViewMangeProductGroup = items.ViewMangeProductGroup;
    $scope.ProductByID = items.ProductByID;

    $scope.SaveOrder = function () {
        $http.post("api/Orders/InsertOrder", $scope.ViewMangeProductGroup).then(function (data) {
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
                    $uibModalInstance.dismiss('cancel');
                });
            })
        });
    }

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
