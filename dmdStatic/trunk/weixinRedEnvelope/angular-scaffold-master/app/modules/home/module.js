// define module
var homeModule = angular.module('homeModule', ['ui.router', 'ui.bootstrap']);

// config router
homeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        controller: 'homeController',
        templateUrl: "modules/home/templates/home.html"
      })
      .state('config', {
        url: "/config",
        controller: 'configController',
        templateUrl: "modules/home/templates/config.html"
      });
  }
]);