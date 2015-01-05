  	var wx_share_img_url="http://dev.static.duomeidai.com/redenvelope/img/wx120.jpg"
  	var wx_share_title="我帮助好友红包长大，自己也领到了红包，你也来试试吧！";
  	var wx_share_desc="多美贷的红包会长大！好友越多，红包越大！最高1000元的红包等着你！";
  	if (typeof WeixinJSBridge == "undefined"){
	    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	    }else if (document.attachEvent){
	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	}
	function clocseWin(){
		
		
		WeixinJSBridge.invoke('closeWindow',{},function(res){

		    //alert(res.err_msg);
		    return false;

		});
	}


	function onBridgeReady(f){
	 WeixinJSBridge.call(f);
	}
	function hideNav(f){
		
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		    }
		}else{
		    onBridgeReady(f);
		}
	}
	hideNav('showToolbar');
	
	function getNet(){
		
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		    }
		}else{
				WeixinJSBridge.invoke('getNetworkType',{},
			 		function(e){
			 	    	//alert(e.err_msg);
			 	    });
		}
	}
	
	
	
	function sendMessage(){
		
		if(document.addEventListener){
			document.addEventListener('WeixinJSBridgeReady', sendMessage, false);  }else if(document.attachEvent){
			document.attachEvent('WeixinJSBridgeReady'   , sendMessage);	document.attachEvent('onWeixinJSBridgeReady' , sendMessage); 
		}
		
		
		
		
		
	    WeixinJSBridge.on('menu:share:appmessage', function(argv){
	 
	        WeixinJSBridge.invoke('sendAppMessage',{
	 
					"appid":wx_share_appid,                                              //appid ÉèÖÃ¿Õ¾ÍºÃÁË¡£
					"img_url":	 wx_share_img_url,                                   //·ÖÏíÊ±Ëù´øµÄÍ¼Æ¬Â·¾¶
					"img_width":	"120",                            //Í¼Æ¬¿í¶È
					"img_height":	"120",                            //Í¼Æ¬¸ß¶È
					"link":wx_share_url,                          //·ÖÏí¸½´øÁ´½ÓµØÖ·
					"desc":wx_share_desc,                            //·ÖÏíÄÚÈÝ½éÉÜ
					"title":wx_share_title
				}, function(res){
					//alert(res);
				/*** »Øµ÷º¯Êý£¬×îºÃÉèÖÃÎª¿Õ ***/
	 
	    });
	 
	   });
	    
	    
	    
	    
	    
	    
	    WeixinJSBridge.on('menu:share:timeline', function(argv){
	    	 
	        WeixinJSBridge.invoke('shareTimeline',{
	   
	  				"appid":wx_share_appid,                                              //appid ÉèÖÃ¿Õ¾ÍºÃÁË¡£
	  				"img_url":	 wx_share_img_url,                                   //·ÖÏíÊ±Ëù´øµÄÍ¼Æ¬Â·¾¶
					"img_width":	"120",                            //Í¼Æ¬¿í¶È
					"img_height":	"120",                            //Í¼Æ¬¸ß¶È
					"link":wx_share_url,                          //·ÖÏí¸½´øÁ´½ÓµØÖ·
					"desc":wx_share_desc,                            //·ÖÏíÄÚÈÝ½éÉÜ
					"title":wx_share_title
	  			}, function(res){
	  				//alert(res);
	  				/*** »Øµ÷º¯Êý£¬×îºÃÉèÖÃÎª¿Õ ***/});
	   
	   });   
	   
	    
	    
	    WeixinJSBridge.on('menu:share:weibo', function(argv){
			WeixinJSBridge.invoke('shareWeibo',{
			"content":""+"'"+wx_share_title+"'"+" "+wx_share_url,
			"url":""+wx_share_url
			}, function(res){
			//	alert(res);
			});
		});
	    
	 
	    
	}
	 
	sendMessage();