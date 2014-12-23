/* global homeModule:true */

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
