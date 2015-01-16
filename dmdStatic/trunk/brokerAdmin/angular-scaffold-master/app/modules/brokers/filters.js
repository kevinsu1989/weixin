brokersModule.filter("brokerType",function(){
  return function (a) {
      a=a*1;
  		var ret="";
  		switch(a){
  			case 0:
  				ret="全职";
  				break;
  			case 1:
  				ret="兼职";
  				break;
  			default:
  				ret="全职";
  				break;
  		}
      	return ret;
  };
})
brokersModule.filter("brokerStatus",function(){
  return function (a) {
      a=a*1;
  		var ret="";
  		switch(a){
  			case 0:
  				ret="在职";
  				break;
  			case 1:
  				ret="离职";
  				break;
  			default:
  				ret="在职";
  				break;
  		}
      	return ret;
  };
})
brokersModule.filter("codeStatus",function(){
  return function (a) {
      a=a*1;
      var ret="";
      switch(a){
        case -1:
          ret="已停用";
          break;
        case 0:
          ret="全部";
          break;
          case 1:
          ret="未使用";
          break;
          case 2:
          ret="已使用";
          break;
        default:
          ret="全部";
          break;
      }
        return ret;
  };
})
brokersModule.filter("userTime",function(){
  return function (a) {
      if (a == "-1") {
        return "-";
      }else{
        return "date:'yyyy-MM-dd HH:mm'";
      };
  };
})
brokersModule.filter("qrcodeStatus",function(){
  return function (a) {
      if (a == '-1') {
        return "启动";
      }else{
        return "停用";
      };
  };
})
brokersModule.filter("qrcodeChange",function(){
  return function (a) {
      if (a == '-1') {
        return "启动";
      }else{
        return "停用";
      };
  };
})