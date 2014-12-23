redEnvelopeModule.filter('timefilter', function () {
  return function (time) {
  	if(time*1<10){
  		time="0"+time;
  	}
    return time;
  };
});
redEnvelopeModule.filter('moneyfilter', function () {
  return function (money) {
    if(money){
      return (money*1).toFixed(2);
    }else{
      return 0.00;
    }
  };
});
redEnvelopeModule.filter('namefilter', function () {
  return function (name,len) {
    if(name.length>len){
      return name.substring(0,len);
    }
    else{
      return name;
    }
  };
});
redEnvelopeModule.filter('timeLine', function () {
  return function (time) {
    var dt=new Date()*1;
    var timeDif=(dt-time)/1000;
    if(timeDif<60){
      return "刚刚";
    }
    if(timeDif<3600){
      return (timeDif/60).toFixed(0)+"分钟前";
    }
    if(timeDif<3600*24){
      return (timeDif/3600).toFixed(0)+"小时前";
    }
  return (timeDif/(3600*24)).toFixed(0)+"天前";
    //return (money*1).toFixed(2);
  };
});
redEnvelopeModule.filter('times', function () {
  return function (is_auth,type,number) {
    if(type==2){
      if(is_auth=='true'){
        return number.inviteFriendAuthAddBeCount;
      }else{
        return number.inviteFriendAddBeCount;
      }
    }else if(type==1){
      if(is_auth=='true'){
        return number.inviteFriendAuthAddCount;
      }else{
        return number.inviteFriendAddCount;
      }
    }
  };
});