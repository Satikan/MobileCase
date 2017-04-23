var app = angular.module('mobilecase', ['ngAnimate', 'ngResource', 'ngSanitize', 'ngTouch', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $qProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('/', {
            url: "/",
            templateUrl: '/MobileCase/home'
        })
        .state('/product', {
            url: '/product',
            templateUrl: '/MobileCase/product',
            //controller: 'DetailController'
        })
});