activityModule.factory('activityService', function($http) {
	return {
    activityList: function(params) {
      return $http({
        url: '/web/a/activity',
        params: params,
        method: 'get'
      })
    },
    activityDetail:function(params) {
      return $http({
        url: '/web/a/tblActivity/'+params.id,
        method: 'get'
      })
    },
    activityEdit:function(params,method) {
      return $http({
        url: '/web/a/tblActivity'+(params.id?"/"+params.id:""),
        params: params,
        method: method
      })
    },
    activityBanner:function(params) {
      return $http({
        url: '/web/a/activity/banner',
        params: params,
        method: 'get'
      })
    },
    activityStatus:function(params) {
      return $http({
        url: '/web/a/activity/'+params.id,
        params: params,
        method: 'put'
      })
    },
    awardList: function(params) {
      return $http({
        url: '/web/c/tblActivityWinnerItem',
        params: params,
        method: 'get'
      })
    },
    awardMark:function(params) {
      return $http({
        url: '/web/a/award',
        data: params,
        method: 'post'
      })
    },
    awardExcel:function(params) {
      return $http({
        url: '/web/a/award',
        data: params,
        method: 'post'
      })
    },
    awardSel:function(params) {
      return $http({
        url: '/web/a/tblActivityAward/list',
        params: params,
        method: 'get'
      })
    },
    awardGive:function(params) {
      return $http({
        url: '/web/c/tblActivityWinnerItem/lottery',
        data: params,
        method: 'post'
      })
    },
    awardMobile:function(params) {
      return $http({
        url: '/web/c/tblActivityWinnerItem/lottery/'+params.mobile,
        method: 'get'
      })
    },
    businessList: function(params) {
      return $http({
        url: '/web/a/tblBusinessPartner/list',
        params: params,
        method: 'get'
      })
    },
    itemList: function(params) {
      return $http({
        url: '/web/a/tblBusinessPartnerGoods/list',
        params: params,
        method: 'get'
      })
    },
    ticketList: function(params) {
      return $http({
        url: '/web/a/tblCard/list',
        params: params,
        method: 'get'
      })
    },

    businessOne: function(params,method) {
      return $http({
        url: '/web/a/tblBusinessPartner'+(params.id?"/"+params.id:""),
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
      })
    },
    itemOne: function(params,method) {
      return $http({
        url: '/web/a/tblBusinessPartnerGoods'+(params.id?"/"+params.id:""),
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
      })
    },
    ticketOne: function(params,method) {
      return $http({
        url: '/web/a/tblCard'+(params.id?"/"+params.id:""),
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
      })
    },
    businessGroup: function(params,method) {
      return $http({
        url: '/web/a/tblBusinessPartner/batch',
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
      })
    },
    itemGroup: function(params,method) {
      return $http({
        url: '/web/a/tblBusinessPartnerGoods/batch',
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
      })
    },
    ticketGroup: function(params,method) {
      return $http({
        url: '/web/a/tblCard/batch',
        method: method,
        params: (method=="post")?"":params,
        data:(method=="post")?params:""
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

activityModule.factory('selectService',function () {
  return{
    selectAll:function(arr,select){
      if(arr.length==0){
        return arr;
      }
      for(var i=0,len=arr.length;i<len;i++){
        arr[i].selected=select;
      }
      return arr;
    },
    getSelected:function(arr,select){
      var _arr=[];
      for(var i=0,len=arr.length;i<len;i++){
        if(arr[i].selected){
          _arr.push(arr[i]);
        }
      }
      return _arr;
    },
    init:function(arr){
      if(arr.length==0){
        return arr;
      }
      for(var i=0,len=arr.length;i<len;i++){
        arr[i].selected=false;
      }
      return arr;
    }
  }
});