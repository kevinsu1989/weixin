/* global decorateModule:true */

// 显示装修进度 因为需分三段显示
decorateModule.directive('decorateProgress', ['$filter', '$state',
  function ($filter, $state) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/decorate/templates/decorate-progress.partial.html',
      scope: {
        stage: '@',
        items: '=',
        decorateId: '='
      },
      link: function (scope, element, attrs) {
        var section = {
          before: ['S10', 'S40'],
          process: ['S50', 'S50'],
          after: ['S60', 'S90']
        };

        var routers = {
          before: {
            'S10': '', // 已经申请等待装修供应商响应
            'S20': 'decorate.drawing', // 业主和装修供应商握手成功 -> 上传图纸
            'S30': '', // 已经上传图纸等待审核
            'S40': '' // 申请阶段全部完成
          },
          process: {
            'S40': 'decorate.confirm', // 申请流程完成后需现场确认签字
            'S50': '' // 装修中...
          },
          after: {
            'S50': 'decorate.acceptance', // 如果装修完成可以申请验收
            'S60': '', // 已申请验收待响应
            'S70': '', // 验收已响应待通过
            'S80': 'decorate.refund', // 已经验收等待退款
            'S90': '' // 退款完成
          }
        };

        scope.$watch('items', function (items) {
          if (angular.isArray(items) && items.length > 0) {

            // 仅显示需要的分组
            for (var i = 0; i < items.length; i++) {
              if (items[i].status === section[scope.stage][0]) {
                break;
              }
            }
            for (var j = items.length - 1; j >= 0; j--) {
              if (items[j].status === section[scope.stage][1]) {
                break;
              }
            }
            j = j + 1 || items.length; // 如果j = -1,j = length
            scope.group = items.slice(i, j);

            // 引导下一步
            var current = items[items.length - 1].status;
            if (current >= section[scope.stage][1]) {
              scope.action = '已办理';
              scope.muted = true;
            }
            else {
              scope.action = $filter('decorateGuide')(current, scope.stage);
            }
          }
        });

        scope.nextStep = function () {
          var myrange = section[scope.stage][1];
          var current = scope.items[scope.items.length - 1].status;
          var sref = routers[scope.stage][current];
          if (myrange > current && sref) {
            $state.go(sref, {
              decorateId: scope.decorateId
            });
          }
        };
      }
    };
  }
]);