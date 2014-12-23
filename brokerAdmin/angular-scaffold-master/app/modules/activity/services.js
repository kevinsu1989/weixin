activityModule.factory('activityService', function($http) {
	return {
		getClientList: function(params) {
			return $http({
				url: '/web/a/tuser/list',
				params: params,
				method: 'get'
			})
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