var app = angular.module('mobilecase', ['ngAnimate', 'ngResource', 'ngSanitize', 'ngTouch', 'ui.router', 'ngFileUpload', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider, $qProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('/', {
            url: "/",
            templateUrl: '\MobileCase/home',
            //controller: 'ProductController'
        })
        .state('/login', {
            url: '/login',
            templateUrl: '\MobileCase/Login',
            controller: 'LoginController'
        })
        .state('/register', {
            url: '/register',
            templateUrl: '\MobileCase/Register',
            controller: 'RegisterController'
        })
        .state('/forgotpassword', {
            url: '/forgotpassword',
            templateUrl: '\MobileCase/ForgotPassword',
            controller: 'LoginController'
        })
        .state('/resetpassword/:id', {
            url: '/resetpassword/:id',
            templateUrl: '\MobileCase/ResetPassword',
            controller: 'LoginController'
        })
        .state('/productgroup', {
            url: '/productgroup',
            templateUrl: '\MobileCase/ProductGroup',
            controller: 'ProductGroupController'
        })
        .state('/addproductgroup', {
            url: '/addproductgroup',
            templateUrl: '\MobileCase/AddProductGroup',
            controller: 'ProductGroupController'
        })
        .state('/editproductgroup/:id', {
            url: '/editproductgroup/:id',
            templateUrl: '\MobileCase/EditProductGroup',
            controller: 'ProductGroupController'
        })
        .state('/manageproductgroup/:id', {
            url: '/manageproductgroup/:id',
            templateUrl: '\MobileCase/ManageProductGroup',
            controller: 'ProductController'
        })
        .state('/editmanageproductgroup/:id/:productgroupid', {
            url: '/editmanageproductgroup/:id/:productgroupid',
            templateUrl: '\MobileCase/EditManageProductGroup',
            controller: 'ProductController'
        })
        .state('/product', {
            url: '/product',
            templateUrl: '\MobileCase/Product',
            controller: 'ProductController'
        })
        .state('/addproduct', {
            url: '/addproduct',
            templateUrl: '\MobileCase/AddProduct',
            controller: 'ProductController'
        })
        .state('/editproduct/:id', {
            url: '/editproduct/:id',
            templateUrl: '\MobileCase/EditProduct',
            controller: 'ProductController'
        })
        .state('/detailproduct/:id', {
            url: '/detailproduct/:id',
            templateUrl: '\MobileCase/DetailProduct',
            controller: 'ProductController'
        })
        .state('/orderlist', {
            url: '/orderlist',
            templateUrl: '\MobileCase/OrderList',
            controller: 'OrderController'
        })
        .state('/order', {
            url: '/order',
            templateUrl: '\MobileCase/Order',
            controller: 'OrderController'
        })
        .state('/detailorder/:id', {
            url: '/detailorder/:id',
            templateUrl: '\MobileCase/DetailOrder',
            controller: 'OrderController'
        })
        .state('/member', {
            url: '/member',
            templateUrl: '\MobileCase/Member',
            controller: 'MemberController'
        })
        .state('/editmember/:id', {
            url: '/editmember/:id',
            templateUrl: '\MobileCase/EditMember',
            controller: 'MemberController'
        })
        .state('/editprofile', {
            url: '/editprofile',
            templateUrl: '\MobileCase/EditProfile',
            controller: 'MemberController'
        })
        .state('/editpassword', {
            url: '/editpassword',
            templateUrl: '\MobileCase/ChangePassword',
            controller: 'MemberController'
        })
        .state('/contact', {
            url: '/contact',
            templateUrl: '\MobileCase/Contact',
            controller: 'ContactController'
        })
});

app.run(function ($rootScope, $state, $document, $stateParams) {
    $rootScope.$state = $state; $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function () {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
    });
})

app.directive('passwordConfirm', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            matchTarget: '=',
        },
        require: 'ngModel',
        link: function link(scope, elem, attrs, ctrl) {
            var validator = function (value) {
                ctrl.$setValidity('match', value === scope.matchTarget);
                return value;
            }

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);

            // This is to force validator when the original password gets changed
            scope.$watch('matchTarget', function (newval, oldval) {
                validator(ctrl.$viewValue);
            });
        }
    };
}]);