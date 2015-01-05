clientModule.filter("investerFilter",function(){
  return function (a) {
      if(a==''){
        return '暂无';
      }else{
      	return a;
      }
  };
})
clientModule.filter('moneyfilter', function () {
  return function (money) {
    if(money){
      return (money*1).toFixed(2);
    }else{
      return 0.00;
    }
  };
});