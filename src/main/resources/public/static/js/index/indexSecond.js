/**
 * Created by hjk on 2017/3/4.
 */
var depends = [

    {name: "utils"},
    {name: "rsa"},
    {name: "hjkplug_2_0",type:"css"},
    {name: "index",type:"css"},
    {name: "font-awesome",type:"css"},
    {name: "bootstrap"},
    {name: "jquery"},
    {name: "tabs"},
    {name: "news"},
    {name:"listMenu"}
];

modular.define({name:"index.indexSecond"},depends,function(){
	var rsa=this.rsa;
    var utils=this.utils;
	var listMenu=this.listMenu;
	var tabs=this.tabs;

    var news=this.news;
    news.subscribe({channel:"test",recvMsg:function(data){
	console.log(data);
    }});
    news.register({name:"indextest",control:function(data){
	alert(JSON.stringify(data));
    }});
    
    //创建一个横向标签控制对象
    var tabsctrl=this.tabs.createHorizontalCtroller();
    //给标签操作器设置标签容器
    tabsctrl.tab.containerid="#horizontal-tabs-container";
    //给标签操作器设置额外的标签容器
    tabsctrl.tab.extraContainer= "#extra_container";
    //给标签操作器设置选中样式
    tabsctrl.tabActiveClass="active";
    //给标签设置关联的iframe容器
    tabsctrl.iframe.containerid="#main-iframe";
    //给标签操作器设置默认标签html模板
    tabsctrl.tab.tabHtml="<a class='tab'><span class='icon'></span><span class='title'></span><button class='close remove'><span class='fa fa-times-circle '></span> </button></a>";
    //给标签操作器设置创建标签成功回调
    tabsctrl.configure.openCallback=function(options){
        console.log("添加标签成功"+options);
        listMenu.open({"id":options.id});
    };
    //给标签操作器设置关闭标签成功回调
    tabsctrl.configure.closeCallback=function(id){
        console.log("关闭标签成功"+id);
        //关闭listMenu
        listMenu.close({"id":id});
    };
    //给标签操作器设置选中标签事件
    tabsctrl.configure.selectedCallback=function(obj){
    	var id=$(obj).attr("id");
    	listMenu.open({"id":id});
    };
    //给标签添加右键功能
    tabsctrl.rightOptionalEvent.initRightOptionalEvent();

    //给标签操作器添加一个标签
   
    
    
 // 处理数据
    function ProcessingData(data) {
        var saxprop = function () {
            var _this = this;
            //只处理 根0  应用1  导航条2   菜单3
            if (_this.resourceType !='Menu'&&_this.resourceType !='Application'&&_this.resourceType !='Navigation'&&_this.resourceType !='Root'  ) {
                return;
            }
            if (_this.properties) {
            	try{
            		var o = eval("({" + _this.properties + "})");
            		_.map(o, function (val, key) {
            			_this[key] = val;
            		});
            	}catch(e){
            		console.log(_this.properties);
            		console.log(e);
            	}
            }
            if (_this.sons && _this.sons.length > 0) {
                _.map(_this.sons, function (val) {
                    saxprop.apply(val);
                });
            }
            if (!_this["id"]) _this["id"] = _this["tabid"];
            delete _this.tabid;
            _this.json = JSON.stringify(
                {
                    id: _this.id,
                    name: _this.name,
                    icon: _this.icon,
                    url: _this.url
                });
        };
        saxprop.apply(data);
    }
 // 初始化菜单
    function initMenu(data) {
        // 根据模版生成html内容
        var source = $("#leftTree").html();
        var template = Handlebars.compile(source);
        var html = template(data.sons);
        // 将html内容插入指定位置
        $("#leftTreeContainer").append(html);
        // 为二级菜单注册事件
        $(listMenu.config.selector+" li a").click(function (event) {
        	var options=eval("("+$(this).attr("data-options")+")");
     	   listMenu.open($(this),function(element){
     		   if(options){
     			   //打开tabs
     			   tabs.open(options,tabsctrl,true);
     		   }
     		   console.log(element);
     	   });
        });
      //收起标签列表
        $("#leftTreeContainer li a.node:first").click();
    }
    
        
    
    //页面布局模块处理
    var resetFrame=function(){
        var topHeight=0;
        var bottomHeight=30;
        var contentHeight=$(window).height()-topHeight-bottomHeight;
        $(".content").height(contentHeight);
        //iframe 父容器高度
        setIframeParentContainerHeight();
    };
    var toggleSider=function(selector){
        var isExpanding=$(selector).hasClass("collapse");
        if(isExpanding){
            $(selector).removeClass("collapse");
        }else{
            $(selector).addClass("collapse");
        }
    };
    $("body").delegate(".main-sidebar .toggle-btn","click",function(){
        toggleSider(".main-sidebar");
    });
    $("body").delegate(".secondary-sidebar-toggle .toggle-btn","click",function(){
        toggleSider(".secondary-sidebar");
    });
    function collapse(){

    }
    //iframe 父容器高度
    var setIframeParentContainerHeight=function(){
        var topbarHeight=$(".topbar").height();
        var bottombarHeight=$(".bottom-bar").height();
        var IframeParentContainerHeight=$(window).height()-topbarHeight-bottombarHeight;
        $(".main-content").height(IframeParentContainerHeight);
        //设置iframe容器高度
        var tabsbarHeight=$(".tabsbar").height();
        var mainIFrameHeight=IframeParentContainerHeight-tabsbarHeight;
        $(".main-iframe").height(mainIFrameHeight);
    };



 // 显示修改密码窗口
     function modifyPwd() {
         $("#datamodal").modal("show");
         $("#datamodal input[type=password]").val();
         $("#submit").bind("click.submit", submitPwd);
         $("#dataform").bootstrapValidator("resetForm", true);
         $("#submit").attr("disabled", "disabled");

     }

 // 提交密码信息，执行修改密码操作
     function submitPwd() {
         if (!$("#dataform").data('bootstrapValidator').isValid()) {
             $("#dataform").data('bootstrapValidator').validate();
             return;
         }
         $.secAjax(
             {
                 type: 'POST',
                 url: "index/modifyPassword",
                 data: {
                     oldpwd: rsa.encrypt($('#oldpwd').val()),
                     newpwd: rsa.encrypt($('#newpwd').val())
                 },
                 dataType: 'json',
                 success: function (data) {
                     if (data.state) {
                         utils.alert(
                             {
                                 body: "修改密码成功，下次登录请使用新密码！"
                             });
                     } else {
                         $("#dataform").bootstrapValidator('disableSubmitButtons', false);
                         $("#submit").unbind("click.submit");
                         $("#submit").bind("click.submit", submitPwd);
                     }
                 }
             });
         return true;
     }

     // 用户注销
     function loginout() {
	 	location.href = $.urlReWrite("index/loginOut");
	 	location.href = "../../";
     }
     $("#btn-modifypwd").click(modifyPwd);
     $("#btn-loginout").click(loginout);
     $(function () {
         $.secAjax(
             {
                 type: 'POST',
                 url: "index/loadResource",
                 data: "resourceName=访问系统/",
                 dataType: 'json',
                 success: function (data) {
                     // 预处理节点数据的properties属性，将properties的属性复制到this上。
                     ProcessingData(data.resource);
                     // 初始化菜单
                     initMenu(data.resource);
                     // 初始化左侧菜单样式
                     //initStyle();
                     // 初始化用户信息
                     //initUserInfo(data.user);
                     // 初始化修改密码的校验规则
                     //initValidate(data.pwdValidate);
                     // 打开首页
                     tabs.open({
	                 		id: 'index',
	                 		name: "首页",
	                 		url: "html/index/welcome.html?userName="+data.user.data.real.userName+"&userType="+data.user.userType+"&slevel="+data.user.data.real.slevel,
	                 		close: false
	                 	    },tabsctrl,true
                 	    );
                     delete data.user;
                     delete data.resource;
                     $("body").attr(data);
                 }
             });
         // 注册窗口大小变化事件
         resetFrame();
         $(window).resize(resetFrame);

     });
    
    


});