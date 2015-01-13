//活动列表
activityModule.controller('actlistController', ['$scope', '$state', '$stateParams', 'activityService',
	function($scope, $state, $stateParams, service) {
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
				$scope.list = res.records;
				$scope.total = res.total;
				$scope.size = res.size;
			}, function(rej) {
				$scope.processing = false;
				$scope.loading = false;
			});
		};
		$scope.update = function(item) {
			var params = {};
			if(item.status==0){
				params["enable"] = 1;
			}else if(item.status==1){
				params["enable"] = 0;
			}else if(item.status==2){
				params["enable"] = 0;
			}else{
				return;
			}
			params["id"] = item.id;
			service.activityStatus(params).then(function(res) {

			})
		}
		$scope.search();
	}
]);


//活动新增／编辑
activityModule.controller('acteditController', ['$scope', '$state', '$stateParams', '$modal', 'activityService', 'msgService',
	function($scope, $state, $stateParams, $modal, service, msgService) {
		var id = $stateParams.id;
		$scope.isEdit = true; //编辑状态
		$scope.started = false; //活动开始状态
		$scope.activity = {
			rules: [{
				exPrizeDrawStartAt: '',
				exPrizeDrawEndAt: ''
			}],
			awards: [],
			logoUrl: ""
		};
		if (id != -1) { /*编辑活动*/
			$scope.isEdit = false;
			var params = {
				"id": id
			};
			service.activityDetail(params).then(function(res) {
				if (new Date() > res.startAt) {
					$scope.started = true;
				}
				$scope.activity = res;
			})
		}
		$("#imgFile").change(function(){
			$("#imgSubmit").click();
			$scope.activity.logoUrl=$("#imgFile").val();
		})
		$scope.updateImg = function(argument) {
			$("#imgFile").click();
		}
		$scope.editAward = function(index) {
			$modal.open({
				templateUrl: 'modules/activity/templates/activity.edit.rule.html',
				controller: ['$scope', function(scope) {
					if (typeof(index) == "number") {
						scope.entity = $scope.activity.awards[index]
					} else {
						scope.entity = {};
					}
					console.log(scope.entity);
					scope.dateArr = [{
						opened: false
					}, {
						opened: false
					}, {
						opened: false
					}];
					scope.awardlist = awardlist;
					scope.dateOpen = function($event, index) {
						$event.preventDefault();
						$event.stopPropagation();
						for (var i = 0, len = scope.dateArr.length; i < len; i++) {
							scope.dateArr[i].opened = false;
						}
						scope.dateArr[index].opened = true;
					};
					scope.confirm = function() {

						var getAward = function(id) {
							for (var i = 0, len = awardlist.length; i < len; i++) {
								if (awardlist[i].id == id) {
									return awardlist[i];
								}
							}
						}
						var percent=0;
						for(var i=0,len=$scope.activity.awards.length;i<len;i++){
							percent+=$scope.activity.awards[i].probability*1;
						}
						if(percent+scope.entity.probability*1>100){
							msgService.messageBox("中奖概率之和不能大于100%");
							return;
						}
						var _award = getAward(scope.entity.id);
						scope.entity.awardName = _award.name;
						scope.entity.sourceID = _award.sourceID;
						scope.entity.type = _award.type;
						scope.entity.activityID = $scope.activity.id;
						scope.entity.limitStartAt = (scope.entity.limitStartAt) ? scope.entity.limitStartAt * 1 : '';
						scope.entity.limitEndAt = (scope.entity.limitEndAt) ? scope.entity.limitEndAt * 1 : '';
						scope.entity.releaseAt = (scope.entity.releaseAt) ? scope.entity.releaseAt * 1 : '';
						if (index) {
							scope.$close();
						} else {
							if (!$scope.activity.awards) {
								$scope.activity.awards = [];
							}
							$scope.activity.awards.push(scope.entity);
							console.log($scope.activity);
							scope.$close();
						}
					}
				}]
			})
		}
		$scope.save = function() {
			var params = {};
			if (!$scope.activity.name) {
				msgService.messageBox("请输入活动名称！");
				return;
			}
			if (!$scope.activity.startAt) {
				msgService.messageBox("请输入活动开始时间！");
				return;
			}
			if (!$scope.activity.endAt) {
				msgService.messageBox("请输入活动结束时间！");
				return;
			}
			if (!$scope.activity.logoUrl) {
				msgService.messageBox("请添加活动banner！");
				return;
			}
			if (!$scope.activity.description) {
				msgService.messageBox("请输入活动介绍！");
				return;
			}
			if (!$scope.activity.declareTo) {
				msgService.messageBox("请输入活动声明！");
				return;
			}
			if ($scope.activity.rules.length == 0 || !$scope.activity.rules[0].basePrizeDrawType || !$scope.activity.rules[0].basePrizeDrawTime) {
				msgService.messageBox("请输入活动抽奖次数！");
				return;
			}
			if ($scope.activity.awards.length == 0) {
				msgService.messageBox("请添加活动奖品！");
				return;
			}
			$scope.activity.logoUrl=__imgUrl__;
			$scope.activity.rules[0].exPrizeDrawStartAt = ($scope.activity.rules[0].exPrizeDrawStartAt) ? $scope.activity.rules[0].exPrizeDrawStartAt * 1 : '';
			$scope.activity.rules[0].exPrizeDrawEndAt = ($scope.activity.rules[0].exPrizeDrawEndAt) ? $scope.activity.rules[0].exPrizeDrawEndAt * 1 : '';
			$scope.activity.endAt = ($scope.activity.endAt) ? $scope.activity.endAt * 1 : '';
			$scope.activity.startAt = ($scope.activity.startAt) ? $scope.activity.startAt * 1 : '';
			params["id"] = $scope.activity.id;
			params["activity"] = JSON.stringify($scope.activity);
			if ($scope.activity.id) {
				service.activityEdit(params, "put").then(function(res) {
					msgService.messageBox("修改成功！");
					$scope.isEdit=false;
				});
			} else {
				service.activityEdit(params, "post").then(function(res) {
					msgService.messageBox("添加成功！");
					$scope.isEdit=false;
				});
			}

		}
		$scope.preview = function() {

		}
		$scope.deleteAward = function(index) {
			// body...
			if ($scope.started) {
				alert('活动已开始，无法删除奖品');
			} else {
				$scope.award.splice(index, 1);
			}
		}
		$scope.quit = function() {
			if (id == -1) {
				$state.go("activity.actlist");
			} else {
				$scope.isEdit = false;
			}
		}
		$scope.back = function() {
			$state.go("activity.actlist");
		}
		$scope.edit = function() {
			$scope.isEdit = true;
		}

		$scope.dateArr = [{
			opened: false
		}, {
			opened: false
		}, {
			opened: false
		}, {
			opened: false
		}];
		$scope.dateOpen = function($event, index) {
			$event.preventDefault();
			$event.stopPropagation();
			for (var i = 0, len = $scope.dateArr.length; i < len; i++) {
				$scope.dateArr[i].opened = false;
			}
			$scope.dateArr[index].opened = true;

		};
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
		var awardlist = {};
		service.awardSel().then(function(res) {
			awardlist = res.records;
		})
	}
]);

