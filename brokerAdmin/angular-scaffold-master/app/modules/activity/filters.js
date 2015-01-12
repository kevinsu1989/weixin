activityModule.filter("investererFilter",function(){
  return function (a) {
      if(a==''){
        return '暂无';
      }else{
      	return ret;
      }
  };
})
activityModule.filter("awardFilter",function(){
  return function (a) {
      if(a=='0'){
        return '未发放';
      }else if(a=='1'){
      	return '已发放';
      }
  };
})

activityModule.filter("activityStatus",function(){
  return function (a) {
      if(a=='1'){
        return '线上';
      }
      else if(a=="0"){
        return '预上线';
      }
      else if(a=="2"){
        return '线下';
      }
  };
})

activityModule.filter("actStatus",function(){
  return function (a) {
      if(a=='1'){
        return '下线';
      }
      else if(a=="0"){
        return '上线';
      }
      else if(a=="2"){
        return '上线';
      }
  };
})
