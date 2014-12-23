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
