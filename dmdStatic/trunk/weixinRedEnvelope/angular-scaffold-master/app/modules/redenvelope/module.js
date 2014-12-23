// define module
var redEnvelopeModule = angular.module('redEnvelopeModule', ['ui.router', 'ui.bootstrap']);

// config router
redEnvelopeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/redenvelope/getSeed");

    $stateProvider
      .state('redenvelope', {
        url: '/redenvelope',
        "abstract": true,
        template: "<div ui-view></div>"
      })
      .state('redenvelope.getSeed', {
        url: "/getSeed",
        controller: 'getSeedController',
        templateUrl: "modules/redenvelope/templates/getSeed.html"
      })
      .state('redenvelope.myinfo', {
        url: "/myinfo/{friendId}/{friendNick}",
        controller: 'myinfoController',
        templateUrl: "modules/redenvelope/templates/myinfo.html"
      })
      .state('redenvelope.friend', {
        url: "/friend/{friendId}",
        controller: 'friendController',
        templateUrl: "modules/redenvelope/templates/friend.html"
      })
      .state('redenvelope.myjab', {
        url: "/myjab",
        controller: 'myjabController',
        templateUrl: "modules/redenvelope/templates/myjab.html"
      })
      .state('redenvelope.jabme', {
        url: "/jabme",
        controller: 'jabmeController',
        templateUrl: "modules/redenvelope/templates/jabme.html"
      })
      .state('redenvelope.myachivement', {
        url: "/myachivement{tab:[0-9]+}",
        controller: 'myachivementController',
        templateUrl: "modules/redenvelope/templates/myachivement.html"
      })
      .state('redenvelope.rule', {
        url: "/rule",
        controller: 'ruleController',
        templateUrl: "modules/redenvelope/templates/rule.html"
      })
      .state('redenvelope.regist', {
        url: "/regist",
        controller: 'registController',
        templateUrl: "modules/redenvelope/templates/regist.html"
      })
      .state('redenvelope.realname', {
        url: "/realname",
        controller: 'realnameController',
        templateUrl: "modules/redenvelope/templates/realname.html"
      })
      .state('redenvelope.regsuccess', {
        url: "/regsuccess/{regtype:[0-9]+}/{extra}",
        controller: 'regsuccessController',
        templateUrl: "modules/redenvelope/templates/regsuccess.html"
      })
      .state('redenvelope.actend', {
        url: "/active_end",
        controller: 'actendController',
        templateUrl: "modules/redenvelope/templates/active_end.html"
      })
      .state('redenvelope.agreement', {
        url: "/agreement",
        controller: 'agreementController',
        templateUrl: "modules/redenvelope/templates/agreement.html"
      });
  }
]);