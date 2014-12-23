/* global homeModule:true */

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