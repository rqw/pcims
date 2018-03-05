var depends = [
    { name: "common.basicx" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "floatWindow" },
    { name: "sysmgr.configuration", type: "css" },
    { name: "bootstrap-validate" }
];
modular.define({ name: "sysmgr.configuration" }, depends, function() {
    var basicx = this["common.basicx"];
    var utils = this.utils;
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
    //绑定状态的数据字典
    utils.dataDic.bind('状态', [{ 1: "启用" }, { 0: "未启用" }]);

    function loadData() {
        $.secAjax({
            type: 'POST',
            url: "configuration/list",
            dataType: 'json',
            success: function(data) {
                var bodyTemplate = Handlebars.compile($("#template-tbody").html());
                var list = _.flatten(_.map(data, function(v) {
                    return v;
                }));
                $('#dataList tbody').html(bodyTemplate(list));
            }
        });
    }


    // 初始化
    basicx.create("configuration", {
        options: {
            domain: "configuration" //设置模块路径
        },
        add: { // 设置添加功能参数信息
            defaultValue: {
                configurationGroup: "",
                configurationName: "",
                configurationValue: "",
                callback: "",
                flag: 1,
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
            	configurationGroup: {
                    validators: {
                        stringLength: {
                            min: 0,
                            max: 25,
                            message: '不超过25个字符'
                        }
                    }
                },
                configurationName: {
                	validators: {
                		notEmpty: {
                			message: '配置名称不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 25,
                			message: '不超过25个字符'
                		}
                	}
                },
                configurationValue: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 1000,
                			message: '不超过1000个字符'
                		}
                	}
                },
                organizationId: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 16,
                			message: '不超过16个字符'
                		}
                	}
                },
                callback: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 100,
                			message: '不超过100个字符'
                		}
                	}
                }
            }
        });
});