/*global Modules:true*/

// define module
var activityModule = Modules.register('activityModule', ['app']);

// config routes
activityModule.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/activity/list");

  $stateProvider
    .state('activity', {
      url: '/activity',
      "abstract": true,
      template: "<div ui-view></div>"
    })
    .state('activity.actlist', {
      url: '/actlist',
      templateUrl: "modules/activity/templates/activity.list.html",
      controller: 'actlistController'
    })
    .state('activity.actedit', {
      url: '/actedit/{id}',
      templateUrl: "modules/activity/templates/activity.edit.html",
      controller: 'acteditController'
    })
    .state('activity.awardlist', {
      url: '/awardlist/{id}',
      templateUrl: "modules/activity/templates/award.list.html",
      controller: 'awardlistController'
    })
    .state('activity.awardedit', {
      url: '/awardedit/{id}',
      templateUrl: "modules/activity/templates/award.edit.html",
      controller: 'awardeditController'
    })
    .state('activity.busilist', {
      url: '/busilist/{id}',
      templateUrl: "modules/activity/templates/business.list.html",
      controller: 'busilistController'
    })
    .state('activity.busiedit', {
      url: '/busiedit/{id}',
      templateUrl: "modules/activity/templates/business.edit.html",
      controller: 'busieditController'
    })
    .state('activity.itemlist', {
      url: '/itemlist/{id}',
      templateUrl: "modules/activity/templates/item.list.html",
      controller: 'itemlistController'
    })
    .state('activity.itemedit', {
      url: '/itemedit/{id}',
      templateUrl: "modules/activity/templates/item.edit.html",
      controller: 'itemeditController'
    })
    .state('activity.ticketlist', {
      url: '/ticketlist/{id}',
      templateUrl: "modules/activity/templates/ticket.list.html",
      controller: 'ticketlistController'
    })
    .state('activity.ticketedit', {
      url: '/ticketedit',
      templateUrl: "modules/activity/templates/ticket.edit.html",
      controller: 'ticketeditController'
    });
});