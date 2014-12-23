/* global homeModule:true */

redEnvelopeModule.factory('reEnvelopeService', ['$http',
  function ($http) {
    //var path="http://peon.cn";
    var path="";
    return {
      getUserInfo: function () {
        return $http({
          url: path+'/p/red/user/-1',
          method: 'get'
        });
      },

      firstRedEnvelope: function () {
        return $http({
          url: '/p/red/seed/receive',
          method: 'post'
        });
      },
      myRedEnvelope:function(){
        return $http({
          url: path+'/p/red/envelope/-1',
          method: 'get'
        });
      },
      myClickHistory:function(params){
        return $http({
          url: '/p/red/clickhistory/c/-1'+params,
          method: 'get'
        });
      },
      myTodayCanClick:function(params){
        return $http({
          url: '/p/red/todayclick/c/-1'+params,
          method: 'get'
        });
      },
      myTodayCanClickU:function(params){
        return $http({
          url: '/p/red/todayclick/u/-1'+params,
          method: 'get'
        });
      },
      clickMeHistory:function(params){
        return $http({
          url: '/p/red/clickhistory/u/-1'+params,
          method: 'get'
        });
      },
      getInviteList:function(params){
        return $http({
          url: '/p/a/inviteFriend'+params,
          method: 'get'
        });
      },
      myTodayCanClickMe:function(){
        return $http({
          url: '/p/red/todayclick/u/-1',
          method: 'get'
        });
      },
      friendRedEnvelope:function(id){
        return $http({
          url: '/p/red/friendenvelope/'+id,
          method: 'get'
        });
      },
      clickFriendRedEnvelope:function(id){
        return $http({
          url: '/p/red/friendenvelope/click/'+id,
          method: 'post'
        });
      },
      hasRedEnvelope:function(){
        return $http({
          url: 'interface/redenvelope/hasRedEnvelope.json',
          method: 'get'
        });
      },
      myAchievement:function(){
        return $http({
          url: '/p/red/achievement/list/-1',
          method: 'get'
        });
      },
      receiveRedEnvelopeToRebate:function(level){
        return $http({
          url: '/p/u/red/rebate/receive/'+level,
          method: 'post'
        });
      },
      doRealNameAuth:function(params){
        return $http({
          url: '/p/u/auth',
          method: 'post',
          params:params
        });
      },
      singIn:function(params){
        return $http({
          url: '/p/reg',
          method: 'post',
          params:params
        });
      },
      bindUser:function(params){
        return $http({
          url: '/p/login',
          method: 'post',
          params:params
        });
      },
      msgCode:function(params){
        return $http({
          url: '/p/verifycode',
          method: 'get',
          params:params
        });
      },
      checkPhone:function(params){
        return $http({
          url: '/p/check/phone',
          method: 'post',
          params:params
        });
      },
      checkNick:function(params){
        return $http({
          url: '/p/check/nick',
          method: 'post',
          params:params
        });
      },
      getInviteCode:function(){
        return $http({
          url: '/p/red/invitecode',
          method: 'get'
        });
      },
      getTop:function(){
        return $http({
          url: '/wx/a/top10_2?limit=20',
          method: 'get'
        });
      },
      getChuo:function(){
        return $http({
          url: '/p/red/friend/a/random',
          method: 'get'
        });
      }
    };
    // return {

    //   getUserInfo: function () {
    //     return $http({
    //       url: 'interface/redenvelope/getUserInfo.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },

    //   firstRedEnvelope: function () {
    //     return $http({
    //       url: 'interface/redenvelope/firstRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myClickHistory:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myClickHistory.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myTodayCanClick:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myTodayCanClick.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   clickMeHistory:function(){
    //     return $http({
    //       url: 'interface/redenvelope/clickMeHistory.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   friendRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/friendRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   clickFriendRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/clickFriendRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   hasRedEnvelope:function(){
    //     return $http({
    //       url: 'interface/redenvelope/hasRedEnvelope.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   myAchievement:function(){
    //     return $http({
    //       url: 'interface/redenvelope/myAchievement.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   receiveRedEnvelopeToRebate:function(){
    //     return $http({
    //       url: 'interface/redenvelope/receiveRedEnvelopeToRebate.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doLogin:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doLogin.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doReg:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doReg.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   },
    //   doRealNameAuth:function(){
    //     return $http({
    //       url: 'interface/redenvelope/doRealNameAuth.json',
    //       method: 'get',
    //       cache: true
    //     });
    //   }
    // };
  }
]);

