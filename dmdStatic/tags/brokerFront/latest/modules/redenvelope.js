/*! weixin - v0.1.0 - 2014-12-03
* Copyright (c) 2014 lovemoon@yeah.net; Licensed GPLv2 */
// Initialize
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-growl', 'templates', 'homeModule', 'registerModule', 'decorateModule', 'redEnvelopeModule']);

// bootstrap
angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});
// HTTP拦截器
app.config(['$httpProvider',
  function ($httpProvider) {
    // POST method use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override transformRequest to serialize form data like jquery
    $httpProvider.defaults.transformRequest = [

      function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? serialize(data) : data;
      }
    ];

    // Add interceptor
    $httpProvider.interceptors.push(['$q', 'growl',
      function ($q, growl) {
        return {
          request: function (config) {
            // REST 风格路由重写
            var rules = config.url.match(/:(\w+)/g);
            if (rules !== null) {
              angular.forEach(rules, function (rule) {
                var name = rule.substring(1);
                if (config.params && config.params.hasOwnProperty(name)) {
                  config.url = config.url.replace(rule, config.params[name]);
                  delete config.params[name];
                }
                else if (config.data && config.data.hasOwnProperty(name)) {
                  config.url = config.url.replace(rule, config.data[name]);
                  delete config.data[name];
                }
              });
            }
            return $q.when(config);
          },
          response: function (response) {
            if (response.config.parsing !== false && response.status === 200 && angular.isObject(response.data)) {
              var res = response.data;
              // 兼容旧数据格式 {code:0, message: '', data: {...}} --> {code:200, data: {message: '', ...}}
              res.data = res.data || {};
              if (res.data.message || res.message) {
                res.data.message = res.data.message || res.message;
              }
              //未授权
              if(res.code==-801){
                _popAuth();
                return;
              }
              //未授权
              if(res.code==-802){
                window.location.href=res.url;
                return;
              }
              //活动过期
              if(res.data.action_base_info){
                if(res.data.action_base_info.actionStatus!=1||res.data.action_base_info.currentSystemTime>res.data.action_base_info.action_end_time){
                  window.location.href="/#/redenvelope/active_end";
                  return;
                }
              }
              return ["0", "200",0,200].indexOf(res.code) !== -1 ? res.data : $q.reject(res.data);
            }
            return $q.when(response);
          },
          requestError: function (rejection) {
            growl.addErrorMessage('请求异常，请刷新重试！', {
              ttl: -1
            });
            return $q.reject(rejection);
          },
          responseError: function (rejection) {
            growl.addErrorMessage('服务器异常，请刷新重试！', {
              ttl: -1
            });
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

// 配置ui-bootstrap
app.config(['paginationConfig',
  function (paginationConfig) {
    paginationConfig.directionLinks = false;
    paginationConfig.boundaryLinks = true;
    paginationConfig.maxSize = 10;
    paginationConfig.firstText = '«';
    paginationConfig.lastText = '»';
}]);

// 配置angular-growl
app.config(['growlProvider',
  function (growlProvider) {
    growlProvider.onlyUniqueMessages(true);
    growlProvider.globalTimeToLive(4000);
    growlProvider.globalEnableHtml(false); // ngSanitize
}]);

// 配置全局样式表 Home页特殊处理
app.run(['$rootScope',
  function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, state) {
      $rootScope.isHome = state.name === 'home';
    });
  }
]);
app.directive('csFocus', ['$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element) {
        var times = 0;
        (function focus() {
          if (element.is(':visible')) {
            element.focus();
          }
          else if (times++ < 1) {
            $timeout(focus, 200);
          }
        }());
      }
    };
  }
]);

/**
 * 动态切换Input的type为Number
 * placeholder text for an input type="number" does not work in mobile webkit
 */
app.directive('csNumber', function () {
  return {
    restrict: 'A',
    replace: false,
    link: function (scope, element) {
      element.on('focus', function () {
        this.type = 'number';
      }).on('blur', function () {
        this.type = 'text';
      });
    }
  };
});

/**
 * 保持在底部效果
 */
app.directive('csBottom', ['$window', '$document',
  function ($window, $document) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element) {
        var listener = function () {
          element.toggleClass('keep-bottom', window.innerHeight >= $document.height());
        };

        var show = function (e) {
          // 可以调出虚拟键盘的空间类型
          var needInput = ['datetime', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'].indexOf(e.target.type);
          if (element.hasClass('keep-bottom') && (e.target.tagName === 'TEXTAREA' || needInput)) {
            element.hide();
          }
        };

        var hide = function () {
          element.show();
        };

        $document.on('focus', 'input,textarea', show);
        $document.on('blur', 'input,textarea', hide);

        angular.element($window).on('resize', listener).resize();

        // 清理事件 防止内存泄露
        element.on('$destroy', function () {
          angular.element($window).off('resize', listener);
          $document.off('focus', 'input,textarea', show);
          $document.off('blur', 'input,textarea', hide);
        });
      }
    };
  }
]);

/**
 * The cs-Thumbnail directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
app.directive('csThumbnail', ['$window',
  function ($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function (item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function (file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas />',
      link: function (scope, element, attrs) {
        if (!helper.support) {
          return;
        }

        var params = scope.$eval(attrs.csThumbnail);

        if (!helper.isFile(params.file) || !helper.isImage(params.file)) {
          return;
        }

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = function (e) {
          var img = new Image();
          img.onload = function () {
            var width = params.width || this.width / this.height * params.height;
            var height = params.height || this.height / this.width * params.width;
            canvas.attr({
              width: width,
              height: height
            });
            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
          };
          img.src = e.target.result;
        };

        reader.readAsDataURL(params.file);
      }
    };
  }
]);

/* 页面模板 */
app.directive('csLayout', [

  function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      templateUrl: 'common/templates/layout.partials.html',
      link: function (scope, element, attrs) {
        // Maybe todo...
      }
    };
  }
]);

/* 计算补白：实现宽高相等效果 即正方形 */
(function () {
  var height = 62; // 实际内容高度 如果调整界面此处需更新
  var padding = null;
  app.directive('csSquare', ['$window',

    function ($window) {
      return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
          var setPadding = function () {
            if (padding === null) {
              padding = Math.max((element.width() - height) / 2, 0) + 'px 0';
            }
            element.css('padding', padding);
          };

          angular.element($window).on('resize', function () {
            padding = null;
            setPadding();
          }).triggerHandler('resize');
        }
      };
    }
  ]);
})();
// 为了分割数组以便二次使用ng-repeat
// 通常需要的场景是你需要每隔N个元素插入分组节点
// 如果你修改items内部元素的属性 angular会自动watch更新
// 如果动态增删items的元素，要删除items.$rows，以便重新计算

app.filter('group', function () {
  return function (items, cols) {
    if (!items) {
      return items;
    }
    // if items be modified, delete cache
    if (items.$rows) {
      var temp = [];
      for (var i = 0; i < items.$rows.length; i++) {
        temp = temp.concat(items.$rows[i]);
      }

      if (temp.length !== items.length) {
        delete items.$rows;
      }
      else {
        for (var j = 0; j < items.length; j++) {
          if (items[j] !== temp[j]) {
            delete items.$rows;
            break;
          }
        }
      }
    }

    // cache rows for angular dirty check
    if (!items.$rows) {
      var rows = [];
      for (var k = 0; k < items.length; k++) {
        if (k % cols === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(items[k]);
      }
      items.$rows = rows;
    }

    return items.$rows;
  };
});

// 判断是否是空白对象
app.filter('empty', function () {
  return function (obj) {
    return !obj || angular.equals({}, obj) || angular.equals([], obj);
  };
});

// 取两个数最小的
app.filter('min', function () {
  return function (num, limit) {
    return Math.min(num, limit);
  };
});

// 取两个数最大的
app.filter('max', function () {
  return function (num, limit) {
    return Math.max(num, limit);
  };
});

// Avoid console errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Make Array support indexOf and trim in ie7 and ie8
(function () {
  if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
})();

// 识别浏览器版本
(function () {
  var version = (function () {
    var v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');

    do {
      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
    }
    while (all[0]);
    return v > 4 ? v : false;
  }());

  if (version) {
    var times = 0;
    (function addClass() {
      var root = document.getElementsByTagName('html')[0];
      if (root) {
        root.className += ' ie ie' + version;
      }
      else if (times++ < 2) {
        setTimeout(addClass, 200);
      }
    }());
  }

})();

/**
 * Converts an object to x-www-form-urlencoded serialization.
 * @param {Object} obj
 * @return {String}
 */
var serialize = function (obj) {
  var query = '';
  var name, value, fullSubName, subName, subValue, innerObj, i;

  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += serialize(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          if (value.hasOwnProperty(subName)) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += serialize(innerObj) + '&';
          }
        }
      }
      else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
  }

  return query.length ? query.substr(0, query.length - 1) : query;
};
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
// define module
var homeModule = angular.module('homeModule', ['ui.router', 'ui.bootstrap']);

// config router
homeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

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
//领取种子红包
redEnvelopeModule.controller('getSeedController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".pub_window").css("left",($(window).width()-320)/2+"px");
    $scope.onload=false;
    service.myRedEnvelope().then(function(res) {   
      if (res.e.redEndTime&&res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $state.go('redenvelope.myinfo',{friendId:'',friendNick:''});
      }
      $scope.onload=true;
      if (res.current_user_has_receive_red == -1) {
        $scope.status = 0;
        $scope.money = "?";
        $scope.usernick = res.p.nick;
      } else {
        $scope.status = 1;
        $scope.money = res.current_user_red_info.amount;
        $scope.usernick = res.p.nick;
      }
    });
    $scope.getSeed = function() {
      service.firstRedEnvelope().then(function(res2) {
        if (res2.code == 1) {
          service.myRedEnvelope().then(function(res) {
            $scope.money = res.current_user_red_info.amount;
            $scope.status = 1;
            $(".pub_window").css('display', 'block');
            $(".pub_window").addClass('BounceIn');
            $timeout(function() {
              $(".BounceIn").addClass('BounceOut');
              $timeout(function() {
                $(".pub_window").css('display', 'none');
              }, 1000);
            }, 3000);
          });
        } else {
          alert("红包领取失败！");
        }
      });
    }
    $scope.viewMyRev = function() {
      $state.go('redenvelope.myinfo',{friendId:"",friendNick:""});
    }
  }
]);


