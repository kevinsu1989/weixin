// define module
var registerModule = angular.module('registerModule', ['ui.router', 'ui.bootstrap']);

// config router
registerModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("/register", "/register/mobile");

    $stateProvider
      .state('register.regist', {
        abstract: true,
        url: "/register/regist",
        controller: 'registController',
        templateUrl: "modules/register/templates/regist.html"
      })
      .state('register.realname', {
        url: "/realname",
        controller: 'realnameController',
        templateUrl: "modules/register/templates/realname.html"
      });
  }
]);