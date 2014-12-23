/* global redEvenlopeModule:true */
//领取种子红包
redEnvelopeModule.controller('getSeedController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".pub_window").css("left", ($(window).width() - 320) / 2 + "px");
    $scope.onload = false;
    service.myRedEnvelope().then(function(res) {
      if (res.e.redEndTime && res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $state.go('redenvelope.myinfo', {
          friendId: '',
          friendNick: ''
        });
      }
      $scope.onload = true;
      if (res.current_user_has_receive_red == -1) {
        $scope.status = 0;
        $scope.money = "?";
        $scope.usernick = res.p.nick;
        $scope.busName = res.bus.busName;
        if($scope.busName==""){
          $scope.busName="多美贷";
        }
      } else {
        $scope.status = 1;
        $scope.money = res.current_user_red_info.amount;
        $scope.usernick = res.p.nick;
      }
    });
    $scope.getSeed = function() {
      service.firstRedEnvelope().then(function(res2) {
        if (res2.code == 1) {
          service.myRedEnvelope().then(function(res) {
            $scope.money = res.current_user_red_info.amount;
            $scope.status = 1;
            $(".pub_window").css('display', 'block');
            $(".pub_window").addClass('BounceIn');
            $timeout(function() {
              $(".BounceIn").addClass('BounceOut');
              $timeout(function() {
                $(".pub_window").css('display', 'none');
              }, 1000);
            }, 3000);
          });
        } else {
          alert("红包领取失败！");
        }
      });
    }
    $scope.viewMyRev = function() {
      $state.go('redenvelope.myinfo', {
        friendId: "",
        friendNick: ""
      });
    }
  }
]);


