/*! weixin - v0.1.0 - 2014-12-22
* Copyright (c) 2014 lovemoon@yeah.net; Licensed GPLv2 */
// Initialize
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-growl', 'templates', 'brokerFrontModule']);

// bootstrap
angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
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
brokerFrontModule.controller('loginController', ['$scope', '$state', 'brokerFrontService', '$timeout',
  function($scope, $state, service, $timeout) {
    $scope.loginName = "13439504367";
    $scope.passWord = "123456";
    $scope.login = function() {
      var params = {};
      params["name"] = $scope.loginName;
      params["pwd"] = $scope.passWord;
      service.login(params).then(function(res) {
        $state.go("brokerfront.index");
      }, function(rej) {
        alert(rej.message);
      })
    }
  }
]);
/*首页*/
brokerFrontModule.controller('indexController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    service.getSta().then(function(res) {
      console.log(res);
      $scope.count = res.userReservedCount;
    })
  }
]);

/* 个人中心*/
brokerFrontModule.controller('userController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    

  }
]);

/*预约客户*/
brokerFrontModule.controller('inviteController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.name = "苏衎";
    $scope.mobile = "18511896430";
    $scope.invite = function() {
      var params = {};
      params["username"] = $scope.name;
      params["mobile"] = $scope.mobile;
      service.invite(params).then(function(res) {
        alert(res.message);
      },function(rej) {
        alert(rej.message);
      })
    }
  }
]);

/*预约列表*/
brokerFrontModule.controller('invitelistController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.type = "";
    var page = 1;
    $scope.invitelist = function(type) {
      $scope.type = type;
      var params = {};
      page = 1;
      params["page"] = 1;
      params["size"] = 10;
      params["status"] = type;
      service.reserveList(params).then(function(res) {
        $scope.list = res.list;
      });
    };
    $scope.getMore = function() {
      var params = {};
      page++;
      params["page"] = page;
      params["size"] = 10;
      params["status"] = $scope.type;
      service.reserveList(params).then(function(res) {
        $scope.list = res.list;
      });
    }
    $scope.invitelist('');
  }

]);
/*投资列表*/
brokerFrontModule.controller('investlistController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.mobile = "";
    $scope.InvestTimeBegin = "";
    $scope.InvestTimeEnd = "";
    $scope.page=1;
    var size=2;
    $scope.investList = function() {
      var params = {};
      page=1
      params["page"] = $scope.page;
      params["size"] = size;
      params["mobile"] = $scope.mobile;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      service.investList(params).then(function(res) {
        $scope.list=res.list;
        $scope.baseInfo=res;
        $scope.total=res.total/res.size;
      });
    }
    $scope.displayMore = function() {
      var params = {};
      page++;
      params["page"] = $scope.page;
      params["size"] = size;
      params["mobile"] = $scope.mobile;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      service.investList(params).then(function(res) {
        $scope.list=$scope.list.concat(res.list);
        $scope.total=res.total/res.size;
      });
    }



    $scope.choose=function (item) {
      $state.go("brokerfront.investdetail",{"id":item.userId,"name":item.realName,"mobile":item.cellPhone});
    }
    $scope.investList();
  }
]);
/*投资详情*/
brokerFrontModule.controller('investdetailController', ['$scope', '$state','$stateParams', 'brokerFrontService',
  function($scope, $state, $stateParams,service) {
    $scope.mobile = $stateParams.mobile;
    $scope.name = $stateParams.name;
    $scope.id = $stateParams.id;
    $scope.InvestTimeBegin = "";
    $scope.InvestTimeEnd = "";

    $scope.page=1;
    var size=2;
    var flag=false;
    $scope.detailList = function() {
      var params = {};
      $scope.page=1;
      params["page"] = $scope.page;
      params["size"] = size;    
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      if(flag){
        return;
      }
      flag=true;
      service.detailList(params,$scope.id).then(function(res) {
        flag=false;
        $scope.list=res.list;
        $scope.baseInfo=res;
        $scope.total=res.total/res.size;
      });
    }
    $scope.displayMore = function() {
      var params = {};
      $scope.page++;
      params["page"] = $scope.page;
      params["size"] = size;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      if(flag){
        return;
      }
      flag=true;
      service.detailList(params,$scope.id).then(function(res) {
        flag=false;
        $scope.list=$scope.list.concat(res.list);
        $scope.total=res.total/res.size;
      });
    }
    $scope.detailList();
  }
]);

