var depends = [
    { name: "common.basicx" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "floatWindow" },
    { name: "bootstrap-validate" }
];
modular.define({ name: "sysmgr.dataDictionary" }, depends, function() {
    var basicx = this["common.basicx"];
    //搜索数据
    function searchData() {
        $('#dataList tbody tr').each(function() {
            if ($(this).text().indexOf($("#searchtext").val()) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    }

    function loadData() {
        $.secAjax({
            type: 'POST',
            url: "dataDictionary/list",
            dataType: 'json',
            data:{orders:"+createTime"},
            success: function(data) {
                var bodyTemplate = Handlebars.compile($("#template-tbody").html());
                $('#dataList tbody').html(bodyTemplate(data.page));
            }
        });
    }
    // 初始化
    basicx.create("dataDictionary", {
        options: {
            domain: "dataDictionary" //设置模块路径
        },
        add: { // 设置添加功能参数信息
            defaultValue: {
                name: "",
                content: "",
                id: ""
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
        del: {
            sendProp: { "data-id": "id", "data-name": "name" }
        },
        list: {
            flushing: function() {
                loadData();
            }
        }
        //加载基本组件-增删改功能
    }).initialization();
    $("#btn-search").click(searchData);
    
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
            	name: {
                    validators: {
                    	notEmpty: {
                    		message: '名称不能为空'
                    	},
                        stringLength: {
                            min: 1,
                            max: 50,
                            message: '不超过50个字符'
                        }
                    }
                },
                content: {
                	validators: {
                		notEmpty: {
                			message: '内容不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 1000,
                			message: '不超过1000个字符'
                		},
                        callback: {  
                            message: '不符合json字符串规则',  
                            callback: function(value, validator) {
                                reg=/^[0-9]+$/;     
                                if(reg.test(value)){
                                    return false;
                                }
                            	try {
                            		eval('(' + value + ')');
								} catch (e) {
									return false;
								}
								return true;
                            }  
                        }  
                	}
                }
            }
        });
});