brokersModule.controller('loginController', ['$scope','$state','brokerService',function ($scope, $state, service) {

  $scope.remember = true;

  $scope.login = function () {
    $scope.processing = true;
    $scope.error=false;
    var params={};
    params["name"]=$scope.username;
    params["pwd"]=$scope.password;
    service.login(params).then(function (res) {
      $scope.$emit('$initialize');
      if(typeof(res)=="string"){
        $scope.error=true;
      }else{
        var date=new Date();
        date.setHours(date.getHours() + 1);
        document.cookie="userNick="+res.puser.nick+";expires="+ date.toGMTString();
        $state.go('brokers.broker');
      }
    }, function (rej) {
      $scope.error = true;
    })['finally'](function () {
      $scope.processing = false;
    });
  };

}]);

// brokers.logout
brokersModule.controller('logoutController', ['$scope', '$state', 'growl', 'brokerService',function ($scope, $state, growl, service) {
  service.logout().then(function (res) {
    document.cookie="userNick=";
    $state.go('brokers.login');
  }, function (rej) {
    growl.addErrorMessage(rej.message || '服务器异常，请刷新当前页');
  });
  // $state.go('brokers.login');
}]);


// broker
brokersModule.controller('brokerController', ['$scope', '$state', '$modal', 'growl', 'brokerService', 'controllerGenerator',function ($scope, $state, $modal, growl, service, controllerGenerator) {
  // 给$scope添加标准化CRUD操作
  // brokerService.listShow().then(function (res) {
  //   $scope.list = res.list;
  // });
  $scope.page = 1;
  $scope.query = function (keep) {
    if (keep) {
      $scope.list = [];
      $scope.loading = true;
    }
    var params={};
    params["page"]=$scope.page;
    params["size"]=10;
    params["id"]=$scope.id;
    params["name"]=$scope.name;
    params["mobilePhone"]=$scope.phone;
    if($scope.dts){
      params["dateStart"]=new Date($scope.dts.getFullYear()+"/"+($scope.dts.getMonth()+1)+"/"+$scope.dts.getDate())*1;
    }
    if($scope.dte){
      params["dateEnd"]=new Date($scope.dte.getFullYear()+"/"+($scope.dte.getMonth()+1)+"/"+($scope.dte.getDate()+1))*1;
    }
    params["brokerType"]=$scope.type;
    params["isHired"]=$scope.status;
    $scope.processing=true;
    $scope.loading = true;
    service.query(params).then(function (res) {
      $scope.loading = false;
      $scope.processing=false;
      $scope.list = res.list;
      $scope.total = res.total;
      $scope.size = res.size;
    });
  };


  //增加经纪人
  $scope.addbroker = function (keep) {
      $modal.open({
        templateUrl: 'modules/brokers/templates/broker.add.html',
        controller: ['$scope',
          function (scope) {
            scope.title = '添加经纪人';
            scope.entity = {};
            scope.search = function(){
              if($("#add-phone").val().length!=11){
                messageBox("请输入正确的手机号！");
                return;
              }
              var params={};
              params["mobilePhone"]=$("#add-phone").val();
              scope.processing=true;
              service.queryOne(params).then(function (res) { 
              scope.processing=false;
                if(res.TUser==""){
                  messageBox("该用户不存在（请先在前端注册并实名认证）");
                }
                scope.entity=res.TUser;
              });
            }
            scope.confirm = function () {
              if(!scope.entity["name"]){
                messageBox("请先在前端实名认证！");
                return;
              }
              var params={};
              if(scope.entity.id){
                params["tuserid"]=scope.entity.id;
                params["isHired"]=0;
                params["brokerType"]=($("#rad-status").val()=="")?"0":$("#rad-status").val();
                scope.processing=true;
                service.create(params).then(function (res) {
                  scope.processing=false;
                  if(typeof(res)=="string"){
                    messageBox(res);
                    scope.entity={};
                    $("#add-phone").val("");
                  }else{
                    messageBox("添加成功！");
                    params={};
                    console.log(res);
                    params["userId"]=res.user.id;
                    service.updateBroker(params);
                    $scope.search();
                    scope.$close();
                  }
                });
              }else{
                messageBox("请先查询后再添加人员！");
              }
            };
            scope.close=function(){
              scope.$close();
            };
          }
        ]
      });
    };
  // 查看经纪人
  $scope.viewbroker = function (item) {
    $modal.open({
      templateUrl: 'modules/brokers/templates/broker.info.html',
      controller: ['$scope',
        function (scope) {
          scope.title = item.name;
          scope.entity = item;
          scope.close=function(){
            scope.$close();
          }
        }
      ]
    });
  }
  // 编辑经纪人
  $scope.editbroker = function (item) {
    $modal.open({
      templateUrl: 'modules/brokers/templates/broker.edit.html',
      controller: ['$scope',
        function (scope) {
          scope.title = item.name;
          scope.entity = item;
          scope.confirm = function () {
            var params={};
            params["id"]=scope.entity.id;
            params["isHired"]=scope.entity.isHired;
            params["brokerType"]=scope.entity.brokerType;
            service.update(params).then(function (res) {
              scope.processing=false;
              messageBox("编辑成功！");
              $scope.search();
              scope.$close();
            });
            scope.$close();
          };

          scope.close=function(){
              $scope.search();
            scope.$close();
          }
        }
      ]
    });
  }
  // 搜索
  $scope.search = function () {
    $scope.page = 1;
    var params={};
    params["page"]=1;
    params["size"]=10;
    params["id"]=$scope.id;
    params["name"]=$scope.name;
    params["mobilePhone"]=$scope.phone;
    if($scope.dts){
      params["dateStart"]=new Date($scope.dts.getFullYear()+"/"+($scope.dts.getMonth()+1)+"/"+$scope.dts.getDate())*1;
    }
    if($scope.dte){
      params["dateEnd"]=new Date($scope.dte.getFullYear()+"/"+($scope.dte.getMonth()+1)+"/"+($scope.dte.getDate()+1))*1;
    }
    params["brokerType"]=$scope.type;
    params["isHired"]=$scope.status;
    $scope.processing=true;
    $scope.loading = true;
    service.query(params).then(function (res) {
      $scope.processing=false;
      $scope.loading = false;
      $scope.list = res.list;
      $scope.total = res.total;
      $scope.size = res.size;
    });
  };

  $scope.clear=function(){
    $scope.id="";
    $scope.name="";
    $scope.phone="";
    $scope.dts="";
    $scope.dte="";
    $scope.type="";
    $scope.status="";
  };

  $scope.dateOpen = function($event,type) {
    $event.preventDefault();
    $event.stopPropagation();
    if(type===1){
      $scope.opened = true;
      $scope.opened2 = false;
    }else if(type===2){
      $scope.opened = false;
      $scope.opened2 = true;
    }
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.maxDate=new Date();
  $scope.query(true);

  var messageBox=function(msg){
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

  var listRefresh=function(){
    var params={};
    params["page"]=$scope.page;
    params["size"]=10;
    $scope.processing=true;
    $scope.loading = true;
    service.query(params).then(function (res) {
      $scope.processing=false;
      $scope.loading = false;
      $scope.list = res.list;
      $scope.total = res.total;
      $scope.size = res.size;
    }, function () {});
  }

  var getCookie=function(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
     var temp = arrStr[i].split("=");
     if(temp[0] == objName) return unescape(temp[1]);
    }
  }
  if(getCookie("userNick")!=""&&getCookie("userNick")!=undefined){
    $("#userNick").text(getCookie("userNick"));
  }else{
    //$state.go('brokers.login');
  }
}]);


//第三方网站列表页
brokersModule.controller('thirdController', ['$scope', '$state', 'growl', 'brokerService','msgService','$modal',function ($scope, $state, growl, service,msgService, $modal) {
  // 搜索
  $scope.search = function (keep) {
    var params={};
    if(!keep){
      $scope.page = 1;
    }
    params["page"]=$scope.page;
    params["size"]=10;
    params["userId"]=$scope.userId;
    params["realName"]=$scope.realName;
    params["mobilePhone"]=$scope.mobilePhone;
    params["businessName"]=$scope.businessName;
    if($scope.dts){
      params["timeBegin"]=new Date($scope.dts.getFullYear()+"/"+($scope.dts.getMonth()+1)+"/"+$scope.dts.getDate())*1;
    }
    if($scope.dte){
      params["timeEnd"]=new Date($scope.dte.getFullYear()+"/"+($scope.dte.getMonth()+1)+"/"+($scope.dte.getDate()+1))*1;
    }
    $scope.processing=true;
    $scope.loading = true;
    service.thirdList(params).then(function (res) {
      $scope.processing=false;
      $scope.loading = false;
      $scope.list = res.list;
      $scope.total = res.total;
      $scope.size = res.size;
    });
  };

  $scope.clear=function(){
    $scope.userId="";
    $scope.realName="";
    $scope.mobilePhone="";
    $scope.businessName="";
    $scope.dts="";
    $scope.dte="";
  };

  //增加经纪人
  $scope.addthird = function () {
        $modal.open({
      templateUrl: 'modules/brokers/templates/third.add.html',
      controller: ['$scope',
        function (scope) {
          scope.title = '添加商户';
          scope.search = function(){
            if($("#add-phone").val().length!=11){
              messageBox("请输入正确的手机号！");
              return;
            }
            var params={};
            params["mobilePhone"]=$("#add-phone").val();
            scope.processing=true;
            service.queryOne(params).then(function (res) { 
              scope.processing=false;
              if(res.TUser==""){
                msgService.messageBox("该用户不存在（请先在前端注册并实名认证）");
              }
              scope.entity.userId=res.TUser.id;
              scope.entity.mobilePhone=res.TUser.mobilephone;
              scope.entity.realName=res.TUser.name;
              scope.entity.userName=res.TUser.nick;
            });
          }
          scope.confirm = function () {
            if(!scope.entity["realName"]){
              msgService.messageBox("请先在前端实名认证！");
              return;
            }
            if(!scope.entity["businessName"]){
              msgService.messageBox("请输入商户名称！");
              return;
            }
            var params={};
            if(scope.entity.userId){
              params["id"]=scope.entity.userId;
              params["businessName"]=scope.entity.businessName;
              scope.processing=true;
              service.addBusiness(params).then(function (res) {
                scope.processing=false;
                if(typeof(res)=="string"){
                  msgService.messageBox(res);
                  scope.entity={};
                  $("#add-phone").val("");
                }else{
                  msgService.messageBox("添加成功！");
                  $scope.search();
                  scope.$close();
                }
              });
            }else{
              msgService.messageBox("请先查询后再添加人员！");
            }
          };
          scope.close=function(){
            scope.$close();
          };
        }
      ]
    });
  };




  $scope.goDetail=function(id){
    $state.go('brokers.thirdinfo',{'id':id})
  } 


  $scope.dateOpen = function($event,type) {
    $event.preventDefault();
    $event.stopPropagation();
    if(type===1){
      $scope.opened = true;
      $scope.opened2 = false;
    }else if(type===2){
      $scope.opened = false;
      $scope.opened2 = true;
    }
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.maxDate=new Date();
  $scope.search();
}]);


//第三方网站详情页
brokersModule.controller('thirdInfoController', ['$scope', '$state', '$stateParams', '$modal','growl', 'brokerService','msgService',function ($scope, $state, $stateParams,$modal, growl, service,msgService) {
  

  // 搜索
  $scope.search = function (keep) {
    var params={};
    if(!keep){
      $scope.page = 1;
    }
    params["page"]=$scope.page;
    params["size"]=10;
    params["id"]=$stateParams.id;
    params["moneyBegin"]=$scope.tzmin;
    params["moneyEnd"]=$scope.tzmax;
    if($scope.dts){
      params["timeBegin"]=$scope.dts.getFullYear()+"-"+($scope.dts.getMonth()+1)+"-"+$scope.dts.getDate();
    }
    if($scope.dte){
      params["timeEnd"]=$scope.dte.getFullYear()+"-"+($scope.dte.getMonth()+1)+"-"+$scope.dte.getDate();
    }
    $scope.processing=true;
    $scope.loading = true;
    service.thirdDetailList(params).then(function (res) {
      $scope.processing=false;
      $scope.loading = false;
      $scope.list = res.list;
      $scope.total = res.total;
      $scope.size = res.size;
      $scope.businessName = res.businessName;
      $scope.realName = res.realName;
      $scope.userName = res.userName;
      $scope.mobilePhone = res.mobilePhone;
      $scope.thirdId = res.thirdId;
      $scope.userId = res.userId;
      $scope.user=res;
    });
  };

    //修改经纪人
  $scope.editThird = function () {
    $modal.open({
      templateUrl: 'modules/brokers/templates/third.add.html',
      controller: ['$scope',
        function (scope) {
          scope.title = '修改商户信息';
          scope.entity = $scope.user;
          scope.search = function(){
            if($("#add-phone").val().length!=11){
              messageBox("请输入正确的手机号！");
              return;
            }
            var params={};
            params["mobilePhone"]=$("#add-phone").val();
            scope.processing=true;
            service.queryOne(params).then(function (res) { 
            scope.processing=false;
              if(res.TUser==""){
                msgService.messageBox("该用户不存在（请先在前端注册并实名认证）");
              }
              scope.entity.userId=res.TUser.id;
              scope.entity.mobilePhone=res.TUser.mobilephone;
              scope.entity.realName=res.TUser.name;
              scope.entity.userName=res.TUser.nick;
            });
          }
          scope.confirm = function () {
            if(!scope.entity["realName"]){
              msgService.messageBox("请先在前端实名认证！");
              return;
            }
            if(!scope.entity["businessName"]){
              msgService.messageBox("请输入商户名称！");
              return;
            }
            var params={};
            if(scope.entity.userId){
              params["id"]=scope.entity.id;
              params["userId"]=scope.entity.userId;
              params["businessName"]=scope.entity.businessName;
              scope.processing=true;
              service.editBusiness(params).then(function (res) {
                scope.processing=false;
                if(typeof(res)=="string"){
                  msgService.messageBox(res);
                  scope.entity={};
                  $("#add-phone").val("");
                }else{
                  msgService.messageBox("操作成功！");
                  $scope.search();
                  scope.$close();
                }
              });
            }else{
              msgService.messageBox("请先查询后再添加人员！");
            }
          };
          scope.close=function(){
            scope.$close();
          };
        }
      ]
    });
  };


  $scope.dateOpen = function($event,type) {
    $event.preventDefault();
    $event.stopPropagation();
    if(type===1){
      $scope.opened = true;
      $scope.opened2 = false;
    }else if(type===2){
      $scope.opened = false;
      $scope.opened2 = true;
    }
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.maxDate=new Date();
  $scope.search(false);
}]);