//中奖管理
activityModule.controller('awardlistController', ['$scope', '$state', 'activityService', 'selectService', 'msgService',
	function($scope, $state, service, selectService, msgService) {
		$scope.selected = false;
		$scope.page = 1;
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["pageSize"] = 10;
			params["activityID"] = $scope.activityId;
			params["awardID"] = $scope.awardId;
			params["checked"] = $scope.checked;
			params["mobile"] = $scope.mobile;
			$scope.processing = true;
			$scope.loading = true;
			service.awardList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = selectService.init(res.records);
				$scope.total = res.total;
				$scope.size = res.size;
			}, function(rej) {
				$scope.processing = false;
				$scope.loading = false;
			});
		};
		$scope.selectAll = function() {
			$scope.list = selectService.selectAll($scope.list, $scope.selected);
		}
		$scope.markAward = function(item) {
			var userIds = "";
			if (!item) {
				var list = selectService.getSelected($scope.list, $scope.selected);
				for (var i = 0, len = list.length; i < len; i++) {
					userIds += (i == 0) ? "" : ",";
					userIds += list[i].id;
				}
			} else {
				userIds = item.id;
			}
			if (userIds == "") {
				return;
			}
			var params = {};
			params["userIds"] = userIds;

			service.awardMark(params).then(function(res) {
				msgService.messageBox('发奖成功！');
				$scope.search(true);
			}, function(rej) {
				msgService.messageBox('发奖失败');
			});
		}
		$scope.giveAward = function() { /*派奖*/
			if (!$scope._activityId) {
				msgService.messageBox("请选择活动！")
				return;
			}
			if (!$scope._mobile || $scope._mobile.length != 11) {
				msgService.messageBox("请输入正确的派奖电话！")
				return;
			}
			if (!$scope._awardId) {
				msgService.messageBox("请选择奖品！")
				return;
			}
			var params = {};
			params["activityID"] = $scope._activityId;
			params["awardID"] = $scope._awardId;
			params["mobile"] = $scope._mobile;
			service.awardMobile({
				"mobile": $scope._mobile
			}).then(function(res) {
				if (res.response == 50000) {
					msgService.messageBox("手机号不存在！");
				} else {
					$modal.open({
						templateUrl: 'config/templates/confirm.partial.html',
						controller: ['$scope', function(scope) {debugger;
							if(res.response=50001){
								scope.message="该用户在此活动中已有中奖纪录，是否继续派奖？";
							}else{
								scope.message="确认派奖？";
							}
							scope.confirm = function() {
								service.awardGive(params).then(function(res) {
									console.log(res);
								})
							}
						}]
					});
				}
			})
		}
		$scope.excel=function(){
			if(!$scope.activityId){
				msgService.messageBox("请选择要导出的活动！");
				return;
			}
			var url='/export/activity/winnerItem';
			url+= (!$scope.activityId)?"":"?activityID="+$scope.activityId;
			if($scope.activityId){
				url+= (!$scope.awardId)?"":"&awardID="+$scope.awardId;
			}else{
				url+= (!$scope.awardId)?"":"?awardID="+$scope.awardId;
			}
			window.open(url);
			// var params={};
			// params["activityID"] = $scope.activityId;
			// params["awardID"] = $scope.awardId;
			// service.awardExcel(params).then(function(res){

			// })
		}
		$scope.getAwardSel = function() {
			var params = {};
			params["activityID"] = $scope.activityId;
			service.awardSel(params).then(function(res) {
				$scope.awardlist = res.records;
			})
		}

		$scope._getAwardSel = function() {
			var params = {};
			params["activityID"] = $scope._activityId;
			params["enoughTo"] = 1;
			service.awardSel(params).then(function(res) {
				$scope._awardlist = res.records;
			})
		}

		service.activityList().then(function(res) {
			$scope.activitySel = res.records;
		}, function(rej) {

		})
		$scope.search();
	}
]);

