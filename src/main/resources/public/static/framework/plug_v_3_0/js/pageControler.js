/**
 * Created by hjk on 2017/3/23.
 */

//多选支持需要引入的依赖
var depends = [
    {name: "jquery"},
    {name:"hjkplug"}
];
modular.define({name: "pageControler"}, depends, function () {
    var pageControler={
    	showBeforce:function(){},
    	showAfter:function(){},
        options:{
            controlerBtn:".pageCtrl_1 button",
            pageContainer:".pages_1",
            defaultPage:"1",
            activeClass:"active"
        },
        init:function(options){
            var pageCtrl=this;
            if(options){
                pageCtrl.options=$.extend({},pageCtrl.options,options);
            }
            $("body").delegate(pageCtrl.options.controlerBtn,"click",function(){
                var page=$(this).data("page");
                pageCtrl.showPage(page)
            })
            this.showPage(this.options.defaultPage);
        },
        showPage:function(page){
        	this.showBeforce(page);
            //导航按钮样式控制
            $(this.options.controlerBtn).removeClass(this.options.activeClass);
            $(this.options.controlerBtn+"[data-page='"+page+"']").addClass(this.options.activeClass);
            //页面控制
            $(this.options.pageContainer+" .page").hide();
            $(this.options.pageContainer+" .page[data-page='"+page+"']").show();
            this.showAfter(page);
        }
    }

    return pageControler;
});
