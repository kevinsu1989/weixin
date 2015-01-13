/*global Modules:true*/

// define module
var brokersModule = Modules.register('brokersModule', ['app']);

// config routes
brokersModule.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/brokers/login");

  $stateProvider
    .state('brokers', {
      url: '/brokers',
      "abstract": true,
      template: "<div ui-view></div>"
    })
    .state('brokers.login', {
      url: '/login',
      templateUrl: "modules/brokers/templates/login.html",
      controller: 'loginController'
    })
    .state('brokers.logout', {
      url: '/logout',
      template: '<div class="jumbotron center-block" style="width:300px;"><div class="alert alert-info text-center">正在登出...</div></div>',
      controller: 'logoutController'
    })
    .state('brokers.broker', {
      url: '/broker',
      templateUrl: "modules/brokers/templates/broker.html",
      controller: 'brokerController'
    })
    .state('brokers.third', {
      url: '/third',
      templateUrl: "modules/brokers/templates/third.html",
      controller: 'thirdController'
    })
    .state('brokers.thirdinfo', {
      url: '/thirdinfo/{id}',
      templateUrl: "modules/brokers/templates/third.info.html",
      controller: 'thirdInfoController'
    })
    .state('brokers.offline', {
      url: '/offline',
      templateUrl: "modules/brokers/templates/offline.html",
      controller: 'offlineController'
    })
    .state('brokers.offlinedetail', {
      url: '/offlinedetail/{id}',
      templateUrl: "modules/brokers/templates/offline.detail.html",
      controller: 'offlineDetailController'
    })
    .state('brokers.qrcode', {
      url: '/qrcode',
      templateUrl: "modules/brokers/templates/tools.qrcode.html",
      controller: 'qrcodeController'
    })
    .state('brokers.qrcodeview', {
      url: '/qrcodeview/{id}',
      templateUrl: "modules/brokers/templates/tools.qrcode.view.html",
      controller: 'qrcodeViewController'
    });
});