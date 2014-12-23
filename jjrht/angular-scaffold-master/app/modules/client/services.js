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
				url: '/web/a/tuser/investlist',
				params: params,
				method: 'get'
			})
		},
		getLogList: function(params) {
			return $http({
				url: '/web/a/log/list',
				params: params,
				method: 'get'
			})
		},
		getBroker: function(params) {
			return $http({
				url: '/web/a/broker',
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
				method: 'get'
			})
		},
		queryOne: function(params) {
			return $http({
				url: '/web/a/tuser',
				params: params
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