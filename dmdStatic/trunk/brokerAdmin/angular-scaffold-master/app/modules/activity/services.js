activityModule.factory('activityService', function($http) {
	return {
    activityList: function(params) {
      return $http({
        url: '/web/a/activity/list',
        params: params,
        method: 'get'
      })
    },
    businessList: function(params) {
      return $http({
        url: '/web/a/business/list',
        params: params,
        method: 'get'
      })
    },
    awardList: function(params) {
      return $http({
        url: '/web/a/award/list',
        params: params,
        method: 'get'
      })
    },
    itemList: function(params) {
      return $http({
        url: '/web/a/prop/list',
        params: params,
        method: 'get'
      })
    },
    ticketList: function(params) {
      return $http({
        url: '/web/a/card/list',
        params: params,
        method: 'get'
      })
    },
    activityDetail:function(params) {
      return $http({
        url: '/web/a/activity/detail',
        params: params,
        method: 'get'
      })
    },
    activityEdit:function(params) {
      return $http({
        url: '/web/a/activity/edit',
        params: params,
        method: 'get'
      })
    },
    activityBanner:function(params) {
      return $http({
        url: '/web/a/activity/banner',
        params: params,
        method: 'get'
      })
    }
	}
});

activityModule.factory('msgService',['$modal', function ($modal) {
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