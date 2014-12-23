// define module
var decorateModule = angular.module('decorateModule', ['ui.router', 'ui.bootstrap']);

// config router
decorateModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/decorate', '/decorate/houses');

    $stateProvider
      .state('decorate', {
        abstract: true,
        url: "/decorate",
        templateUrl: "modules/decorate/templates/decorate.html"
      })
      .state('decorate.houses', { // 列出房产
        url: "/houses",
        controller: 'housesController',
        templateUrl: "modules/decorate/templates/houses.html"
      })
      .state('decorate.invitation', { // 申请装修
        url: "/invitation/{houseId:[0-9]+}",
        controller: 'invitationController',
        templateUrl: "modules/decorate/templates/invitation.html"
      })
      .state('decorate.reference', { // 装修公司备案
        url: "/reference",
        controller: 'referenceController',
        templateUrl: "modules/decorate/templates/reference.html"
      })
      .state('decorate.history', { // 查看装修历史
        url: "/history",
        controller: 'historyController',
        templateUrl: "modules/decorate/templates/history.html"
      })
      .state('decorate.progress', { // 查看装修进度
        url: "/progress/{decorateId:[0-9]+}",
        controller: 'progressController',
        templateUrl: "modules/decorate/templates/progress.html"
      })
      .state('decorate.drawing', { // 上传装修图纸
        url: "/drawing/{decorateId:[0-9]+}",
        controller: 'drawingController',
        templateUrl: "modules/decorate/templates/drawing.html"
      })
      .state('decorate.confirm', { // 现场三方确认
        url: "/confirm/{decorateId:[0-9]+}",
        controller: 'confirmController',
        templateUrl: "modules/decorate/templates/confirm.html"
      })
      .state('decorate.acceptance', { // 验收装修工程
        url: "/acceptance/{decorateId:[0-9]+}",
        controller: 'acceptanceController',
        templateUrl: "modules/decorate/templates/acceptance.html"
      })
      .state('decorate.refund', { // 现场三方确认
        url: "/refund/{decorateId:[0-9]+}",
        controller: 'refundController',
        templateUrl: "modules/decorate/templates/refund.html"
      })
      .state('decorate.notice', { // 通知抽象路由
        abstract: true,
        url: "/notice",
        template: '<div class="notice" ui-view></div>'
      })
      .state('decorate.notice.initiate', { // 通知：发送申请成功
        url: "/initiate/{decorateId:[0-9]+}",
        controller: 'noticeController',
        templateUrl: "modules/decorate/templates/notice-initiate.html"
      })
      .state('decorate.notice.drawing', { // 通知：上传装修图纸
        url: "/drawing/{decorateId:[0-9]+}",
        controller: 'noticeController',
        templateUrl: "modules/decorate/templates/notice-drawing.html"
      })
      .state('decorate.notice.acceptance', { // 通知：已经发送验收申请
        url: "/acceptance/{decorateId:[0-9]+}",
        controller: 'noticeController',
        templateUrl: "modules/decorate/templates/notice-acceptance.html"
      })
      .state('decorate.notice.refund', { // 通知：退款申请已发出
        url: "/refund/{decorateId:[0-9]+}",
        controller: 'noticeController',
        templateUrl: "modules/decorate/templates/notice-refund.html"
      });
  }
]);