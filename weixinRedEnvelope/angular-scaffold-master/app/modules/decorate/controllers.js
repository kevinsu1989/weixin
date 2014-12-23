/* global decorateModule:true */

// 列出房产列表
decorateModule.controller('housesController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {
    // 请求房子
    service.getHouses().then(function (res) {
      // 根据房子的小区分组
      var groups = {};
      for (var i = 0; i < res.houses.length; i++) {
        var house = res.houses[i];
        if (!groups[house.community]) {
          groups[house.community] = [];
        }
        groups[house.community].push(house);
      }

      $scope.groups = groups;
    }, function () {});

  }
]);

// 发起装修流程
decorateModule.controller('invitationController', ['$scope', '$state', '$stateParams', '$q', 'decorateService',
  function ($scope, $state, $params, $q, service) {
    $q.all([service.getHouse($params.houseId), service.getProviders()]).then(function (list) {
      // 赋值房产信息和供应商信息
      $scope.house = list[0].house;
      $scope.providers = list[1].providers;

      // 提交表单处理
      $scope.submitRequest = function () {
        service.sendInvitation($scope.house.id, $scope.provider.id, $scope.date).then(function (res) {
          $state.go('decorate.notice.initiate', {
            decorateId: res.decorateId
          });
        }, function () {});
      };
    }, function () {});
  }
]);

// 查看装修进度
decorateModule.controller('progressController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    service.getProgress($params.decorateId).then(function (res) {
      $scope.progress = res.progress;
      $scope.decorateId = $params.decorateId;
    }, function () {});
  }
]);

// 查看备案说明
decorateModule.controller('referenceController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {
    // TODO
  }
]);

// 查看装修历史
decorateModule.controller('historyController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {
    service.getHistory().then(function (res) {
      $scope.decorates = res.decorates;
    }, function () {});
  }
]);

// 上传图纸界面
decorateModule.controller('drawingController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    $scope.manualSubmit = function () {
      service.sendManualSubmit().then(function () {
        $state.go('decorate.notice.drawing', {
          decorateId: $params.decorateId
        });
      }, function () {});
    };
  }
]);

// 通用通知
decorateModule.controller('noticeController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    service.getDecorate($params.decorateId).then(function (res) {
      $scope.decorate = res.decorate;
    }, function () {});
  }
]);

// 三方现场进行装修确认
decorateModule.controller('confirmController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    $scope.total = 0;

    service.getCharge($params.decorateId).then(function (res) {
      $scope.charge = res.charge;
      angular.forEach($scope.charge.deposit, function (item) {
        $scope.total += item.money;
      });
      angular.forEach($scope.charge.expense, function (item) {
        $scope.total += item.money;
      });
    }, function () {});
  }
]);

// 验收房产
decorateModule.controller('acceptanceController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    $scope.submitVerify = function () {
      service.sendVerify($params.decorateId).then(function (res) {
        $state.go('decorate.notice.acceptance', {
          decorateId: $params.decorateId
        });
      }, function () {});
    };
  }
]);

// 申请退款
decorateModule.controller('refundController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {

    $scope.repay = 0;

    service.getCharge($params.decorateId).then(function (res) {
      $scope.charge = res.charge;
      angular.forEach($scope.charge.deposit, function (item) {
        $scope.repay += item.money;
      });
    }, function () {});

    $scope.submitRefund = function () {
      service.sendRefund($params.decorateId).then(function (res) {
        $state.go('decorate.notice.refund', {
          decorateId: $params.decorateId
        });
      }, function () {});
    };
  }
]);