//我的红包
redEnvelopeModule.controller('myinfoController', ['$scope', '$state', '$stateParams', 'reEnvelopeService', '$timeout','msgService',
  function($scope, $state, $params, service, $timeout,message) {
    $(".posita").css("left",($(window).width()-66)/2+"px");
    $scope.fromFriend = false;
    $scope.friendOpenId = $params.friendId;
    $scope.friendNick = $params.friendNick;
    if ($scope.friendOpenId != "" && $scope.friendOpenId != "") {
      $scope.fromFriend = true;
    }
    service.myRedEnvelope().then(function(res) {
      $scope.status = res.e.joinStatus;
      if(res.e.joinStatus==-1){
        $state.go('redenvelope.getSeed');
      }
      if (res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 1;
      }
      if (res.e.redReceiveEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 2;
      }
      $scope.money = res.e.amount;
      $scope.canclick = res.e.canclick;
      $scope.achievement = res.e.ach_count;
      $scope.ach_amount = res.e.ach_amount;
      $scope.level = res.e.times;
      $scope.is_auth = res.u.is_auth;
      if (res.e.next_receive_level_red != -1) {
        $scope.next = res.e.next_receive_level_red;
        $scope.nextlevel = res.e.next_receive_level_level;
        $scope.need = res.e.next_receive_level_red - res.e.amount;
      }
      var timer = null;
      if ($scope.status == 0) {
        var timeout = function() {
          var ts = (new Date(res.e.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      } else if ($scope.status == 1) {
        var timeout = function() {
          var ts = (new Date(res.e.redReceiveEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
    });
    $scope.redStop=function(){
      var msg="<h4 class='color6 wid90'>红包长大时间为自获得红包起1周内，1周后会停止生长。</h4><h4 class='color6 wid90'>红包停止生长2周后会消失。</h4>"
      message.msgShow('#myinfo',msg);
    }
    $scope.jabFriend = function() {
      $state.go('redenvelope.myjab');
    }
    $scope.jabMe = function() {
      $state.go('redenvelope.jabme');
    }
    $scope.rule = function() {
      $state.go('redenvelope.rule');
    }
    $scope.myAchieve = function() {
      $state.go('redenvelope.myachivement', {
        "tab": 0
      });
    }
    $scope.getAchieve = function() {
      $state.go('redenvelope.myachivement', {
        "tab": 1
      });
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);
//我戳过的
redEnvelopeModule.controller('myjabController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".posita").css("left",($(window).width()-66)/2+"px");
    $scope.tabflag = 0;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    $scope.tabChange = function(id) {
      $scope.tabflag = id;
      if (id == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.shareShow=function(){
      $(".share_tips").css("display","block");
    }
    $scope.shareHide=function(){
      $(".share_tips").css("display","none");
    }
    service.myClickHistory().then(function(res) {
      console.log(res.list);
      $scope.myjab = res.list;
    })
    service.myTodayCanClick().then(function(res) {
      console.log(res.list);
      $scope.canjab = res.list;
    })
  }
]);

//戳过我的
redEnvelopeModule.controller('jabmeController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".posita").css("left",($(window).width()-66)/2+"px");
    $scope.tabflag = 0;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    $scope.tabChange = function(id) {
      $scope.tabflag = id;
      if (id == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.clickFriend = function(id, clicked) {
      if (!clicked) {
        $state.go("redenvelope.friend", {
          friendId: id
        });
      }
    }
    $scope.shareShow=function(){
      $(".share_tips").css("display","block");
    }
    $scope.shareHide=function(){
      $(".share_tips").css("display","none");
    }
    service.clickMeHistory().then(function(res) {
      $scope.jabme = res.list;
    })
    service.myTodayCanClickU().then(function(res) {
      $scope.canjab = res.list;
    })
  }
]);
//好友的红包
redEnvelopeModule.controller('friendController', ['$scope', '$state', '$stateParams', 'reEnvelopeService', 'msgService', '$timeout','msgService',
  function($scope, $state, $params, service, msgService, $timeout,message) {
    $(".pub_window").css("left",($(window).width()-320)/2+"px");
    var id = $params.friendId;
    var timer = null;
    var clickflag = false;
    var receiveFlag;
    $scope.money = 0;
    $scope.onload = false;
    service.friendRedEnvelope(id).then(function(res) {
      //第一次进入页面显示分享按钮
      hideNav('showOptionMenu'); 
      hideNav('showToolbar'); 
      if(res.e.openId==res.current_user_red_info.openId){
        $state.go("redenvelope.myinfo",{friendId:"",friendNick:""})
      }
      $scope.onload = true;
      if (res.e.status == 0) {
        $scope.status = 0;
      }
      if (res.e.status == -10) {
        $scope.status = 2;
      }
      if (res.e.status == -20) {
        $scope.status = 3;
      }
      if (res.e.status == -1) {
        $scope.status = 1;
      }
      if (res.e.status == -11) {
        $scope.status = 4;
      }
      if (res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 9;
      }
      if (res.e.redReceiveEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 2;
      }
      if ($scope.status != 9) {
        var timeout = function() {
          var ts = (new Date(res.e.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
      $scope.nick = res.p.nick;
      $scope.openId = res.p.openId; /////tab参数
      $scope.money = res.e.amount;
      $scope.next = res.e.next_receive_level_red;
      $scope.need = (res.e.next_receive_level_red - res.e.amount).toFixed(2);
      $scope.hasReceiveAmount = res.e.hasReceiveAmount;
      $scope.is_auth=res.u.is_auth;
      receiveFlag = res.current_user_has_receive_red; 
    }, function () {
        $state.go('redenvelope.getSeed');
      }
    );
    $scope.clickFriend = function() {
      if ($scope.status != 0 || clickflag) {
        return;
      }
      clickflag = true;
      service.clickFriendRedEnvelope(id).then(function(res) {
        clickflag = false;
        $scope.status = -1;
        $scope.mystatus = res.current_user_has_receive_red;
        $scope.money = res.resault.ownerAmount + res.resault.ownerGetAmount;
        $scope.need = (res.resault.owner_next_receive_level_red - $scope.money).toFixed(2);
        $scope.next = res.resault.owner_next_receive_level_red;
        $scope.mymoney = res.resault.clickerAmount + res.resault.clickerGetAmount;
        $scope.myneed = res.resault.clicker_next_receive_level_red - $scope.mymoney;
        var msg = "";
        $("#hb-img").addClass('BounceIn');
        res.resault.clickerGetAmount=res.resault.clickerGetAmount.toFixed(2);
        res.resault.ownerGetAmount=res.resault.ownerGetAmount.toFixed(2);
        /*红包翻倍逻辑*/
        if(res.resault.five==true){
          msg += "<h4 class='color6'>恭喜，你和好友都完成了实名认证，并且存在邀请关系，均获得5倍红包奖励，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包。</h4>";
        }else{
          if (res.resault.clickerTimes == 1) {
            msg += "<h4 class='color6'>恭喜，你获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包。</h4>";
          } else if (res.resault.clickerTimes == 2) {
            msg += "<h4 class='color6'>恭喜，你绑定了账号，红包翻倍，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包。</h4>";
          } else if (res.resault.clickerTimes == 3) {
             msg += "<h4 class='color6'>恭喜，你完成实名认证，红包翻3倍，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包。</h4>";
          } 
          if (res.resault.ownerTimes == 1) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包。</h4>";
          } else if (res.resault.ownerTimes == 2) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】绑定了账号，红包翻倍，获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包。</h4>";
          } else if (res.resault.ownerTimes == 3) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】完成了实名认证，获得3倍红包奖励，获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包。</h4>";
          }
        }
        /*红包翻倍逻辑结束*/

        /*消息队列数组*/
        var msgArr = [{
          "type": "normal",
          "msg": msg
        }];
        if (res.owner_new_receiveLevel.id) {
          msgArr.push({
            "type": "friend",
            "level": res.owner_new_receiveLevel.level,
            "money":res.owner_new_receiveLevel.endStartAmount
          })
        };
        if (res.clicker_new_receiveLevel.id) {
          msgArr.push({
            "type": "my",
            "level": res.clicker_new_receiveLevel.level,
            "money":res.clicker_new_receiveLevel.endStartAmount
          })
        };
        /*消息队列数组结束*/
        msgService.achShow(msgArr);
      });
    }

    $scope.myInfo=function(){
      if(receiveFlag==1){
        $state.go("redenvelope.myinfo",{
          "friendId":$scope.openId,
          "friendNick":$scope.nick
        });
      }else{
        $state.go("redenvelope.getSeed");
      }
    }
    $scope.redStop=function(){
      var msg="<h4 class='color6 wid90'>红包长大时间为自获得红包起1周内，1周后会停止生长。</h4><h4 class='color6 wid90'>红包停止生长2周后会消失。</h4>"
      message.msgShow('#friend',msg);
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);

//成就
redEnvelopeModule.controller('myachivementController', ['$scope', '$state', '$stateParams', 'msgService', 'reEnvelopeService', '$timeout',
  function($scope, $state, $stateParams, message, service, $timeout) {
    $scope.tab = ($stateParams.tab) ? $stateParams.tab : 0;
    $scope.tabClass =($scope.tab==0)?"active_2":"";
    $scope.tabClass2 =($scope.tab==0)?"":"active_2";
    $scope.tabChange = function(id) {
      $scope.tab = id;
      if (id == 0) {
        $scope.tabClass = "active_2";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active_2";
      }
    }
    //红包成就list
    service.myAchievement().then(function(res) {
      var redlist = [];
      var redlevellist = [];
      var status = false;
      var flag=false;
      for (var i = 0, len = res.redEnvelopeLevelList.length; i < len; i++) {
        redlevellist.push(res.redEnvelopeLevelList.endStartAmount);
      }
      for (var i = 0, len = res.redEnvelopeLevelList.length; i < len; i++) {
        for (var j = 0, jlen = res.redEnvelopeUserReceiveList.length; j < jlen; j++) {
          if (res.redEnvelopeUserReceiveList[j].receiveLevel == res.redEnvelopeLevelList[i].level) {
            res.redEnvelopeLevelList[i].receive_status = res.redEnvelopeUserReceiveList[j].receiveStatus;
            res.redEnvelopeLevelList[i].receiveAmount = res.redEnvelopeUserReceiveList[j].receiveAmount;
          }
        }
        if (res.redEnvelopeLevelList[i].receive_status == "3") {
          redlist.push(res.redEnvelopeLevelList[i]);
        } else if (res.redEnvelopeLevelList[i].receive_status == "2") {
          redlist.push(res.redEnvelopeLevelList[i]);
          if (status) {
            redlist[i].receive_status = "0"
          }
          status = true;
        } else {
          if(!flag){
            res.redEnvelopeLevelList[i].receive_status = "1";
            flag=true;
          }else{
            res.redEnvelopeLevelList[i].receive_status = "4";
          }
          redlist.push(res.redEnvelopeLevelList[i]);
        }
      }
      $scope.list = redlist;
    });
    //个人信息
    service.myRedEnvelope().then(function(res) {
      $scope.times = res.current_user_red_info.times;
      $scope.amount = res.current_user_red_info.amount;
      $scope.recieveAmount = res.e.hasReceiveAmount;
      $scope.inviteCode=res.u.id;
      $scope.is_auth=res.u.is_auth;
      var timer = null;
      if (res.current_user_red_info.redEndTime < new Date() && new Date() < res.current_user_red_info.redReceiveEndTime) {
        $scope.status = 1;
        var timeout = function() {
          var ts = (new Date(res.current_user_red_info.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
    });
    //领红包
    $scope.getCash = function(index, level) {
      service.receiveRedEnvelopeToRebate(level).then(function(res) {
        if (res.code == 1) {
          $scope.list[index].receive_status = "3";
          if ($scope.list[index + 1].receive_status=="0") {
            $scope.list[index + 1].receive_status = "2";
          }
          $scope.recieveAmount = res.current_user_red_info.hasReceiveAmount;
          var msg="<h4 class='color6'>恭喜，成功领取<span class='corred'>关卡"+level+"</span>返利</h4>";
          msg+="<h4 class='color6'>您领取的返利已达到<span class='corred'>"+res.current_user_red_info.hasReceiveAmount+"</span>元！</h4>";
          message.msgShow('#myachivement',msg);
        } else {
          message.errMsgByCode(res.code);
        }
      });
    }

    //领取攻略
    $scope.showTips=function(selector){
      $(selector).css("left",($(window).width()-320)/2+"px");
      $(selector).css('display', 'block');
      $(selector).addClass('BounceIn');    
    }
    $scope.hideTips=function(selector){
      $(selector).removeClass('BounceIn');  
      $(selector).addClass('BounceOut');     
      $timeout(function(){
        $(selector).removeClass('BounceOut');  
        $(selector).css('display', 'none'); 
      },1000); 
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);

//活动规则
redEnvelopeModule.controller('ruleController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {

  }
]);
//服务协议
redEnvelopeModule.controller('agreementController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {

  }
]);


//注册绑定
redEnvelopeModule.controller('registController', ['$scope', '$state', '$timeout', 'reEnvelopeService', 'msgService','cookieService',
  function($scope, $state, $timeout, service, message,cookieService) {
    $scope.reg = {};
    $scope.bind = {};
    service.getInviteCode().then(function(res) {
      if (res.invitecode != -1) {
        $scope.reg.randkey = res.invitecode;
      }
    });
    $(".posita").css("left",($(window).width()-66)/2+"px");
    $scope.regtype = 0;
    $scope.recieve = true;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    $scope.imgUrl = "/p/imgcode";
    $scope.codeDisabled = false; //验证码发送状态
    $scope.msgCount = cookieService.getCookie('msgCount')||0;; //验证码发送次数
    $scope.desableTime = 0;//倒计时
    $scope.tabChange = function(type) {
      $scope.regtype = type;
      if (type == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.accessRadioClick = function() {
      $scope.recieve = !$scope.recieve;
    }

    //图片验证码
    $scope.imgCodeRefresh = function() {
      $scope.imgUrl = "/p/imgcode?v=" + new Date() * 1;
    }
    //短信验证码
    $scope.msgCode = function(verifytype) {
      $scope.clickType=1;
      var params = {};
      if (verifytype == 1) {
        if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.reg.mobile;
        params["verifyType"] = "register";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.reg.imgcode;
        }
      } else if (verifytype == 2) {
        if (!$scope.bind.mobile || $scope.bind.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.bind.mobile;
        params["verifyType"] = "login";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.bind.imgcode;
        }
      }
      params["type"] = 1;
      service.checkPhone({"phone":$scope.reg.mobile}).then(function(res){
        if(res.code!=-3){
          service.msgCode(params).then(function(res) {
            if (res.code == 0) {
              var mcount=cookieService.getCookie('msgCount')||0;
              mcount=mcount*1;
              mcount++;
              cookieService.setCookie('msgCount',mcount,'600');
              $scope.msgCount=mcount;
              $scope.codeDisabled = true;
              $scope.desableTime = 10;
              var timeout = function() {
                if($scope.desableTime>0){
                  $scope.desableTime--
                }else{
                  $timeout.cancel(timer);
                  $scope.codeDisabled = false;
                }
                timer = $timeout(timeout, 1000);
              }
              timeout();
            } else {
              message.errShow(res.message);
            }
          });
        }else{
          message.errShow(res.message);
        }
      });
    }
    //语音验证码
    $scope.voiceCode = function(verifytype) {
      var params = {};
      $scope.clickType=2;
      if (verifytype == 1) {
        if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.reg.mobile;
        params["verifyType"] = "register";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.reg.imgcode;
        }
      } else if (verifytype == 2) {
        if (!$scope.bind.mobile || $scope.bind.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.bind.mobile;
        params["verifyType"] = "login";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.bind.imgcode;
        }
      }
      params["type"] = 2; 
      service.checkPhone({"phone":$scope.reg.mobile}).then(function(res){
        if(res.code!=-3){
          service.msgCode(params).then(function(res) {
            if (res.code == 0) {
              var mcount=cookieService.getCookie('msgCount')||0;
              mcount=mcount*1;
              mcount++;
              cookieService.setCookie('msgCount',mcount,'600');
              $scope.codeDisabled = true;
              $scope.desableTime = 10;
              var timeout = function() {
                if($scope.desableTime>0){
                  $scope.desableTime--
                }else{
                  $timeout.cancel(timer);
                  $scope.codeDisabled = false;
                }
                timer = $timeout(timeout, 1000);
              }
              timeout();
            } else {
              message.errShow(res.message);
            }
          });
        }else{
          message.errShow(res.message);
        }
      });
    }

    //新用户注册
    $scope.singIn = function() {
      console.log($scope.reg.mobile);
      if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
        message.errShow("请输入正确的手机号");
        return;
      }
      if (!$scope.reg.msgcode || $scope.reg.msgcode.length != 6) {
        message.errShow("请输入正确的手机验证码");
        return;
      }
      if (!$scope.reg.loginPwd || $scope.reg.loginPwd.length < 6 || $scope.reg.loginPwd.length > 14) {
        message.errShow("密码长度为6-14位");
        return;
      }
      if (!$scope.reg.tradePwd || $scope.reg.tradePwd.length < 6 || $scope.reg.tradePwd.length > 14) {
        message.errShow("交易密码长度为6-14位");
        return;
      }
      if (!$scope.reg.nickName || $scope.reg.nickName.length < 2 || $scope.reg.nickName.length > 10||$scope.reg.nickName.substr(0,1)=="_") {
        message.errShow("请输入合法昵称");
        return;
      }
      if ($scope.reg.randkey && ($scope.reg.randkey+"").length != 8 && ($scope.reg.randkey+"").length != 11) {
        message.errShow("请输入合法推荐码");debugger;
        return;
      }
      var params = {};
      params["phone"] = $scope.reg.mobile;
      params["verifyCode"] = $scope.reg.msgcode;
      params["loginPwd"] = $scope.reg.loginPwd;
      params["tradePwd"] = $scope.reg.tradePwd;
      params["nickName"] = $scope.reg.nickName;
      params["randKey"] = $scope.reg.randkey;
      params["verifyType"] = "register";
      service.singIn(params).then(function(res) {
        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 1,
            extra:res.rebate
          });
        } else {
          message.errShow(res.message);
          if(res.message.indexOf('图形验证码')!=-1){
            $scope.msgCount=3;
          }
        }
      });
    };
    //绑定已有账号
    $scope.bindUser = function() {
      if ($scope.bind.mobile.length != 11) {
        message.errShow("请输入正确的手机号");
        return;
      }
      if ($scope.bind.msgcode.length != 6) {
        message.errShow("请输入正确的手机验证码");
        return;
      }
      var params = {};
      params["phone"] = $scope.bind.mobile;
      params["verifyCode"] = $scope.bind.msgcode;
      params["verifyType"] = "login";
      service.bindUser(params).then(function(res) {
        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 2,
            extra:''
          });
        } else {
          message.errShow(res.message);
          if(res.message.indexOf('图形验证码')!=-1){
            $scope.msgCount=3;
          }
        }
      });
    }
  }
]);

//实名认证
redEnvelopeModule.controller('realnameController', ['$scope', '$state', '$timeout', 'reEnvelopeService', 'msgService',
  function($scope, $state, $timeout, service, message) {
    $scope.real = {};
    $scope.checkRealName = function() {
      if (!$scope.real.realname || $scope.real.realname.length < 2) {
        message.errShow("请输入正确的姓名");
        return;
      }
      if (!$scope.real.idcard || $scope.real.idcard.length != 18) {
        message.errShow("请输入正确的身份证号码");
        return;
      }
      var params = {};
      params["realName"] = $scope.real.realname;
      params["idNo"] = $scope.real.idcard;
      service.doRealNameAuth(params).then(function(res) {
        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 3,
            extra:''
          });
        } else {
          message.errShow(res.message);
        }
      })
    }
  }
]);

//注册结果页
redEnvelopeModule.controller('regsuccessController', ['$scope', '$state', '$timeout', '$stateParams', 'reEnvelopeService',
  function($scope, $state, $timeout,$stateParams, service) {
    $(".pub_window").css("left",($(window).width()-320)/2+"px");
    $scope.extra=$stateParams.extra;
    $scope.regtype = $stateParams.regtype;
    if($scope.regtype==1||$scope.regtype==2){
      $("#zdzz").css('display', 'block');
      $("#zdzz").addClass('BounceIn');
      $timeout(function() {
        $("#zdzz").addClass('BounceOut');
        $timeout(function() {
          $("#zdzz").css('display', 'none');
        }, 1000);
      }, 2000);
    }
    if($scope.regtype==3){
      $("#ymzs").css('display', 'block');
      $("#ymzs").addClass('BounceIn');
      $timeout(function() {
        $("#ymzs").addClass('BounceOut');
        $timeout(function() {
          $("#zdzz").css('display', 'none');
        }, 1000);
      }, 2000);
    }
    service.myRedEnvelope().then(function(res) {
      $scope.time = res.times;
      $scope.ach_amount = res.e.ach_amount
      $scope.isauth=res.u.is_auth;
      $scope.money=res.current_user_red_info.amount-res.current_user_red_info.hasReceiveAmount;
    });
  }
]);

redEnvelopeModule.filter('timefilter', function () {
  return function (time) {
  	if(time*1<10){
  		time="0"+time;
  	}
    return time;
  };
});
redEnvelopeModule.filter('moneyfilter', function () {
  return function (money) {
    return (money*1).toFixed(2);
  };
});
redEnvelopeModule.filter('timeLine', function () {
  return function (time) {
  	var dt=new Date()*1;
  	var timeDif=(dt-time)/1000;
  	if(timeDif<60){
  		return "刚刚";
  	}
  	if(timeDif<3600){
  		return (timeDif/60).toFixed(0)+"分钟前";
  	}
  	if(timeDif<3600*24){
  		return (timeDif/3600).toFixed(0)+"小时前";
  	}
	return (timeDif/(3600*24)).toFixed(0)+"天前";
    //return (money*1).toFixed(2);
  };
});
redEnvelopeModule.factory('reEnvelopeService', ['$http',
  function ($http) {
    //var path="http://peon.cn";
    var path="";
    return {
      getUserInfo: function () {
        return $http({
          url: path+'/p/red/user/-1',
          method: 'get'
        });
      },

      firstRedEnvelope: function () {
        return $http({
          url: '/p/red/seed/receive',
          method: 'post'
        });
      },
      myRedEnvelope:function(){
        return $http({
          url: path+'/p/red/envelope/-1',
          method: 'get'
        });
      },
      myClickHistory:function(){
        return $http({
          url: '/p/red/clickhistory/c/-1',
          method: 'get'
        });
      },
      myTodayCanClick:function(){
        return $http({
          url: '/p/red/todayclick/c/-1',
          method: 'get'
        });
      },
      myTodayCanClickU:function(){
        return $http({
          url: '/p/red/todayclick/u/-1',
          method: 'get'
        });
      },
      clickMeHistory:function(){
        return $http({
          url: '/p/red/clickhistory/u/-1',
          method: 'get'
        });
      },
      myTodayCanClickMe:function(){
        return $http({
          url: '/p/red/todayclick/u/-1',
          method: 'get'
        });
      },
      friendRedEnvelope:function(id){
        return $http({
          url: '/p/red/friendenvelope/'+id,
          method: 'get'
        });
      },
      clickFriendRedEnvelope:function(id){
        return $http({
          url: '/p/red/friendenvelope/click/'+id,
          method: 'post'
        });
      },
      hasRedEnvelope:function(){
        return $http({
          url: 'interface/redenvelope/hasRedEnvelope.json',
          method: 'get'
        });
      },
      myAchievement:function(){
        return $http({
          url: '/p/red/achievement/list/-1',
          method: 'get'
        });
      },
      receiveRedEnvelopeToRebate:function(level){
        return $http({
          url: '/p/u/red/rebate/receive/'+level,
          method: 'post'
        });
      },
      doRealNameAuth:function(params){
        return $http({
          url: '/p/u/auth',
          method: 'post',
          params:params
        });
      },
      singIn:function(params){
        return $http({
          url: '/p/reg',
          method: 'post',
          params:params
        });
      },
      bindUser:function(params){
        return $http({
          url: '/p/login',
          method: 'post',
          params:params
        });
      },
      msgCode:function(params){
        return $http({
          url: '/p/verifycode',
          method: 'get',
          params:params
        });
      },
      checkPhone:function(params){
        return $http({
          url: '/p/check/phone',
          method: 'post',
          params:params
        });
      },
      checkNick:function(params){
        return $http({
          url: '/p/check/nick',
          method: 'post',
          params:params
        });
      },
      getInviteCode:function(){
        return $http({
          url: '/p/red/invitecode',
          method: 'get'
        });
      }
    };
    // return {

    //   getUserInfo: function () {
    //     return $http({
    //       url: 'interface/redenvelope/getUserInfo.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },

    //   firstRedEnvelope: function () {
    //     return $http({
    //       url: 'interface/redenvelope/firstRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myClickHistory:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myClickHistory.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myTodayCanClick:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myTodayCanClick.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   clickMeHistory:function(){
    //     return $http({
    //       url: 'interface/redenvelope/clickMeHistory.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   friendRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/friendRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   clickFriendRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/clickFriendRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   hasRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/hasRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myAchievement:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myAchievement.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   receiveRedEnvelopeToRebate:function(){
    //     return $http({
    //       url: 'interface/redenvelope/receiveRedEnvelopeToRebate.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doLogin:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doLogin.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doReg:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doReg.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doRealNameAuth:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doRealNameAuth.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   }
    // };
  }
]);

redEnvelopeModule.factory('msgService',['$timeout',function ($timeout) {
  return {
    achShow: function (msgArr) {
      if(msgArr.length==1){
        $(".tips_t").html(msgArr[0].msg);
        $(".tips_t").css('display', 'block');
          $(".tips_t").addClass('BounceIn');
          $timeout(function() {
            $(".tips_t").addClass('BounceOut');
            $timeout(function() {
              $(".tips_t").css('display', 'none');
            }, 1000);
        }, 5000);
      }else if(msgArr.length==2){
        var htmlStr=""
        htmlStr+="<h2>关卡"+msgArr[1].level+"</h2>";
        htmlStr+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[1].money+"</span>元返利</h4>";
        htmlStr+="<div class='cj_2'>"
        htmlStr+=msgArr[0].msg;
        htmlStr+="</div>";
        if(msgArr[1].type=="friend"){
          $(".frd_cj").html(htmlStr);
          $(".frd_cj").css("top","15%");
          $(".frd_cj").css('display', 'block');
            $(".frd_cj").addClass('BounceIn');
            $timeout(function() {
              $(".frd_cj").addClass('BounceOut');
              $timeout(function() {
                $(".frd_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        }else if(msgArr[1].type=="my"){
          $(".my_cj").html(htmlStr);
          $(".my_cj").css("top","15%");
          $(".my_cj").css('display', 'block');
            $(".my_cj").addClass('BounceIn');
            $timeout(function() {
              $(".my_cj").addClass('BounceOut');
              $timeout(function() {
                $(".my_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        }
      }else if(msgArr.length==3){
        var htmlStr=""
        var htmlStr2=""
        htmlStr+="<h2>关卡"+msgArr[2].level+"</h2>";
        htmlStr+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[2].money+"</span>元返利</h4>";
        htmlStr+="<div class='cj_2'>"
        htmlStr+=msgArr[0].msg;
        htmlStr+="</div>";
        htmlStr2+="<h2>关卡"+msgArr[1].level+"</h2>";
        htmlStr2+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[1].money+"</span>元返利</h4>";
        $(".my_cj").html(htmlStr);
        $(".frd_cj").html(htmlStr2);
        $(".my_cj").css("top","37%");
        $(".frd_cj").css("top","2%");
        $(".frd_cj").css('display', 'block');
          $(".frd_cj").addClass('BounceIn');
          $timeout(function() {
            $(".frd_cj").addClass('BounceOut');
            $timeout(function() {
              $(".frd_cj").css('display', 'none');
            }, 1000);
        }, 5000);
        $timeout(function(){
          $(".my_cj").html(htmlStr);
          $(".my_cj").css('display', 'block');
            $(".my_cj").addClass('BounceIn');
            $timeout(function() {
              $(".my_cj").addClass('BounceOut');
              $timeout(function() {
                $(".my_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        },200);
      }
    },
    msgShow:function(selector,msg){
      var container="<div class='pub_window tips_t' style='display:none;top:25%;'></div>";
      var JObj=$(container);
      $(selector).append(JObj);
      JObj.html(msg);
      JObj.css("left",($(window).width()-320)/2+"px");
      JObj.css('display', 'block');
      JObj.addClass('BounceIn');    
      $timeout(function() {
        JObj.removeClass('BounceIn');  
        JObj.addClass('BounceOut');     
        $timeout(function(){
          JObj.removeClass('BounceOut');  
          JObj.css('display', 'none');
          $(selector).remove(JObj); 
        },1000); 
      },3000);
    },
    errShow:function(msg){
      $("#errBoxText").html(msg);
      $("#errBox").css("display","block");
      $timeout(function(){
        $("#errBox").css("display","none");  
      },1500)
    },
    errMsgByCode:function(code){
      var mshow = function(msg){
        $("#errBoxText").html(msg);
        $("#errBox").css("display","block");
        $timeout(function(){
          $("#errBox").css("display","none");  
        },1500)
      };
      switch(code){
        case -1:
          mshow("用户未登录");
          break;
        case -21:
          mshow("红包已失效");
          break;
        case -22:
          mshow("活动暂停");
          break;
        case -40:
          mshow("已经领取过了");
          break;
        case -41:
          mshow("用户还未到该等级");
          break;
        case -42:
          mshow("领取等级不在范围内");
          break;
        case -43:
          mshow("不允许领取");
          break;
        case -44:
          mshow("账户未找到");
          break;
        default:
          break;
      }
    }
  }
}]);
      

redEnvelopeModule.factory('cookieService',['$timeout',function ($timeout) {
  return {
    setCookie:function(name,value,time)
    {
      var exp = new Date();
      exp.setTime(exp.getTime() + time*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie:function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return (arr[2]);
      }else{
        return null;
      }
    },
    delCookie:function(name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
    }
  }
}]);
angular.module('templates', ['common/templates/layout.partials.html', 'modules/redenvelope/templates/active_end.html', 'modules/redenvelope/templates/agreement.html', 'modules/redenvelope/templates/friend.html', 'modules/redenvelope/templates/getSeed.html', 'modules/redenvelope/templates/jabme.html', 'modules/redenvelope/templates/myachivement.html', 'modules/redenvelope/templates/myinfo.html', 'modules/redenvelope/templates/myjab.html', 'modules/redenvelope/templates/realname.html', 'modules/redenvelope/templates/regist.html', 'modules/redenvelope/templates/regsuccess.html', 'modules/redenvelope/templates/rule.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<a href=\"/index2.jsp?v=1\" style=\"font-size:40px;\">接口</a>\n" +
    " <div class=\"container posit\">\n" +
    "	<div ui-view class=\"bigbox\">\n" +
    "    </div>\n" +
    "	\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"footer\">\n" +
    "          <a href=\"http://www.duomeidai.com\">\n" +
    "            <div class=\"pull-left fot-logo\" style=\"width:42%;\"></div>\n" +
    "            <h4 class=\"pull-right\" style=\"width:53%;\">实现平凡人的财富梦想</h4>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"errBox\">\n" +
    "	<div id=\"errBoxShadow\"></div>\n" +
    "	<div id=\"errBoxText\"></div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/active_end.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/active_end.html",
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h4 class=\"tipetex mart2\">活动已经结束了！下次早点来吧！</h4>\n" +
    "    <div class=\"row mart2\">\n" +
    "        <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "            <div class=\"text-right\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png?version=1\" alt=\"\" /></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <a href=\"http://www.duomeidai.com/borrowList.action\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我要投资</a>\n" +
    "    <h3 class=\"text-center color6\">用红包投资，获最高12%年化收益。</h3>\n" +
    "    <a href=\"http://www.duomeidai.com\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我的账户</a>\n" +
    "    <h3 class=\"text-center color6\">查看个人信息、红包、投资收益。</h3>\n" +
    "    <div class=\"mart2\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/Qr_code.png?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "    <h3 class=\"text-center color6\">关注多美贷，第一时间获取最新活动信息</h3>\n" +
    "   	<div class=\"padt2\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/redenvelope/templates/agreement.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/agreement.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "	<h2 class=\"text-center\">服务协议</h2>\n" +
    "    <div class=\"pad0\">\n" +
    "        <p class=\"text-left font16\">\"多美贷\"网站（www.duomeidai.com，以下简称\"本网站\"）由多美惠通（北京）网络科技有限公司 （以下简称\"本公司\")负责运营。本服务协议双方为本网站用户与本公司，适用于用户注册使用本网站服务的全部活动。</p>\n" +
    "        <p class=\"text-left font16\">在注册成为本网站用户前，请您务必认真、仔细阅读并充分理解本服务协议全部内容。您在注册本网站取得用户身份时勾选同意本服务协议并成功注册为本网站用户，视为您已经充分理解和同意本服务协议全部内容，并签署了本服务协议，本服务协议立即在您与本公司之间产生合同法律效力，您注册使用本网站服务的全部活动将受到本服务协议的约束并承担相应的责任和义务。如您不同意本服务协议内容，请不要注册使用本网站服务。</p>\n" +
    "        <p class=\"text-left font16\">本服务协议包括以下所有条款，同时也包括本网站已经发布的或者将来可能发布的各类规则。所有规则均为本服务协议不可分割的一部分，与本服务协议具有同等法律效力。</p>\n" +
    "        <p class=\"text-left font16\">用户在此确认知悉并同意本公司有权根据需要不时修改、增加或删减本服务协议。本公司将采用在本网站公示的方式通知用户该等修改、增加或删减，用户有义务注意该等公示。一经本网站公示，视为已经通知到用户。若用户在本服务协议及各类规则变更后继续使用本网站服务的，视为用户已仔细认真阅读、充分理解并同意接受修改后的本服务协议及各类规则，且用户承诺遵守修改后的本服务协议及各类规则内容，并承担相应的义务和责任。若用户不同意修改后的本服务协议及各类规则内容，应立即停止使用本网站服务，本公司保留中止、终止或限制用户继续使用本网站服务的权利，但该等终止、中止或限制行为并不豁免用户在本网站已经进行的交易下所应承担的责任和义务。本公司不承担任何因此导致的法律责任。</p>\n" +
    "        <p class=\"text-left font16\">一. 本网站服务</p>\n" +
    "        <p class=\"text-left font16\">本网站为用户提供【信用咨询、评估、管理，促成用户与本网站其他用户达成交易的居间服务，还款管理等服务】，用户通过本网站居间服务与其他用户达成的所有交易项下资金的存放和移转均通过银行或第三方支付平台机构实现，本网站并不存放交易资金。</p>\n" +
    "        <p class=\"text-left font16\">二. 服务费用</p>\n" +
    "        <p class=\"text-left font16\">用户注册使用本网站服务，本公司有权向用户收取服务费用，具体服务费用以本网站公告或其他协议为准。用户承诺按照本服务协议约定向本网站支付服务费用，并同意本网站有权自其有关账户中直接扣划服务费用。用户通过本网站与其他方签订协议的，用户按照签署的协议约定向其他方支付费用。</p>\n" +
    "        <p class=\"text-left font16\">三. 使用限制</p>\n" +
    "        <p class=\"text-left font16\">1. 注册成为本网站用户必须满足如下主体资格条件：具有中华人民共和国（以下简称\"中国\"）国籍（不包括中国香港、澳门及台湾地区）、年龄在18周岁以上、具有完全民事行为能力的自然人。若不具备前述主体资格条件，请立即终止注册使用本网站服务.若违反前述规定注册使用本网站服务，本公司保留终止用户资格、追究用户或用户的监护人相关法律责任的权利。 </p>\n" +
    "        <p class=\"text-left font16\">2. 用户在注册使用本网站服务时应当根据本网站的要求提供自己的真实信息（包括但不限于真实姓名、联系电话、地址、电子邮箱等信息），并保证向本网站提供的各种信息和资料是真实、准确、完整、有效和合法的，复印件与原件一致。如用户向本网站提供的各项信息和资料发生变更，用户应当及时向本网站更新用户的信息和资料，如因用户未及时更新信息和资料导致本网站无法向用户提供服务或发生错误，由此产生的法律责任和后果由用户自己承担。如使用他人信息和文件注册使用本网站服务或向本网站提供的信息和资料不符合上述规定，由此引起的一切责任和后果均由用户本人全部承担，本公司及本网站不因此承担任何法律责任，如因此而给本公司及本网站造成损失，用户应当承担赔偿本公司及本网站损失的责任。 </p>\n" +
    "        <p class=\"text-left font16\">3. 成功注册为本网站用户后，用户应当妥善保管自己的用户名和密码，不得将用户名转让、赠与或授权给第三方使用。用户在此确认，使用其用户的用户名和密码登录本网站及由用户在本网站的用户账户下发出的一切指令均视为用户本人的行为和意思，该等指令不可逆转，由此产生的一切责任和后果由用户本人承担，本公司及本网站不承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 用户不得利用本网站从事任何违法违规活动，用户在此承诺合法使用本网站提供的服务，遵守中国现行法律、法规、规章、规范性文件以及本服务协议的约定。若用户违反上述规定，所产生的一切法律责任和后果与本公司和本网站无关，由用户自行承担，如因此给本公司和本网站造成损失的，由用户赔偿本公司和本网站的损失。本公司保留将用户违法违规行为及有关信息资料进行公示、计入用户信用档案、按照法律法规的规定提供的有关政府部门或按照有关协议约定提供给第三方的权利。 </p>\n" +
    "        <p class=\"text-left font16\">5. 如用户在本网站的某些行为或言论不合法、违反有关协议约定、侵犯本公司的利益等，本公司有权基于独立判断直接删除用户在本网站上作出的上述行为或言论，有权中止、终止、限制用户使用本网站服务，而无需通知用户，亦无需承担任何责任。如因此而给本公司及本网站造成损失的，应当赔偿本公司及本网站的损失。 </p>\n" +
    "        <p class=\"text-left font16\">四. 不保证条款</p>\n" +
    "        <p class=\"text-left font16\">本网站提供的服务中不含有任何明示、暗示的，对任何用户、任何交易的真实性、准确性、可靠性、有效性、完整性等的任何保证和承诺，用户需根据自身风险承受能力，衡量本网站披露的交易内容及交易对方的真实性、可靠性、有效性、完整性，用户因其选择使用本网站提供的服务、参与的交易等而产生的直接或间接损失均由用户自己承担，包括但不限于资金损失、利润损失、营业中断等。本公司及其股东、创始人、全体员工、代理人、关联公司、子公司、分公司均不对以上损失承担任何责任。</p>\n" +
    "        <p class=\"text-left font16\">五. 责任限制</p>\n" +
    "        <p class=\"text-left font16\">1. 基于互联网的特殊性，本公司无法保证本网站的服务不会中断，对于包括但不限于本公司、本网站及相关第三方的设备、系统存在缺陷，计算机发生故障、遭到病毒、黑客攻击或者发生地震、海啸等不可抗力而造成服务中断或因此给用户造成的损失，本公司不承担任何责任，有关损失由用户自己承担。 </p>\n" +
    "        <p class=\"text-left font16\">2. 本公司无义务监测本网站内容。用户对于本网站披露的信息、选择使用本网站提供的服务，选择参与交易等，应当自行判断真实性和承担风险，由此而产生的法律责任和后果由用户自己承担，本公司不承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">3. 与本公司合作的第三方机构向用户提供的服务由第三方机构自行负责，本公司不对此等服务承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本网站的内容可能涉及第三方所有的信息或第三方网站，该等信息或第三方网站的真实性、可靠性、有效性等由相关第三方负责，用户对该等信息或第三方网站自行判断并承担风险，与本网站和本公司无关。 </p>\n" +
    "        <p class=\"text-left font16\">5. 无论如何，本公司对用户承担的违约赔偿（如有）总额不超过向用户收取的服务费用总额。 </p>\n" +
    "        <p class=\"text-left font16\">六. 用户资料的使用与披露 </p>\n" +
    "        <p class=\"text-left font16\">1. 用户在此同意，对于用户提供的和本公司为提供本网站服务所需而自行收集的用户个人信息和资料，本公司有权按照本服务协议的约定进行使用或者披露。 </p>\n" +
    "        <p class=\"text-left font16\">2. 用户授权本公司基于履行有关协议、解决争议、调停纠纷、保障本网站用户交易安全的目的等使用用户的个人资料（包括但不限于用户自行提供的以及本公司信审行为所获取的其他资料）。本公司有权调查多个用户以识别问题或解决争议， 特别是本公司可审查用户的资料以区分使用多个用户名或别名的用户。 </p>\n" +
    "        <p class=\"text-left font16\">为避免用户通过本网站从事欺诈、非法或其他刑事犯罪活动，保护本网站及其正常用户合法权益，用户授权本公司可通过人工或自动程序对用户的个人资料进行评价和衡量。</p>\n" +
    "        <p class=\"text-left font16\">用户同意本公司可以使用用户的个人资料以改进本网站的推广和促销工作、分析网站的使用率、改善本网站的内容和产品推广形式，并使本网站内容、设计和服务更能符合用户的要求。这些使用能改善本网站的网页，以调整本网站网页使其更能符合用户的需求，从而使用户在使用本网站服务时得到更为顺利、有效、安全及度身订造的交易体验。</p>\n" +
    "        <p class=\"text-left font16\">用户在此同意允许本公司通过在本网站的某些网页上使用诸如\"Cookies\"的设置收集用户信息并进行分析研究，以为用户提供更好的量身服务。 </p>\n" +
    "        <p class=\"text-left font16\">3. 本公司有义务根据有关法律、法规、规章及其他政府规范性文件的要求向司法机关和政府部门提供用户的个人资料及交易信息。</p>\n" +
    "		<p class=\"text-left font16\">在用户未能按照与本公司签订的包括但不限于本服务协议或者与本网站其他用户签订的借款协议等其他法律文本的约定履行自己应尽的义务时，本公司有权将用户提供的及本公司自行收集的用户的个人信息、违约事实等通过网络、报刊、电视等方式对任何第三方披露，且本公司有权将用户提交或本公司自行收集的用户的个人资料和信息与任何第三方进行数据共享，以便对用户的其他申请进行审核等使用。由此而造成用户损失的，本公司不承担法律责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本公司采用行业标准惯例以保护用户的个人信息和资料，鉴于技术限制，本公司不能确保用户的全部私人通讯及其他个人资料不会通过本条款中未列明的途径泄露出去。 </p>\n" +
    "        <p class=\"text-left font16\">七. 知识产权保护条款</p>\n" +
    "        <p class=\"text-left font16\">1. 本网站中的所有内容均属于本公司所有,包括但不限于文本、数据、文章、设计、源代码、软件、图片、照片、音频、视频及其他全部信息。本网站内容受中国知识产权法律法规及各国际版权公约的保护。</p>\n" +
    "        <p class=\"text-left font16\">2. 未经本公司事先书面同意,用户承诺不以任何形式复制、模仿、传播、出版、公布、展示本网站内容,包括但不限于电子的、机械的、复印的、录音录像的方式和形式等。用户承认本网站内容是属于本公司的财产。</p>\n" +
    "        <p class=\"text-left font16\">3. 未经本公司书面同意,用户不得将本网站包含的资料等任何内容发布到任何其他网站或者服务器。任何未经授权对本网站内容的使用均属于违法行为,本公司有权追究用户的法律责任。</p>\n" +
    "        <p class=\"text-left font16\">八. 违约责任 </p>\n" +
    "        <p class=\"text-left font16\">如一方发生违约行为，守约方可以书面通知方式要求违约方在指定的时限内停止违约行为，并就违约行为造成的损失要求违约方进行赔偿。</p>\n" +
    "        <p class=\"text-left font16\">九. 法律适用及争议解决 </p>\n" +
    "        <p class=\"text-left font16\">1. 本服务协议的签订、效力、履行、终止、解释和争端解决受中国法律法规的管辖。 </p>\n" +
    "        <p class=\"text-left font16\">2. 因本服务协议发生任何争议或与本服务协议有关的争议，首先应由双方友好协商解决，协商不成的，任何一方有权将纠纷提交至本公司所在地有管辖权的人民法院诉讼解决。 </p>\n" +
    "        <p class=\"text-left font16\">十. 其他条款 </p>\n" +
    "        <p class=\"text-left font16\">1. 本服务协议自您同意勾选并成功注册为本网站用户之日起生效，除非本网站终止本服务协议或者用户丧失本网站用户资格，否则本服务协议始终有效。本服务协议终止并不免除用户根据本服务协议或其他有关协议、规则所应承担的义务和责任。 </p>\n" +
    "        <p class=\"text-left font16\">2. 本公司对于用户的违约行为放弃行使本服务协议规定的权利的，不得视为其对用户的其他违约行为放弃主张本服务协议项下的权利。 </p>\n" +
    "        <p class=\"text-left font16\">3. 本服务协议部分条款被认定为无效时，不影响本服务协议其他条款的效力。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本服务协议不涉及用户与本网站其他用户之间因网上交易而产生的法律关系及法律纠纷，但用户在此同意将全面接受和履行与本网站其他用户通过本网站签订的任何电子法律文本，并承诺按该法律文本享有和/或放弃相应的权利、承担和/或豁免相应的义务。 </p>\n" +
    "        <p class=\"text-left font16\">5. 本公司对本服务协议享有最终的解释权。 </p>\n" +
    "    </div>\n" +
    "    \n" +
    "   <div class=\"padt2\"></div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/friend.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/friend.html",
    "<div id=\"friend\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"onload\">\n" +
    "  	<div ng-if=\"status!=9\">\n" +
    "	  	<div class=\"row\">\n" +
    "	  		<ul class=\"nav nav-justified hb_tab\">\n" +
    "              <li class=\"active_2\"><a href=\"javascript:\">【{{nick}}】的红包</a></li>\n" +
    "              <li>\n" +
    "              	<a ng-click=\"myInfo()\">我的红包</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "	        <div class=\"col-xs-12 col-sm-12 col-md-12\">\n" +
    "	            <h3 class=\"text-left texp_1 mar0 pad0\">离红包停止长大还剩下:</h3>\n" +
    "	        </div>\n" +
    "	    </div>\n" +
    "	    <h1 class=\"countdown\"><span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分<span>{{sec|timefilter}}</span>秒</h1>\n" +
    "		<div class=\"mart1 zhz_bg\" id=\"hb-img\" ng-click=\"clickFriend()\">\n" +
    "	        <p class=\"lead\"><i>{{money|moneyfilter}}</i>元</p>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div ng-if=\"status==0\">\n" +
    "        <h3 class=\"color6\">长到{{next}}元即可领取&nbsp;还差{{need}}元</h3>\n" +
    "		<div class=\"row\">\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6\" ng-click=\"clickFriend()\">\n" +
    "		        <div class=\"hand_bg\"><img class=\"handanimate\" src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9.png?version=1\" alt=\"\"/></div>\n" +
    "		    </div>\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "		        <h3 class=\"text-left color6 mart2\">戳它</h3>\n" +
    "		        <h3 class=\"text-left color6 mar0\">掉了红包各分一半</h3>\n" +
    "		    </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"status==1\">\n" +
    "	  	<h3 class=\"text-center color6\">今天已经戳过啦，明天再来吧。</h3>\n" +
    "	    <div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "				<div class=\"marginC biaoq_1\"></div>\n" +
    "			</div>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==2\">\n" +
    "		<div class=\"borred\"></div>\n" +
    "		<h3 class=\"text-center color6\">矮油～你今天已经戳过好友太多次了，歇歇明天再来吧。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "		  		<div class=\"marginC biaoq_2\"></div>\n" +
    "		    </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==3\">\n" +
    "		<div class=\"borred\"></div>\n" +
    "		<h3 class=\"text-center color6\">Ta今天已经被戳过太多次了，明天再来吧。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "					<div class=\"marginC biaoq_3\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==4\">\n" +
    "		<div class=\"borred\"></div>\n" +
    "		<h3 class=\"text-center color6\">你的红包已经无法长大，不能继续戳好友了。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "					<div class=\"marginC biaoq_3\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"status==-1\">\n" +
    "	  <div ng-if=\"mystatus==1\">\n" +
    "	  	<div class=\"borred\"></div>\n" +
    "	        <h3 class=\"text-center color6\">你的红包已经长到<span>{{mymoney|moneyfilter}}</span>元</h3>\n" +
    "	        <h3 class=\"text-center color6\">还差<span>{{myneed|moneyfilter}}</span>元就可以领取了</h3>\n" +
    "	    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"myInfo()\">去看看</button>\n" +
    "	  </div>\n" +
    "	  <div ng-if=\"mystatus==-1\">\n" +
    "		  	<div class=\"borred\"></div>\n" +
    "	            <h3 class=\"text-center color6\">你也获得了一个神奇种子红包！</h3>\n" +
    "	        <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ui-sref=\"redenvelope.getSeed\">去领种子</button>\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==9\">\n" +
    "		<div class=\"row\">\n" +
    "	  		<ul class=\"nav nav-justified hb_tab\">\n" +
    "              	<li class=\"active_2\">\n" +
    "              		<a href=\"javascript:\">【{{nick}}】的红包</a>\n" +
    "              	</li>\n" +
    "              	<li>\n" +
    "              		<a ng-click=\"myInfo()\">我的红包</a>\n" +
    "              	</li>\n" +
    "            </ul>\n" +
    "	    </div>\n" +
    "		<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "		    <h4 class=\"tipetex\">【{{nick}}】的红包已经无法再长大了<a ng-click=\"redStop()\">?</a></h4>\n" +
    "		    \n" +
    "		    <div class=\"mart1 frd_bg\"></div>\n" +
    "		    \n" +
    "		    <div class=\"row mart2\">\n" +
    "		        <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "		            <div class=\"text-right\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png?version=1\" alt=\"\" /></div>\n" +
    "		        </div>\n" +
    "		        <div class=\"col-xs-7 col-sm-6 col-md-6\">\n" +
    "		            <h4 class=\"text-left color6\">共获得：<span class=\"corred\">{{money}}</span>元</h4>\n" +
    "		            <h4 class=\"text-left color6\">已领取：<span class=\"corred\">{{hasReceiveAmount}}</span>元</h4>\n" +
    "		            <h4 class=\"text-left color6\">还有<span class=\"corred\">{{money-hasReceiveAmount|moneyfilter}}</span>元待领取</h4>\n" +
    "		        </div>\n" +
    "		    </div>\n" +
    "		    <div class=\"mart2\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/Qr_code.png?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "		    \n" +
    "		    <h3 class=\"text-center color6\">关注多美贷，第一时间获取最新活动信息</h3>\n" +
    "		    \n" +
    "		    <div class=\"padt2\"></div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"row mart4\" ng-if=\"status!=9\">\n" +
    "	    <div class=\"col-xs-12 col-sm-12 col-md-12\">\n" +
    "	        <h3 class=\"text-right rules-sm\" ui-sref=\"redenvelope.rule\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png?version=1\" alt=\"\" /><a>规则说明</a></h3>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<!--好友成就-->\n" +
    "<div class=\"pub_window frd_cj\" style=\"display:none;top:2%;\">\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--我的成就-->\n" +
    "<div class=\"pub_window my_cj\" style=\"display:none;top:37%;\">\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<!--提示弹窗样式-->\n" +
    "<div class=\"pub_window tips_t\" style=\"display:none;top:25%;\">\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/getSeed.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/getSeed.html",
    "<div ng-if='onload'>\n" +
    "    <div class=\"list-group\">\n" +
    "        <h2 class=\"text-center padt1\">亲爱的<span>【{{usernick}}】</span>，恭喜你！</h2>\n" +
    "        <h2 class=\"text-center\">\n" +
    "          <span ng-if=\"status==0\">获得了：</span>\n" +
    "          <span ng-if=\"status==1\">已领取</span>一个神奇的种子红包\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "\n" +
    "    <div  class=\"hb_pic\">\n" +
    "        <div class=\"hb_bg\" ng-if=\"status==0\"></div>\n" +
    "        <div class=\"posit zhz_bg\" ng-if=\"status==1\">\n" +
    "            <p class=\"lead\"><i>{{money}}</i>元</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\" ng-if=\"status==0\">\n" +
    "            <button ng-click=\"getSeed()\" type=\"button\" class=\"btn btn-primary btn-lg btn-block mart3 lqbut-cor\">领取种子</button>\n" +
    "            <h3 class=\"text-center\">好友戳一下，种子就会长大哦</h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\" ng-if=\"status==1\">\n" +
    "            <h3 class=\"text-center mart2\">好友戳一下，种子就会长大哦</h3>\n" +
    "            <button ng-click=\"viewMyRev()\" type=\"button\" class=\"btn btn-primary btn-lg btn-block mart2 lqbut-cor\">让红包长大</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-12\" ui-sref=\"redenvelope.rule\">\n" +
    "            <h3 class=\"text-right rules-sm\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png?version=1\" alt=\"\" /><a>规则说明</a></h3>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"padb8\"></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>开门见喜</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">1</span>倍红包收益</h4>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/jabme.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/jabme.html",
    "<div id=\"jabme\">\n" +
    "  <div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"jabme.length==0\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "      <h2 class=\"text-center color6\">真可怜，还没人戳过你呢！</h2>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "  <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"jabme.length>0\">\n" +
    "    <h3 class=\"text-center color6\">他们戳了你，自己的红包也长大了！</h3>\n" +
    "      <div class=\"mart2\">\n" +
    "        <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_1.png?version=1\" width=\"165\" height=\"165\" alt=\"\">\n" +
    "      </div>\n" +
    "      <div class=\"row marginC\">\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "              <div class=\"panel panel-default bornone mart2\">\n" +
    "              <ul class=\"nav nav-justified\">\n" +
    "                <li class=\"{{tabClass}}\"><a ng-click=\"tabChange(0)\">他们戳了我</a></li>\n" +
    "                <li class=\"{{tabClass2}}\"><a ng-click=\"tabChange(1)\">今天还可以戳</a></li>\n" +
    "              </ul>\n" +
    "                <div class=\"panel-body\">\n" +
    "                  <ul class=\"list-group marginC\" ng-if=\"tabflag==0\">\n" +
    "                    <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.clicker_i_has_clicked=='true'}\" ng-repeat=\"item in jabme\">\n" +
    "                        <div class=\"row\" ui-sref=\"redenvelope.friend({friendId: item.clickerOpenid})\">\n" +
    "                          <div class=\"col-xs-5 col-sm-6 col-md-6 pad0\"><span>{{item.updateAt|timeLine}}</span></div>\n" +
    "                          <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><i class=\"pull-left titbg\"></i><span>【{{item.clickerNick}}】    +{{item.ownerGetAmount}}元</span></div>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                  <ul class=\"list-group marginC\" ng-if=\"tabflag==1\">\n" +
    "                    <li class=\"list-group-item lihg\" ng-repeat=\"item in canjab\"  ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                      <div class=\"row\">\n" +
    "                          <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><span>【{{item.nick}}】</span></div>\n" +
    "                      </div>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"canjab.length==0\" style=\"text-align:center;\">\n" +
    "                      今天没有好友可以戳了\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"fullbg\" class=\"share_tips\" style=\"display:none;\" ng-click=\"shareHide()\">弹窗遮罩层</div>\n" +
    "<div class=\"pub_window share_bg share_tips\" style=\"display:none;top:0%;right:0;\"></div>");
}]);

angular.module("modules/redenvelope/templates/myachivement.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myachivement.html",
    "<div id=\"myachivement\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "  <h2 class=\"text-center\">我的成就</h2>\n" +
    "  <div class=\"mart2\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_1.png?version=1\" width=\"165\" height=\"165\" alt=\"\">\n" +
    "  </div>\n" +
    "  <div class=\"row marginC\">\n" +
    "  <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div class=\"panel panel-default bornone mart2\">\n" +
    "      <ul class=\"nav nav-justified\">\n" +
    "        <li class=\"{{tabClass}}\" ng-click=\"tabChange(0);\"><a href=\"javascript:\">成长成就</a></li>\n" +
    "        <li class=\"{{tabClass2}}\" ng-click=\"tabChange(1);\"><a>红包成就</a></li>\n" +
    "      </ul>\n" +
    "      <div class=\"panel-tab\" ng-if=\"tab==0\">\n" +
    "        <div class=\"progress_all\">\n" +
    "          <div class=\"pull-left\"><h4 class=\"font16\">已达成</h4></div>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <div class=\"progress\">\n" +
    "              <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{times/3*100}}%;\">\n" +
    "                {{times}}/3\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix visible-xs-block\"></div>\n" +
    "        <ul class=\"list-cjul\">\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">1</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_1.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：领取种子红包</p>\n" +
    "            <p class=\"color6\">奖励：1个会长大的红包</p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==1||times==2||times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==0\" ui-sref=\"redenvelope.friend\">去达成</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">2</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_2.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：绑定账号</p>\n" +
    "            <p class=\"color6\">奖励：2倍戳红包收益</p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==2||times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==1\" ui-sref=\"redenvelope.regist\">去达成</div>\n" +
    "              <div class=\"no-yiling\" ng-if=\"times==0\">去达成</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">3</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_3.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：完成实名认证</p>\n" +
    "            <p class=\"color6\">奖励：3倍戳红包收益  </p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==2&&is_auth=='false'\" ui-sref=\"redenvelope.realname\">去达成</div>\n" +
    "              <div class=\"no-yiling\" ng-if=\"times==1\">去达成</div>\n" +
    "              <div class=\"no-yiling\" ng-if=\"times==2&&is_auth=='true'\">去达成</div>\n" +
    "            </div>\n" +
    "            <h3 class=\"text-center color6\">*该成就仅限微信新注册用户达成</h3>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <div class=\"hbcj-tab\" ng-if=\"tab==1\">\n" +
    "        <div class=\"progress_all\">\n" +
    "          <h4 class=\"font16\">\n" +
    "            红包：<span class=\"corred\">{{amount|moneyfilter}}</span>元\n" +
    "            已领取：<span class=\"corred\">{{recieveAmount|moneyfilter}}</span>元\n" +
    "          </h4>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"clearfix visible-xs-block\"></div>\n" +
    "\n" +
    "        <ul class=\"list-cjul\">\n" +
    "          <li ng-repeat=\"item in list\">\n" +
    "            <!-- 已领取 -->\n" +
    "            <div ng-if=\"item.receive_status==3\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount}}</span>元</h4>\n" +
    "                  <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                  <div class=\"progress\">\n" +
    "                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                      100%\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\"><div class=\"complete\">已领</div></div>\n" +
    "            </div>\n" +
    "            <!-- 未领取且可领取 -->\n" +
    "            <div ng-if=\"item.receive_status==2\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount}}</span>元</h4>\n" +
    "                <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                <div class=\"progress\">\n" +
    "                  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                    100%\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\">\n" +
    "                <div class=\"yiling\" ng-click=\"getCash($index,item.level)\">领取</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- 未领取且不可领取 -->\n" +
    "            <div ng-if=\"item.receive_status==0\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount|moneyfilter}}</span>元</h4>\n" +
    "                  <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                  <div class=\"progress\">\n" +
    "                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                      100%\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\"><div class=\"no-yiling\">领取</div></div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <!-- 未达到 -->\n" +
    "            <div ng-if=\"item.receive_status==1\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount|moneyfilter}}</span>元</h4>\n" +
    "                <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                <div class=\"progress\">\n" +
    "                  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{(amount-item.startAmount)/(item.endStartAmount-item.startAmount)*100}}%;\">\n" +
    "                  {{(amount-item.startAmount)/(item.endStartAmount-item.startAmount)*100|moneyfilter}}%\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\">\n" +
    "                <p class=\"cha-money\">还差{{item.endStartAmount-amount|moneyfilter}}元</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- 未达到且未知 -->\n" +
    "            <div ng-if=\"item.receive_status==4\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\">\n" +
    "              <span class=\"badge\">{{$index+1}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <h4 class=\"font16 text-left unknown\"><span class=\"corred\">？</span>元</h4>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <h4 class=\"tipetex pull-left text-left\" ng-if=\"inviteCode\" ng-click=\"showTips('#inviteWindow')\" style=\"width:60%;\"><span class=\"color6\">邀请码：</span>{{inviteCode}}<a>?</a></h4>\n" +
    "        <h4 class=\"tipetex pull-right text-right\" ng-click=\"showTips('#strategyWindow')\" style=\"width:40%;\"><span class=\"color6\">领红包攻略</span><a>?</a></h4>\n" +
    "      </div>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"moneyWindow\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    1、每位成功注册的用户都可以获得一个邀请码。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    2、将邀请代码告诉好友，好友注册时填写你的邀请码，你即可成好友推荐人。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    3、推荐人有机会获得推荐奖励，请关注多美贷后续活动。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"inviteWindow\" ng-click=\"hideTips('#inviteWindow')\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    1、每位成功注册的用户都可以获得一个邀请码。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    2、将邀请代码告诉好友，好友注册时填写你的邀请码，你即可成好友推荐人。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    3、推荐人有机会获得推荐奖励，请关注多美贷后续活动。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"strategyWindow\" ng-click=\"hideTips('#strategyWindow')\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    1、绑定账号的用户可以获得2倍红包收益（无论是戳好友，还是被好友戳，红包都是2倍哦）。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    2、完成实名认证的用户可以获得3倍红包收益（无论是戳好友，还是被好友戳，红包都是3倍哦）。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    3、戳红包获得的返利将在90天后收回，赶紧使用返利投资赚钱吧。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<!--提示弹窗样式-->\n" +
    "<div class=\"pub_window tips_t\" id=\"tipsWindow\" style=\"display:none;top:25%;\">\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/myinfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myinfo.html",
    "<div id=\"myinfo\"> \n" +
    "	<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==0\">\n" +
    "        <ul class=\"nav nav-justified hb_tab\"  ng-if=\"fromFriend\">\n" +
    "            <li>\n" +
    "                <a ui-sref=\"redenvelope.friend({friendId:friendOpenId})\">【{{friendNick}}】的红包</a>\n" +
    "            </li>\n" +
    "            <li class=\"active_2\"><a href=\"javascript:\">我的红包</a></li>\n" +
    "        </ul>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-12 col-md-12\">\n" +
    "                <h3 class=\"text-left texp_1 mar0 pad0\">离红包停止长大还剩下:</h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h1 class=\"countdown\"><span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分<span>{{sec|timefilter}}</span>秒</h1>\n" +
    "    	<div class=\"posit mart2 zhz_bg\">\n" +
    "            <p class=\"lead\"><i>{{money|moneyfilter}}</i>元</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3 class=\"color6\">还差{{need|moneyfilter}}元可达到关卡({{nextlevel}}/15) 可领取{{next|moneyfilter}}元红包</h3>\n" +
    "        <div class=\"borred\"></div>\n" +
    "        <h2 class=\"text-center color6\">红包长大方法</h2>\n" +
    "        <div class=\"row head_sm\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_n.png?version=1\" alt=\"\" />\n" +
    "            </div>\n" +
    "        	<div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"backred\"><a ng-click=\"jabMe()\">让好友来戳我</a></li>\n" +
    "                  <li class=\"backyellow\"><a ng-click=\"jabFriend()\">戳好友的红包</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h3 class=\"color6\" ng-if=\"level==1\"><a ui-sref=\"redenvelope.regist\">绑定账号</a>再戳红包，获得2倍收益！</h3>\n" +
    "        <h3 class=\"color6\" ng-if=\"level==2&&is_auth=='false'\"><a ui-sref=\"redenvelope.realname\">实名认证</a>再戳红包，获得3倍收益！</h3>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "            	<h3 class=\"text-left my-achievement\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_7.png?version=1\" alt=\"\" /><a ng-click=\"myAchieve()\">我的成就</a></h3>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "            	<h3 class=\"text-right rules-sm\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png?version=1\" alt=\"\" /><a ng-click=\"rule()\">规则说明</a></h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "	<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==1\">\n" +
    "        <ul class=\"nav nav-justified hb_tab\"  ng-if=\"fromFriend\">\n" +
    "            <li>\n" +
    "                <a ui-sref=\"redenvelope.friend({friendId:friendOpenId})\">【{{friendNick}}】的红包</a>\n" +
    "            </li>\n" +
    "            <li class=\"active_2\"><a href=\"javascript:\">我的红包</a></li>\n" +
    "        </ul>\n" +
    "        <h4 class=\"tipetex mart1\">红包已经停止长大了<a ng-click=\"redStop()\">?</a></h4>\n" +
    "        <h1 class=\"countdown font16 color6\">离红包消失还有：<span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分钟{{sec|timefilter}}</span>秒</h1>\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"getAchieve()\">领关卡红包</button>\n" +
    "        <h3 class=\"text-center color6 marb3\">您还有{{ach_amount}}元关卡红包未领取</h3>\n" +
    "        <div class=\"row head_sm\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_n.png?version=1\" alt=\"\" />\n" +
    "            </div>\n" +
    "        	<div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"backred\"><a ng-click=\"jabFriend()\">戳过我的好友</a></li>\n" +
    "                  <li class=\"backyellow\"><a ng-click=\"jabMe()\">我戳过的好友</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"mart4\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/Qr_code.png?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "        <h3 class=\"text-center color6\">关注多美贷，第一时间获取最新活动信息</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "  	<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==2\">\n" +
    "        <h4 class=\"tipetex mart2\">活动已经结束了！下次早点来吧！</h4>\n" +
    "        <div class=\"row mart2\">\n" +
    "            <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "                <div class=\"text-right\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png?version=1\" alt=\"\" /></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-7 col-sm-6 col-md-6\">\n" +
    "                <h4 class=\"text-left color6 mart2\">共获得：<span class=\"corred\">{{money}}</span>元！</h4>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <a href=\"http://www.duomeidai.com/borrowList.action\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我要投资</a>\n" +
    "        <h3 class=\"text-center color6\">用红包投资，获最高12%年化收益。</h3>\n" +
    "        <a href=\"http://www.duomeidai.com\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我的账户</a>\n" +
    "        <h3 class=\"text-center color6\">查看个人信息、红包、投资收益。</h3>\n" +
    "        <div class=\"mart2\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/Qr_code.png?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "        <h3 class=\"text-center color6\">关注多美贷，第一时间获取最新活动信息</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==9\">\n" +
    "    	<img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6_2.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "        <h3 class=\"text-center color6\">对不起，您已被限制参与</h3>\n" +
    "        <h3 class=\"text-center color6\">请联系客服电话：400-885-7027 处理</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/myjab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myjab.html",
    "<div id=\"myjab\">\n" +
    "  <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"myjab.length==0\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6_1.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "      <h2 class=\"text-center color6\">你还没有戳过任何一个人</h2>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"myjab.length>0\">\n" +
    "  <h3 class=\"text-center color6\">你戳了他们，自己的红包也长大了！</h3>\n" +
    "  <div class=\"mart2\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_1.png?version=1\" width=\"165\" height=\"165\" alt=\"\">\n" +
    "  </div>\n" +
    "  <div class=\"row marginC\">\n" +
    "    <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "        <div class=\"panel panel-default bornone mart2\">\n" +
    "          <ul class=\"nav nav-justified\">\n" +
    "            <li class=\"{{tabClass}}\"><a ng-click=\"tabChange(0)\">你戳了他们</a></li>\n" +
    "            <li class=\"{{tabClass2}}\"><a ng-click=\"tabChange(1)\">今天还可以戳</a></li>\n" +
    "          </ul>\n" +
    "          <div class=\"panel-body\">\n" +
    "            <ul class=\"list-group marginC\" ng-if=\"tabflag==0\">\n" +
    "              <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.owner_i_has_clicked=='true'}\" ng-repeat=\"item in myjab\">\n" +
    "                  <div class=\"row\" ui-sref=\"redenvelope.friend({friendId: item.ownerOpenid})\">\n" +
    "                    <div class=\"col-xs-5 col-sm-6 col-md-6 pad0\"><span>{{item.updateAt|timeLine}}</span></div>\n" +
    "                    <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><i class=\"pull-left titbg\"></i><span>【{{item.ownerNick}}】    +{{item.clickerGetAmount}}元</span></div>\n" +
    "                  </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <ul class=\"list-group marginC\" ng-if=\"tabflag==1\">\n" +
    "              <li class=\"list-group-item lihg\" ng-repeat=\"item in canjab\" ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                  <div class=\"row\">\n" +
    "                    <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><span>【{{item.nick}}】</span></div>\n" +
    "                  </div>\n" +
    "              </li>\n" +
    "              <li ng-if=\"canjab.length==0\" style=\"text-align:center;\">\n" +
    "                今天没有好友可以戳了\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"fullbg\" class=\"share_tips\" style=\"display:none;\" ng-click=\"shareHide()\">弹窗遮罩层</div>\n" +
    "<div class=\"pub_window share_bg share_tips\" style=\"display:none;top:0%;right:0;\"></div>");
}]);

angular.module("modules/redenvelope/templates/realname.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/realname.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h2 class=\"text-center\">验明正身</h2>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\">验明正身后才可以投资，</h3>\n" +
    "    <h3 class=\"font16 color6\">还有3倍红包收益</h3>\n" +
    "    \n" +
    "    <div class=\"mart2\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"realname\" ng-model=\"real.realname\" placeholder=\"真实姓名\" cs-focus autofocus required>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"idcard\" ng-model=\"real.idcard\" placeholder=\"身份证号码\" cs-focus autofocus required>\n" +
    "        </div>                    \n" +
    "    </div>\n" +
    "    \n" +
    "    <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ng-click=\"checkRealName()\">验名正身</button>\n" +
    "    <h3 class=\"color6\">您可以免费进行2次验明正身操作，</h3>\n" +
    "    <h3 class=\"color6 marb3\">第3次起需收取5元手续费，请慎重填写！</h3>\n" +
    "    \n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/regist.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/regist.html",
    "<div id=\"regist\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor_2\">\n" +
    "	<div class=\"img-circle\">\n" +
    "        <h2 class=\"text-center\">绑定您的多美贷账号</h2>\n" +
    "    </div>\n" +
    "    <div class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "        <h2>找到组织</h2>\n" +
    "        <h4 class=\"color6 padt1\">获得<span class=\"corred\">2</span>倍红包收益</h4>\n" +
    "    </div>\n" +
    "    <div class=\"register_tab\">\n" +
    "        <div class=\"row head_sm register_nav\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_2.png?version=1\" alt=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"{{tabClass}}\" ng-click=\"tabChange(0)\"><a>新用户注册</a></li>\n" +
    "                  <li class=\"{{tabClass2}}\" ng-click=\"tabChange(1)\"><a>已有账户</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!--新用户注册-->\n" +
    "        <form class=\"form-horizontal\" role=\"form\" ng-if=\"regtype==0\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"mobile\" ng-model=\"reg.mobile\" placeholder=\"手机号\">{{mobile}}\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-if=\"msgCount>2\">\n" +
    "                <input type=\"text\" class=\"form-control wid_2\" name=\"reg.imgcode\" ng-model=\"reg.imgcode\" placeholder=\"图形验证码\">\n" +
    "                <div class=\"btn btn-default img_code\" ng-click=\"imgCodeRefresh()\">\n" +
    "                    <img src=\"{{imgUrl}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control wid_3\" ng-model=\"reg.msgcode\" placeholder=\"验证码\">\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_voice\" ng-click=\"voiceCode(1)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=2\">语音</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==2\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_sms\" ng-click=\"msgCode(1)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=1\">短信</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==1\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"password\" class=\"form-control\" ng-model=\"reg.loginPwd\" placeholder=\"密码，6-14位\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"password\" class=\"form-control\" ng-model=\"reg.tradePwd\" placeholder=\"交易密码，6-14位\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"reg.nickName\" placeholder=\"昵称，2-10位，不能下划线开头\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"reg.randkey\" placeholder=\"推荐人手机号／邀请代码，如无可不填\">\n" +
    "            </div>\n" +
    "            <div class=\"regis_tip\">\n" +
    "            	<span ng-click=\"accessRadioClick()\" ng-class=\"{default:recieve}\">&radic;</span>\n" +
    "            	<h3 class=\"corwhite\">我已满18岁，已阅读并接受<a ui-sref=\"redenvelope.agreement\">《服务协议》</a></h3>\n" +
    "            </div>\n" +
    "            <button type=\"submit\" ng-click=\"singIn()\" ng-class=\"{default:!recieve}\" ng-disabled=\"!recieve\" class=\"btn btn-primary btn-lg btn-block but_zdy\">注册并绑定</button>\n" +
    "            <h3 class=\"corwhite marb3\">新用户注册成功，还可多获得15~95元返利</h3>\n" +
    "        </form>\n" +
    "        \n" +
    "        <!--已有账户-->\n" +
    "        <form class=\"form-horizontal\" role=\"form\" ng-if=\"regtype==1\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"bind.mobile\" placeholder=\"手机号\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-if=\"msgCount>2\">\n" +
    "                <input type=\"text\" class=\"form-control wid_2\" ng-model=\"bind.imgcode\" placeholder=\"图形验证码\">\n" +
    "                <div class=\"btn btn-default img_code\" ng-click=\"imgCodeRefresh()\">\n" +
    "                    <img src=\"{{imgUrl}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control wid_3\" ng-model=\"bind.msgcode\" placeholder=\"验证码\">\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_voice\" ng-click=\"voiceCode(2)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=2\">语音</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==2\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_sms\" ng-click=\"msgCode(2)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=1\">短信</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==1\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <button type=\"submit\" ng-click=\"bindUser()\" class=\"btn btn-primary btn-lg btn-block but_zdy\">绑定账号</button>\n" +
    "            <h3 class=\"corwhite marb3\">绑定账号，红包收益翻倍！</h3>\n" +
    "        </form>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/regsuccess.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/regsuccess.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h2 class=\"text-center\" ng-if=\"regtype!=3\">恭喜，成功绑定账户！</h2>\n" +
    "    <h2 class=\"text-center\" ng-if=\"regtype==3\">恭喜，实名认证成功！</h2>\n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==3\">可获得3倍红包收益</h3>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==1\"><span class=\"corred\">{{extra|moneyfilter}}</span>元注册返利</h3>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==1\">已进入你的返利余额账户</h3>\n" +
    "    \n" +
    "    <div class=\"mart2\">\n" +
    "      	<div class=\"marginC biaoq_1\"></div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <h3 class=\"color6\" ng-if=\"ach_amount>0\">您当前还有【{{ach_amount|moneyfilter}}】元的关卡红包未领取</h3>\n" +
    "    \n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ui-sref=\"redenvelope.myachivement({tab:1})\" ng-if=\"ach_amount>0\">点击领取</button>\n" +
    "    \n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==1||(regtype==2&&isauth=='false')\">尚未实名认证，完成实名认证可得3倍红包收益</h3>\n" +
    "    \n" +
    "    <button ui-sref=\"redenvelope.realname\" type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ng-if=\"regtype==1||(regtype==2&&isauth=='false')\">实名认证</button>\n" +
    "\n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==3\">已经获得了【{{money|moneyfilter}}】元收益，</h3>\n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==3\">下次戳红包会获得3倍收益</h3>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ui-sref=\"redenvelope.myinfo\" ng-if=\"regtype==3\">我的红包</button>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div id=\"zdzz\" class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>找到组织</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">2</span>倍红包收益</h4>\n" +
    "</div>\n" +
    "<div id=\"ymzs\" class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>验明正身</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">3</span>倍红包收益</h4>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/rule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/rule.html",
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "	<h2 class=\"text-center\">活动规则</h2>\n" +
    "	<div class=\"pad0\">\n" +
    "	    <p class=\"text-left font16\">1、参与活动的用户都可以获得1个会长大的种子红包。</p>\n" +
    "	    <p class=\"text-left font16\">2、把红包分享给好友，好友每天首次点击都可为红包增加金额，同时好友自己也可获得红包。\n" +
    "		</p>\n" +
    "	    <p class=\"text-left font16\">3、通过微信绑定账号，每次点击增加红包为普通红包的2倍。通过微信注册并完成实名认证，增加红包为普通红包的3倍。如果好友双方都通过微信注册且完成实名认证，增加红包为普通红包的5倍。\n" +
    "		</p>\n" +
    "	    <p class=\"text-left font16\">4、戳新用户奖励更高。</p>\n" +
    "	    <p class=\"text-left font16\">5、红包达到一定金额即可领取，领取的红包可在多美贷账户“返利余额”中查看，最高可达1000元。</p>\n" +
    "	    <p class=\"text-left font16\">6、红包自用户获得时起1周内有效，超过1周后将无法再增加金额。</p>\n" +
    "	    <p class=\"text-left font16\">7、红包失效2周后会消失，请在2周内领取。</p>\n" +
    "	    <p class=\"text-left font16\">8、本活动解释权归多美贷所有。</p>\n" +
    "	</div>\n" +
    "	<div class=\"mart2\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/Qr_code.png?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "	<div class=\"padt2\"></div>\n" +
    "</div>");
}]);
