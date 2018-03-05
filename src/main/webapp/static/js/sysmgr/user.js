var depends = [
    { name: "utils" },
    { name: "common.basicx" },
    { name: "common.constants" },
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    //时间选择插件
    { name: "daterangepicker" },
    //图表切换控制器
    { name: "floatWindow" },
    { name: "ztree" },
    { name: "combox" },
    { name: "common.common" },
    { name: "bootstrap-validate" },
    { name: "resource" }
];


modular.define({ name: "sysmgr.user" }, depends, function() {
    var basicx = this["common.basicx"];
    var constants = this['common.constants'];
    var combox = this.combox;
    var utils = this.utils;
    var authorizeTree;
    var leftOrgTree;
    var rightOrgTree;
  //渲染添加编辑窗口
    {
        //初始角色列表
        $.postJson({
            url: "role/list",
            data: { rows: 100 },
            success: function(data) {
                combox.changeOptions("#roles", combox.cvData(data.page.dataList, "roleName", "id"));
                combox.multiple("#roles");
            }
        });
        
    }
    //
    var fun_search=function(){
    	return {};
    };
	
    // 用于返回机构树条件对象。
    var fun_tree = function() {
        return {};
    };
    //排序函数，用于返回排序条件
    var fun_order = function() {
        return { "orders[0]": "+createTime" };
    };
    //初始化basicx组件
    basicx.create("user", {
        options: {
            domain: "user" //设置模块路径
        },
        add: { // 设置添加功能参数信息
            defaultValue: {
                id: "",
                userName: "",
                fullname: "",
                doctcode: "",
                birthday: "",
                tel: "",
                fax: "",
                flag: 1,
                mail: "",
                identifyno: "",
                qq: "",
                properties: 1,
                sex: 1,
                hlevel: 1,
                titles: 1,
                "roles[index].id": [],
                "organization.name": "",
                titles: "0",
                dept: "",
                expertno: "",
                consultfee: "",
                introduce: ""
            },
            dependent: {
                showAfter: function(options) {
                	cleaVal();
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
                	var dat = data.data;
                	var use={};
                	use.id=dat.id;
                	
                	var doctorData=$.hform.data($("#dataform_zj [name]"));
                	doctorData.user=use;
                	doctorData.doctor=dat.fullname;
                	if (doctorData.zj_id=="") {
						delete doctorData['zj_id'];
					} else {
						doctorData.id=doctorData['zj_id'];
						delete doctorData['zj_id'];
					}
                	
                	if (dat.properties=='2') {
	                    $.secAjax({
	                        type: 'POST',
	                        url: "doctor/saveDoctor",
	                		data: JSON.stringify(doctorData),
	                		contentType: 'application/json',
	                        success: function(data) {
	                        	query_zj();
	                        	cleaVal();
	                            utils.messageBox.alert({body: "专家添加成功"});
	                            basicx.find("user").list.flush();
	                            return this;
	                        }
	                    });
					}
                	utils.messageBox.alert({body: data.msg});
                    basicx.find("user").list.flush();
                    return this;
                }
            },
            ajaxOpts: {
                failAfter: function(data) {
                    return true;
                },
                successBefore: function() {
                    return true;
                }
            }
        },
        edit: {
            dependent: {
                setVal: function(data, options) {
                	cleaVal();
                    var other = {
                        "roles[index].id": _.map(data.roles, function(element) {
                            return element.id;
                        })
                    };
                    if (data.organization) {
                        other["organization.id"] = data.organization.id;
                        other["organization.code"] = data.organization.code;
                        other["organization.name"] = data.organization.name;
                    }
                    $.hform.val($("#dataform [name]"), $.extend(data.user, other));
                    return this;
                },

                showAfter: function(options) {
                    $("#dataform").data('bootstrapValidator').resetForm();
                   
                    //console.log(data.user.properties)
                },
                isValidate: function() {
                    $("#dataform").data('bootstrapValidator').validate();
                    if (!$("#dataform").data('bootstrapValidator').isValid()) {
                        return false;
                    }
                    return true;
                },
                submitAfter: function(data, control) {
                	var dat = data.data;
                	var use={};
                	use.id=dat.id;
                	
                	var doctorData=$.hform.data($("#dataform_zj [name]"));
                	doctorData.user=use;
                	doctorData.doctor=dat.fullname;
                	
                	tr_fal = function() {
                		if (doctorData.dept != "" || doctorData.expertno != "" || doctorData.consultfee != "" || doctorData.introduce != "") {
							return true;
						}
                		return false;
                	}
                	if(dat.properties=='2' && tr_fal()){
						doctorData.id=doctorData['zj_id'];
						delete doctorData['zj_id'];
						$.secAjax({
							type: 'POST',
							url: "doctor/saveDoctor",
							data: JSON.stringify(doctorData),
							contentType: 'application/json',
							success: function(data) {
								query_zj();
								cleaVal();
								utils.messageBox.alert({body: "编辑专家成功"});
								basicx.find("user").list.flush();
								return this;
							}
						});
					}
					utils.messageBox.alert({body: data.msg});
                    basicx.find("user").list.flush();
                    return this;
                }
            },
            ajaxOpts: {
                failAfter: function(data) {
                    return true;
                },
                successBefore: function() {
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
                    return $.extend(fun_search(), fun_tree(), fun_order());
                }
            }
        },
        del: {
        	dependent:{
        		submitAfter: function(data, control) {
        			var doct = {};
        			doct.id=data.id[0].id;
        			$.secAjax({
                		type: 'POST',
                		url: "doctor/delDoctor",
                		dataType: 'json',
                		data: JSON.stringify(doct),
                		contentType: 'application/json;charset=utf-8',
                		success: function(data) {
                			utils.messageBox.alert({ body: data.msg});
                			basicx.find("user").list.flush();
                			query_zj();
                		}
                	});
                    return false;
                }
        	}
        }
        //加载基本组件-增删改功能
    }).initialization();
    //绑定事件
    {
    	//绑定用户列表查询按钮触发事件
    	$("[event-select=search-user]").click(function(){
    		var searchText=$("#searchUserTxt").val();
    	    fun_search = function(zy) {
    	    	
    	    	var param = {};
    	    	if (searchText) {
    	    		param['fullnameLIKE or userNameLIKE'] = searchText;
    			}
    	    	return $.hform.cvMap("conditions", param);
    	    };		
    	    basicx.find("user").list.flush();
    	});
    	
    	
    }
    
    /***ztree树相关配置 start***/
    var leftOrgTreeClick = function(event, treeId, treeNode) {
        // 修改列表的标题
        $("[data-select=title]").html(treeNode.name + "的");
        fun_tree = function() {
            return $.hform.cvMap("conditions", {
                'organization.code': treeNode.code
            });
        };
        fun_tree_zj = function() {
        	return $.hform.cvMap("conditions", {
        		'user.organization.id': treeNode.id
        	});
        };

        //同步选中所属机构树           
        node = rightOrgTree.getNodeByParam("id", treeNode.id);
        rightOrgTree.selectNode(node);
        rightOrgTreeClick(null, null, treeNode);
        //刷新用户列表
        basicx.find("user").list.flush();
        query_zj();

    };
    var rightOrgTreeClick = function(event, treeId, treeNode) {
        //设置编辑窗口中的机构信息
        $.hform.val($("#dataform [name]"), {
            "organization.name": treeNode.name,
            'organization.code': treeNode.code,
            'organization.id': treeNode.id
        });
    };
    

    var authorizeSetting = {
            check: {
                chkboxType: { "Y":"", "N":""},
                enable: true
            },
//		    callback: {
//		        onClick: function(event, treeId, treeNode){
//		        	console.log(treeId);
//		        	console.log(treeNode);
//		        }
//		    }
        };
    var rightOrgTreeSetting={
    		callback: {
                onClick: rightOrgTreeClick
            }
    };
    var leftOrgTreeSetting={
    		callback: {
                onClick: leftOrgTreeClick
            }
    };
    
    //渲染机构树
    {      
        
        //初始化机构树
        $.postJson({
            url: "organization/tree",
            success: function(data) {
                // 初始化树
            	authorizeTree=$.fn.zTree.init($("#authorize_ztree"), authorizeSetting, data.children);      	
            	leftOrgTree=$.fn.zTree.init($("#left_org_ztree"), leftOrgTreeSetting, data.children);
                rightOrgTree=$.fn.zTree.init($("#right_org_ztree"), rightOrgTreeSetting, data.children);
            }
        });
    }
    
    /***ztree树相关配置 start***/
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
            	'organization.id': {
            		validators: {
            			notEmpty: {
                            message: '所属机构不能为空'
                        }
            		}
            	},
                'roles[index].id': {
                    validators: {
                    	notEmpty: {
                    		message: '角色不能为空'
                    	},
                        stringLength: {
                            min: 1,
                            max: 16,
                            message: '角色不能超过16个字符'
                        }
                    }
                },
                userName: {
                	message: '用户名无效',
                	validators: {
                		notEmpty: {
                			message: '用户名不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 10,
                			message: '用户名必须超过1,不超过10个字符'
                		}
                	}
                },
                identifyno: {
                    validators: {
                        stringLength: {
                            min: 0,
                            max: 18,
                            message: '身份证号不能超过应为18个字符'
                        }
                    }
                },
                fullname: {
                	validators: {
                		notEmpty: {
                			message: '姓名不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 25,
                			message: '姓名必须超过1,不超过25个字符'
                		}
                	}
                },
                sex: {
                	validators: {
                		notEmpty: {
                			message: '性别不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 2,
                			message: '性别不能超过2个字符'
                		}
                	}
                },
                qq: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 15,
                			message: 'QQ不能超过15个字符'
                		}
                	}
                },
                flag: {
                	validators: {
                		notEmpty: {
                			message: '状态不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 1,
                			message: '状态不能超过1个字符'
                		}
                	}
                },
                tel: {
                	validators: {
                		stringLength: {
                			min: 0,
                			max: 20,
                			message: '电话不能超过20个字符'
                		}
                	}
                },
                properties: {
                	validators: {
                		notEmpty: {
                			message: '用户属性不能为空'
                		},
                		stringLength: {
                			min: 1,
                			max: 5,
                			message: '用户属性不能超过5个字符'
                		}
                	}
                }
            }
        });
    
    $('#dataform_zj').bootstrapValidator({
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
        	titles: {
        		validators: {
        			notEmpty: {
                        message: '职称不能为空'
                    }
        		}
        	},
        	dept: {
                validators: {
                    stringLength: {
                        min: 0,
                        max: 10,
                        message: '科室不能超过10个字符'
                    }
                }
            },
            expertno: {
            	validators: {
            		stringLength: {
            			min: 0,
            			max: 16,
            			message: '专家号不能超过16个字符'
            		}
            	}
            },
            consultfee: {
                validators: {
                    stringLength: {
                        min: 0,
                        max: 4,
                        message: '咨询费不能超过应为4个字符'
                    }
                }
            },
            introduce: {
            	validators: {
            		stringLength: {
            			min: 0,
            			max: 100,
            			message: '简介不能超过应为100个字符'
            		}
            	}
            }
        }
    });
    
    //专家
    fun_search_zj = function() {
    	var param = {};
      	var searchVal = $("#searchUserZj").val();
    	if (searchVal) {
    		param['doctorLIKE'] = searchVal;
		}
    	return $.hform.cvMap("conditions", param);
    };
    
    var pageSize = function() {
    	return {capacity: 200,expression:"user,organization"};
    };
    
    // 用于返回机构树条件对象（专家有所不同）。
    var fun_tree_zj = function() {
        return {};
    };
    var query_zj = function() {
        $.secAjax({
            type: 'POST',
            url: "doctor/list",
            dataType: 'json',
            data: $.extend(fun_search_zj(), fun_tree_zj(), fun_order(), pageSize()),
            success: function(data) {
                var bodyTemplate = Handlebars.compile($("#template-divv").html());
                $('#h_container').html(bodyTemplate(data.page));
            }
        });
    }
    
    //初始化专家用户查询事件
    $("#btn-search-userzj").on("click", function() {
    	query_zj();
    });
    $("#dataList").on( "click","[data-select=reset]", function() {
        var id = $(this).attr("data-id");
        $.secAjax({
            type: 'POST',
            url: "user/reset",
            data: { id: id },
            dataType: 'json',
            success: function(data) {
                utils.messageBox.alert({ body: data.msg.replace(new RegExp(/\r\n/g), "<br/>") });
                basicx.find("user").list.flush();
            }
        });

    });
    
    //专家编辑回显
    $("body").delegate(".docter-edit","click",function(){
    	var id=$(this).data("id");
        $.secAjax({
            type: 'POST',
            url: "doctor/info/"+id,
            dataType: 'json',
            success: function(data) {
            	$("#zj_id").val(data.id);
            	$("#consultfee").val(data.consultfee);
            	$("#introduce").val(data.introduce);
            	$("#hlevel").val(data.hlevel);
            	$("#titles").val(data.titles);
            	$("#dept").val(data.dept);
            	$("#expertno").val(data.expertno);
            	
            	
                $.secAjax({
                    type: 'POST',
                    url: "user/info",
                    dataType: 'json',
                    data: "id="+data.user.id,
                    success: function(data) {
                    	
                    	var other = {
                            "roles[index].id": _.map(data.roles, function(element) {
                                return element.id;
                            })
                        };
                        if (data.organization) {
                            other["organization.id"] = data.organization.id;
                            other["organization.code"] = data.organization.code;
                            other["organization.name"] = data.organization.name;
                        }
                        $.hform.val($("#dataform [name]"), $.extend(data.user, other));
                        return this;
                    }
                });
            }
        });
    	
    	showWindow('#datamodal');
    	
    	showWindow('#pro_info')
    });
    
    //专家信息卡片点击事件
    /*
    $("body").delegate(".doctor-info-card-whiter", "click", function() {
        var isSelected = $(this).hasClass("selected");
        if (isSelected) {
            $(this).removeClass("selected")
        } else {
            $(this).addClass("selected")
        }
    });
    */
    
     $("body").delegate(".doctor-info-card-whiter .tools button", "click", function(event) {
    	 //TODO
    	 //阻止冒泡
    	 event.stopPropagation();
    	 
     });
    
  //用户信息用户属性为专家时候
    $("body").delegate("#properties","change",function(){
    	//2 代表的专家
    	if($(this).val()=="2"){
    		showWindow("#pro_info");
    	}
    	if($(this).val()=="1"){
    		hideWindow("#pro_info");
    	}
    	
    });    

    
  //设置左边栏的高度
    var setLeftContainer=function(){
    	var _wh=$(window).height();
    	var _leftH=_wh-30-47;
    	$(".h_left_container .ztree").css({"height":_leftH});
    	console.log(_wh+"  "+_leftH)
    }
    
    $(function(){
    	query_zj();
    	setLeftContainer();
    	$(window).resize(setLeftContainer);
    });
    
    mf.hideAfter=function(selector){
    	if(selector=="#datamodal"){
    		hideWindow("#pro_info")
    		hideWindow("#example24")
    		infoCase="default";//窗口关闭时后设置infoCase默认值
    	}
    	console.log(selector);
    }
  
    
    
    /***专家信息编辑按钮处理模块 开始**/
    //当医生编辑事件点击后 infoCase="docter",模态窗口关闭时候infoCase="default";
    var infoCase="default";
    $("body").delegate(".docter-edit","click",function(){
    	infoCase="docter";
    })
    $("body").delegate("[data-select='btn-save']","click",function(){
    	if(infoCase=="docter"){
    		docterEditSave();
    	}
    })
    
    //专家删除
    $("body").delegate(".docter-del","click",function(){
    	var zj_id = $(this).data("id");
    	utils.messageBox.show('操作提示', "确认删除记录?", {
            '确认': {
                'primary': true,
                'callback': function() {
                	$.secAjax({
                		type: 'POST',
                		url: "doctor/del",
                		dataType: 'json',
                		data: JSON.stringify([{ "id": zj_id }]),
                		contentType: 'application/json;charset=utf-8',
                		success: function(data) {
                			utils.messageBox.alert({ body: data.msg});
                			query_zj();
                		}
                	});
                }
            },
            '取消': {
                'primary': true,
                'callback': function() {
                    utils.messageBox.hide();
                }
            }
        });
    	
    	
    });
    
    //授权
    $("body").delegate("[data-select='btn-save-grant']","click",function(){
    	
    	var nodes=authorizeTree.getCheckedNodes(true);
    	var zj_id = $("#doctorid").val();
    	var arr = [];
    	for(var i=0; i < nodes.length; i++){
    		var org = {};
    		org.id=nodes[i].id;
    		arr[i]= org;
    	}
    	
		$.secAjax({
			type: 'POST',
			url: "doctor/info/"+zj_id,
			dataType: 'json',
			success: function(data) {
				delete data['govs'];
				data.govs=arr;
				$.secAjax({
	    			type: 'POST',
        			url: "doctor/savePower",
        			dataType: 'json',
            		data: JSON.stringify(data),
            		contentType: 'application/json',
	    			success: function(data) {
	    				utils.messageBox.alert({body: data.msg});
	    				hideWindow("#datamodal");
	    				hideWindow("#authorize");
	    				return this;
	    			}
	    		});
			}
		});
    });
    
    
    //专家信息编辑保存回调函数
    var docterEditSave=function(){
    	
        $("#dataform_zj").data('bootstrapValidator').resetForm();
        $("#dataform_zj").data('bootstrapValidator').validate();
        if (!$("#dataform_zj").data('bootstrapValidator').isValid()) {
            return false;
        }
    	
    	var userData=$.hform.data($("#dataform [name]"));
    	var doctorData=$.hform.data($("#dataform_zj [name]"));
    	
    	doctorData.id=doctorData.zj_id;
    	doctorData.doctor=userData.fullname;
    	delete doctorData['zj_id'];    	
    	use={};
    	use.id=userData['id'];
    	use.organization={};
    	use.organization.id=userData['organization.id'];
    	doctorData.user=use;
    	
    	$("#main").load("/RackLocations/kczt_refresh/" + id);
    	
        $.secAjax({
        	type: 'POST',
        	url: "user/save",
        	dataType: 'json',
        	data:userData,
        	success: function(data) {
        		$.secAjax({
        			type: 'POST',
        			url: "doctor/saveDoctor",
        			dataType: 'json',
            		data: JSON.stringify(doctorData),
            		contentType: 'application/json',
        			success: function(data) {
                    	utils.messageBox.alert({body: data.msg});
                    	//basicx.find("user").list.flush();
                    	query_zj();
                    	hideWindow("#datamodal");
                    	cleaVal();
                        return this;
        			}
        		});
        		
        	}
        });
    };
    
    // 清除专家
    var cleaVal = function (){
        $("#titles").val("1");
        $("#zj_id").val("");
    	$("#dept").val("");
    	$("#expertno").val("");
    	$("#consultfee").val("");
    	$("#introduce").val("");
    }
    
    /***专家信息编辑按钮处理模块 结束**/
    
    /**点击授权设置专家id start**/
    $("body").delegate(".shield","click",function(){
    	var id=$(this).data("id");
    	$("#doctorid").val(id);
    	
		$.secAjax({
			type: 'POST',
			url: "doctor/info/"+id,
			dataType: 'json',
			success: function(data) {		
				/**初始化树为默认状态**/
				//收起树
				authorizeTree.expandAll(false);
				//获得节点子节点
				var nodes=authorizeTree.getNodes()[0].children;
				if (data.govs != null) {
					//迭代子节点并设置状态
					iterator(nodes,data.govs);
				} else {
					authorizeTree.checkAllNodes(false);
				}
			}
		});
    	
    	showWindow('#authorize');
    });
    //迭代树
    var iterator=function(treeNodes,orgs){
        var ids="";
        for(var j=0;j<orgs.length;j++){
        	ids+=orgs[j].id+",";
        }
    	for(var i=0;i<treeNodes.length;i++){
    		node=treeNodes[i];
    		
    		if (ids.indexOf(node.id) != -1) {  
                authorizeTree.checkNode(node, true, true);
    		} else {
    			authorizeTree.checkNode(node, false, false);
    		}
    		var nodes=node.children;
			if(nodes.length>0){
				iterator(nodes,orgs);
			}
    	}
    }
    /**点击授权设置专家id end**/
    
    
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
    			
    			if(leftOrgTree){  			
    				for(var o in searchResult){
    					var id="#"+searchResult[o].tId+"_span";
    					$(id).removeClass("h_red_stress");
    					leftOrgTree.expandNode(searchResult[o],false,true,false);
    				}
    				searchResult=leftOrgTree.getNodesByParamFuzzy("name", this.value,null);
    				if(searchResult.length>0){
    					_.map(searchResult,function(vals){    						
    						var pn=vals.getParentNode();
    						while(pn!=null){
    							leftOrgTree.expandNode(pn,true,false,true);
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