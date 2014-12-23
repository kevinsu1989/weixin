/*! weixin - v0.1.0 - 2014-11-11
* Copyright (c) 2014 lovemoon@yeah.net; Licensed GPLv2 */
// Initialize
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-growl', 'templates', 'homeModule', 'registerModule', 'decorateModule']);

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
              return [0, 200].indexOf(res.code) !== -1 ? res.data : $q.reject(res.data);
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
// define module
var registerModule = angular.module('registerModule', ['ui.router', 'ui.bootstrap']);

// config router
registerModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("/register", "/register/mobile");

    $stateProvider
      .state('register', {
        abstract: true,
        url: "/register",
        templateUrl: "modules/register/templates/register.html"
      })
      .state('register.mobile', {
        url: "/mobile",
        controller: 'mobileController',
        templateUrl: "modules/register/templates/mobile.html"
      })
      .state('register.captcha', {
        url: "/verify",
        controller: 'captchaController',
        templateUrl: "modules/register/templates/captcha.html"
      })
      .state('register.success', {
        url: "/success",
        controller: 'successController',
        templateUrl: "modules/register/templates/success.html"
      });
  }
]);
// 输入手机
homeModule.controller('homeController', ['$scope', '$state', 'homeService', '$timeout',
  function ($scope, $state, service, $timeout) {

    // 请求分类
    service.getCatagory().then(function (res) {
      $scope.catagory = res.catagory;
    }, function () {
      //
    });

  }
]);

homeModule.controller('configController', ['$scope', '$state', 'homeService', '$timeout',
  function ($scope, $state, service, $timeout) {
    service.getModules().then(function (res) {
      $scope.installed = res.installed;
      $scope.uninstalled = res.uninstalled;

      $scope.install = function (item) {
        $scope.installed.push(item);
        $scope.uninstalled.splice($scope.uninstalled.indexOf(item), 1);
      };

      $scope.uninstall = function (item) {
        $scope.uninstalled.push(item);
        $scope.installed.splice($scope.installed.indexOf(item), 1);
      };
    }, function () {
      //
    });
  }
]);


homeModule.factory('homeService', ['$http',
  function ($http) {

    return {

      getCatagory: function () {
        return $http({
          url: 'interface/home/catagory.json',
          method: 'get',
          cache: true
        });
      },

      getModules: function () {
        return $http({
          url: 'interface/home/modules.json',
          method: 'get',
          cache: true
        });
      }

    };
  }
]);
angular.module('templates', ['common/templates/layout.partials.html', 'modules/home/templates/config.html', 'modules/home/templates/home.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<div ui-view></div>");
}]);

angular.module("modules/home/templates/config.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/config.html",
    "<div id=\"config\">\n" +
    "  <div id=\"content\">\n" +
    "    <ul class=\"list list-unstyled text-right\">\n" +
    "      <li class=\"clearfix\" ng-repeat=\"item in installed\" ng-click=\"uninstall(item)\">\n" +
    "        <span class=\"pull-left\">{{ item.name }}</span>\n" +
    "        <span class=\"fa fa-minus-circle fa-lg text-danger\"></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"adds small\" ng-if=\"!(uninstalled|empty)\">您还可以添加以下应用：</div>\n" +
    "    <ul class=\"list list-unstyled text-right\">\n" +
    "      <li class=\"clearfix\" ng-repeat=\"item in uninstalled\" ng-click=\"install(item)\">\n" +
    "        <span class=\"pull-left\">{{ item.name }}</span>\n" +
    "        <span class=\"fa fa-plus-circle fa-lg text-success\"></span>        \n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/home/templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/home.html",
    "<div id=\"home\">\n" +
    "  <header id=\"header\">\n" +
    "    <a href=\"\" class=\"comunity clearfix\">\n" +
    "      <span class=\"pull-left title\">\n" +
    "        <i class=\"fa fa-map-marker\"></i> 北京 龙湖社区        \n" +
    "      </span>\n" +
    "      <span class=\"pull-right indicate\">\n" +
    "        <i class=\"fa fa-angle-right\"></i>  \n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </header>\n" +
    "  <div id=\"content\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\" ng-repeat=\"items in catagory|group:3\">\n" +
    "        <div class=\"col-xs-4 col-sm-4\" ng-repeat=\"item in items\">\n" +
    "          <a class=\"cell metro_{{ (($parent.$index + 1) * 3 + $index) % 10 }}\" ui-sref=\"{{ item.sref }}\" ng-class=\"{plus:item.name === 'plus'}\" cs-square>\n" +
    "            <i class=\"badge\" ng-if=\"item.notify\">{{ item.notify }}</i>\n" +
    "            <i class=\"fa fa-plus\" ng-if=\"item.name === 'plus'\"></i>\n" +
    "            <i class=\"fa fa-pied-piper-alt\" ng-if=\"item.name !== 'plus'\"></i>\n" +
    "            <span class=\"category\" ng-if=\"item.name !== 'plus'\">{{ item.name }}</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
