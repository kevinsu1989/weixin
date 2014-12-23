clientModule.controller('listController', ['$scope', '$state', 'clientService',
	function($scope, $state, service) {
		$scope.page = 1;
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["size"] = 10;
			params["id"] = $scope.id;
			params["name"] = $scope.name;
			params["phone"] = $scope.phone;
			params["type"] = $scope.type;
			params["isInvest"] = $scope.isInvest;
			params["investerName"] = $scope.investerName;
			if ($scope.dts) {
				params["registerBegin"] = new Date($scope.registerBegin.getFullYear() + "/" + ($scope.registerBegin.getMonth() + 1) + "/" + $scope.registerBegin.getDate()) * 1;
			}
			if ($scope.dte) {
				params["registerEnd"] = new Date($scope.registerEnd.getFullYear() + "/" + ($scope.registerEnd.getMonth() + 1) + "/" + ($scope.registerEnd.getDate() + 1)) * 1;
			}
			$scope.processing = true;
			$scope.loading = true;
			service.getClientList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = res.list;
				$scope.total = res.total;
				$scope.size = res.size;
			});
		};

		$scope.clear = function() {
			$scope.id = "";
			$scope.name = "";
			$scope.phone = "";
			$scope.investerName = "";
			$scope.registerBegin = "";
			$scope.registerEnd = "";
			$scope.type = "";
			$scope.isInvest = "";
		};


		$scope.goDetail = function(id) {
			$state.go('client.invest', {
				'id': id
			})
		}
		$scope.dateOpen = function($event, type) {
			$event.preventDefault();
			$event.stopPropagation();
			if (type === 1) {
				$scope.opened = true;
				$scope.opened2 = false;
			} else if (type === 2) {
				$scope.opened = false;
				$scope.opened2 = true;
			}
		};
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
		$scope.maxDate = new Date();
		$scope.search();
	}
]);

clientModule.controller('investController', ['$scope', '$state', '$stateParams', 'msgService',
	'clientService',
	function($scope, $state, $stateParams, msgService, service) {
		var params = {};
		params["id"] = $stateParams.id;
		service.getInvestList(params).then(function(res) {
			$scope.userInfo = res;
		});
		$scope.page = 1;
		$scope.detailType = 1;
		$scope.search = function() {
			var params = {};
			params["page"] = $scope.page;
			params["size"] = 10;
			params["id"] = $stateParams.id;
			if ($scope.detailType == 1) {
				service.getInvestList(params).then(function(res) {
					$scope.list = res;
				});
			} else if ($scope.detailType == 2) {
				service.getLogList(params).then(function(res) {
					$scope.list = res;
				});
			}
		}
		$scope.tabChange = function(type) {
			$scope.detailType = type;
			search();
		}
		$scope.delete = function() {
			var params={};
			params["tuserId"]=$scope.userInfo.tuserId;
			params["investerId"]=$scope.userInfo.investerId;
			service.delBroker().then(function(res){

			});
		}
		$scope.edit = function(type) {
			$modal.open({
				templateUrl: 'modules/client/templates/change.html',
				controller: ['$scope',
					function(scope) {
						scope.search = function() {
							if ($("#add-phone").val().length != 11) {
								msgService.messageBox("请输入正确的手机号！");
								return;
							}
							var params = {};
							params["mobilePhone"] = $("#add-phone").val();
							scope.processing = true;
							service.queryOne(params).then(function(res) {
								scope.processing = false;
								if (res.TUser == "") {
									msgService.messageBox("该用户不存在（请先在前端注册并实名认证）");
								}
								scope.entity = res.TUser;
							});
						};
						scope.confirm = function() {
							if (!scope.entity["name"]) {
								msgService.messageBox("请先在前端实名认证！");
								return;
							}
							var params = {};
							if (scope.entity.id) {
								params["tuserid"] = scope.entity.id;
								params["isHired"] = 0;
								params["brokerType"] = ($("#rad-status").val() == "") ? "0" : $("#rad-status").val();
								scope.processing = true;
								service.updateBroker(params).then(function(res) {
									scope.processing = false;
									if (typeof(res) == "string") {
										msgService.messageBox(res);
										scope.entity = {};
										$("#add-phone").val("");
									} else {
										msgService.messageBox("添加成功！");
										params = {};
										console.log(res);
										params["userId"] = res.user.id;
										service.updateBroker(params);
										$scope.search();
										scope.$close();
									}
								});
							} else {
								msgService.messageBox("请先查询后再添加人员！");
							}
						};
						if (type == 'edit') {
							service.queryOne({
								"mobilePhone": $scope.userInfo.investerPhone
							}).then(function(res) {
								scope.processing = false;
								scope.entity = res.TUser;
							});
						}
					}
				]
			});
		}
	}
]);