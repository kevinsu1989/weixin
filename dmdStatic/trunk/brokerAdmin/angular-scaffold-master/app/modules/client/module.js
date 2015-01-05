/*global Modules:true*/

// define module
var clientModule = Modules.register('clientModule', ['app']);

// config routes
clientModule.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/client/list");

  $stateProvider
    .state('client', {
      url: '/client',
      "abstract": true,
      template: "<div ui-view></div>"
    })
    .state('client.list', {
      url: '/list',
      templateUrl: "modules/client/templates/list.html",
      controller: 'listController'
    })
    .state('client.invest', {
      url: '/invest/{id}',
      templateUrl: "modules/client/templates/invest.html",
      controller: 'investController'
    });
});