brokerFrontModule.filter('timefilter', function () {
  return function (time) {
  	if(time*1<10){
  		time="0"+time;
  	}
    return time;
  };
});
brokerFrontModule.filter('moneyfilter', function () {
  return function (money) {
    return (money*1).toFixed(2);
  };
});
brokerFrontModule.filter('timeLine', function () {
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

brokerFrontModule.filter('invitefilter', function () {
  return function (type) {
    if(type==1){
      return "预约";
    }
    if(type==2){
      return "成功";
    }
    if(type==3){
      return "失败";
    }
  };
});
brokerFrontModule.factory('brokerFrontService', ['$http',
  function ($http) {
    //var path="http://peon.cn";
    var path="";
    return {
      login: function (params) {
        return $http({
          url: path+'/p/a/broker/login',
          method: 'post',
          params:params
        });
      },
      changePwd: function (params) {
        return $http({
          url: '/p/u/a/broker/changepwd',
          method: 'post',
          params:params
        });
      },
      getSta: function () {
        return $http({
          url: '/p/u/a/broker/statistics',
          method: 'get'
        });
      },
      addReserve: function (params) {
        return $http({
          url: '/p/u/a/broker/reserve/add',
          method: 'post',
          params:params
        });
      },
      investList: function (params) {
        return $http({
          url: '/p/u/a/broker/invest/list',
          method: 'get',
          params:params
        });
      },
      detailList: function (params,id) {
        return $http({
          url: '/p/u/a/broker/invest/detail/'+id,
          method: 'get',
          params:params
        });
      },
      staList: function (params) {
        return $http({
          url: '/p/u/a/broker/invest/statisticslist',
          method: 'post',
          params:params
        });
      },
      reserveList: function (params) {
        return $http({
          url: '/p/u/a/broker/reserve/list',
          method: 'get',
          params:params
        });
      },
      invite: function (params) {
        return $http({
          url: '/p/u/a/broker/reserve',
          method: 'post',
          data:params
        });
      }
    };
  }
]);

angular.module('templates', ['common/templates/layout.partials.html', 'modules/brokerfront/templates/index.html', 'modules/brokerfront/templates/invest.detail.html', 'modules/brokerfront/templates/invest.list.html', 'modules/brokerfront/templates/invite.html', 'modules/brokerfront/templates/invite.list.html', 'modules/brokerfront/templates/login.html', 'modules/brokerfront/templates/user.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<div ui-view class=\"bigbox\"></div>\n" +
    "<div id=\"errBox\">\n" +
    "	<div id=\"errBoxShadow\"></div>\n" +
    "	<div id=\"errBoxText\"></div>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/index.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"  ui-sref=\"brokerfront.login\"><span></span></div>\n" +
    "	<h5>首页</h5>\n" +
    "    <div class=\"set\" ui-sref=\"brokerfront.user\">\n" +
    "    	<span></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"textCenter yq_nub\">\n" +
    "	<p>\n" +
    "		<b>{{count}}</b>人\n" +
    "	</p>\n" +
    "	<div>累计邀请人数</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"textCenter\">\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.invite\">邀请客户</button>\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.invitelist\">查看邀请列表</button>\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.investlist\">查看投资列表</button>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/invest.detail.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invest.detail.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    <div class=\"fanhui\" ui-sref=\"brokerfront.investlist\"><span></span></div>\n" +
    "    <h5>客户投资详细</h5>\n" +
    "</div>\n" +
    "<div class=\"textCenter user_list\">\n" +
    "    <table width=\"90%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "        <tbody>\n" +
    "            <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "                <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <label>日期</label>\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeBegin\" class=\"ng-pristine ng-valid\">\n" +
    "                </th>\n" +
    "               <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <label>--</label>\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeEnd\" class=\"ng-pristine ng-valid\">\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "                <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    {{name}}\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    {{mobile}}\n" +
    "                </th>\n" +
    "               <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <button class=\"redButton  \" style=\"width:80%;height: 20px;line-height: 20px;\" ng-click=\"detailList()\">筛选</button>\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "        <tbody>\n" +
    "            <tr>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"20%\"><a ng-click=\"predicate = 'name'; reverse=!reverse\">ID</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"26%\"><a href=\"\" ng-click=\"predicate = 'mobile'; reverse=!reverse\">期限</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"24%\"><a href=\"\" ng-click=\"predicate = 'invest_at'; reverse=!reverse\">投资时间</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"14%\"><a href=\"\" ng-click=\"predicate = 'status'; reverse=!reverse\">投资金额</a>\n" +
    "\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"userInvest in list\" class=\"ng-scope\">\n" +
    "                <td><a href=\"http://www.duomeidai.com/borrowDetail.action?id={{userInvest.borrowId}}\" target=\"blank\"><span ng-bind=\"userInvest.borrowId\" class=\"ng-binding\"></span></a>\n" +
    "                </td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.deadline}}个月</td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.investTime}}</td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.investAmount}}</td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <a ng-if=\"total<=page\" style=\"padding-bottom: 35px;\" href=\"javascript:\" class=\"more ng-binding\" >木有更多投资啦</a>\n" +
    "    <a ng-if=\"total>page\" href=\"javascript:\" style=\"padding-bottom: 35px;\" class=\"more ng-binding\" ng-click=\"displayMore()\">点击加载更多</a>\n" +
    "	<div style=\"float: right; width: 100%; height: auto\">\n" +
    "		<div class=\"textCenter\" style=\"float: right; border-top: 3px; width: 100%; position: fixed; left: auto; right: auto; bottom: 10px; _position: absolute; _top: expression(document.documentElement.clientHeight +   document.documentElement.scrollTop -   this.offsetHeight);\">\n" +
    "			<span style=\"float: right; margin-right: 20px; display: block; font-weight: bold;\" class=\"ng-binding\">{{baseInfo.investCountS}}笔/{{baseInfo.investSumS}}元</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/invest.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invest.list.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    <div class=\"fanhui\"  ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "    <h5>投资列表</h5>\n" +
    "</div>\n" +
    "<div class=\"textCenter user_list\">\n" +
    "  <table width=\"90%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "    <tbody>\n" +
    "        <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "            <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label>日期</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeBegin\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "           <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label>--</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeEnd\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "            <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label style=\"width:18%\">手机</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input type=\"tel\" style=\"width:80%;height: 20px;line-height: 20px;\" name=\"mobile\" id=\"mobile\" ng-model=\"mobile\" placeholder=\"请输入客户手机号\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "           <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <!-- <input type=\"button\" style=\"width:80%;height: 20px;\" value=\"筛选 \" ng-click=\"search()\"> -->\n" +
    "                <button class=\"redButton\" style=\"width:80%;height: 20px;line-height: 20px;\" ng-click=\"investList()\">筛选</button>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "                   \n" +
    " <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "     <tbody>\n" +
    "         <tr>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"20%\"><a href=\"\" ng-click=\"predicate = 'name'; reverse=!reverse\">姓名</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"26%\"><a href=\"\" ng-click=\"predicate = 'mobile'; reverse=!reverse\">手机号</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"14%\"><a href=\"\" ng-click=\"predicate = 'status'; reverse=!reverse\">投资总金额</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"24%\"><a href=\"\" ng-click=\"predicate = 'invest_at'; reverse=!reverse\">投资总笔数</a>\n" +
    "\n" +
    "             </th>\n" +
    "         </tr>\n" +
    "         <tr ng-repeat=\"userInvest in list\" class=\"ng-scope\">\n" +
    "             <td><a ng-click=\"choose(userInvest)\"><span class=\"ng-binding\">{{userInvest.realName}}</span></a>\n" +
    "\n" +
    "             </td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.cellPhone}}</td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.investSum}}</td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.investCount}}</td>\n" +
    "         </tr>\n" +
    "     </tbody>\n" +
    " </table>\n" +
    "  <div>\n" +
    "    <a ng-if=\"total<=page\" style=\"padding-bottom: 35px;\" href=\"javascript:\" class=\"more ng-binding\" >木有更多投资啦</a>\n" +
    "    <a ng-if=\"total>page\" href=\"javascript:\" style=\"padding-bottom: 35px;\" class=\"more ng-binding\" ng-click=\"displayMore()\">点击加载更多</a>\n" +
    "	</div>\n" +
    "	<div style=\"float: right; width: 100%; height: auto\">\n" +
    "		<div class=\"textCenter\" style=\"float: right; border-top: 3px; width: 100%; position: fixed; left: auto; right: auto; bottom: 10px; _position: absolute; _top: expression(document.documentElement.clientHeight +   document.documentElement.scrollTop -   this.offsetHeight);\">\n" +
    "			<span style=\"float: right; margin-right: 20px; display: block; font-weight: bold;\" class=\"ng-binding\">{{baseInfo.investorCountS}}人/{{baseInfo.investCountS}}笔/{{baseInfo.investSumS}}元</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!-- \n" +
    "昨日：投资列表、预约列表需要修改                  \n" +
    "今日：首页累计邀请人数    和预约列表的修改 -->");
}]);

