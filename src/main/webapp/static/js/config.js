//设置项目部署路径
loader.staticPath = "/pcims/";
loader.dynamicPath = "/pcims/";
loader.context.baseUrl = loader.staticPath + "static/";
loader.context.defaultPath = {
    js: "js/",
    css: "css/"
};
loader.apps={
		
}
loader.rewriteApp=function(url,name){
	var info=loader.apps[name];
	if(!info.port)info.port=location.port;
	if(!info.host)info.host=location.host;
	if(!info.protocol)info.protocol=location.protocol;
	if(url.startsWith("http")){
		url=url.substring(url.indexOf("/",8));
		url=url.substring(url.indexOf("/",2));
	}
	return info.protocol+"//"+info.host+"/"+info.path+url;
}
loader.urlRewriteSession = false;
loader.htmlurltimestamp = true;
//定义第三方库
var config = {
	    para: "version=v1.0.1",//+new Date().getTime(),
    js: {
        jquery: "framework/Jquery/jquery.min.js",
        underscore: "framework/underscore.js",
        handlebars: "framework/handlebars.js",
        bootstrap: "framework/Bootstrap/js/bootstrap.min.js",
        "bootstrap-select": "framework/Bootstrap-select/js/bootstrap-select.min.js",
        "bootstrap-select-cn": "framework/Bootstrap-select/js/i18n/defaults-zh_CN.min.js",
        "bootstrap-table": "framework/bootstrap-table/js/bootstrap-table.min.js",
        "bootstrap-table-cn": "framework/bootstrap-table/js/locale/bootstrap-table-zh-CN.min.js",
        "bootstrap-validate": "framework/Bootstrap-validate/js/bootstrapValidator.min.js",
        ztree: "framework/zTree/js/jquery.ztree.all.js",
        AdminLTE: "framework/AdminLTE/js/app.min.js",
        draggabilly: "framework/draggabilly/draggabilly.js",
        jwerty: "framework/jwerty.js",
        html5shiv: "framework/AdminLTE/js/html5shiv.min.js",
        respond: "framework/AdminLTE/js/respond.min.js",
        echarts: "framework/echarts/echarts.min.js",
        "echarts-macarons": "framework/echarts/theme/macarons.js",
        "mootools-core": "framework/mootools/mootools-core-1.3.1.js",
        "mootools-more": "framework/mootools/mootools-more-1.3.1.1.js",
        "sockjs": "framework/sockjs.min.js",
        qrcode:"framework/qrcode/qrcode.js",
        pinyin:"framework/pinyin.js",
        "bootstrap-datetimepicker":"framework/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js",
        "bootstrap-datetimepicker-cn":"framework/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
    },
    css: {
        "bootstrap-select": "framework/Bootstrap-select/css/bootstrap-select.min.css",
        "bootstrap-table": "framework/bootstrap-table/css/bootstrap-table.min.css",
        bootstrap: "framework/Bootstrap/css/bootstrap.min.css",
        ztree: "framework/zTree/css/metroStyle/metroStyle.css",
        "bootstrap-validate": "framework/Bootstrap-validate/css/bootstrapValidator.min.css",
        "font-awesome": "framework/font-awesome/css/font-awesome.min.css",
        "ionicons": "framework/AdminLTE/css/ionicons.css",
        "iconfont": "framework/FontIcon/iconfont.css",
        "AdminLTE": "framework/AdminLTE/css/AdminLTE.min.css",
        "bootstrap-datetimepicker":"framework/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"
    },
    depend: {
        bootstrap: [{ name: "jquery" }, { name: "bsIE" }, { name: "bootstrap", type: "css" }],
        "bootstrap-select": [{ name: "bootstrap" }, { name: "bootstrap-select", type: "css" }],
        "bootstrap-select-cn": [{ name: "bootstrap-select" }],
        "bootstrap-table": [{ name: "bootstrap" }, { name: "bootstrap-table", type: "css" }],
        "bootstrap-table-cn": [{ name: "bootstrap-table" }],
        "bootstrap-validate": [{ name: "bootstrap" }, { name: "bootstrap-validate", type: "css" }],
        ztree: [{ name: "jquery" }, { name: "ztree", type: "css" }],
        AdminLTE: [{ name: "AdminLTE", type: "css" }, { name: "bootstrap" }],
        "draggabilly": [{ name: "jquery" }],
        "floatWindow": [{ name: "jquery" }], // { name: "hjkplug", type: "css" },{name:"draggabilly"},
        "mootools-more": [{ name: "mootools-core" }],
        "timePicker": [{ name: "timePickerStyle", type: "css" }, { name: "timePickerSkin_base", type: "css" }],
        "uploader": [{ name: "jquery" }],
        "divscroll": [{ name: "jquery" }],
        "fixedheadertable": [{ name: "jquery" }],
        //新加的非模块组件 为方便整合
        "datepicker-moment": [{ name: "jquery" }],
        "daterangepicker": [{ name: "datepicker-moment" }, { name: "jquery" }, { name: "daterangepicker", type: "css" }, { name: "font-awesome", type: "css" }, { name: "bootstrap" }],
        "bootstrap-datetimepicker-cn":[{name:"bootstrap-datetimepicker"}],
        "echarts": [{ name: "echarts-macarons" }],
        "video":[{name:"video",type:"css"},{name:"video-ie8"}],
        "qrcode":[{ name: "jquery" }],
        "bootstrap-datetimepicker":[{name:"bootstrap-datetimepicker",type:"css"},{name:"jquery"},{name:"bootstrap"}]
    },
    noModular: [
        "jquery",
        "underscore",
        "handlebars",
        "bootstrap",
        "bootstrap-select",
        "bootstrap-select-cn",
        "bootstrap-table",
        "bootstrap-table-cn",
        "bootstrap-validate",
        "ztree",
        "AdminLTE",
        "draggabilly",
        "html5shiv",
        "respond",
        "jwerty",
        "echarts",
        "floatWindow",
        "timePicker",
        "spin",
        "mootools-core",
        "mootools-more",
        "uploader",
        "divscroll",
        "fixedheadertable",
        "sockjs",
        //新加的非模块组件 为方便整合
        'datepicker-moment',
        'daterangepicker',
        "video",
        "video-ie8",
        "json2",
        "qrcode",
        "bootstrap-datetimepicker",
        "bootstrap-datetimepicker-cn",
        "pinyin"
    ]

};
// 定义自定义的通用库
loader.context.put(config);
config = {
    js: {
        utils: "js/common/utils.js",
        basic: "js/common/basic.js",
        rsa: "js/common/rsa.js",
        bsIE: "js/common/bsIE.js",
        "combox": "js/common/combox.js",
        TabController: "js/common/TabController.js",
        discreteness: "framework/discreteness-resources/js/discreteness.js",
        floatWindow: "framework/plug/js/floatWindow_v_2_0.js",
        hjkplug: "framework/plug/js/hjkplug.js",
        timePicker: "framework/timePicker/js/laydate.js",
        pagination: "js/common/pagination.js",
        spin: "framework/spin/spin.min.js",
        resource: "js/common/resource.js",
        workflow: "js/common/workflow.js",
        uploader: "framework/plug/js/uploader.js",
        printer: "framework/plug/js/printer.js",
        divscroll: "framework/divscroll/divscroll.js",
        "tabs": "framework/plug/js/tabs.js",
        "fixedheadertable": "framework/table/jquery.fixedheadertable.min.js",
        news: "js/common/news.js",
        "tabs": "framework/plug_v_3_0/js/tabs.js",
        "video":"framework/video/js/video.min.js",
        "video-ie8":"framework/video/js/videojs-ie8.min.js",
        "json2":"framework/json-js/json2.js",
        "popMsg":"framework/plug_v_3_0/js/popMsg.js"
        	
    },
    css: {
        "tools": "css/common/tools.css",
        "skin-blue": "css/common/skins/skin-blue.css",
        "framework-public": "css/framework-public.css",
        "discreteness": "framework/discreteness-resources/css/discreteness.css",
        "hjkbase": "framework/plug/css/hjkbase.css",
        "hjkplug_2_0": "framework/plug/css/hjkplug.css",
        "hjkplug": "framework/plug_v_3_0/css/plug_v_3_0.css",
        "timePickerStyle": "framework/timePicker/css/laydate.css",
        "timePickerSkin_base": "framework/timePicker/css/skins/molv/laydate.css",
        "tabs": "framework/plug/css/tabs.css",
        "hjkIcon": "framework/hjkIcon/hjkIcon.css",
        "video":"framework/video/css/video-js.css"
    }
};
loader.context.put(config);
// 定义业务专用模块
config = {
    js: {

        "welcome": "js/index/welcome.js",
        "demo": "js/sysmgr/demo.js",
        "sysmgr.resource": "js/sysmgr/resource.js"
    },
    css: {
        login: "css/index/login.css",
        index: "css/index/index.css"
    }
};
loader.context.put(config);

