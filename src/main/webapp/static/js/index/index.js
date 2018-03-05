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
    {name: "tabs"},
    {name: "common.common"},
    {name: "news"},
    {name:"listMenu"},
    {name: "bootstrap-validate"},
    {name:"json2"},
    {name:"popMsg"}
];

modular.define({name:"index.index"},depends,function(){
	var rsa=this.rsa;
    var utils=this.utils;
	var listMenu=this.listMenu;
	var tabs=this.tabs;
    var news=this.news;
    var popMsg=this.popMsg;
    
    //listMenu展开与关闭回调事件
    
    
    //创建一个横向标签控制对象
    var tabsctrl=this.tabs.createHorizontalCtroller();
    tabs.setDefaultTabsCtrl(tabsctrl);
    //给标签操作器设置标签容器
    tabsctrl.tab.containerid="#horizontal-tabs-container";
    //给标签操作器设置额外的标签容器
    tabsctrl.tab.extraContainer= "#tab-more-container";
    //给标签操作器设置选中样式
    tabsctrl.tabActiveClass="active";
    //more 按钮id
    tabsctrl.more.moreSelector="#tab-more-btn";
    //给标签设置关联的iframe容器
    tabsctrl.iframe.containerid="#main-iframe";
    //给标签操作器设置默认标签html模板
    tabsctrl.tab.tabHtml="<a class='tab'><span class='icon fa'></span><span class='title'></span><button class='close remove'><span class='fa fa-times-circle '></span> </button></a>";
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
        	
        	 if(options){
   			   //打开tabs
   			   tabs.open(options,tabsctrl,true);
   		   	 }

        }).each(function(){
        	var options=eval("("+$(this).attr("data-options")+")");
        	if(options)
        		$(this).attr("data-tabid",options.tabid);
        });

    }
    
        
    
    //页面布局模块处理
    var resetFrame=function(){
        var topHeight=45;
        var bottomHeight=30;
        var contentHeight=$(window).height()-topHeight-bottomHeight;
        $(".content").height(contentHeight);
        //iframe 父容器高度
        $(".content").height(contentHeight);
        setIframeParentContainerHeight(contentHeight);
    };
    var toggleSider=function(selector){
        var isExpanding=$(selector).hasClass("collapse");
        var icon=$(".main-sidebar .toggle-btn span");
        if(isExpanding){
        	icon.removeClass("fa-arrows-h");
            icon.addClass("fa-outdent");            
            $(selector).removeClass("collapse");
        }else{        	
        	icon.removeClass("fa-outdent");
            icon.addClass("fa-arrows-h");
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
    var setIframeParentContainerHeight=function(contentHeight){

        $(".main-content").height(contentHeight);
        //设置iframe容器高度
        var tabsbarHeight=$(".tabsbar").height();
        var mainIFrameHeight=contentHeight-tabsbarHeight;
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
                         $("body").delegate(".btn-primary","click",function(){
                        	 loginout();
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
     function initUserInfo(user){
    	 modular.topModular().currentUser=user;
    	 $(".h_index_tools [data-name=username]").text(user.userName);
    	 //注册用户监听事件
	  news.subscribe({channel:"USERID-"+user.id,recvMsg:function(data){
			console.log(data);
	  }});
	    //news.register({name:"indextest",control:function(data){
	    //	alert(JSON.stringify(data));
	    //}});
	  news.register({name:"request_start",control:function(data){
		  if($("#sys_audio").length==0){
		    	  $("body").append("<audio id='sys_audio' src='"+$.htmlUrl("static/video/ding.mp3")+"' hidden='true'>");
    	  }
		  $("#sys_audio")[0].play();
		  $.hjk.messageBox.show('协同提醒', "收到来自"+data.orgName+"的协同申请。", {
              '查看协同申请': {
                  'primary': true,
                  'callback': function () {
                	 $("#leftTreeContainer [data-id=requestDiagnose]").click();
                  }
              }
          });
	  }});
	  
	  news.register({name:"personCheckInfo",control:function(data){
		  debugger;
		   //确定按钮带函数调用
	        popMsg.show({title:'乐心血压提醒',content:data.message,dataid:data.personid,btnText:'查看',btnFun:function(){
	        		tabs.open({
	               		id: 'personCheckDetail'+data.personid,
	               		name: data.personName+"的血压详情",
	               		url: "html/arch/personCheckDetail.html?id="+data.personid
	               	  },null,true);
	        	}
	        });
	  }});
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
                     initUserInfo(data.user);
                     // 初始化修改密码的校验规则
                     initValidate(data.pwdValidate);
                     // 打开首页
                     tabs.open({
	                 		id: 'index',
	                 		name: "首页",
	                 		url: "html/index/welcome.html?userName="+data.user.userName,
	                 		close: false
	                 	    },tabsctrl,true
                 	    );
                     var tabid=utils.common.url.getParam(location.href,"tabid");
                     if(tabid){
                    	 tabid=decodeURI(tabid);
                    	 $("a[data-id="+tabid+"]").click();
                     }
                     delete data.user;
                     delete data.resource;
                     $("body").attr(data);
                 }
             });
         // 注册窗口大小变化事件
         resetFrame();
         $(window).resize(resetFrame);

     });
    
     // 用户注销
     function loginout() {
	 	location.href = $.urlReWrite("index/loginOut");
	 	location.href = "../../";
     }
     //显示版本信息
     $(".h_index_tools [event-select=about]").click(function(){
         $.secAjax(
             {
                 type: 'POST',
                 url: "common/version",
                 dataType: 'json',
                 success: function (data) {
                	 var str="系统版本："+data.data.appversion+"<br/>数据库版本："+data.data.appversion;
                	  utils.alert(
                              {
                                  body: str
                              });
                 }
             });
     
     });
  // 显示修改密码窗口
     function modifyPwd() {
         $("#datamodal").modal("show");
         $("#datamodal input[type=password]").val();
         $("#submit").bind("click.submit", submitPwd);
         $("#dataform").bootstrapValidator("resetForm", true)
         $("#submit").attr("disabled", "disabled");

     }
     $("#btn-modifypwd").click(modifyPwd);
     $("#btn-loginout").click(loginout);
 
  // 初始化修改密码的校验规则
     function initValidate(pwdValidate) {
         regexpValue =
         {
             regexp: /.*/,
             message: ''
         }
         if (pwdValidate) {
             pwdValidate = eval("({" + pwdValidate + "})")
             if (pwdValidate.regexp) {
                 regexpValue.regexp = new RegExp(pwdValidate.regexp);
                 regexpValue.message = pwdValidate.message;
             }
         }
         $('#dataform').bootstrapValidator(
             {
                 message: '此值无效',
                 group: ".form-group-input",
                 excluded: [
                     ':disabled'
                 ],
                 submitButtons: '#submit',
                 feedbackIcons: {
                     valid: 'glyphicon glyphicon-ok',
                     invalid: 'glyphicon glyphicon-remove',
                     validating: 'glyphicon glyphicon-refresh'
                 },
                 fields: {
                     oldpwd: {
                         oldpwd: '原始密码无效',
                         validators: {
                             notEmpty: {
                                 message: '原密码不能为空'
                             }
                         }
                     },
                     newpwd: {
                         validators: {
                             notEmpty: {
                                 message: '新密码不能为空'
                             },
                             regexp: regexpValue
                         }
                     },
                     newpwd2: {
                         validators: {
                             notEmpty: {
                                 message: '确认密码不能为空'
                             },
                             identical: {
                                 field: 'newpwd',
                                 message: '两次输入的密码不一致，请确认'
                             }
                         }
                     }

                 }
             });
     }

});