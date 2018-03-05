/**
 * Created by hjk on 2016/12/21.
 */
/**
 ui测试模块；
 * 提供了example的html与js实例；
 * example中引用了jquery的dns和本模块的uiCode.js文件
 @module Tabs
 */


/**
 * 该插件 可以实现对某个'ul li.../li /ul'结构的模块附加展开和收起的功能，支持手动
 * 和js函数两种方式，该插件需要要在某个作用模块的根节点添加一个class：listMenu（用它来确定作用域）或者自
 * 定义一个class,但需要注意的是，自定义的Class在用函数调用时需要指定该class或者修改
 * listMenu控件的默认name,该插件支持同时控制多个模块。。
 * @class ListMenu
 * @constructor
 * @content {string} type 内容
 * @demo listMenuDemo.html
 * @demo ../../Jquery/jquery.min.js
 */


var depends = [
    {name: "jquery"}
];
modular.define({name: "listMenu"}, depends, function () {
    var listMenu={
        /**
         * 默认配置文件
         * @property {object} config
         *      @param {string} config.name 默认对象选择器，默认为“listMenu”
         *      @param {function} config.openedCallback 默认打开回调，默认为无操作。
         *      @param {function} config.closedCallback 默认关闭回调，默认为无操作。
         *
         */
        config:{
            name:"listMenu",
            selector:".listMenu",
            parentNodeTag:"node",
            activeClass:"active",
            rightIconSelector:".right-icon",
            toggleIcon:{
                opened:"fa-angle-down",
                closed:"fa-angle-right"
            },

            openedCallback:function(element){
              //如果发现该方法多次调用 一定是其它地方调用了 比如横向tabs标签打开后回调 选中后回调 后期增加selected 来规避；
            },
            closedCallback:function(element){
            	
            }

        },
        /**
         * 打开(展开)某个节点
         * @method open
         * @param {string} name 指定列表对象选择器
         * @param {string|json|element} target 需要打开的节点，可以是一个包含id的json字符串，可以是一个包含id的json，可以是一个dome节点。
         * @param {function} openedCallback 打开回调函数
         * **/
        parse:function(arg){
            var _obj;
            var _name;
            var _callback;

            var len=arg.length;
            if(len==0){
                return;
            }else if(len==1){
                _obj=arg[0];
                _name=this.config.name;
            }else if(len==2){
                if(typeof (arg[1]) == 'function'){
                    _obj=arg[0];
                    _callback=arg[1];
                    _name=this.config.name;
                }else if(typeof (arg[0]) == 'string'){
                    _name=arg[0];
                    _obj=arg[1];
                }
            }else if(len==3){
                _name=arg[0];
                _obj=arg[1];
                _callback=arg[2];
            }else{
                return null;
            }

            return {obj:_obj,name:_name,callback:_callback}

        },
        open:function (){
            //解析如果是对象判断是dom对象还是data对象，如果是dom对象就直接跳过，如果是data就找到对应对象。
            //找到dom对应的父亲ul元素并show出来（如果obj本身就是dom对象，没有必要再chow一次，因为本身就是show状态）
        	

            var _obj;
            var element;
            var _name;
            var _openedCallback;//传入的回调
            var openedCallback;//系统默认需要执行的回调；一定会执行。
            var closedCallback;//系统默认需要执行的回调；一定会执行。

            var domain;

            //解析传入参数
            var _arguments=this.parse(arguments)

            //判断传入参数
            if(!_arguments){
                console.log("listMenu:open arguments is null");
                return;
            }
            //初始化本地参数
            _obj=_arguments.obj;
            _name=_arguments.name;
            _openedCallback=_arguments.callback;



            //判断是否有指定对象 如果没有使用默认对象名称
            if(!_name){
                domain=this.config.selector;
            }else{
                domain="[data-name='"+_name+"']";
            }

            //判断是否有回调 如果没有调用默认回调
            if(!_openedCallback){
                _openedCallback=function(){};//this.config.openedCallback;
            }

            //判断目标类型
            if(typeof(_obj)=="string"){
                _obj=eval("("+_obj+")");
            }

            if(_obj.id!=null&&_obj.id!=""){
                //传入是一个数据对象 说明是js调用事件，无切换效果
                element=$(domain+" [data-id='"+_obj.id+"']");
                //判断当前元素是否在插件容器中
                if(!this.isPlug(element)){
                    return;
                }
                //如果当前目录有子目录就展开
                $(element).siblings("ul").slideDown();
                //展开系统回调
                this.config.openedCallback(element)
                //展开函数回调
                _openedCallback(element);
            }else{
                //传入是一个节点 说明是鼠标点击事件，就有切换效果
                element=$(_obj);
                //判断当前元素是否在插件容器中
                if(!this.isPlug(element)){
                    return;
                }
                if( $(element).siblings("ul").is(":visible")){
                    //如果当前目录有子目录就关闭
                    this.close(element);
                    return;
                    //关闭时系统回调在关闭中进行
                    //this.config.closedCallback(element)
                    // $(element).siblings("ul").slideUp();
                }else{
                    //如果当前目录有子目录就展开
                    $(element).siblings("ul").slideDown();
                    //展开回调
                    this.config.openedCallback(element)
                    //打开成功回调
                    _openedCallback(element);
                }
            }

            //处理展开时候对父辈的操作

            //关闭其他目录的子目录（ul表示子目录）
            var _otherChildren=$(element).parentsUntil(domain,"li").siblings();
            _otherChildren.find("ul").slideUp();
            for(var i=0;i<_otherChildren.length;i++){
            	this.close(_otherChildren[i]);
            }
            

            //设置所有父辈元素的右侧标记icon            
	            var _partensNode=$(element).parentsUntil(this.config.selector,"li").find(">a").find(this.config.rightIconSelector);
	            $(_partensNode).removeClass(listMenu.config.toggleIcon.closed).addClass(listMenu.config.toggleIcon.opened);
	        //设置自己的右侧标记
	            $(element).find(">"+this.config.rightIconSelector).removeClass(listMenu.config.toggleIcon.closed).addClass(listMenu.config.toggleIcon.opened);
            //展开父目录
            var _ancestors=$(element).parent().parentsUntil(domain,"li:not(li:last)");
            _ancestors.find(">ul").show();
            
            $(element).parent().parentsUntil(domain,"li:last ul").slideDown();
            
            if(!$(element).hasClass(this.config.parentNodeTag)){
           	 //移除其他节点的活动样式
               $(this.config.selector+" a").removeClass(this.config.activeClass);
               //给打开的节点添加活动样式
               $(element).addClass(this.config.activeClass);
            }   
            //打开成功回调
            //_openedCallback(element);
            //展开父辈目录 回调系统回调
            this.config.openedCallback(_ancestors);



        },
        /**
         * 关闭(收起)某个节点
         * @method close
         * @param {object} obj 传递的类型为json字符串或者json对象或者dom对象
         * @param {function} closedCallback 成功回调
         * **/
        close:function(){


            var _obj;
            var element;
            var _name;
            var _closedCallback;
            var domain;

            //解析传入参数
            var _arguments=this.parse(arguments)

            //判断传入参数
            if(!_arguments){
                console.log("listMenu:close arguments is null");
                return;
            }
            //初始化本地参数
            _obj=_arguments.obj;
            _name=_arguments.name;
            _closedCallback=_arguments.callback;



            //判断是否有指定对象 如果没有使用默认对象名称
            if(!_name){
                domain=this.config.selector;
            }else{
                domain="[data-name='"+_name+"']";
            }

            //判断是否有回调 如果没有调用默认回调
            if(!_closedCallback){
                _closedCallback=function(){};//this.config.closedCallback;
            }



            if(typeof(_obj)=="string"){
                _obj=eval("("+_obj+")");
            }

            if(_obj.id!=null&&_obj.id!=""){
                element=$(domain+" [data-id='"+_obj.id+"']");
                //关闭当前子目录就关闭
                $(element).siblings("ul").slideUp();
                $(element).siblings("ul").find("ul").slideUp();
            }else{
                element=$(_obj);
                //关闭当前子目录就关闭
                $(element).siblings("ul").slideUp();
                $(element).siblings("ul").find("ul").slideUp();
            }
            //关闭节点处理所有子元素右侧icon
            $(element).find(".right-icon").removeClass(listMenu.config.toggleIcon.opened).addClass(listMenu.config.toggleIcon.closed);
            //关闭成功回调
            _closedCallback(element);
            this.config.closedCallback(element);

        },
        /**
         * @method isPlug
         * @param {element} element 需要判断的元素dom对象
         * **/
        isPlug:function(){
            var domain,element;
            if(arguments.length==0){
                return
            }else if(arguments.length==1){
                domain=this.config.selector;
                element=arguments[0]
            }else if(arguments.length==2){
                domain=arguments[0];
                domain="[data-name='"+name+"']"
                element=arguments[1];
            }

            //判断对象是否有满足条件的父亲元素
            var parent;
            parent=$(element).parents(domain);
            if(parent.length>0){
                return true;
            }else{
                return false;
            }
        }
    }
    $("body").delegate(listMenu.config.selector+" li a","click",function(){
        listMenu.open($(this));
    })

    return listMenu;

});
