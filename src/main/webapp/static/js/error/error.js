/**
 * Created by hjk on 2017/3/4.
 */
var depends = [

    {name: "utils"},
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "floatWindow" }

];

modular.define({name:"error.error"},depends,function(){
	var utils=this.utils;
	(function(){
		var params=location.href.split("?")[1].split("&")
		var paraObj={};
		for(var i in params){
			var split=params[i].split("=");
			paraObj[split[0]]=decodeURI(split[1]);
		}
		document.getElementById("message").innerHTML=paraObj.message;	
		console.log("error code:"+paraObj.code);
		if(paraObj.code=="security.web.access.nologin"||paraObj.code=="security.web.session.timeout"){
			var time=30;
			showWindow("#timeout");
			t(time);
			$("#timeout").delegate(".confirm","click",function(){
				modular.topModular().win.location.href=utils.common.url.rewrite("");
			});
			function t(s){
				$("#timeout .time").text(s);
				if(s>0){
					time--;
					setTimeout(function(){
						t(time);						
					},1000)
				}else{
					modular.topModular().win.location.href=utils.common.url.rewrite("");
				}
			}
			
		}
	})();

});