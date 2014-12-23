brokersModule.factory('brokerService', function ($q,$http,serviceGenerator) {
  //var host="http://devinterface.duomeidai.com";

 return serviceGenerator().$actions({

    query: '/web/a/brokerlist',

    create: '/web/a/adduser',

    update: '/web/a/updateuser'

  }).$methods(['$q', '$http',
    function ($q, $http) {
      return {
        login: function (params) {
          return $http({
            url: '/a/login',
            params:params,
            method: 'post'
          });
        },
        logout: function (username, password, remember) {
          return $q.when({
            code: 200
          });
          // return $http({
          //   url: '/a/logout',
          //   params:params,
          //   method: 'post'
          // });
        },
        queryOne:function(params){
          return $http({
            url: '/web/a/tuser',
            params:params
          });
        },
        updateBroker:function(params){
          return $http({
            url: '/web/a/updatebrokerreserve',
            params:params
          });
        },
        thirdList:function(params){
          return $http({
            url:"/web/a/third/list",
            params:params
          })
        },
        thirdDetailList:function(params){
          return $http({
            url:"/web/a/third/detail",
            params:params
          })
        },
        getOneThird:function(params){
          return $http({
            url:"/web/a/third/query",
            params:params
          })
        },
        addBusiness:function(params){
          return $http({
            url:"/web/a/third/save",
            params:params,
            method:'post'
          })
        },
        editBusiness:function(params){
          return $http({
            url:"/web/a/third/update",
            params:params,
            method:'post'
          })
        }
      };
    }
  ]);
});

brokersModule.factory('msgService',['$modal', function ($modal) {
  return{
    messageBox:function(msg){
      $modal.open({
        templateUrl: 'config/templates/message.partial.html',
        controller: ['$scope',function (scop) {
          scop.title="消息";
          scop.message="<div style='color:red;width:100%;text-align:center;'>"+msg+"</div>";
          scop.confirm=function(){
            scop.$close();
          }
        }]
      });
    }
  }
}]);
 /*
  var host="";
  return {
    //经纪人列表搜索
    listSearch: function (params) {
      return $http({
        url: host+'/web/a/brokerlist',
        // url: '/brokers/member/list',
        method: 'get',
        cache: true,
        params:params
      });
    },
    //经纪人搜索
    brokerSearchByPhone: function (params) {
      return $http({
        url: host+'/web/a/tuser?callback=JSON_CALLBACK',
        //url: '/brokers/member/listSearch',
        method: 'get',
        cache: true,
        params:params
      });
    },
    //经纪人新增
    brokerAdd: function (params) {
      return $http({
        url: host+'/web/a/adduser?callback=JSON_CALLBACK',
        //url: '/brokers/member/listSearch',
        method: 'get',
        cache: true,
        params:params
      });
    },
    //经纪人编辑（离职）
    brokerEdit: function (params) {
      return $http({
        url: host+'/web/a/updateuser?callback=JSON_CALLBACK',
        //url: '/brokers/member/listSearch',
        method: 'JSONP',
        cache: true,
        params:params
      });
    },
    login: function (username, password, remember) {
      return $q.when({
        code: 200
      });
    }
  };
  */