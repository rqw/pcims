/**
 * Created by hjk on 2017/3/4.
 */
var depends = [
	{name: "font-awesome",type:"css"},  
	{name: "hjkplug",type:"css"},
	{name:"index",type:"css"},
	{name: "jquery"},
	{name:"listMenu"},
	{name: "bootstrap"}
];

modular.define({name:"index.platform"},depends,function(){
	var listMenu=this.listMenu;
    //页面布局模块处理
    var resetFrame=function(){
        var topHeight=45;
        var bottomHeight=30;
        var contentHeight=$(window).height()-topHeight-bottomHeight;
        $(".content").height(contentHeight);
        //iframe 父容器高度
        setIframeParentContainerHeight();
    }
    var toggleSider=function(selector){
        var isExpanding=$(selector).hasClass("collapse");
        if(isExpanding){
            $(selector).removeClass("collapse")
        }else{
            $(selector).addClass("collapse")
        }
    }
    $("body").delegate(".main-sidebar .toggle-btn","click",function(){
        toggleSider(".main-sidebar")
    })
    function collapse(){

    }
    //iframe 父容器高度
    var setIframeParentContainerHeight=function(){
        var topbarHeight=45;
        var bottombarHeight=30;
        var IframeParentContainerHeight=$(window).height()-topbarHeight-bottombarHeight;
        $(".main-content").height(IframeParentContainerHeight)
        //设置iframe容器高度
        var tabsbarHeight=$(".tabsbar").height();
        var mainIFrameHeight=IframeParentContainerHeight-tabsbarHeight;
        $(".main-iframe").height(mainIFrameHeight)
    }
    resetFrame();
    $(window).resize(resetFrame);
    
    
  //初始化listMenu
    $("body").delegate(listMenu.config.selector+" li a","click",function(){
 	   var data=eval("("+$(this).data('info')+")");
 	   listMenu.open($(this),function(element){
 		   if(data){
 			   //打开tabs
 			   tabs.open(data,tabsctrl,true);
 		   }
 		   console.log(element)
 	   });
 })



});