//商户管理
activityModule.controller('busilistController', ['$scope', '$state', '$stateParams', '$modal', 'activityService', 'selectService', 'msgService',
	function($scope, $state, $stateParams, $modal, service, selectService, msgService) {
		$scope.selected = false;
		$scope.page = 1;
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["pageSize"] = 10;
			params["name"] = $scope.name;
			$scope.processing = true;
			$scope.loading = true;
			service.businessList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = selectService.init(res.records);
				$scope.total = res.total;
				$scope.size = res.size;
			}, function(rej) {
				$scope.processing = false;
				$scope.loading = false;
			});
		};

		$scope.edit = function(item) {
			$modal.open({
				templateUrl: 'modules/activity/templates/business.edit.html',
				controller: ['$scope', function(scope) {
					scope.entity = item ? item : {};
					scope.updateImg = function(argument) {
						$("#imgFile").change(function(){
							$("#imgSubmit").click();
							scope.entity.logoUrl=$("#imgFile").val();
						})
						$("#imgFile").click();
					}
					scope.confirm = function() {
						scope.entity.logoUrl=__imgUrl__;
						if(!scope.entity.name){
							msgService.messageBox('请输入商户名！');
							return;
						}
						if(!scope.entity.logoUrl){
							msgService.messageBox('请输上传商户图片！');
							return;
						}
						if(!scope.entity.description){
							msgService.messageBox('请输入商户介绍！');
							return;
						}
						if (scope.entity.id) { /*编辑*/
							service.businessOne(scope.entity, 'put').then(function(res) {
								msgService.messageBox('修改成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej);
							})
						} else { /*添加*/
							service.businessOne(scope.entity, 'post').then(function(res) {
								msgService.messageBox('添加成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej);
							})
						}
					}
				}]
			})
		}
		$scope.delete = function(item) {
			$modal.open({
				templateUrl: 'config/templates/confirm.partial.html',
				controller: ['$scope', function(scope) {
					var ids = "";
					var names = "";
					if (!item) {
						var list = selectService.getSelected($scope.list, $scope.selected);
						for (var i = 0, len = list.length; i < len; i++) {
							ids += (i == 0) ? "" : ",";
							ids += list[i].id;
							names += (i == 0) ? "【" : ",【";
							names += list[i].name + "】";
						}
					} else {
						ids = item.id;
						names = "【" + item.name + "】";
					}
					if (ids == "") {
						return;
					}
					var params = {};
					params["ids"] = ids;

					scope.message = "确认删除商家：" + names + "吗？";
					scope.confirm = function() {
						service.businessGroup(params, 'delete').then(function(res) {
							msgService.messageBox('删除成功！');
							$scope.search(true);
						}, function(rej) {
							msgService.messageBox('删除失败');
						});
						scope.$close();
					}
				}]
			});
		}

		$scope.selectAll = function() {
			$scope.list = selectService.selectAll($scope.list, $scope.selected);
		}

		$scope.search();
	}
]);

