// define module
var brokerFrontModule = angular.module('brokerFrontModule', ['ui.router', 'ui.bootstrap']);

// config router
brokerFrontModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/brokerfront/login");

    $stateProvider
      .state('brokerfront', {
        url: '/brokerfront',
        "abstract": true,
        template: "<div ui-view></div>"
      })
      .state('brokerfront.login', {
        url: "/login",
        controller: 'loginController',
        templateUrl: "modules/brokerfront/templates/login.html"
      })
      .state('brokerfront.index', {
        url: "/index",
        controller: 'indexController',
        templateUrl: "modules/brokerfront/templates/index.html"
      })
      .state('brokerfront.user', {
        url: "/user",
        controller: 'userController',
        templateUrl: "modules/brokerfront/templates/user.html"
      })
      .state('brokerfront.invite', {
        url: "/invite",
        controller: 'inviteController',
        templateUrl: "modules/brokerfront/templates/invite.html"
      })
      .state('brokerfront.invitelist', {
        url: "/invitelist",
        controller: 'invitelistController',
        templateUrl: "modules/brokerfront/templates/invite.list.html"
      })
      .state('brokerfront.investlist', {
        url: "/investlist",
        controller: 'investlistController',
        templateUrl: "modules/brokerfront/templates/invest.list.html"
      })
      .state('brokerfront.investdetail', {
        url: "/investdetail/{id}/{name}/{mobile}",
        controller: 'investdetailController',
        templateUrl: "modules/brokerfront/templates/invest.detail.html"
      });
  }
]);