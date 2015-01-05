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
      .state('brokerfront.broker.login', {
        url: "/broker/login",
        controller: 'brokerLoginController',
        templateUrl: "modules/brokerfront/templates/broker.login.html"
      })
      .state('brokerfront.broker.invite', {
        url: "/broker/invite",
        controller: 'brokerInviteController',
        templateUrl: "modules/brokerfront/templates/broker.invite.html"
      })
      .state('brokerfront.broker.invitelist', {
        url: "/broker/invitelist",
        controller: 'brokerInviteListController',
        templateUrl: "modules/brokerfront/templates/broker.invite.list.html"
      })
      .state('brokerfront.broker.investlist', {
        url: "/broker/investlist",
        controller: 'brokerInvestListController',
        templateUrl: "modules/brokerfront/templates/broker.invest.list.html"
      })
      .state('brokerfront.customer.login', {
        url: "/customer/login",
        controller: 'customerLoginController',
        templateUrl: "modules/brokerfront/templates/customer.login.html"
      })
      .state('brokerfront.offline.login', {
        url: "/offline/login",
        controller: 'offlineLoginController',
        templateUrl: "modules/brokerfront/templates/offline.login.html"
      })
      .state('brokerfront.offline.invitelist', {
        url: "/offline/index",
        controller: 'offlineInviteListController',
        templateUrl: "modules/brokerfront/templates/offline.invitelist.html"
      })
      .state('brokerfront.offline.recieve', {
        url: "/offline/recieve",
        controller: 'offlineRecieveController',
        templateUrl: "modules/brokerfront/templates/offline.recieve.html"
      })
      .state('brokerfront.public.index', {
        url: "/public/index",
        controller: 'publicIndexController',
        templateUrl: "modules/brokerfront/templates/public.index.html"
      })
      .state('brokerfront.public.account', {
        url: "/public/account",
        controller: 'publicAccountController',
        templateUrl: "modules/brokerfront/templates/public.account.html"
      })
      .state('brokerfront.public.billlist', {
        url: "/public/billlist",
        controller: 'publicBillListController',
        templateUrl: "modules/brokerfront/templates/public.billlist.html"
      })
      .state('brokerfront.public.qrcode', {
        url: "/public/qrcode",
        controller: 'publicQrcodeController',
        templateUrl: "modules/brokerfront/templates/public.qrcode.html"
      })
      .state('brokerfront.public.withdraw', {
        url: "/public/withdraw",
        controller: 'publicWithdrawController',
        templateUrl: "modules/brokerfront/templates/public.withdraw.html"
      });
  }
]);