//我的红包
redEnvelopeModule.controller('myinfoController', ['$scope','$sce', '$state', '$stateParams', 'reEnvelopeService', '$timeout', 'msgService',
  function($scope, $sce, $state, $params, service, $timeout, message) {
    $("#partnerWindow").css("left", ($(window).width() - 280) / 2 + "px");
    var host="http://";
    if (_ENV_ == 'dev') {
      $scope.Qr_code = 'qrcode_dev';
      host+="dev.";
    } else if (_ENV_ == 'test') {
      $scope.Qr_code = 'qrcode_test';
      host+="test.";
    } else {
      $scope.Qr_code = 'qrcode';
    }
    $scope.fks=__callback__.fks;
    $(".posita").css("left", ($(window).width() - 66) / 2 + "px");
    $scope.fromFriend = false;
    $scope.friendOpenId = $params.friendId;
    $scope.friendNick = $params.friendNick;
    if ($scope.friendOpenId != "" && $scope.friendNick != "") {
      $scope.fromFriend = true;
    }
    if ($scope.friendOpenId == -1) {
      message.msgShow("#myinfo", "<h4 class='color6 wid90'>你的好友还木有领取种子红包，请提醒TA领取哦！</h4>")
    }
    service.myRedEnvelope().then(function(res) {
      if(wx_share_url.split("/")<7){
        wx_share_url+="/"+res.data.p.busId;
      }
      $scope.status = res.e.joinStatus;
      if (res.current_user_has_receive_red == -1) {
        $state.go('redenvelope.getSeed');
      }
      if (res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 1;
      }
      if (res.e.redReceiveEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 2;
      }
      $scope.money = res.e.amount;
      $scope.canclick = res.e.canclick;
      $scope.achievement = res.e.ach_count;
      $scope.ach_amount = res.e.ach_amount;
      $scope.level = res.e.times;
      $scope.is_auth = res.u.is_auth;
      $scope.hasReceiveAmount = res.e.hasReceiveAmount;
      $scope.partner=res.bus;
      $scope.partner.busDesc=$sce.trustAsHtml(res.bus.busDesc);
      var count=0;
      if($scope.partner.busName==""){
        var tout = function() {
          $scope.banner_flag=count%4;
          count++;
          timer = $timeout(tout, 4000);
        }
          tout();
      }else{
        var tout = function() {
          $scope.banner_flag=count%2;
          count++;
          timer = $timeout(tout, 4000);
        }
        if(res.bus.content==''){
          $scope.banner_flag=1;
        }else{
          tout();
        }
      }


      if (res.e.next_receive_level_red != -1) {
        $scope.next = res.e.next_receive_level_red;
        $scope.nextlevel = res.e.next_receive_level_level;
        $scope.need = res.e.next_receive_level_red - res.e.amount;
      }
      var timer = null;
      if ($scope.status == 0) {
        var timeout = function() {
          var ts = (new Date(res.e.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      } else if ($scope.status == 1) {
        var timeout = function() {
          var ts = (new Date(res.e.redReceiveEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
    });
    $scope.redStop = function() {
      var msg = "<h4 class='color6 wid90'>红包长大时间为自获得红包起1周内，1周后会停止生长。</h4><h4 class='color6 wid90'>红包停止生长1周后会消失。</h4>"
      message.msgShow('#myinfo', msg);
    }
    $scope.jabFriend = function() {
      $state.go('redenvelope.myjab');
    }
    $scope.jabMe = function() {
      $state.go('redenvelope.jabme');
    }
    $scope.rule = function() {
      $state.go('redenvelope.rule');
    }
    $scope.myAchieve = function() {
      $state.go('redenvelope.myachivement', {
        "tab": 0
      });
    }
    $scope.getAchieve = function() {
      $state.go('redenvelope.myachivement', {
        "tab": 1
      });
    }
    $scope.partShow=function() {
       $("#partnerWindow").fadeIn();
    }
    $scope.partClose=function() {
       $("#partnerWindow").fadeOut();
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);
//我戳过的
redEnvelopeModule.controller('myjabController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".posita").css("left", ($(window).width() - 66) / 2 + "px");
    $(".qr_wind").css("left", ($(window).width() - 200) / 2 + "px");
    $scope.tabflag = 0;
    $scope.topflag = 0;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    var flag=false;
    $scope.getMore=function(){
      if(flag){
        return;
      }
      flag=true;
      if($scope.tabflag==0){
        var params='?page='+($scope.page*1+1)+'&size=10';
        service.myClickHistory(params).then(function(res) {
          flag=false;
          $scope.myjab = $scope.myjab.concat(res.list);
          $scope.page=res.page;
          $scope.total=res.total/10;
        })
      }else{
        var params='?page='+($scope.page_2*1+1)+'&size=10';
        service.myTodayCanClick(params).then(function(res) {
          flag=false;
          $scope.canjab = $scope.canjab.concat(res.list);
          $scope.page_2=res.page;
          $scope.total_2=res.total/10;
        })
      }
    }
    $scope.getMoreInvite=function(){
      if(flag){
        return;
      }
      flag=true;
      var params='?page='+($scope.page_3*1+1)+'&size=10';
      service.getInviteList(params).then(function(res){
        flag=false;
        $scope.invitelist = $scope.invitelist.concat(res.list);;
        $scope.page_3=res.page;
        $scope.total_3=res.total/10;
      });
    }
    $scope.tabChange = function(id) {
      $scope.tabflag = id;
      if (id == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.topChange = function(id) {
      $scope.topflag = id;
    }
    $scope.shareShow = function() {
      service.myRedEnvelope().then(function(res) {
        if(res.p.busId==""){
          res.p.busId=-1
        }
        $("#qrcode").qrcode({
          width: 200, //宽度 
          height: 200, //高度 
          text: wx_share_url+"/"+res.p.busId //任意内容 
        });
        $(".share_tips").css("display", "block");
      });
    }
    $scope.shareHide = function() {
      $(".share_tips").css("display", "none");
    }
    service.myClickHistory('?page=1&size=10').then(function(res) {
      $scope.myjab = res.list;
      $scope.page=res.page;
      $scope.total=res.total/10;
    });
    service.myTodayCanClick('?page=1&size=10').then(function(res) {
      $scope.canjab = res.list;
      $scope.page_2=res.page;
      $scope.total_2=res.total/10;
    });
    service.getInviteList('?page=1&size=10').then(function(res) {
      $scope.invitelist = res.list;
      $scope.page_3=res.page;
      $scope.total_3=res.total/10;
      $scope.timesBase=res.action_base_info;
    });
    service.getTop().then(function(res) {
      $scope.toplist=res.list;
    });
    service.getChuo().then(function(res) {
      $scope.chuolist=res.list;
    });
  }
]);

//戳过我的
redEnvelopeModule.controller('jabmeController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    $(".posita").css("left", ($(window).width() - 66) / 2 + "px");
    $(".qr_wind").css("left", ($(window).width() - 200) / 2 + "px");
    $scope.tabflag = 0;
    $scope.topflag = 0;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    var flag=false;
    $scope.getMore=function(){
      if(flag){
        return;
      }
      flag=true;
      if($scope.tabflag==0){
        var params='?page='+($scope.page*1+1)+'&size=10';
        service.clickMeHistory(params).then(function(res) {
          flag=false;
          $scope.jabme = $scope.jabme.concat(res.list);
          $scope.page=res.page;
          $scope.total=res.total/10;
        })
      }else{
        var params='?page='+($scope.page_2*1+1)+'&size=10';
        service.myTodayCanClickU(params).then(function(res) {
          flag=false;
          $scope.canjab = $scope.canjab.concat(res.list);
          $scope.page_2=res.page;
          $scope.total_2=res.total/10;
        })
      }
    }
    $scope.getMoreInvite=function(){
      if(flag){
        return;
      }
      flag=true;
      var params='?page='+($scope.page_3*1+1)+'&size=10';
      service.getInviteList(params).then(function(res) {
        flag=false;
        $scope.invitelist = $scope.invitelist.concat(res.list);
        $scope.page_3=res.page;
        $scope.total_3=res.total/10;
      });
    }
    $scope.tabChange = function(id) {
      $scope.tabflag = id;
      if (id == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.topChange = function(id) {
      $scope.topflag = id;
    }
    $scope.clickFriend = function(id, clicked) {
      if (!clicked) {
        $state.go("redenvelope.friend", {
          friendId: id
        });
      }
    }
    $scope.shareShow = function() {
      service.myRedEnvelope().then(function(res) {
        if(res.p.busId==""){
          res.p.busId=-1
        }
        $("#qrcode").qrcode({
          width: 200, //宽度 
          height: 200, //高度 
          text: wx_share_url+"/"+res.p.busId //任意内容 
        });
        $(".share_tips").css("display", "block");
      });
    }
    $scope.shareHide = function() {
      $(".share_tips").css("display", "none");
    }
    service.clickMeHistory('?page=1&size=10').then(function(res) {
      $scope.jabme = res.list;
      $scope.page=res.page;
      $scope.total=res.total/10;
    });
    service.myTodayCanClickU('?page=1&size=10').then(function(res) {
      $scope.canjab = res.list;
      $scope.page_2=res.page;
      $scope.total_2=res.total/10;
    });
    service.getInviteList('?page=1&size=10').then(function(res) {
      $scope.invitelist = res.list;
      $scope.page_3=res.page;
      $scope.total_3=res.total/10;
      $scope.timesBase=res.action_base_info;
    });
    service.getTop().then(function(res) {
      $scope.toplist=res.list;
    });
    service.getChuo().then(function(res) {
      $scope.chuolist=res.list;
    });
  }
]);
//好友的红包
redEnvelopeModule.controller('friendController', ['$scope','$sce', '$state', '$stateParams', 'reEnvelopeService', 'msgService', '$timeout', 'msgService',
  function($scope,$sce, $state, $params, service, msgService, $timeout, message) {
    var host="http://";
    if (_ENV_ == 'dev') {
      $scope.Qr_code = 'qrcode_dev';
      host+="dev.";
    } else if (_ENV_ == 'test') {
      $scope.Qr_code = 'qrcode_test';
      host+="test.";
    } else {
      $scope.Qr_code = 'qrcode';
    }

    $scope.fks=__callback__.fks;
    $(".pub_window").css("left", ($(window).width() - 320) / 2 + "px");
    $("#partnerWindow").css("left", ($(window).width() - 280) / 2 + "px");
    var id = $params.friendId;
    var timer = null;
    var clickflag = false;
    var receiveFlag;
    $scope.money = 0;
    $scope.onload = false;
    service.friendRedEnvelope(id).then(function(res) {
      //第一次进入页面显示分享按钮
      hideNav('showOptionMenu');
      hideNav('showToolbar');
      if (res.e.openId == res.current_user_red_info.openId) {
        $state.go("redenvelope.myinfo", {
          friendId: "",
          friendNick: ""
        })
      }
      $scope.onload = true;
      if (res.e.status == 0) {
        $scope.status = 0;
      }
      if (res.e.status == -10) {
        $scope.status = 2;
      }
      if (res.e.status == -20) {
        $scope.status = 3;
      }
      if (res.e.status == -1) {
        $scope.status = 1;
      }
      if (res.e.status == -11) {
        $scope.status = 4;
      }
      if (res.e.redEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 9;
      }
      if (res.e.redReceiveEndTime < res.action_base_info.currentSystemTime) {
        $scope.status = 9;
      }
      if ($scope.status != 9) {
        var timeout = function() {
          var ts = (new Date(res.e.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
      $scope.nick = res.p.nick;
      $scope.openId = res.p.openId; /////tab参数
      $scope.money = res.e.amount;
      $scope.next = res.e.next_receive_level_red;
      $scope.need = (res.e.next_receive_level_red - res.e.amount).toFixed(2);
      $scope.hasReceiveAmount = res.e.hasReceiveAmount;
      $scope.is_auth = res.u.is_auth;
      $scope.partner=res.bus;
      $scope.partner.busDesc=$sce.trustAsHtml(res.bus.busDesc);

      var count=0;
      if($scope.partner.busName==""){
        var tout = function() {
          $scope.banner_flag=count%4;
          count++;
          timer = $timeout(tout, 4000);
        }
          tout();
      }else{
        var tout = function() {
          $scope.banner_flag=count%2;
          count++;
          timer = $timeout(tout, 4000);
        }
        if(res.bus.content==''){
          $scope.banner_flag=1;
        }else{
          tout();
        }
      }

      receiveFlag = res.current_user_has_receive_red;
    }, function() {
      $state.go('redenvelope.myinfo', {
        "friendId": "-1",
        "friendNick": ""
      })
    });
    $scope.clickFriend = function() {
      if ($scope.status != 0 || clickflag) {
        return;
      }
      clickflag = true;
      service.clickFriendRedEnvelope(id).then(function(res) {
        clickflag = false;
        $scope.status = -1;
        $scope.mystatus = res.current_user_has_receive_red;
        $scope.money = res.resault.ownerAmount + res.resault.ownerGetAmount;
        $scope.need = (res.resault.owner_next_receive_level_red - $scope.money).toFixed(2);
        $scope.next = res.resault.owner_next_receive_level_red;
        $scope.mymoney = res.resault.clickerAmount + res.resault.clickerGetAmount;
        $scope.myneed = res.resault.clicker_next_receive_level_red - $scope.mymoney;
        var msg = "";
        $("#hb-img").addClass('BounceIn');
        res.resault.clickerGetAmount = res.resault.clickerGetAmount.toFixed(2);
        res.resault.ownerGetAmount = res.resault.ownerGetAmount.toFixed(2);
        /*红包翻倍逻辑*/
        if (res.resault.five == true) {
          msg += "<h4 class='color6'>恭喜，你和好友都完成了实名认证，并且存在邀请关系，均获得10倍红包奖励，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包！</h4>";
        } else {
          if (res.resault.clickerGetAmount == 0) {
            msg += "<h4 class='color6'>恭喜，你获得了一个1.68元的种子红包！</h4>";
          } else if (res.resault.clickerTimes == 1) {
            msg += "<h4 class='color6'>恭喜，你获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包！</h4>";
          } else if (res.resault.clickerTimes == 2) {
            msg += "<h4 class='color6'>恭喜，你绑定了账号，红包翻倍，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包！</h4>";
          } else if (res.resault.clickerTimes == 3) {
            msg += "<h4 class='color6'>恭喜，你完成实名认证，红包翻3倍，获得了<span class='corred'>" + res.resault.clickerGetAmount + "</span>元红包！</h4>";
          }
          if (res.resault.ownerTimes == 1) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包！</h4>";
          } else if (res.resault.ownerTimes == 2) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】绑定了账号，红包翻倍，获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包！</h4>";
          } else if (res.resault.ownerTimes == 3) {
            msg += "<h4 class='color6'>【" + $scope.nick + "】完成了实名认证，获得3倍红包奖励，获得了<span class='corred'>" + res.resault.ownerGetAmount + "</span>元红包！</h4>";
          }
        }
        /*红包翻倍逻辑结束*/

        /*消息队列数组*/
        var msgArr = [{
          "type": "normal",
          "msg": msg
        }];
        if (res.owner_new_receiveLevel.id) {
          msgArr.push({
            "type": "friend",
            "level": res.owner_new_receiveLevel.level,
            "money": res.owner_new_receiveLevel.endStartAmount
          })
        };
        if (res.clicker_new_receiveLevel.id) {
          msgArr.push({
            "type": "my",
            "level": res.clicker_new_receiveLevel.level,
            "money": res.clicker_new_receiveLevel.endStartAmount
          })
        };
        /*消息队列数组结束*/
        msgService.achShow(msgArr);
      });
    }

    $scope.myInfo = function() {
      if (receiveFlag == 1) {
        $state.go("redenvelope.myinfo", {
          "friendId": $scope.openId,
          "friendNick": $scope.nick
        });
      } else {
        $state.go("redenvelope.getSeed");
      }
    }
    $scope.redStop = function() {
      var msg = "<h4 class='color6 wid90'>红包长大时间为自获得红包起1周内，1周后会停止生长。</h4><h4 class='color6 wid90'>红包停止生长1周后会消失。</h4>"
      message.msgShow('#friend', msg);
    }

    $scope.partShow=function() {
       $("#partnerWindow").fadeIn();
    }
    $scope.partClose=function() {
       $("#partnerWindow").fadeOut();
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);

//成就
redEnvelopeModule.controller('myachivementController', ['$scope', '$state', '$stateParams', 'msgService', 'reEnvelopeService', '$timeout',
  function($scope, $state, $stateParams, message, service, $timeout) {
    $scope.tab = ($stateParams.tab) ? $stateParams.tab : 0;
    $scope.tabClass = ($scope.tab == 0) ? "active_2" : "";
    $scope.tabClass2 = ($scope.tab == 0) ? "" : "active_2";
    $scope.tabChange = function(id) {
      $scope.tab = id;
      if (id == 0) {
        $scope.tabClass = "active_2";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active_2";
      }
    }
    //红包成就list
    service.myAchievement().then(function(res) {
      var redlist = [];
      var redlevellist = [];
      var status = false;
      var flag = false;
      for (var i = 0, len = res.redEnvelopeLevelList.length; i < len; i++) {
        redlevellist.push(res.redEnvelopeLevelList.endStartAmount);
      }
      for (var i = 0, len = res.redEnvelopeLevelList.length; i < len; i++) {
        for (var j = 0, jlen = res.redEnvelopeUserReceiveList.length; j < jlen; j++) {
          if (res.redEnvelopeUserReceiveList[j].receiveLevel == res.redEnvelopeLevelList[i].level) {
            res.redEnvelopeLevelList[i].receive_status = res.redEnvelopeUserReceiveList[j].receiveStatus;
            res.redEnvelopeLevelList[i].receiveAmount = res.redEnvelopeUserReceiveList[j].receiveAmount;
          }
        }
        if (res.redEnvelopeLevelList[i].receive_status == "3") {
          redlist.push(res.redEnvelopeLevelList[i]);
        } else if (res.redEnvelopeLevelList[i].receive_status == "2") {
          redlist.push(res.redEnvelopeLevelList[i]);
          if (status) {
            redlist[i].receive_status = "0"
          }
          status = true;
        } else {
          if (!flag) {
            res.redEnvelopeLevelList[i].receive_status = "1";
            flag = true;
          } else {
            res.redEnvelopeLevelList[i].receive_status = "4";
          }
          redlist.push(res.redEnvelopeLevelList[i]);
        }
      }
      $scope.list = redlist;
    });
    //个人信息
    service.myRedEnvelope().then(function(res) {
      $scope.times = res.current_user_red_info.times;
      $scope.amount = res.current_user_red_info.amount;
      $scope.recieveAmount = res.e.hasReceiveAmount;
      $scope.inviteCode = res.u.id;
      $scope.is_auth = res.u.is_auth;
      var timer = null;
      if (res.current_user_red_info.redEndTime < new Date() && new Date() < res.current_user_red_info.redReceiveEndTime) {
        $scope.status = 1;
        var timeout = function() {
          var ts = (new Date(res.current_user_red_info.redEndTime * 1)) - (new Date());
          $scope.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
          $scope.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);
          $scope.min = parseInt(ts / 1000 / 60 % 60, 10);
          $scope.sec = parseInt(ts / 1000 % 60, 10);
          timer = $timeout(timeout, 1000);
        }
        timeout();
      }
    });
    //领红包
    var flag=false;
    $scope.getCash = function(index, level) {
      if(flag){
        return;
      }
      flag=true;
      service.receiveRedEnvelopeToRebate(level).then(function(res) {
        flag=false;
        if (res.code == 1) {
          $scope.list[index].receive_status = "3";
          if ($scope.list[index + 1].receive_status == "0") {
            $scope.list[index + 1].receive_status = "2";
          }
          $scope.recieveAmount = res.current_user_red_info.hasReceiveAmount;
          var msg = "<h4 class='color6'>恭喜，成功领取<span class='corred'>关卡" + level + "</span>返利</h4>";
          msg += "<h4 class='color6'>您领取的返利已达到<span class='corred'>" + res.current_user_red_info.hasReceiveAmount + "</span>元！</h4>";
          message.msgShow('#myachivement', msg);
        } else {
          message.errMsgByCode(res.code);
        }
      });
    }

    //领取攻略
    $scope.showTips = function(selector, hide) {
      $(selector).css("left", ($(window).width() - 320) / 2 + "px");
      $(selector).css('display', 'block');
      $(selector).addClass('BounceIn');
      if ($(hide).attr('class').indexOf('BounceIn') != -1) {
        $scope.hideTips(hide);
      }
    }
    $scope.hideTips = function(selector) {
      $(selector).removeClass('BounceIn');
      $(selector).addClass('BounceOut');
      $timeout(function() {
        $(selector).removeClass('BounceOut');
        $(selector).css('display', 'none');
      }, 1000);
    }
    // 清理工作
    // $scope.$on('$destroy', function() {
    //   if (timer) {
    //     $timeout.cancel(timer);
    //   }
    // });
  }
]);

//活动规则
redEnvelopeModule.controller('ruleController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    if (_ENV_ == 'dev') {
      $scope.Qr_code = 'qrcode_dev';
    } else if (_ENV_ == 'test') {
      $scope.Qr_code = 'qrcode_test';
    } else {
      $scope.Qr_code = 'qrcode';
    }
  }
]);
//活动结束
redEnvelopeModule.controller('actendController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {
    if (_ENV_ == 'dev') {
      $scope.Qr_code = 'qrcode_dev';
    } else if (_ENV_ == 'test') {
      $scope.Qr_code = 'qrcode_test';
    } else {
      $scope.Qr_code = 'qrcode';
    }
  }
]);
//服务协议
redEnvelopeModule.controller('agreementController', ['$scope', '$state', 'reEnvelopeService', '$timeout',
  function($scope, $state, service, $timeout) {

  }
]);


//注册绑定
redEnvelopeModule.controller('registController', ['$scope', '$state', '$timeout', 'reEnvelopeService', 'msgService', 'cookieService',
  function($scope, $state, $timeout, service, message, cookieService) {
    $scope.reg = {};
    $scope.bind = {};
    service.getInviteCode().then(function(res) {
      if (res.invitecode != -1) {
        $scope.reg.randkey = res.invitecode;
      }
    });
    $(".posita").css("left", ($(window).width() - 66) / 2 + "px");
    $scope.regtype = 0;
    $scope.recieve = true;
    $scope.tabClass = "active";
    $scope.tabClass2 = "";
    $scope.imgUrl = "/p/imgcode";
    $scope.codeDisabled = false; //验证码发送状态
    $scope.msgCount = cookieService.getCookie('msgCount') || 0;; //验证码发送次数
    $scope.desableTime = 0; //倒计时
    $scope.tabChange = function(type) {
      $scope.regtype = type;
      if (type == 0) {
        $scope.tabClass = "active";
        $scope.tabClass2 = "";
      } else {
        $scope.tabClass = "";
        $scope.tabClass2 = "active";
      }
    }
    $scope.accessRadioClick = function() {
      $scope.recieve = !$scope.recieve;
    }

    //图片验证码
    $scope.imgCodeRefresh = function() {
      $scope.imgUrl = "/p/imgcode?v=" + new Date() * 1;
    }
    //短信验证码
    $scope.msgCode = function(verifytype) {
      $scope.clickType = 1;
      var params = {};
      if (verifytype == 1) {
        if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.reg.mobile;
        params["verifyType"] = "register";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.reg.imgcode;
        }
      } else if (verifytype == 2) {
        if (!$scope.bind.mobile || $scope.bind.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.bind.mobile;
        params["verifyType"] = "login";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.bind.imgcode;
        }
      }
      params["type"] = 1;
      service.checkPhone({
        "phone": $scope.reg.mobile
      }).then(function(res) {
        if (res.code != -3) {
          service.msgCode(params).then(function(res) {
            if (res.code == 0) {
              var mcount = cookieService.getCookie('msgCount') || 0;
              mcount = mcount * 1;
              mcount++;
              cookieService.setCookie('msgCount', mcount, '600');
              $scope.msgCount = mcount;
              $scope.codeDisabled = true;
              $scope.desableTime = 180;
              var timeout = function() {
                if ($scope.desableTime > 0) {
                  $scope.desableTime--
                } else {
                  $timeout.cancel(timer);
                  $scope.codeDisabled = false;
                }
                timer = $timeout(timeout, 1000);
              }
              timeout();
            } else {
              message.errShow(res.message);
              if (res.message.indexOf('图形验证码') != -1) {
                $scope.msgCount = 3;
              }
            }
          });
        } else {
          message.errShow(res.message);
        }
      });
    }
    //语音验证码
    $scope.voiceCode = function(verifytype) {
      var params = {};
      $scope.clickType = 2;
      if (verifytype == 1) {
        if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.reg.mobile;
        params["verifyType"] = "register";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.reg.imgcode;
        }
      } else if (verifytype == 2) {
        if (!$scope.bind.mobile || $scope.bind.mobile.length != 11) {
          message.errShow("请输入正确的手机号");
          return;
        }
        params["phone"] = $scope.bind.mobile;
        params["verifyType"] = "login";
        if ($scope.msgCount > 2) {
          params["imgcode"] = $scope.bind.imgcode;
        }
      }
      params["type"] = 2;
      service.checkPhone({
        "phone": $scope.reg.mobile
      }).then(function(res) {
        if (res.code != -3) {
          service.msgCode(params).then(function(res) {
            if (res.code == 0) {
              var mcount = cookieService.getCookie('msgCount') || 0;
              mcount = mcount * 1;
              mcount++;
              cookieService.setCookie('msgCount', mcount, '600');
              $scope.codeDisabled = true;
              $scope.desableTime = 180;
              var timeout = function() {
                if ($scope.desableTime > 0) {
                  $scope.desableTime--
                } else {
                  $timeout.cancel(timer);
                  $scope.codeDisabled = false;
                }
                timer = $timeout(timeout, 1000);
              }
              timeout();
            } else {
              message.errShow(res.message);
              if (res.message.indexOf('图形验证码') != -1) {
                $scope.msgCount = 3;
              }
            }
          });
        } else {
          message.errShow(res.message);
        }
      });
    }

    //新用户注册
    $scope.singIn = function() {
      console.log($scope.reg.mobile);
      if (!$scope.reg.mobile || $scope.reg.mobile.length != 11) {
        message.errShow("请输入正确的手机号");
        return;
      }
      if (!$scope.reg.msgcode || $scope.reg.msgcode.length != 6) {
        message.errShow("请输入正确的手机验证码");
        return;
      }
      if (!$scope.reg.loginPwd || $scope.reg.loginPwd.length < 6 || $scope.reg.loginPwd.length > 14) {
        message.errShow("密码长度为6-14位");
        return;
      }
      if (!$scope.reg.tradePwd || $scope.reg.tradePwd.length < 6 || $scope.reg.tradePwd.length > 14) {
        message.errShow("交易密码长度为6-14位");
        return;
      }
      if (!$scope.reg.nickName || $scope.reg.nickName.length < 2 || $scope.reg.nickName.length > 10 || $scope.reg.nickName.substr(0, 1) == "_") {
        message.errShow("请输入合法昵称");
        return;
      }
      if ($scope.reg.randkey && ($scope.reg.randkey + "").length != 8 && ($scope.reg.randkey + "").length != 11) {
        message.errShow("请输入合法推荐码");
        return;
      }
      var params = {};
      params["phone"] = $scope.reg.mobile;
      params["verifyCode"] = $scope.reg.msgcode;
      params["loginPwd"] = $scope.reg.loginPwd;
      params["tradePwd"] = $scope.reg.tradePwd;
      params["nickName"] = $scope.reg.nickName;
      params["randKey"] = $scope.reg.randkey;
      params["verifyType"] = "register";
      service.singIn(params).then(function(res) {
        var url = "http://friend.duomeidai.com/p/a/reserve/refreshstatus?t_userId=" + res.uid;
        switch (location.host) {
          case "dev.red.duomeidai.com":
            url = "http://dev.broker.web.duomeidai.com/p/a/reserve/refreshstatus?t_userId=" + res.uid;
            break;
          case "test.red.duomeidai.com":
            url = "http://test.broker.web.duomeidai.com/p/a/reserve/refreshstatus?t_userId=" + res.uid;
            break;
          case "red.duomeidai.com":
            url = "http://friend.duomeidai.com/p/a/reserve/refreshstatus?t_userId=" + res.uid;
            break;
          default:
             url = "http://friend.duomeidai.com/p/a/reserve/refreshstatus?t_userId=" + res.uid;
        }
        $.ajax({type: 'GET', url: url, async: false,dataType: "jsonp",jsonp: "callback",jsonpCallback:"callback", success: function(data){}});

        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 1,
            extra: res.rebate
          });
        } else {
          message.errShow(res.message);
          if (res.message.indexOf('图形验证码') != -1) {
            $scope.msgCount = 3;
          }
        }
      });
    };
    //绑定已有账号
    $scope.bindUser = function() {
      if ($scope.bind.mobile.length != 11) {
        message.errShow("请输入正确的手机号");
        return;
      }
      if ($scope.bind.msgcode.length != 6) {
        message.errShow("请输入正确的手机验证码");
        return;
      }
      var params = {};
      params["phone"] = $scope.bind.mobile;
      params["verifyCode"] = $scope.bind.msgcode;
      params["verifyType"] = "login";
      service.bindUser(params).then(function(res) {
        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 2,
            extra: ''
          });
        } else {
          message.errShow(res.message);
          if (res.message.indexOf('图形验证码') != -1) {
            $scope.msgCount = 3;
          }
        }
      });
    }
  }
]);

//实名认证
redEnvelopeModule.controller('realnameController', ['$scope', '$state', '$timeout', 'reEnvelopeService', 'msgService',
  function($scope, $state, $timeout, service, message) {
    $scope.real = {};
    $scope.checkRealName = function() {
      if (!$scope.real.realname || $scope.real.realname.length < 2) {
        message.errShow("请输入正确的姓名");
        return;
      }
      if (!$scope.real.idcard || $scope.real.idcard.length != 18) {
        message.errShow("请输入正确的身份证号码");
        return;
      }
      var params = {};
      params["realName"] = $scope.real.realname;
      params["idNo"] = $scope.real.idcard;
      service.doRealNameAuth(params).then(function(res) {
        if (res.code == 0) {
          $state.go("redenvelope.regsuccess", {
            regtype: 3,
            extra: ''
          });
        } else {
          if (res.code == -18) {
            message.errShow('请先在多美贷平台充值再认证！');
          } else {
            message.errShow(res.message);
          }
        }
      })
    }
  }
]);

//注册结果页
redEnvelopeModule.controller('regsuccessController', ['$scope', '$state', '$timeout', '$stateParams', 'reEnvelopeService',
  function($scope, $state, $timeout, $stateParams, service) {
    $(".pub_window").css("left", ($(window).width() - 320) / 2 + "px");
    $scope.extra = $stateParams.extra;
    $scope.regtype = $stateParams.regtype;
    if ($scope.regtype == 1 || $scope.regtype == 2) {
      $("#zdzz").css('display', 'block');
      $("#zdzz").addClass('BounceIn');
      $timeout(function() {
        $("#zdzz").addClass('BounceOut');
        $timeout(function() {
          $("#zdzz").css('display', 'none');
        }, 1000);
      }, 2000);
    }
    if ($scope.regtype == 3) {
      $("#ymzs").css('display', 'block');
      $("#ymzs").addClass('BounceIn');
      $timeout(function() {
        $("#ymzs").addClass('BounceOut');
        $timeout(function() {
          $("#zdzz").css('display', 'none');
        }, 1000);
      }, 2000);
    }
    service.myRedEnvelope().then(function(res) {
      $scope.time = res.times;
      $scope.ach_amount = res.e.ach_amount
      $scope.isauth = res.u.is_auth;
      $scope.money = res.current_user_red_info.amount - res.current_user_red_info.hasReceiveAmount;
    });
  }
]);