redEnvelopeModule.factory('msgService',['$timeout',function ($timeout) {
  return {
    achShow: function (msgArr) {
      if(msgArr.length==1){
        $(".tips_t").html(msgArr[0].msg);
        $(".tips_t").css('display', 'block');
          $(".tips_t").addClass('BounceIn');
          $timeout(function() {
            $(".tips_t").addClass('BounceOut');
            $timeout(function() {
              $(".tips_t").css('display', 'none');
            }, 1000);
        }, 3000);
      }else if(msgArr.length==2){
        var htmlStr=""
        htmlStr+="<h2>关卡"+msgArr[1].level+"</h2>";
        htmlStr+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[1].money+"</span>元返利</h4>";
        htmlStr+="<div class='cj_2'>"
        htmlStr+=msgArr[0].msg;
        htmlStr+="</div>";
        if(msgArr[1].type=="friend"){
          $(".frd_cj").html(htmlStr);
          $(".frd_cj").css("top","15%");
          $(".frd_cj").css('display', 'block');
            $(".frd_cj").addClass('BounceIn');
            $timeout(function() {
              $(".frd_cj").addClass('BounceOut');
              $timeout(function() {
                $(".frd_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        }else if(msgArr[1].type=="my"){
          $(".my_cj").html(htmlStr);
          $(".my_cj").css("top","15%");
          $(".my_cj").css('display', 'block');
            $(".my_cj").addClass('BounceIn');
            $timeout(function() {
              $(".my_cj").addClass('BounceOut');
              $timeout(function() {
                $(".my_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        }
      }else if(msgArr.length==3){
        var htmlStr=""
        var htmlStr2=""
        htmlStr+="<h2>关卡"+msgArr[2].level+"</h2>";
        htmlStr+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[2].money+"</span>元返利</h4>";
        htmlStr+="<div class='cj_2'>"
        htmlStr+=msgArr[0].msg;
        htmlStr+="</div>";
        htmlStr2+="<h2>关卡"+msgArr[1].level+"</h2>";
        htmlStr2+="<h4 class='color6 padt1'>可领取<span class='corred'>"+msgArr[1].money+"</span>元返利</h4>";
        $(".my_cj").html(htmlStr);
        $(".frd_cj").html(htmlStr2);
        $(".my_cj").css("top","37%");
        $(".frd_cj").css("top","2%");
        $(".frd_cj").css('display', 'block');
          $(".frd_cj").addClass('BounceIn');
          $timeout(function() {
            $(".frd_cj").addClass('BounceOut');
            $timeout(function() {
              $(".frd_cj").css('display', 'none');
            }, 1000);
        }, 5000);
        $timeout(function(){
          $(".my_cj").html(htmlStr);
          $(".my_cj").css('display', 'block');
            $(".my_cj").addClass('BounceIn');
            $timeout(function() {
              $(".my_cj").addClass('BounceOut');
              $timeout(function() {
                $(".my_cj").css('display', 'none');
              }, 1000);
          }, 5000);
        },200);
      }
    },
    msgShow:function(selector,msg){
      var container="<div class='pub_window tips_t' style='display:none;top:25%;'></div>";
      var JObj=$(container);
      $(selector).append(JObj);
      JObj.html(msg);
      JObj.css("left",($(window).width()-320)/2+"px");
      JObj.css('display', 'block');
      JObj.addClass('BounceIn');    
      $timeout(function() {
        JObj.removeClass('BounceIn');  
        JObj.addClass('BounceOut');     
        $timeout(function(){
          JObj.removeClass('BounceOut');  
          JObj.css('display', 'none');
          $(selector).remove(JObj); 
        },1000); 
      },3000);
    },
    errShow:function(msg){
      $("#errBoxText").html(msg);
      $("#errBox").css("display","block");
      $timeout(function(){
        $("#errBox").css("display","none");  
      },1500)
    },
    errMsgByCode:function(code){
      var mshow = function(msg){
        $("#errBoxText").html(msg);
        $("#errBox").css("display","block");
        $timeout(function(){
          $("#errBox").css("display","none");  
        },1500)
      };
      switch(code){
        case -1:
          mshow("用户未登录");
          break;
        case -21:
          mshow("红包已失效");
          break;
        case -22:
          mshow("活动暂停");
          break;
        case -40:
          mshow("已经领取过了");
          break;
        case -41:
          mshow("用户还未到该等级");
          break;
        case -42:
          mshow("领取等级不在范围内");
          break;
        case -43:
          mshow("不允许领取");
          break;
        case -44:
          mshow("账户未找到");
          break;
        default:
          break;
      }
    }
  }
}]);
      

redEnvelopeModule.factory('cookieService',['$timeout',function ($timeout) {
  return {
    setCookie:function(name,value,time)
    {
      var exp = new Date();
      exp.setTime(exp.getTime() + time*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie:function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return (arr[2]);
      }else{
        return null;
      }
    },
    delCookie:function(name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
    }
  }
}]);