angular.module("modules/brokerfront/templates/invite.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invite.html",
    "<div id=\"ReserveApp\" class=\"ng-scope\">\n" +
    "	<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    	<div class=\"fanhui\"  ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "    	<h5>预约客户</h5>\n" +
    "        <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "    </div>\n" +
    "    <div class=\"textCenter logo_2\"></div>\n" +
    "	<ul class=\"nav autoSize\">\n" +
    "        <li><i></i><span>姓&nbsp;&nbsp;名：</span><input type=\"text\" class=\"input8 ng-pristine\" ng-model=\"name\" placeholder=\"请输入您要预约的客户姓名\" required=\"\" ng-maxlength=\"12\"></li>\n" +
    "		<li><i class=\"phone_bg\"></i><span>手&nbsp;&nbsp;机：</span><input type=\"tel\" class=\"input8 ng-pristine\" ng-model=\"mobile\"  ng-pattern=\"/^\\d+$/\" placeholder=\"请输入客户手机号\" required=\"\"></li>\n" +
    "	</ul>\n" +
    "	<div class=\"textCenter\"><button class=\"redButton autoSize editBt\" ng-click=\"invite()\">确认预约</button></div>\n" +
    "    \n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/invite.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invite.list.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "  	<div class=\"fanhui\" ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "  	<h5>预约列表</h5>\n" +
    "    <div class=\"add_user\" ui-sref=\"brokerfront.invite\"><span></span></div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"textCenter user_list\">\n" +
    "    <ul>\n" +
    "      <li ng-class=\"{this:type==''}\" ng-click=\"invitelist('')\" >全部</li>\n" +
    "      <li ng-class=\"{this:type==1}\" ng-click=\"invitelist(1)\" >预约</li>\n" +
    "      <li ng-class=\"{this:type==2}\" ng-click=\"invitelist(2)\" >成功</li>\n" +
    "      <li ng-class=\"{this:type==3}\" ng-click=\"invitelist(3)\" >失败</li>\n" +
    "    </ul>\n" +
    "    <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "      <tr>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"20%\">\n" +
    "          姓名</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"26%\">\n" +
    "          手机号</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"14%\">\n" +
    "          状态</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"24%\">\n" +
    "          操作时间</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"16%\" class=\"last\">\n" +
    "          剩余时间</th>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"userReserve in list\" class=\"ng-scope\">\n" +
    "        <td>{{userReserve.name}}</td>\n" +
    "        <td>{{userReserve.mobile}}</td>\n" +
    "        <td>{{userReserve.status|invitefilter}}</td>\n" +
    "        <td>{{userReserve.updateAt|date:'yyyy-MM-dd HH:mm'}}</td>\n" +
    "        <td>{{userReserve.deadline}}</td>\n" +
    "      </tr>\n" +
    "  </table>\n" +
    "    <a class=\"more ng-binding\" ng-click=\"displayMore()\">查看更多</a>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/login.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"><span></span></div>\n" +
    "	<h5>绑定账号</h5>\n" +
    "    <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "</div>\n" +
    "<div class=\"textCenter logo_1\"></div>\n" +
    "<ul class=\"nav autoSize\">\n" +
    "    <li><i></i><span>用户名：</span>\n" +
    "    	<input type=\"text\" ng-model=\"loginName\" class=\"input8 ng-valid-maxlength ng-dirty ng-valid ng-valid-required\" name=\"name\" id=\"name\" placeholder=\"请输入您的登录密码\" required ng-maxlength=\"12\"></li>\n" +
    "	<li><i class=\"pawodbg\"></i><span>密&nbsp;&nbsp;&nbsp;码：</span>\n" +
    "		<input type=\"password\"  ng-model=\"passWord\" class=\"input8 ng-vaild-maxlength ng-valid ng-valid-required\" name=\"pwd\" id=\"pwd\" ng-model=\"user.pwd\" placeholder=\"请输入密码，至少6位数\"required ng-maxlength=\"12\"></li>\n" +
    "</ul>\n" +
    "<div class=\"textCenter\">\n" +
    "	<button class=\"redButton autoSize editBt\" ng-click=\"login()\">确认绑定</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/user.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/user.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"><span></span></div>\n" +
    "	<h5>个人中心</h5>\n" +
    "    <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"textCenter user_hd\">\n" +
    "    <div class=\"head_bg\"><img src=\"images/user_head_mid.jpg\" /></div>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"nav autoSize\">\n" +
    "    <li><span class=\"user_infor\">用户名：</span><p class=\"input8 left\" ng-click=\"user()\">XXXX</p></li>\n" +
    "	<li><span class=\"user_infor\">姓名：</span><p class=\"input8 left\" ng-click=\"name()\">李**</p></li>\n" +
    "    <li><span class=\"user_infor\">手机号：</span><p class=\"input8 left\" ng-click=\"mobile()\">13234567890</p></li>\n" +
    "    <li><span class=\"paswd_xgbut\" ng-click=\"password()\">修改密码</span></li>\n" +
    "</ul>");
}]);