//道具管理
activityModule.controller('itemlistController', ['$scope', '$state', '$stateParams', '$modal', 'activityService', 'selectService', 'msgService',
	function($scope, $state, $stateParams, $modal, service, selectService, msgService) {
		$scope.selected = false;
		$scope.page = 1;
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["pageSize"] = 10;
			params["kw"] = $scope.key;
			$scope.processing = true;
			$scope.loading = true;
			service.itemList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = selectService.init(res.records);
				$scope.total = res.total;
				$scope.size = res.size;
			}, function(rej) {
				$scope.processing = false;
				$scope.loading = false;
			});
		};
		$scope.edit = function(item) {
			$modal.open({
				templateUrl: 'modules/activity/templates/item.edit.html',
				controller: ['$scope', function(scope) {
					scope.businessList = $scope.businessList;
					scope.entity = item ? item : {};

					scope.updateImg = function(argument) {
						$("#imgFile").change(function(){
							$("#imgSubmit").click();
							scope.entity.logoUrl=$("#imgFile").val();
						})
						$("#imgFile").click();
					}
					scope.confirm = function() {
						if(!scope.entity.name){
							msgService.messageBox('请输入卡券名！');
							return;
						}
						if(!scope.entity.partnerID){
							msgService.messageBox('请选择道具提供商！');
							return;
						}
						if(!scope.entity.logoUrl){
							msgService.messageBox('请输上传道具图片！');
							return;
						}
						scope.entity.logoUrl=__imgUrl__;
						if (scope.entity.id) { /*编辑*/
							service.itemOne(scope.entity, 'put').then(function(res) {
								msgService.messageBox('修改成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej);
							})
						} else { /*添加*/
							service.itemOne(scope.entity, 'post').then(function(res) {
								msgService.messageBox('添加成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej);
							})
						}
					}
				}]
			})
		}

		$scope.selectAll = function() {
			$scope.list = selectService.selectAll($scope.list, $scope.selected);
		}
		$scope.delete = function(item) {
			$modal.open({
				templateUrl: 'config/templates/confirm.partial.html',
				controller: ['$scope', function(scope) {
					var ids = "";
					var names = "";
					if (!item) {
						var list = selectService.getSelected($scope.list, $scope.selected);
						for (var i = 0, len = list.length; i < len; i++) {
							ids += (i == 0) ? "" : ",";
							ids += list[i].id;
							names += (i == 0) ? "【" : ",【";
							names += list[i].name + "】";
						}
					} else {
						ids = item.id;
						names = "【" + item.name + "】";
					}
					if (ids == "") {
						return;
					}
					var params = {};
					params["ids"] = ids;
					scope.message = "确认删除道具：" + names + "吗？";
					scope.confirm = function() {
						service.itemGroup(params, 'delete').then(function(res) {
							msgService.messageBox('删除成功！');
							$scope.search(true);
						}, function(rej) {
							msgService.messageBox('删除失败');
						});
						scope.$close();
					}
				}]
			});
		}
		$scope.search();
		service.businessList().then(function(res) {
			$scope.businessList = res.records;
		});
	}
]);

