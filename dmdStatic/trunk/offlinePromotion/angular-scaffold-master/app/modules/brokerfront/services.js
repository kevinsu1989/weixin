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
      }
    };
  }
]);