//新增模块 单独写出来 整合时候再整合进去
config = {
    css: {
        "daterangepicker": "framework/datepickerForBootstrap/daterangepicker.css"
    },
    js: {
        "daterangepicker": "framework/datepickerForBootstrap/daterangepicker.js",
        "datepicker-moment": "framework/datepickerForBootstrap/moment.min.js",
        "hecharts": "framework/plug_v_3_0/js/hcharts.js",
        "listMenu": "framework/plug_v_3_0/js/listMenu.js",
        "dataAnalysis": "js/query/dataAnalysis.js",
        "toggleViewCtrl": "framework/plug_v_3_0/js/toggleViewCtrl.js",
        "hasChildrenTable": "framework/plug_v_3_0/js/hasChildrenTable.js",
        "pageControler": "framework/plug_v_3_0/js/pageControler.js",
        "loopView":"framework/plug_v_3_0/js/loopView.js",
        "hrotateX3D":"framework/plug_v_3_0/js/hrotateX3D.js",
        "table":"framework/plug_v_3_0/js/table.js",
        "retrieve.generalRetrieve": "js/sysmgr/generalRetrieve.js",
        "retrieve.shareRetrieve": "js/sysmgr/shareRetrieve.js",
        "retrieve.dataRetrieve": "js/sysmgr/dataRetrieve.js",
        "equipment.hmsqcglu": "js/equipment/hmsqc_gluList.js",
        "equipment.hmsqcurine": "js/equipment/hmsqc_urineList.js",
        "equipment.machineparam": "js/equipment/machineparamList.js",
        "education.video": "js/education/videoTrainingList.js",
        "sysmgr.orgDevice": "js/sysmgr/orgDeviceNum.js",
        "sysmgr.orgparentcode": "js/sysmgr/orgParentCode.js",
        "arch.personCheckInfo": "js/arch/personCheckData.js"
    }
};
loader.context.put(config);

loader.configSuccess();