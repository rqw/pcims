var depends = [
    { name: "common.basicx" },
    { name: "common.constants" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "hasChildrenTable" },
    { name: "floatWindow" },
    { name: "ztree" },
    { name: "bootstrap-validate" }
];
modular.define({ name: "sysmgr.role" }, depends, function() {
    var basicx = this["common.basicx"];
    var constants = this['common.constants'];
    var utils = this.utils;
    var pagination = this.pagination;
    var container = { juris: [] ,role:{}};
    //数据提交函数
    var data = function() {
        var dataObj = $.hform.data($("#datamodal [name]"));
        return JSON.stringify($.extend( container.role, dataObj));
    };
    // 用于返回查询条件对象。
    var fun_search = function() {
        return {};
    };
    //排序函数，用于返回排序条件
    var fun_order = function() {
        return { "orders[0]": "+createTime" };
    };
    // 初始化
    basicx.create("role", {
        options: {
            domain: "role" //设置模块路径
        },
        add: { // 设置添加功能参数信息
            defaultValue: {
                roleName: "",
                description: "",
                id: "",
                roleCode: ""
            },
            dependent: {
                data: data,
                showAfter: function(options) {
                    container.role= {};
	                $("#dataform").data('bootstrapValidator').resetForm();
	            },
	            isValidate: function() {
	                $("#dataform").data('bootstrapValidator').validate();
	                if (!$("#dataform").data('bootstrapValidator').isValid()) {
	                    return false;
	                }
	                return true;
	            }
            },
            ajaxOpts: { contentType: "application/json" }
        },
        edit: {
            dependent: {
                data: data,
                showAfter: function(data,options) {
                    container.role=  data;
		            $("#dataform").data('bootstrapValidator').resetForm();
		        },
		        isValidate: function() {
		            $("#dataform").data('bootstrapValidator').validate();
		            if (!$("#dataform").data('bootstrapValidator').isValid()) {
		                return false;
		            }
		            return true;
		        }
            },
            ajaxOpts: { contentType: "application/json" }
        },
        list: {
            //禁止list组件在basicx组件初始化完成后立即加载分页数据
            lazy: true,
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
                },
                callback: function(page) {
                    //修改container容器中的当前页面角色的所有权限信息。
                    container.juris = page.role_juris;
                }
            }

        }
        //加载基本组件-增删改功能，并调用分页组件刷新页面，第一次访问做加载资源信息的处理。
    }).initialization().list.page.load(1, 10, function() {
        return $.hform.cvMap("conditions", {
            "firstLoad": 'true'
        });
    }, function(page) {
        // 设置树的配置信息
        var setting = {
            check: {
                chkboxType: { "Y": "ps", "N": "s" },
                enable: true
            }
        };
        var saxprop = function() {
            _this = this;
            _this["isHidden"] = false;
            if (_this.extend) {
                var o = eval("(" + _this.extend + ")");
                _.map(o, function(val, key) {
                    _this[key] = val;
                });
            }
            if (_this.children) {
                _.map(_this.children, function(val) {
                    saxprop.apply(val);
                });
            }
        };
        saxprop.apply(page.resource);

        // 初始化树
        $.fn.zTree.init($("#ztree"), setting, page.resource.children);
        return true;
    });
    //绑定授权事件
    $("#dataList").on("click", "[data-select=btn-grant]", function() {
        //显示授权窗口
        showWindow("#rolemdal");
        var t = $(this);
        //将当前角色已经具有的权限选中
        var roleid = t.attr("id");
        //将当前需要授权的角色的信息，转交给授权保存按钮。
        $("#rolemdal [data-select=btn-save-grant]").attr("role-roleName", t.attr("roleName"));
        $("#rolemdal [data-select=btn-save-grant]").attr("role-description", t.attr("description"));
        $("#rolemdal [data-select=btn-save-grant]").attr("role-roleCode", t.attr("roleCode"));
        $("#rolemdal [data-select=btn-save-grant]").attr("role-id", t.attr("id"));
        $("#tree_title").html(t.attr("roleName") + "的");
        if (roleid) {
            //从container中读取当前角色具有的权限编码信息。
            var juris = _.pluck(container.juris[roleid], "jurisdictionCode");
            if (juris) {
                var ztree = $.fn.zTree.getZTreeObj("ztree");
                //递归修改ztree节点
                var nodeChecked = function() {
                    _this = this;
                    if (_.contains(juris, _this.juris_code)) {
                        ztree.checkNode(_this, true, true);
                    } else {
                        ztree.checkNode(_this, false, false);
                    }
                    _.map(_this.children, function(v) {
                        nodeChecked.apply(v);
                    });
                };
                nodeChecked.apply(ztree.getNodes()[0]);
            }
        }
    });
    //声明授权保存按钮的事件
    $("#rolemdal [data-select=btn-save-grant]").on("click", function() {
        var t = $(this);
        //获取角色信息
        var role = {};
        role['jurisdictions'] = _.filter(_.map($.fn.zTree.getZTreeObj("ztree")
            .getCheckedNodes(true),
            function(ele) {
                return { "jurisdictionCode": ele.juris_code };
            }), function(obj) {
            return obj.jurisdictionCode;
        });
        role.id = t.attr("role-id");
        role.roleName = t.attr("role-roleName");
        role.description = t.attr("role-description");
        role.roleCode = t.attr("role-roleCode");
        $.secAjax({
            type: 'POST',
            url: "role/save",
            contentType: "application/json",
            data: JSON.stringify(role),
            dataType: 'json',
            success: function(data) {
                // 隐藏用户信息窗体
                hideWindow("#rolemdal");
                utils.loading.hide();
                // 修改提示窗口内容并弹出提示窗口
                $.hjk.messageBox.alert({
                    body: data.msg
                });
                pagination.find("role").load();
            }
        });

    });
    // 点击查询按钮时修改fun_search方法，并重新加载页面数据。
    function searchData() {
        var searchtext = $("#searchtext").val();
        fun_search = function() {
            if (searchtext)
                return $.hform.cvMap("conditions", {
                    'roleCodeLIKE or roleNameLIKE or descriptionLIKE  ': searchtext 
                });
            return {};
        };
        basicx.find("role").list.flush();
    }
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
            	roleName: {
                    validators: {
                    	notEmpty: {
                            message: '角色名称不能为空'
                        },
                        stringLength: {
                            min: 1,
                            max: 16,
                            message: '不超过16个字符'
                        }
                    }
                },
                roleCode: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 15,
                			message: '不超过15个字符'
                		}
                	}
                },
                description: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 100,
                			message: '不超过100个字符'
                		}
                	}
                },
            }
        });
    
});