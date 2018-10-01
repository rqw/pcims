//申明加载模块
var depends = [
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "hasChildrenTable" },
    { name: "floatWindow" },
    { name: "ztree" },
    {name: "combox"},
    { name: "common.basicx" },
    { name: "common.constants" },
    { name: "common.common" },
    { name: "bootstrap-validate" }
];

//大致意思是加载的 各类参数
modular.define({ name: "sysmgr.organization" }, depends, function() {
	
    var utils = this["utils"];
    var combox=this.combox;
    var basicx = this["common.basicx"];
    var constants = this['common.constants'];
    //存放选中的节点，选中节点的子节点的数据
    var container = { selectNode: [], datas: [] };
    var leftOrgTree;
    
    
    // 初始化
    basicx.create("organization", {
        options: {
            domain: "organization" //设置模块路径
        },
        add: { // 设置添加功能参数信息
        	defaultValue: {
                id: "",
                pcode: "",
                parentId:"",
                pname: "",
                code: "",
                name: "",
                address: "",
                contactPerson: "",
                phone: "",
                isUse: 1,
                orderNum: "",
                slevel: "",
                contactPerson: ""
            },
            dependent: {
                showAfter: function(options) {
                	$("#code").removeAttr("readOnly");
                    $("#dataform").data('bootstrapValidator').resetForm();
                },
                isValidate: function() {
                    $("#dataform").data('bootstrapValidator').validate();
                    if (!$("#dataform").data('bootstrapValidator').isValid()) {
                        return false;
                    }
                    return true;
                },
                submitAfter: function(data, control) {
                    utils.messageBox.alert({
                        body: data.msg
                    });
                    //combasic.list.flush();
                    hideWindow("#example24");
                    return this;
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
                },
                setVal: function(data) {
                	$("#code").attr("readOnly","readOnly");
                    $.hform.val($("#dataform [name]"), $.extend(data.organization, {
                        pname: data.pname ? data.pname : "无"
                    }));
                    return this;
                },
                submitAfter: function(data) {
                    utils.messageBox.alert({
                        body: data.msg
                    });
                    updateTree();
                    hideWindow("#example24");
                    return this;
                }
            }
        },
        del: {
            sendProp: {
                "data-id": "id",
                "data-code": "code"
            },
            dependent: {
                submitBefore: function(data) {
                    if (data && data.length > 0) {
                        leftOrgTree = $.fn.zTree.getZTreeObj("ztree");
                        for (var i = 0; i < data.length; i++) {
                            var node = leftOrgTree.getNodeByParam("id", data[i].id);
                            if (node && node.children.length > 0) {
                                utils.messageBox.alert({
                                    body: "不能删除存在下级机构的机构信息！"
                                });
                                return false;
                            }
                        }
                    }
                    return true;

                },
                submitAfter: function(data) {
                    utils.messageBox.alert({
                        body: data.msg
                    });
                    updateTree();
                    hideWindow("#example24");
                    return this;
                }
            }
        },
        list: {
            lazy: false,
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
                prop: {
                    getData: function(data, call) {
                        var page = {
                            total: container.datas.length,
                            number: data.number,
                            capacity: data.capacity,
                            dataList: container.datas.slice((data.number - 1) * data.capacity, data.number * data.capacity)
                        };
                        call(page);
                    }
                }
            }
        }
        //加载基本组件-增删改功能
    }).initialization();
    //机构树节点点击处理函数
    var nodeClickFun = function(event, treeId, treeNode) {
        //记录点击路径
        container.selectNode = [];
        var selectNode = treeNode;
        while (selectNode) {
            container.selectNode.push(selectNode.id);
            selectNode = selectNode.getParentNode();
        }

        // 修改列表的标题
        if (treeNode.code == "R") {
            $("#list_title").html("机构信息");
        } else {
            $("#list_title").html(treeNode.name + "的下级机构信息");
        }
        //设置子节点数据，并跳转到第一页
        container.datas = treeNode.children;
        basicx.find("organization").list.flush();
        //同步点击上级机构
        var choice_ztree = $.fn.zTree.getZTreeObj("choice_ztree");
        node = choice_ztree.getNodeByParam("id", treeNode.id);
        choice_ztree.selectNode(node);
        choiceNode(null, null, node);
    };
    var choiceNode = function(event, treeId, treeNode) {
        $("#pcode").val(treeNode.code);
        $("#parentId").val(treeNode.id);
        $("#pname").val(treeNode.name);
        $("#dataform").data('bootstrapValidator').resetForm();
    };
    //机构树setting
    var setting = { callback: { onClick: nodeClickFun } };
    var choice_setting = { callback: { onClick: choiceNode } };

    function updateTree() {
        
        var choice_ztree = $.fn.zTree.getZTreeObj("choice_ztree");
        if (leftOrgTree) {
            var path = _.rest(_.map(container.selectNode.reverse(), function(v) {
                return leftOrgTree.getNodeByParam("id", v).name;
            })).join("/");
            container.selectNode.reverse();
            $.postJson({
                url: "organization/tree",
                data: "path=" + path,
                success: function(data) {
                    var selectNode = leftOrgTree.getNodeByParam("id", container.selectNode[0]);
                    leftOrgTree.removeChildNodes(selectNode);
                    leftOrgTree.addNodes(selectNode, data.children);
                    selectNode = choice_ztree.getNodeByParam("id", container.selectNode[0]);
                    choice_ztree.removeChildNodes(selectNode);
                    choice_ztree.addNodes(selectNode, data.children);

                    //设置子节点数据，并跳转到第一页
                    container.datas = data.children;
                    basicx.find("organization").list.flush();
                }
            });
        } else {
            $.postJson({
                url: "organization/tree",
                success: function(data) {
                    // 初始化树
                	leftOrgTree = $.fn.zTree.init($("#ztree"), setting, data);
                    $.fn.zTree.init($("#choice_ztree"), choice_setting, data);
                    // 触发根节点的点击事件
                    var rootNode = leftOrgTree.getNodeByParam("level", 0);
                    nodeClickFun(null, null, rootNode);
                }
            });
        }
    }

    updateTree();
    
  //设置左边栏的高度
    var setLeftContainer=function(){
    	
    	var _wh=$(window).height();
    	var _leftH=_wh-30-47;
    	$(".h_left_container .ztree").css({"height":_leftH});
//    	console.log(_wh+"  "+_leftH)
    };
    
    // 加载机构级别
    var slevel = function() {
    	$.postJson({
    		url:"dataDictionary/list",
    		data:"conditions[name]=机构级别",
    		success:function(page){
    			_.each(page.page.dataList,function(v){
    			if(v.name.indexOf("列表")==-1)
    				utils.dataDic.bind(v.name,eval(v.content));
                	//初始化状态查询列表
                if(v.name=="机构级别"){
                	combox.changeOptions("#slevel",eval(v.content),true);
                }
    		});
    		
    	}});
    };
    
    //设置校验方法
    $('#dataform').bootstrapValidator({
            message: '此值无效',
            group: ".form-group",
            excluded: [':disabled'],
            submitButtons: '#btn-save1',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	pname: {
                    validators: {
                    	notEmpty: {
                            message: '上级机构不能为空'
                        }
                    }
                },
            	code: {
                    validators: {
                    	notEmpty: {
                            message: '机构编码不能为空'
                        },
                		stringLength: {
                			min: 6,
                			max: 30,
                			message: '机构编码应为6-30个字符'
                		}
                    }
                },
                name: {
                	validators: {
                		notEmpty: {
                			message: '机构名称不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 50,
                			message: '机构名称不能超过50个字符'
                		}
                	}
                },
                address: {
                	validators: {
		                stringLength: {
		        			min: 0,
		        			max: 50,
		        			message: '机构地址不能超过50个字符'
		        		}
                	}
                },
                contactPerson: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 15,
                			message: '联系人不能超过15个字符'
                		}
                	}
                },
                phone: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 15,
                			message: '电话不能超过15个字符'
                		}
                	}
                },
                isUse: {
                	validators: {
                		notEmpty: {
                			message: '是否可用必选'
                		}
                	}
                },
                orderNum: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 2,
                			message: '排序等级不能超过2个字符'
                		}
                	}
                },
                slevel: {
                	validators: {
                		notEmpty: {
                			message: '机构级别不能为空'
                		}
                	}
                },
            }
        });
    
    $(function(){
    	setLeftContainer();
    	$(window).resize(setLeftContainer);
    	slevel();
    	//给查询输入框绑定内容改变动态查询机构树事件
    	searchLeftTree();
    })
    
    
    //给查询输入框绑定内容改变动态查询机构树事件
    var searchResult;
    function searchLeftTree(){
    	var el=$("#searchLeftTree")[0]
    	if (el.addEventListener ) {
    		el.addEventListener("input",function(){
    			
    			if(leftOrgTree){    			
    				for(var o in searchResult){
    					var id="#"+searchResult[o].tId+"_span";
    					$(id).removeClass("h_red_stress");    					
    					leftOrgTree.expandNode(searchResult[o],false,true,false);
    				}
    				searchResult=leftOrgTree.getNodesByParamFuzzy("name", this.value,null);
    				//递归查询父节点 展开 start
    				if(searchResult.length>0){
    					_.map(searchResult,function(vals){    						
    						var pn=vals.getParentNode();
    						while(pn!=null){
    							leftOrgTree.expandNode(pn,true,false,true);
    							pn=pn.getParentNode();
    						}    						
    					});
    					
    					
    				}
    				
    				//递归查询父节点 展开 end
    				
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