/**
 * 
 */

var depends = [
    {name:"jquery"}, 
    {name:"video"},
    {name:"utils"},
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" }
  
];

modular.define({name: "index.video"}, depends, function () {
	var utils=this.utils;
	top.u=this.utils;
	
	$(function(){
		
		var url={
				"test":{
					"mp4":"http://220.178.60.10:8028/dualreferral/ecg/video/ecgUse.mp4",
					"webm":"http://220.178.60.10:8028/dualreferral/ecg/video/ecgUse.mp4",
					"ogg":"http://220.178.60.10:8028/dualreferral/ecg/video/ecgUse.mp4"
				},
				//一体机使用方法
				ecgUse:{
					mp4:"ecgUse.mp4",
					title:"一体机使用方法",
					speaker:""
				},
				//心电图相关知识 主讲人：卢喜烈
				xdt:{
					mp4:"xdt.mp4",
					title:"心电图相关知识 ",
					speaker:"卢喜烈"
				},
				//尿液常规检查-样片 主讲人：李传保
				ny:{
					mp4:"ny.mp4",
					title:"尿液常规检查-样片 ",
					speaker:"李传保"
				},
				//呼吸与相关疾病 主讲人：李春昌
				huxi:{
					mp4:"huxi.mp4",
					title:"呼吸与相关疾病",
					speaker:"李春昌"
				},
				//<<尿常规与相关疾病>> 主讲人：李春昌
				ncg:{
					mp4:"ncg.mp4",
					title:"尿常规与相关疾病",
					speaker:"李春昌"
				},
				//<<血糖与相关疾病>> 主讲人：李春昌
				xuetang:{
					mp4:"xuetang.mp4",
					title:"血糖与相关疾病",
					speaker:"李春昌"
				},
				//<<血压与相关疾病>> 主讲人：李春昌
				xueya:{
					mp4:"xueya.mp4",
					title:"血压与相关疾病",
					speaker:"李春昌"
				},
				//<<脉率与相关疾病>> 主讲人：李春昌
				mailv:{
					mp4:"mailv.mp4",
					title:"脉率与相关疾病",
					speaker:"李春昌"
				},
				//<<血氧饱和度与相关疾病>> 主讲人：李春昌
				xueyang:{
					mp4:"xueyang.mp4",
					title:"血氧饱和度与相关疾病",
					speaker:"李春昌"
				},
				//<<体温与相关疾病>> 主讲人：李春昌
				tiwen:{
					mp4:"tiwen.mp4",
					title:"体温与相关疾病",
					speaker:"李春昌"
				},
				//<<心率与相关疾病>> 主讲人：李春昌
				xinlv:{
					mp4:"xinlv.mp4",
					title:"心率与相关疾病",
					speaker:"李春昌"
				}
		}
		var urlBase="../../static/video/"
		var videoName=utils.common.url.getParam(window.location.href,"videoName");
		if(videoName!=null&&videoName!=""){
			var v='<source src="'+urlBase+url[videoName]["mp4"]+'" type="video/mp4">'
					+'<source src="'+urlBase+url[videoName]["webm"]+'" type="video/webm">'
					+'<source src="'+urlBase+url[videoName]["ogg"]+'" type="video/ogg">';
			$("video").append(v);
		};
		
		var myPlayer = videojs('my-video');
		videojs("my-video").ready(function(){
			var myPlayer = this;
			myPlayer.play();
		});
	})
	
	
	
});
