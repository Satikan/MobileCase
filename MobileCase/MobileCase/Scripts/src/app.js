var app = angular.module('mobilecase', ['ngAnimate', 'ngResource', 'ngSanitize', 'ngTouch', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $qProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('/', {
            url: "/",
            templateUrl: '/MobileCase/home',
            controller: 'ProductController'
        })
        .state('/login', {
            url: '/login',
            templateUrl: '/MobileCase/Login',
            controller: 'LoginController'
        })
        .state('/register', {
            url: '/register',
            templateUrl: '/MobileCase/Register',
            controller: 'RegisterController'
        })
        .state('/productgroup', {
            url: '/productgroup',
            templateUrl: '/MobileCase/ProductGroup',
            controller: 'ProductController'
        })
        .state('/addproductgroup', {
            url: '/addproductgroup',
            templateUrl: '/MobileCase/AddProductGroup',
            controller: 'ProductController'
        })
        .state('/editproductgroup', {
            url: '/editproductgroup',
            templateUrl: '/MobileCase/EditProductGroup',
            controller: 'ProductController'
        })
        .state('/product', {
            url: '/product',
            templateUrl: '/MobileCase/Product',
            controller: 'ProductController'
        })
        .state('/addproduct', {
            url: '/addproduct',
            templateUrl: '/MobileCase/AddProduct',
            controller: 'ProductController'
        })
        .state('/editproduct', {
            url: '/editproduct',
            templateUrl: '/MobileCase/EditProduct',
            controller: 'ProductController'
        })
        .state('/detailproduct', {
            url: '/detailproduct',
            templateUrl: '/MobileCase/DetailProduct',
            controller: 'ProductController'
        })
        .state('/orderlist', {
            url: '/orderlist',
            templateUrl: '/MobileCase/OrderList',
            controller: 'OrderController'
        })
        .state('/order', {
            url: '/order',
            templateUrl: '/MobileCase/Order',
            controller: 'OrderController'
        })
        .state('/detailorder', {
            url: '/detailorder',
            templateUrl: '/MobileCase/DetailOrder',
            controller: 'OrderController'
        })
        .state('/member', {
            url: '/member',
            templateUrl: '/MobileCase/Member',
            controller: 'MemberController'
        })
        .state('/editmember', {
            url: '/editmember',
            templateUrl: '/MobileCase/EditMember',
            controller: 'MemberController'
        })
        .state('/contact', {
            url: '/contact',
            templateUrl: '/MobileCase/Contact',
            controller: 'ContactController'
        })
});

app.run(function ($rootScope, $state, $document, $stateParams) {
    $rootScope.$state = $state; $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function () {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
    });
})