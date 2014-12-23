/* global registerModule:true */

//注册绑定
registerModule.controller('registController', ['$scope', '$state', 'registerService',
  function ($scope, $state, service) {

    $scope.submit = function () {
      service.sendMobile().then(function () {
        $state.go('register.captcha');
      }, function () {
        // console.log(rej);
      });
    };

  }
]);

//实名认证
registerModule.controller('realnameController', ['$scope', '$state', '$timeout', 'registerService',
  function ($scope, $state, $timeout, service) {

    // $scope.submitText = '注册账号';

    $scope.submit = function () {
      $scope.processing = true;
      service.sendCaptcha().then(function () {
        $state.go('register.success');
      }, function () {
        $scope.message = '验证码输入有误，请重新输入！';
      })['finally'](function () {
        $scope.submitText = '重新验证';
        $scope.processing = false;
      });
    };

    var timer = null;

    // 重置计时器
    var recycle = function () {
      $timeout.cancel(timer);
      $scope.resend = false;
      $scope.remaining = 5;
      countdown();
    };

    // 倒计时
    var countdown = function () {
      timer = $timeout(function () {
        $scope.remaining -= 1;
        if ($scope.remaining === 0) {
          $scope.resend = true;
        }
        else {
          countdown();
        }
      }, 1000);
    };

    // 开始自动执行
    recycle();

    $scope.refresh = function () {
      service.sendFresh().then(function () {
        recycle();
      });
    };

    // 清理工作
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

  }
]);

// 注册成功
registerModule.controller('successController', ['$scope', '$state', 'registerService',
  function ($scope, $state, service) {

  }
]);