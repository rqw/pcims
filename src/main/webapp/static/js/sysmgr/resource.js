var depends = [
    { name: "utils" },
    { name: "basic" },
    { name: "ztree" },
    { name: "floatWindow" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    //{name: "framework-public", type: "css"},
    { name: "sysmgr.resource", type: "css" },
    { name: "divscroll" },
    { name: "bootstrap-validate" }
];
modular.define({ name: "sysmgr.resource" }, depends, function() {
	
	var cleVal = function(){
	    $("#dataform #resourceName").val();
	    $("#dataform #resourceType").val("");
	    $("#dataform #no").val("");
	    $("#dataform #juris_code").val("");
	    $("#dataform #properties").val("");
	};
	var zTree;

    // 打开添加界面
    function add() {
    	cleVal();
        $.hform.val($("#dataform [name]"), {
            resourceName: "",
            resourceType: 3,
            id: "",
            parentNO: $("#infoform [name=no]").val(),
            no: "",
            juris_code: "",
            properties: ""
        });
        $("#code").removeAttr("readonly");

        //$("#datamodal").modal("show");
        showWindow("#datamodal")
        $("#dataform").data('bootstrapValidator').resetForm();
        
    }

    // 打开编辑界面
    function edit(id) {
    	cleVal();
        $.secAjax({
            type: 'POST',
            url: "resource/info",
            data: "id=" + id,
            dataType: 'json',
            success: function(data) {
				//var dataJson = $.parseJSON(data);
                //$("#datamodal").modal("show");
				//alert(data);
				if(data.resourceName == '根节点'){
					
					$.hjk.messageBox.show('系统提示', '根节点不允许编辑！', {
                            '确认': {
                                'primary': true,
                                'callback': function () {
                                    
                                }
                            }
                        });
					return ;
				}
                // 初始化编辑界面，转换后台传递数据为满足loadData要求的格式化对象
                $.hform.val($("#dataform [name]"), data);
				
                showWindow("#datamodal");
            }
        });
        $("#dataform").data('bootstrapValidator').resetForm();
    }

    // 执行删除操作
    function del(id) {
        $.hjk.messageBox.show('操作提示', "确认删除记录?", {
            '确认': {
                'primary': true,
                'callback': function() {
                    $.secAjax({
                        type: 'POST',
                        url: "resource/del",
                        data: JSON.stringify([{ "id": id }]),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function(data) {
                            $.hjk.messageBox.alert({
                                body: data.msg
                            });
                            loadData();
                        }
                    });
                }
            },
            '取消': {
                'primary': true,
                'callback': function() {
                    $.hjk.messageBox.hide();
                }
            }
        });

    }

    // 提交方法（添加和修改）
    function submit() {
    	$("#dataform").data('bootstrapValidator').validate();
        if (!$("#dataform").data('bootstrapValidator').isValid()) {
            return false;
        }
        var dataObj = $.hform.data($("#datamodal [name]"));
        $.secAjax({
            type: 'POST',
            url: "resource/save",
            data: dataObj,
            dataType: 'json',
            success: function(data) {
                // 隐藏用户信息窗体
                //$("#datamodal").modal("hide");
                hideWindow("#datamodal")
                $.hjk.messageBox.alert({
                    body: data.msg
                });
                loadData();
            }
        });
        return false;
    }

    // 记录选中的节点id
    var selectNodeid;
    // 加载数据
    function loadData() {
        $.secAjax({
            type: 'POST',
            url: "resource/list",
            data: {},
            dataType: 'json',
            success: function(data) {
                var nodeClickFun = function(event, treeId, treeNode) {
                    selectNodeid = treeNode.id;
                    //给添加、编辑、删除按钮增加data-id属性，并根据是否存在子属性决定删除按钮是否可用
                    $("#info-btns cite").attr("data-id",treeNode.id);
                    if (treeNode.children && treeNode.children.length > 0) {
                        $("#info-btns cite[data-select=btn-del]").addClass("disabled");
                    } else {
                    	$("#info-btns cite[data-select=btn-del]").removeClass("disabled");
                    }
                    // 修改列表的标题
                    $("#info_title").html(treeNode.name + "的");
                    $("#list_title").html(treeNode.name + "的下级");
                    
                    //资源信息展示信息填充
                    var pnode = treeNode.getParentNode();
                    var prop = eval(treeNode.extend);
                    $("#infoform [name=resourceName]").val(treeNode.name);
                    $("#infoform [name=id]").val(treeNode.id);
                    $("#infoform [name=resourceType]").val(treeNode.resourceType);
                    $("#infoform [name=resourceTypeName]").val(treeNode.typename);
                    $("#infoform [name='juris_code']").val(treeNode.juris_code);
                    $("#infoform [name='properties']").val(treeNode.properties);
                    $("#infoform [name='no']").val(treeNode.no);
                    if (pnode) {
                        $("form [name='parentNO']").val(pnode.no);
                    }
                    //列表中只显示菜单一下基本资源
                    var nodes = _.filter(treeNode.children, function(node) {
                        return node.resourceType >= 4;
                    })
                    var dataListTemplate = Handlebars.compile($("#template-tbody").html());
                    $('#dataList tbody').html(dataListTemplate(nodes));
                };
                var setting = {
                    callback: {
                        onClick: nodeClickFun
                    }
                };
                var saxprop = function() {
                    _this = this;
                    if (_this.extend) {
                        var o = eval("(" + _this.extend + ")")
                        _.map(o, function(val, key) {
                            _this[key] = val;
                        })
                    }
                    switch (_this.resourceType) {
                        case "0":
                            _this['typename'] = "根";
                            break;
                        case "1":
                            _this['typename'] = "应用";
                            break;
                        case "2":
                            _this['typename'] = "导航条";
                            break;
                        case "3":
                            _this['typename'] = "菜单";
                            break;
                        case "4":
                            _this['typename'] = "按钮";
                            break;
						case "5":
                            _this['typename'] = "权限资源";
                            break;
                    }
                    if (_this.children) {
                        _.map(_this.children, function(val) {
                            saxprop.apply(val);
                        })
                    }

                };
                saxprop.apply(data);
                // 初始化树
                zTree = $.fn.zTree.init($("#tree"), setting, data);
                var rootNode = zTree.getNodeByParam("level", 0);
                if (selectNodeid) {
                    var node = zTree.getNodeByParam("id", selectNodeid)
                    if (node != null) {
                        zTree.selectNode(node);
                        nodeClickFun(null, null, node);
                    }
                } else {
                    nodeClickFun(null, null, rootNode);
                }
            }
        });
    }

    // 初始化参数及用户数据、机构数据加载，模版函数定义等。
    loadData();

    //注册事件
    $("#btn-add").click(add);
    $("body").on("click","[data-select=btn-edit]",function() {
    	var id=$(this).attr("data-id");
        edit(id);
    });
    $("body").on("click","[data-select=btn-del]",function() {
    	if(!$(this).hasClass("disabled")){
    		var id=$(this).attr("data-id");
    		del(id);
    	}
    });
    $("#btn-save").click(submit);

  //设置左边栏的高度
    var setLeftContainer=function(){
    	
    	var _wh=$(window).height();
    	var _leftH=_wh-30-47;
    	$(".h_left_container .ztree").css({"height":_leftH});
    	console.log(_wh+"  "+_leftH)
    }
    $(function(){
    	setLeftContainer();
    	$(window).resize(setLeftContainer);
    })
    
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
            	resourceName: {
                    validators: {
                    	notEmpty: {
                            message: '资源名称不能为空'
                        },
                        stringLength: {
                            min: 1,
                            max: 30,
                            message: '不超过30个字符'
                        }
                    }
                },
                resourceType: {
                	validators: {
                		notEmpty: {
                			message: '资源类型不能为空'
                		}
                	}
                },
                no: {
                	validators: {
                		notEmpty: {
                			message: '资源编号不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 20,
                			message: '不超过20个字符'
                		}
                	}
                },
                juris_code: {
                	validators: {
                		notEmpty: {
                			message: '资源权限不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 20,
                			message: '不超过20个字符'
                		}
                	}
                },
                properties: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 200,
                			message: '不超过200个字符'
                		}
                	}
                }
            }
        });
    
    
    
    
   
    
    //输入内容没有改变 
    
    $(function(){    	
    	//给查询输入框绑定内容改变动态查询机构树事件
    	searchLeftTree();
    })
    //给查询输入框绑定内容改变动态查询机构树事件
    var searchResult;
    function searchLeftTree(){
    	var el=$("#searchLeftTree")[0]
    	if (el.addEventListener ) {
    		el.addEventListener("input",function(){
    			
    			if(zTree){  			
    				for(var o in searchResult){
    					var id="#"+searchResult[o].tId+"_span";
    					$(id).removeClass("h_red_stress");
    					zTree.expandNode(searchResult[o],false,true,false);
    				}
    				searchResult=zTree.getNodesByParamFuzzy("name", this.value,null);
    				if(searchResult.length>0){
    					_.map(searchResult,function(vals){    						
    						var pn=vals.getParentNode();
    						while(pn!=null){
    							zTree.expandNode(pn,true,false,true);
    							pn=pn.getParentNode();
    						}    						
    					});
    					
    					
    				}
    				
    				
    				if(this.value==""||this.value==null)return;
    				for(var o in searchResult){
    					var id="#"+searchResult[o].tId+"_span";
    					$(id).addClass("h_red_stress");
    				}    				
//    				console.log(searchResult);
    				top.s=searchResult;
    			}        	     
        	})

        } else if ( el.attachEvent ) {
        	el.attachEvent("onpropertychange", function(e) {
        	    if (e.propertyName === "value") {
        	        //IE8 事件处理
        	    }});

        }
    }
    

});