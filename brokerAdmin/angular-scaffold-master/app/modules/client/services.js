clientModule.factory('clientService', function($http) {
	return {
		getClientList: function(params) {
			return $http({
				url: '/web/a/tuser/list',
				params: params,
				method: 'get'
			})
		},
		getInvestList: function(params) {
			return $http({
				url: '/web/a/tuser/invest/detail/'+params.tUserId,
				params: params,
				method: 'get'
			})
		},
		getLogList: function(params) {
			return $http({
				url: '/web/a/log/list/'+params.tUserId,
				params: params,
				method: 'get'
			})
		},
		getBroker: function(params) {
			return $http({
				url: '/web/a/broker/detail',
				params: params,
				method: 'get'
			})
		},
		updateBroker: function(params) {
			return $http({
				url: '/web/a/tuser/updatebroker',
				params: params,
				method: 'post'
			})
		},
		delBroker: function(params) {
			return $http({
				url: '/web/a/tuser/delbroker',
				params: params,
				method: 'post'
			})
		},
		queryOne: function(params) {
			return $http({
				url: '/web/a/tuser/broker/detail',
				params: params,
				method:'get'
			});
		}
	}
});

clientModule.factory('msgService',['$modal', function ($modal) {
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


clientModule.factory('envService',function () {
  return{
    getEnv:function(){
    	if(location.hostname.indexOf('dev')!=-1){
    		return 'dev';
    	}
    	else if(location.hostname.indexOf('test')!=-1){
    		return 'test';
    	}
    	else{
    		return 'www';
    	}
    }
  }
});