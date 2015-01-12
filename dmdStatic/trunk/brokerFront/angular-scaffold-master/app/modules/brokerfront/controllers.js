/*登录*/
brokerFrontModule.controller('loginController', ['$scope', '$state', 'brokerFrontService', '$timeout',
  function($scope, $state, service, $timeout) {
    $scope.loginName = "";
    $scope.passWord = "";
    $scope.login = function() {
      var params = {};
      if(!$scope.loginName){
        alert('请输入用户名！');
        return;
      }
      if(!$scope.passWord||$scope.passWord.length<6){
        alert('请输入合法密码！');
        return;
      }
      params["name"] = $scope.loginName;
      params["pwd"] = $scope.passWord;
      service.login(params).then(function(res) {
        $state.go("brokerfront.index");
      }, function(rej) {
        alert(rej.message);
      })
    }
  }
]);
/*首页*/
brokerFrontModule.controller('indexController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    service.getSta().then(function(res) {
      $scope.count = res.userReservedCount;
    })
  }
]);

/* 个人中心*/
brokerFrontModule.controller('userController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    service.userInfo().then(function (res) {
      $scope.user=res;
    })
  }
]);

/*预约客户*/
brokerFrontModule.controller('inviteController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.name = "";
    $scope.mobile = "";
    $scope.invite = function() {
      var params = {};
      params["username"] = $scope.name;
      params["mobile"] = $scope.mobile;
      if($scope.mobile.length!=11){
        alert('请输入正确的手机号！');
        return;
      }
      service.invite(params).then(function(res) {
        alert(res.message);
      },function(rej) {
        alert(rej.message);
      })
    }
  }
]);

/*预约列表*/
brokerFrontModule.controller('invitelistController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.type = "";
    $scope.more=true;
    var page = 1;
    $scope.invitelist = function(type) {
      $scope.type = type;
      var params = {};
      page = 1;
      params["page"] = 1;
      params["size"] = 10;
      params["status"] = type;
      service.reserveList(params).then(function(res) {
        $scope.list = res.list;
        if(res.total/res.size<page){
          $scope.more=false;
        }else{
          $scope.more=true;
        }
      });
    };
    $scope.displayMore = function() {
      var params = {};
      page++;
      params["page"] = page;
      params["size"] = 10;
      params["status"] = $scope.type;
      service.reserveList(params).then(function(res) {
        $scope.list=$scope.list.concat(res.list);
        if(res.total/res.size<page){
          $scope.more=false;
        }
      });
    }
    $scope.invitelist('');
  }

]);
/*投资列表*/
brokerFrontModule.controller('investlistController', ['$scope', '$state', 'brokerFrontService',
  function($scope, $state, service) {
    $scope.mobile = "";
    $scope.InvestTimeBegin = "";
    $scope.InvestTimeEnd = "";
    $scope.page=1;
    var size=10;
    var flag=false;
    $scope.investList = function() {
      if(flag){
        return;
      }
      var params = {};
      $scope.page=1
      params["page"] = $scope.page;
      params["size"] = size;
      params["mobile"] = $scope.mobile;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      flag=true;
      service.investList(params).then(function(res) {
        flag=false;
        $scope.list=res.list;
        $scope.baseInfo=res;
        $scope.total=res.total/res.size;
      },function(rej) {
        flag=false;
      });
    }
    $scope.displayMore = function() {
      if(flag){
        return;
      }
      var params = {};
      $scope.page++;
      params["page"] = $scope.page;
      params["size"] = size;
      params["mobile"] = $scope.mobile;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      flag=true;
      service.investList(params).then(function(res) {
        flag=false;
        $scope.list=$scope.list.concat(res.list);
        $scope.total=res.total/res.size;
      },function(rej) {
        flag=false;
      });
    }

    $scope.choose=function (item) {
      $state.go("brokerfront.investdetail",{"id":item.userId,"name":item.realName,"mobile":item.cellPhone});
    }
    $scope.investList();
  }
]);
/*投资详情*/
brokerFrontModule.controller('investdetailController', ['$scope', '$state','$stateParams', 'brokerFrontService',
  function($scope, $state, $stateParams,service) {
    $scope.mobile = $stateParams.mobile;
    $scope.name = $stateParams.name;
    $scope.id = $stateParams.id;
    $scope.InvestTimeBegin = "";
    $scope.InvestTimeEnd = "";

    $scope.page=1;
    var size=10;
    var flag=false;
    $scope.detailList = function() {
      var params = {};
      $scope.page=1;
      params["page"] = $scope.page;
      params["size"] = size;    
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      if(flag){
        return;
      }
      flag=true;
      service.detailList(params,$scope.id).then(function(res) {
        flag=false;
        $scope.list=res.list;
        $scope.baseInfo=res;
        $scope.total=res.total/res.size;
      });
    }
    $scope.displayMore = function() {
      var params = {};
      $scope.page++;
      params["page"] = $scope.page;
      params["size"] = size;      
      params["InvestTimeBegin"] = ($scope.InvestTimeBegin*1!=0)?$scope.InvestTimeBegin+" 00:00:00":"";
      params["InvestTimeEnd"] = ($scope.InvestTimeEnd*1!=0)?$scope.InvestTimeEnd+" 23:59:59":"";
      if(flag){
        return;
      }
      flag=true;
      service.detailList(params,$scope.id).then(function(res) {
        flag=false;
        $scope.list=$scope.list.concat(res.list);
        $scope.total=res.total/res.size;
      });
    }
    $scope.detailList();
  }
]);