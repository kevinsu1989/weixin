//活动列表
activityModule.controller('actlistController', ['$scope', '$state', 'activityService',
	function($scope, $state, service) {
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["size"] = 10;
			params["activityName"] = $stateParams.activityName;
			$scope.processing = true;
			$scope.loading = true;
			service.activityList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = res.list;
				$scope.total = res.total;
				$scope.size = res.size;
			});
		};
	}
]);


//活动新增／编辑
activityModule.controller('acteditController', ['$scope', '$state','$stateParams','$modal', 'activityService',
	function($scope, $state,$stateParams,$modal, service) {
		var id=$stateParams.id;
		$scope.isEdit=true;
		$scope.started=true;
		$scope.activity={};
		if(id!=-1){
			$scope.isEdit=false;
			var params={"id":id};
			// service.activityDetail(params).then(function(res) {
			// 	// body...
					// if(new Date()>res.startAt){
					// 	$scope.started=true;
					// }
			// })
		}
		$scope.addAward=function(argument) {
			$modal.open({
				templateUrl:'modules/activity/templates/activity.edit.rule.html',
				controller:['$scope',function(scope) {
					// body...
					scope.award={};

					scope.confirm=function(){

					}
				}]
			})
		}
		$scope.save=function(){

		}
		$scope.preview=function(){

		}
		$scope.editAward=function(index){
			$modal.open({
				templateUrl:'modules/activity/templates/activity.edit.rule.html',
				controller:['$scope',function(scope) {
					// body...

					scope.award=$scope.activity[index];

					scope.confirm=function(){

					}
				}]
			})
		}
		$scope.deleteAward=function(index) {
			// body...
			if($scope.started){
				alert('活动已开始，无法删除奖品');
			}else{
				$scope.award.splice(index,1);
			}
		}
		$scope.quit=function() {
			if(id==-1){
				$state.go("activity.actlist");
			}else{
				$scope.isEdit=false;
			}
		}
		$scope.back=function(){
			$state.go("activity.actlist");
		}
		$scope.edit=function() {
			$scope.isEdit=true;
		}
	}
]);

//中奖管理
activityModule.controller('awardlistController', ['$scope', '$state', 'activityService',
	function($scope, $state, service) {

	}
]);

//商户管理
activityModule.controller('busilistController',  ['$scope', '$state','$stateParams','$modal', 'activityService',
	function($scope, $state,$stateParams,$modal, service) {

		$scope.add=function(argument) {
			$modal.open({
				templateUrl:'modules/activity/templates/business.edit.html',
				controller:['$scope',function($scope) {
					// body...
				}]
			})
		}
	}
]);

//道具管理
activityModule.controller('itemlistController', ['$scope', '$state','$stateParams','$modal', 'activityService',
	function($scope, $state,$stateParams,$modal, service) {

		$scope.add=function(argument) {
			$modal.open({
				templateUrl:'modules/activity/templates/item.edit.html',
				controller:['$scope',function($scope) {
					// body...
				}]
			})
		}
	}
]);

//卡券管理
activityModule.controller('ticketlistController', ['$scope', '$state','$stateParams','$modal', 'activityService',
	function($scope, $state,$stateParams,$modal, service) {

		$scope.add=function(argument) {
			$modal.open({
				templateUrl:'modules/activity/templates/ticket.edit.html',
				controller:['$scope',function($scope) {
					// body...
				}]
			})
		}
	}
]);