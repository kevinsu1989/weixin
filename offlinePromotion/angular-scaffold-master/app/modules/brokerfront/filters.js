brokerFrontModule.filter('timefilter', function () {
  return function (time) {
  	if(time*1<10){
  		time="0"+time;
  	}
    return time;
  };
});
brokerFrontModule.filter('moneyfilter', function () {
  return function (money) {
    return (money*1).toFixed(2);
  };
});
brokerFrontModule.filter('timeLine', function () {
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

brokerFrontModule.filter('invitefilter', function () {
  return function (type) {
    if(type==1){
      return "预约";
    }
    if(type==2){
      return "成功";
    }
    if(type==3){
      return "失败";
    }
  };
});