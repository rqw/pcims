var depends = [
    { name: "common.basicx" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "floatWindow" },
    { name: "common.constants" },
    { name: "common.common"},
    { name: "pinyin"},
    { name: "bootstrap-validate" }
];
modular.define({ name: "drugs.info" }, depends, function() {
    var basicx = this["common.basicx"];
    var constants = this['common.constants'];
    // 用于返回查询条件对象。
    var fun_search = function() {
        return {};
    };
    //排序函数，用于返回排序条件
    var fun_order = function() {
        return { "orders[0]": "+produce","orders[1]":"+pym" };
    };
    // 初始化
    basicx.create("info", {
        options: {
            domain: "drugs/info" //设置模块路径
        },
        add: { // 设置添加功能参数信息
            defaultValue: {
                id: "",
                name: "",
                summary: "",
                produce: "",
                unti: "",
                volume:"",
                packing:"",
                pym:"",
                drugType:"",
                aliasName:"",
                specifications:""
            },
            dependent: {
                showAfter: function(options) {
                    $("#dataform").data('bootstrapValidator').resetForm();
                },
                isValidate: function() {
                    $("#dataform").data('bootstrapValidator').validate();
                    if (!$("#dataform").data('bootstrapValidator').isValid()) {
                        return false;
                    }
                    return true;
                }
            }
        },
        edit: {
            dependent: {
            	showAfter: function(options) {
                    $("#dataform").data('bootstrapValidator').resetForm();
                },
                isValidate: function() {
                	
                    $("#dataform").data('bootstrapValidator').validate();
                    if (!$("#dataform").data('bootstrapValidator').isValid()) {
                        return false;
                    }
                    return true;
                }
            }
        },
        list: {
            // 初始化页面组件参数
            pagination: {
                "template": {
                    page: constants.pagination.footer.customer,
                    data: $("#template-tbody").html()
                },
                selector: {
                    data: "#dataList tbody",
                    page: "#pageContainer"
                },
                condition: function() {
                    return $.extend(fun_search(), fun_order());
                }
            }
        }
        //加载基本组件-增删改功能
    }).initialization();

    // 点击查询按钮时修改fun_search方法，并重新加载页面数据。
    function searchData() {
        var searchtext = $("#searchtext").val();
        var pym=Pinyin.GetJP(searchtext);
        fun_search = function() {
            if (searchtext)
                return $.hform.cvMap("conditions", {
                    'nameLIKE or summaryLIKE or produceLIKE or pymLIKE or aliasNameLIKE': `${searchtext} or ${searchtext} or ${searchtext} or ${pym} or ${searchtext}`
                });
            return {};
        };
        basicx.find("info").list.flush();
    }
    $("#btn-search").click(searchData);
    
    //绑定药品名称拼音码处理事件
    $("#name").on('input propertychange change',function(){
        $("#pym").val(Pinyin.GetJP($(this).val()));
    });
    //设置校验方法
    $('#dataform').bootstrapValidator({
            message: '此值无效',
            group: ".form-group",
            excluded: [':disabled'],
            submitButtons: '#btn-save',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	//jurisdictionName: {
            	//    validators: {notEmpty: {message: '权限名称不能为空'},stringLength: { min: 1,max: 30,message: '不超过30个字符'}}
                //},
            }
    });

});