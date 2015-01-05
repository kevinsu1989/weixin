/*global Modules:true*/

// define module
var activityModule = Modules.register('activityModule', ['app']);

// config routes
activityModule.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/activity/actlist");

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
      url: '/awardlist',
      templateUrl: "modules/activity/templates/award.list.html",
      controller: 'awardlistController'
    })
    .state('activity.busilist', {
      url: '/busilist',
      templateUrl: "modules/activity/templates/business.list.html",
      controller: 'busilistController'
    })
    .state('activity.itemlist', {
      url: '/itemlist',
      templateUrl: "modules/activity/templates/item.list.html",
      controller: 'itemlistController'
    })
    .state('activity.ticketlist', {
      url: '/ticketlist',
      templateUrl: "modules/activity/templates/ticket.list.html",
      controller: 'ticketlistController'
    });
});