//卡券管理
activityModule.controller('ticketlistController', ['$scope', '$state', '$stateParams', '$modal', 'activityService', 'selectService', 'msgService',
	function($scope, $state, $stateParams, $modal, service, selectService, msgService) {
		$scope.selected = false;
		$scope.page = 1;
		$scope.search = function(keep) {
			var params = {};
			if (!keep) {
				$scope.page = 1;
			}
			params["page"] = $scope.page;
			params["pageSize"] = 10;
			params["type"] = $scope.type;
			params["kw"] = $scope.key;
			$scope.processing = true;
			$scope.loading = true;
			service.ticketList(params).then(function(res) {
				$scope.processing = false;
				$scope.loading = false;
				$scope.list = selectService.init(res.records);
				$scope.total = res.total;
				$scope.size = res.size;
			}, function(rej) {
				$scope.processing = false;
				$scope.loading = false;
			});
		};
		$scope.edit = function(item) {
			$modal.open({
				templateUrl: 'modules/activity/templates/ticket.edit.html',
				controller: ['$scope', function(scope) {
					scope.entity = item ? item : {};
					scope.entity.type=10;
					scope.updateImg = function(argument) {
						$("#imgFile").change(function(){
							$("#imgSubmit").click();
							scope.entity.logoUrl=$("#imgFile").val();
						})
						$("#imgFile").click();
					}
					scope.confirm = function() {
						if(!scope.entity.name){
							msgService.messageBox('请输入卡券名！');
							return;
						}
						if(!scope.entity.value){
							msgService.messageBox('请输入卡券金额！');
							return;
						}
						if(!scope.entity.logoUrl){
							msgService.messageBox('请输上传卡券图片！');
							return;
						}
						scope.entity.logoUrl=__imgUrl__;
						if (scope.entity.id) { /*编辑*/
							service.ticketOne(scope.entity, 'put').then(function(res) {
								msgService.messageBox('修改成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej.message);
							})
						} else { /*添加*/
							service.ticketOne(scope.entity, 'post').then(function(res) {
								msgService.messageBox('添加成功！');
								scope.$close();
								$scope.search(true);
							}, function(rej) {
								msgService.messageBox(rej.message);
							})
						}
					}
				}]
			})
		}
		$scope.delete = function(item) {
			$modal.open({
				templateUrl: 'config/templates/confirm.partial.html',
				controller: ['$scope', function(scope) {
					var ids = "";
					var names = "";
					if (!item) {
						var list = selectService.getSelected($scope.list, $scope.selected);
						for (var i = 0, len = list.length; i < len; i++) {
							ids += (i == 0) ? "" : ",";
							ids += list[i].id;
							names += (i == 0) ? "【" : ",【";
							names += list[i].name + "】";
						}
					} else {
						ids = item.id;
						names = "【" + item.name + "】";
					}
					if (ids == "") {
						return;
					}
					var params = {};
					params["ids"] = ids;

					scope.message = "确认删除卡券：" + names + "吗？";
					scope.confirm = function() {
						service.ticketGroup(params, 'delete').then(function(res) {
							msgService.messageBox('删除成功！');
							$scope.search(true);
						}, function(rej) {
							msgService.messageBox('删除失败');
						});
						scope.$close();
					}
				}]
			});
		}
		$scope.selectAll = function() {
			$scope.list = selectService.selectAll($scope.list, $scope.selected)
		}


		$scope.search();
	}
]);