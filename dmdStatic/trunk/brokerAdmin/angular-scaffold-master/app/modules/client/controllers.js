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
			if ($scope.registerBegin) {
				params["registerBegin"] = new Date($scope.registerBegin.getFullYear() + "/" + ($scope.registerBegin.getMonth() + 1) + "/" + $scope.registerBegin.getDate()) * 1;
			}
			if ($scope.registerEnd) {
				params["registerEnd"] = new Date($scope.registerEnd.getFullYear() + "/" + ($scope.registerEnd.getMonth() + 1) + "/" + ($scope.registerEnd.getDate() + 1)) * 1;
			}
			// if ($scope.registerBegin) {
			// 	params["registerBegin"] = $scope.registerBegin.getFullYear() + "-" + ($scope.registerBegin.getMonth() + 1) + "-" + $scope.registerBegin.getDate();
			// }
			// if ($scope.registerEnd) {
			// 	params["registerEnd"] = $scope.registerEnd.getFullYear() + "-" + ($scope.registerEnd.getMonth() + 1) + "-" + $scope.registerEnd.getDate();
			// }
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

clientModule.controller('investController', ['$scope', '$state', '$stateParams', 'msgService','clientService','envService','$modal',
	function($scope, $state, $stateParams, msgService,service,envService, $modal) {
		var params = {};
		params["tUserId"] = $stateParams.id;
		$scope.env=envService.getEnv();
		$scope.page = 1;
		service.getInvestList(params).then(function (res) {
			$scope.list = res.list;
			$scope.page = res.page;
			$scope.total = res.total;
			$scope.size = res.size;
		});

		service.queryOne(params).then(function (res) {
			$scope.userInfo = res.userbroker;
		})
		$scope.detailType = 1;
		$scope.search = function() {
			var params = {};
			params["page"] = $scope.page;
			params["size"] = 10;
			params["tUserId"] = $stateParams.id;
			if ($scope.detailType == 1) {
				service.getInvestList(params).then(function(res) {
					$scope.list = res.list;
					$scope.page = res.page;
					$scope.total = res.total;
					$scope.size = res.size;
				});
			} else if ($scope.detailType == 2) {
				service.getLogList(params).then(function(res) {
					$scope.list = res.list;
					$scope.page = res.page;
					$scope.total = res.total;
					$scope.size = res.size;
				});
			}
		}
		$scope.tabChange = function(type) {
			$scope.detailType = type;
			$scope.search();
		}
		$scope.delete = function() {
			var params={};
			params["tUserId"]=$scope.userInfo.ID;
			params["brokerId"]=$scope.userInfo.brokerId;
			params["brokerUserType"]=1;
			$modal.open({
				templateUrl: 'config/templates/confirm.partial.html',
				controller: ['$scope',
				function(scope) {
					scope.title="确认删除";
					scope.message="确认解除该用户经纪人关系？"
					scope.confirm=function(argument) {
						service.delBroker(params).then(function(res){
							service.queryOne(params).then(function (res) {
								$scope.userInfo = res.userbroker;
								if ($scope.detailType == 2) {
									service.getLogList(params).then(function(res) {
										$scope.list = res.list;
										$scope.page = res.page;
										$scope.total = res.total;
										$scope.size = res.size;
									});
								}
								scope.$close();
							})
						},function(rej) {
							msgService.messageBox(rej.message);
						});
					}
				}]
			});
		}
		$scope.edit = function(type) {
			$modal.open({
				templateUrl: 'modules/client/templates/change.html',
				controller: ['$scope',
					function(scope) {
						scope.title="经纪人";
						scope.search = function() {
							if ($("#add-phone").val().length != 11) {
								msgService.messageBox("请输入正确的手机号！");
								return;
							}
							var params = {};
							params["mobile"] = $("#add-phone").val();
							scope.processing = true;
							service.getBroker(params).then(function(res) {
								scope.processing = false;
								if (res.broker == "") {
									msgService.messageBox("该用户不存在（请先在前端注册并实名认证）");
								}
								scope.entity = res.broker;
							});
						};
						scope.confirm = function() {
							var params = {};
							if (scope.entity.ID) {
								params["tUserId"] = $scope.userInfo.ID;
								params["brokerId"] = scope.entity.ID;
								params["brokerUserType"] = 1;
								scope.processing = true;
								service.updateBroker(params).then(function(res) {
									scope.processing = false;
									if (typeof(res) == "string") {
										msgService.messageBox(res);
										scope.entity = {};
										$("#add-phone").val("");
									} else {
										msgService.messageBox("操作成功！");
										service.queryOne(params).then(function (res) {
											$scope.userInfo = res.userbroker;
										})
										if ($scope.detailType == 2) {
											service.getLogList(params).then(function(res) {
												$scope.list = res.list;
												$scope.page = res.page;
												$scope.total = res.total;
												$scope.size = res.size;
											});
										}
										scope.$close();
									}
								});
							} else {
								msgService.messageBox("请先查询！");
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