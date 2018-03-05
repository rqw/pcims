/**
 * 
 */

var depends = [
    {name: "font-awesome", type: "css"},
    {name: "iconfont", type: "css"},
    {name: "common.bstable"},
    {name: "common.common"},
    {name: "bootstrap-datetimepicker-cn"},
    {name: "pinyin"},
    {name: "utils"}
];
modular.define({name: "index.welcome"}, depends, function () {
    var utils=this.utils;
    var DEFAULT_ENTITY={
        prescrition:{name:"",cnt:"",id:"",cost:"",remark:""},
        disease:{name:"",pym:"",remark:""},
        person:{id:"",name:"",pym:"",sex:"",birthday:"",phone:"",remark:""},
        diagnose:{id:"",spLeft:"",dpLeft:"",spRight:"",dpRight:"",hrLeft:"",hrRight:"",spLeft2:"",dpLeft2:"",spRight2:"",dpRight2:"",hrLeft2:"",hrRight2:"",spLeft3:"",dpLeft3:"",spRight3:"",dpRight3:"",hrLeft3:"",hrRight3:"",symptom:"",cost:"",diagnoseTime:""}
    };
    var welcome={
        viewInit:function(){
            //日期控件处理
            $('[data-component="datetimepicker"]').each(function(){
                var _this=this;
                $(_this).datetimepicker($.extend({
                    language:  'zh-CN',  //日期
                    //todayBtn:  1,
                    minView: 2,
                    format: 'yyyy-mm-dd',//显示格式
                    forceParse: 0,
                    //showMeridian: 1,
                },getHtmlData(_this)))
            });
            //下拉组件
            $("[data-class=option]").click(function(){
                $($(this).attr("data-select")).val($(this).attr("data-value")).html($(this).text());
            });
            //初始化病人信息列表
            $('#table_persons').bootstrapTable({
                url: 'diagnose/person/list',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                toolbar: '#person_toolbar',
                queryParams: function(){
                    return $.extend(fun_personSearch(),{orders:"-lastTime"});
                },//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                //height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                columns: [
                    {checkbox:true},
                    {field: 'name',title: '姓名'},
                    {field: 'pym',title: '拼音码'},
                    {field: 'sex',title: '性别',formatter:function(value) {return value?value==2?"女":"男":"-"}},
                    {field: 'birthday',title: '年龄',formatter:function(value){return value?jsGetAge(value):"-"}},
                    {field: 'lastTime',title: '最近就诊时间'},
                    {field: 'phone',title: '电话'},
                    {field: 'remark',title: '备注'}
                ]
            }).on('click-row.bs.table', function (e, row, element){
                $.hform.val($("#personForm [name]"), $.extend({},DEFAULT_ENTITY.person,row));
                $(".input_sex").html(row.sex==2?"女":"男");
                $("#personAge").val(row.birthday?jsGetAge(row.birthday):"");
            });
            //初始化诊断信息列表
            $('#table_diagnose').bootstrapTable({
                url: 'diagnose/record/list',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                toolbar: '#diagnose_toolbar',
                queryParams: function(){
                    return $.extend(fun_diagnoseSearch(),{expression:"disease,medicationRecords,person,prescriptionUse,prescriptionInfo,supply,drugInfo",orders:"-diagnoseTime"});
                },//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                //height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度

                columns: [
                    {checkbox:true,class:"hide"},
                    {field: 'person.name',title: '姓名'},
                    {field: 'person.sex',title: '性别',formatter:function(value) {return value?value==2?"女":"男":"-"}},
                    {field: 'person.birthday',title: '年龄',formatter:function(value){return value?jsGetAge(value):"-"}},
                    {field: 'disease',title: '疾病名称',formatter:function(value){return value?value.name:"-";}},
                    {field: 'symptom',title: '症状'},
                    {field: 'diagnoseTime',title: '诊断时间'},
                    {field: 'cost',title: '收费(元)'}
                ]
            }).on('click-row.bs.table', function (e, row, element){
                if(row.disease){
                    row["disease.id"]=row.disease.id;
                    row["disease.name"]=row.disease.name;
                    fillDiseaseInfo(row.disease);
                }
                if(row.prescriptionUse){
                    fillPrescriptionList(row);
                }
                $.hform.val($("#diagnoseForm [name]"), $.extend({},DEFAULT_ENTITY.diagnose,row));
                fillPerson(row.person);
            });
            //初始化疾病信息列表
            $('#table_disease').bootstrapTable({
                url: 'diagnose/disease/list',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                toolbar: '#disease_toolbar',
                queryParams: function(){
                    return $.extend(fun_diseaseSearch(),{expression:"prescriptionInfo,supply,drugInfo",orders:"+pym"});
                },//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                //height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                columns: [
                    {checkbox:true,class:"hide"},
                    {field: 'name',title: '疾病名称'},
                    {field: 'pym',title: '拼音码'},
                    {field: 'remark',title: '描述'},
                    {field: "prescriptionInfo.length",title:"处方数"},
                    {title:"操作",
                        formatter:function(){
                            return `
                            <button type="button" class="btn btn-info add" data-toggle="modal" data-target="#prescriptionInfoModal">增加处方</button>
                            <button type="button" class="btn btn-danger delete" >删除</button>
                            `;
                        },
                        events:{
                            "click button.add":function(e,value,row,index){
                                fillPrescription({},{diseaseId:row.id},"info",function(){
                                    $("#table_disease").bootstrapTable("refresh");
                                    $("#table_diagnose").bootstrapTable("refresh");
                                },function(data){
                                    $("#table_disease").bootstrapTable("refresh");
                                    $("#table_diagnose").bootstrapTable("refresh");

                                });
                            },
                            "click button.delete":function(e,value,row,index){
                                utils.messageBox.show('系统提示', `确认删除${row.name}?`, {
                                    '确认': {
                                        'primary': true,
                                        'callback': function () {
                                            $.postJson({
                                                url: "diagnose/disease/del",
                                                loading:true,
                                                data: JSON.stringify([{id:row.id}]),
                                                contentType: 'application/json;charset=utf-8',
                                                success: function(data) {
                                                    utils.messageBox.alert({body:"删除成功！"});
                                                    $("#table_disease").bootstrapTable("refresh");
                                                    $("#table_diagnose").bootstrapTable("refresh");
                                                }
                                            });
                                        }
                                    },
                                    '取消': {'callback': function () {}}
                                });
                            }
                        }
                    }
                ],
                detailView:true,
                detailFormatter:function(index,row) {
                    var content=[];
                    content.push(`<table class="table table-condensed table-hover table-bordered table-striped" data-select="prescriptionInfoList">`)

                    if(row.prescriptionInfo){
                        content.push(`
                            <thead>
                                <tr>
                                    <th>处方名称</th>
                                    <th>用量</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                        `);
                        for(var i=0;i<row.prescriptionInfo.length;i++){
                            var info=row.prescriptionInfo[i];
                            content.push(`
                            <tr >
                                <td>${emptyVal(info.name)}</td>
                                <td>${emptyVal(info.cnt)}</td>
                                <td>${emptyVal(info.remark)}</td>
                                <td>
                                    <span class="hide">${JSON.stringify(info)}</span>
                                    <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#prescriptionInfoModal" >
                                        修改
                                    </button>
                                    <button type="button" class="btn btn-danger delete" data-id="${info.id}" >删除</button>
                                </td>
                            </tr>
                            `);
                        }
                    }else{
                        content.push(`<tr><td colspan="4">没有处方数据</td></tr>`);
                    }
                    content.push(`</tbody></table>`);
                    return content.join("");
                }
            }).on('click-row.bs.table', function (e, row, element){
                fillDiseaseInfo(row);
            });
            //初始药品信息列表
            $('#table_drug').bootstrapTable({
                url: 'drugs/info/list',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                toolbar: '#drug_toolbar',
                queryParams: function(){
                    return $.extend(fun_drugSearch(),{orders:"+pym","conditions[volume@NOTNULL]":"1"});
                },//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                //height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                columns: [
                    {checkbox:true,class:"hide"},
                    {field: 'name',title: '药品名称'},
                    {field: 'pym',title: '拼音码'},
                    {field: 'produce',title: '厂家'},
                    {field: 'specifications',title: '规格'},
                    {field: 'summary',title: '描述'}
                ]
            }).on('click-row.bs.table', function (e, row, element){
                var infoid=$("#prescriptionId").val();
                fillDrugInfo(row,infoid);

            });


        },
        eventInit:function(){
            $("#hideCheckInfo").click(()=>{
                $("#hideCheckInfo,#diagnoseForm [data-select=checkInfo]").hide();
                $("#showCheckInfo").show();
            });
            $("#showCheckInfo").click(()=>{
                $("#showCheckInfo").hide();
                $("#hideCheckInfo,#diagnoseForm [data-select=checkInfo]").show();
            });
            $("#personName").on('input propertychange change',function(){
                $("#personPym").val(Pinyin.GetJP($(this).val())).change();
            });
            $("#diseaseName").on('input propertychange change',function(){
                $("#diseasePym").val(Pinyin.GetJP($(this).val()));
            });
            $("#personPym").on('input propertychange change',function(){
                $("#personSearch").val(this.value);
                $("#btn-personSearch").click();
            });
            $("#drugSearch").on('input propertychange change',function(){
                var searchText=$("#drugSearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_drugSearch=function(){
                    return searchObj;
                };
                $("#table_drug").bootstrapTable("selectPage",1);
            });
            $("#personAge").on('input propertychange change',function(){
                var age=$(this).val();
                var now=new Date();
                var year=now.getFullYear()-age;
                var month=now.getMonth()+1;
                var day=now.getDate();
                if($("#personBirthday").val().length>0){
                    $("#personBirthday").val(year+$("#personBirthday").val().substring(4));
                }else{
                    $("#personBirthday").val(`${year}-${month}-${day}`);
                }
            });
            //生日绑定事件
            $("#personBirthday").on('input propertychange change changeDate',function(){
                $("#personAge").val(jsGetAge($(this).val()));
            });
            //标签页事件
            $("#tabs li").click(function(){
                $("#tabs li").removeClass("active");
                $(this).addClass("active");
                $(".tabs-body").hide();
                $(`#${$(this).attr("data-target")}`).show();
            });

            //病人信息查询
            $("#btn-personSearch").click(function(){
                var searchText=$("#personSearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_personSearch=function(){
                    return searchObj;
                };
                $("#table_persons").bootstrapTable("selectPage",1);
            });
            //诊断信息查询
            $("#btn-diagnoseSearch").click(function(){
                var searchText=$("#diagnoseSearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["person.nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["person.pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_diagnoseSearch=function(){
                    return searchObj;
                };
                $("#table_diagnose").bootstrapTable("selectPage",1);
            });
            //疾病信息查询
            $("#btn-diseaseSearch").click(function(){
                var searchText=$("#diseaseSearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_personSearch=function(){
                    return searchObj;
                };
                $("#table_persons").bootstrapTable("selectPage",1);
            });
            //药品信息查询
            $("#btn-drugSearch").click(function(){
                var searchText=$("#drugSearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_drugSearch=function(){
                    return searchObj;
                };
                $("#table_drug").bootstrapTable("selectPage",1);
            });
            //疾病选择按钮事件
            $("#disease_choice").click(function(){
                $("#tab_disease").click();
            });
            //保存病人信息按钮事件
            $("#personSave").click(function(){
                var now=new Date();
                $("#personLastTime").val(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
                $.postJson({
                    url: "diagnose/person/save",
                    loading:true,
                    data: $.hform.data($("#personForm [name]")),
                    success: function(data) {
                        $("#personId").val(data.data.id);
                        if($("#personId").val()){
                            $("#table_persons").bootstrapTable("refresh");
                        }else{
                            $("#table_persons").bootstrapTable("selectPage",1);
                        }
                    }
                });
            });
            //保存诊断记录按钮事件
            $("#diagnoseSave").click(function(){
                var saveDiagnose=function(){
                    //保存病人信息按钮事件
                    var now=new Date();
                    $("#personLastTime").val(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
                    $.postJson({
                        url: "diagnose/record/save",
                        loading:true,
                        data: $.extend($.hform.data($("#diagnoseForm [name]")),{"person.id":$("#personId").val()}),
                        success: function(data) {
                            utils.messageBox.alert({body:"保存诊断信息成功！"});
                            $("#diagnoseId").val(data.data.id);
                            if($("#diagnoseId").val()){
                                $("#table_diagnose").bootstrapTable("refresh");
                            }else {
                                $("#table_diagnose").bootstrapTable("selectPage",1);
                            }
                        }
                    });
                }
                if($("#personId").val()){
                    saveDiagnose();
                }else{
                    var now=new Date();
                    $("#personLastTime").val(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
                    $.postJson({
                        url: "diagnose/person/save",
                        loading:true,
                        data: $.hform.data($("#personForm [name]")),
                        success: function(data) {
                            $("#personId").val(data.data.id);
                            if($("#personId").val()){
                                $("#table_persons").bootstrapTable("refresh");
                            }else{
                                $("#table_persons").bootstrapTable("selectPage",1);
                            }
                            saveDiagnose();
                        }
                    });
                }
            });
            //保存疾病信息事件
            $("#diseaseSave").click(function(){
                $.postJson({
                    url:"diagnose/disease/save",
                    loading:true,
                    data:$.hform.data($("#diseaseForm [name]")),
                    success:function(){
                        utils.messageBox.alert({body:"保存疾病信息成功！"});
                        $.hform.val($("#diseaseForm [name]"),DEFAULT_ENTITY.disease);
                        $("#table_disease").bootstrapTable("selectPage",1);
                    }
                });
            });
            //保存处方信息事件
            $("#prescriptionInfoSave").click(function(){
                fun_savePrescription(function(){});
            });
            //保存药品信息事件
            $("#drugInfoSave").click(function(){
                var drugSavefun=()=>{
                    var supplys=[];
                    $("#drugInfoForm [name=useId],#drugInfoForm [name=infoId]").val(pid);
                    $("#drugInfoForm .input-group").each(function(){
                        var _this=$(this);
                        var t=$.hform.data(_this.find("[name]"));
                        t.drugInfo={id:t["drugInfo.id"],name:t["drugInfo.name"],unti:t.unti,aliasName:t.aliasName};
                        delete t["drugInfo.id"];
                        delete t["drugInfo.name"];
                        delete t.unit;
                        supplys.push(t);
                    });
                    fun_saveDrugInfo(supplys);
                }
                var pid=$("#prescriptionId").val()
                if(!pid){
                    fun_savePrescription(drugSavefun);
                }else{
                    drugSavefun();
                }


            });
            //绑定开药选中处方按钮事件
            $("#prescriptionInfoChoiceModal").on("click","button[data-select=newPre]",function(){
                var info=JSON.parse($(this).prev().html());
                delete info.id;
                $.each(info.supply,(k,v)=>{v.id=""; })
                fillPrescription(info,{diagnoseId:$("#diagnoseId").val()},"use",data=>{
                    $("#table_diagnose").bootstrapTable("refresh");
                    fillPrescriptionUse(data.data);
                },data=>{
                    var info=JSON.parse(_this.prev().html());
                    info.supply=data.data;
                    _this.prev().html(JSON.stringify(info))
                    $("#table_diagnose").bootstrapTable("refresh");
                });
                $("#showDrugPage1").click();
            });
            //绑定药品记录删除按钮事件
            $("#drugInfoForm").on("click","button.delete",function(){
                var dataId=$(this).attr("data-id");
                if(dataId){
                    $(this).parent().parent().hide().find("[name=usage]").val(-1);
                }else{
                    $(this).parent().parent().remove();
                }
            });
            //绑定处方记录修改按钮事件
            $("#table_disease").on("click",".table button.edit",function(){
                var info=JSON.parse($(this).prev().html());
                fillPrescription(info,{diseaseId:info.diseaseId},"info",function(){
                    $("#table_disease").bootstrapTable("refresh");
                    $("#table_diagnose").bootstrapTable("refresh");
                },function(data){
                    $("#table_disease").bootstrapTable("refresh");
                    $("#table_diagnose").bootstrapTable("refresh");
                });
            });
            //
            $("#personClear").click(function(){
                $("#diagnoseClear").click();
            });
            $("#diagnoseClear").click(function(){
                $("#prescriptionUseListForm tbody").html("");
                $("#prescriptionInfoClear").click();
            });
            $("#prescriptionInfoClear").click(function(){
                $("#drugInfoForm").html("");
            });
            //绑定处方记录删除按钮事件
            $("#table_disease").on("click",".table button.delete",function(){
                var _this=$(this);
                var dataId=_this.attr("data-id");
                if(dataId){
                    utils.messageBox.show('系统提示', `确认删除选中处方?`, {
                        '确认': {
                            'primary': true,
                            'callback': function () {
                                $.postJson({
                                    url: "prescription/info/del",
                                    loading:true,
                                    data: JSON.stringify([{id:dataId}]),
                                    contentType: 'application/json;charset=utf-8',
                                    success: function(data) {
                                        utils.messageBox.alert({body:"删除成功！"});
                                        _this.parent().parent().remove();
                                    }
                                });
                            }
                        },
                        '取消': {'callback': function () {}}
                    });
                }

            });
            //绑定已开处方的修改/删除事件
            $("#prescriptionUseListForm").on("click","a.delete",function(){
                var _this=$(this);
                    utils.messageBox.show('系统提示', `确认删除选中处方?`, {
                        '确认': {
                            'primary': true,
                            'callback': function () {
                                $.postJson({
                                    url: "prescription/use/del",
                                    loading:true,
                                    data: JSON.stringify([{id:_this.attr("data-id")}]),
                                    contentType: 'application/json;charset=utf-8',
                                    success: function(data) {
                                        utils.messageBox.alert({body:"删除成功！"});
                                        _this.parent().parent().remove();
                                    }
                                });
                            }
                        },
                        '取消': {'callback': function () {}}
                    });
            });
            $("#prescriptionUseListForm").on("click","a.edit",function(){
                var _this=$(this);
                var info=JSON.parse(_this.prev().html());
                fillPrescription(info,{},"use",data=>{
                    $("#table_diagnose").bootstrapTable("refresh");
                    _this.parent().parent().remove();
                    fillPrescriptionUse(data.data);
                },data=>{
                    var info=JSON.parse(_this.prev().html());
                    info.supply=data.data;
                    _this.prev().html(JSON.stringify(info))
                    $("#table_diagnose").bootstrapTable("refresh");
                });
                $("#showDrugPage1").click();
            });
            //绑定切换药品清单显示界面事件
            $("#showDrugPage2").click(function(){
                var supplys=[];
                var fig=false;
                $("#drugInfoForm .input-group").each(function(){
                    var _this=$(this);
                    var t=$.hform.data(_this.find("[name]"));
                    t.drugInfo={id:t["drugInfo.id"],name:t["drugInfo.name"],unti:t.unti,aliasName:t.aliasName};
                    delete t["drugInfo.id"];
                    delete t["drugInfo.name"];
                    delete t.unit;
                    if(!t.id)fig=true;
                    supplys.push(t);
                });
                if(fig){
                    utils.messageBox.alert({body:"请先保存药品信息！"});
                    return;
                }
                var cnt=$("#prescriptionInfoForm [name=cnt]").val();
                $("#drugCnt").html(cnt);
                $.postJson({
                    url: "drugs/supply/list",
                    loading:true,
                    data: $.extend($.hform.cvMap("conditions", {"drugInfo.id":_.map(supplys,(k,v)=>{return k.drugInfo.id;}).join(",").replace(/,,/g,',').replace(/(^,)|(,$)/g,'')}),{expression:"drugInfo",capacity:1000}),
                    success: function(data) {
                        var cost=0;
                        var infos={};
                        _.map(data.page.dataList,function(v){
                            infos[v.drugInfo.id]=v;
                        });
                        for(var i=0;i<supplys.length;i+=2){
                            var s1=supplys[i];
                            var s2=supplys[i+1];
                            s2=s2?s2:{drugInfo:{}};
                            var info=infos[s1.drugInfo.id];
                            var up1=info?info.unitPrice:"-";
                            var p1=info?info.position:"-";
                            var cs1=info?MathUtils.multiply(up1,MathUtils.multiply(cnt,s1.usage)):"-";
                            info=infos[s2.drugInfo.id];
                            var p2=info?info.position:"-";
                            var up2=info?info.unitPrice:"-";
                            var cs2=info?MathUtils.multiply(up2,MathUtils.multiply(cnt,s2.usage)):"-";
                            if(cs1!="-")
                                cost=MathUtils.plus(cs1,cost);
                            if(cs2!="-")
                                cost=MathUtils.plus(cs2,cost);
                            $("#drugPage2 tbody").append(`
                            <tr>
                                <td>${emptyVal(s1.drugInfo.aliasName?s1.drugInfo.aliasName:s1.drugInfo.name)}</td>    
                                <td>${emptyVal(s1.usage)+emptyVal(s1.drugInfo.unti,"")}</td>    
                                <td>${(MathUtils.multiply(cnt,s1.usage))+emptyVal(s1.drugInfo.unti,"")}</td> 
                                <td>${emptyVal(up1)}</td> 
                                <td>${emptyVal(cs1)}</td> 
                                <td>${emptyVal(p1)}</td> 
                                <td>${emptyVal(s2.drugInfo.aliasName?s2.drugInfo.aliasName:s2.drugInfo.name)}</td>    
                                <td>${emptyVal(s2.usage)+emptyVal(s2.drugInfo.unti,"")}</td>    
                                <td>${s2.usage?(MathUtils.multiply(cnt,s2.usage)+emptyVal(s2.drugInfo.unti,"")):"-"}</td> 
                                <td>${emptyVal(up2)}</td> 
                                <td>${emptyVal(cs2)}</td> 
                                <td>${emptyVal(p2)}</td> 
                            </tr>
                            `);
                        }
                        $("#drugCost").html(cost);
                        $("#drugPage2").show();
                        $("#drugPage1").hide();
                    }
                });


            });
            $("#showDrugPage1").click(function(){
                $("#drugPage2").hide();
                $("#drugPage1").show();
                $("#drugPage2 tbody").html("");
            });

        },
        actionInit:()=>{
            //初始化执行动作
            $("#tabs li:first").click();
            $("#hideCheckInfo").click();
        }
    }
    var fun_personSearch=function(){ return {}; };
    var fun_diagnoseSearch=function(){ return {}; };
    var fun_diseaseSearch=function (){ return {}; };
    var fun_drugSearch=function(){return {};};
    var fun_savePrescription=function(callfun){

    }
    var fun_saveDrugInfo=function(supplys){

    }
    var each=function(arrays,expr){
        var rtArr=[];
        for(var i=0;i<arrays.length;i++){
            with(arrays[i]){
                rtArr[i]=eval(`\`${expr}\``)
            }
        }
        return rtArr.join("");
    }
    var fillDiseaseInfo=function(disease){
        $("#diagnoseName").val(disease.name);
        $("#diagnoseDiseaseId").val(disease.id);
        var content=[];
        if(disease.prescriptionInfo&&disease.prescriptionInfo.length>0){
            content.push(`<thead><tr><th>处方名称</th><th>用量</th><th>总价</th><th>备注</th><th>操作</th></tr></thead><tbody>`)
            for(var i=0;i<disease.prescriptionInfo.length;i++){
                var info=disease.prescriptionInfo[i];
                content.push(`
                        <tr>
                            <td>${emptyVal(info.name)}</td>
                            <td>${emptyVal(info.cnt)}</td>
                            <td>${emptyVal(info.cost)}</td>
                            <td>${emptyVal(info.remark)}</td>
                            <td>
                                <span class="hide">${JSON.stringify(info)}</span>
                                <button type="button" class="btn btn-info" data-select="newPre" data-dismiss="modal" data-toggle="modal" data-target="#prescriptionInfoModal">新处方</button>
                            </td>
                        </tr>
                        `)

            }
            content.push(`</tbody>`)
        }else{
            content.push(`<tr><td colspan="5">没有处方信息</td></tr>`)
        }
        $("#table_prescriptionInfoChoice").html(content.join(""));
    };
    var fillPrescription=function(info,extend,domain,callback,supplycallback){
        fun_savePrescription=function(callfun){
            $.postJson({
                url:`prescription/${domain}/save`,
                loading:true,
                data:$.extend($.hform.data($("#prescriptionInfoForm [name]")),extend),
                success:function(data){
                    $("#prescriptionId").val(data.data.id);
                    utils.messageBox.alert({body:"保存处方信息成功！"});
                    callback(data);
                    callfun(data);
                }
            });
        }
        fun_saveDrugInfo=function(supplys){
            $.postJson({
                url: `prescription/${domain}/supply/imp`,
                loading:true,
                data: JSON.stringify(supplys),
                contentType: 'application/json;charset=utf-8',
                success: function(data) {
                    utils.messageBox.alert({body:"保存成功！"});
                    $("#prescriptionId").val(data.data.id);
                    var infoid=data.data.id;
                    $("#drugInfoForm").html("");
                    if(data.data)
                        for(var i=0;i<data.data.length;i++){
                            var t=data.data[i];
                            fillDrugInfo(t.drugInfo,infoid,t.id,t.usage);
                        }
                    supplycallback(data);
                }
            });
        }
        $.hform.val($("#prescriptionInfoForm [name]"),$.extend({},DEFAULT_ENTITY.prescrition,info));
        $("#drugInfoForm").html("");
        if(info.supply)
            for(var i=0;i<info.supply.length;i++){
                var t=info.supply[i];
                fillDrugInfo(t.drugInfo,info.id,t.id,t.usage);
            }
    };
    var fillDrugInfo=function(drugInfo,infoid,id,usage){
        $("#drugInfoForm").append(`
            <div class="col-md-4" style="padding: 0px 10px 0px 0px;">
                <div class="input-group">
                    <input type="text" class="form-control" name="drugInfo.name" placeholder="药品名称"  style="width: 246px;" value="${emptyVal(drugInfo.name,"")}"  disabled>
                    <input type="hidden" name="id" value="${emptyVal(id,"")}">
                    <input type="hidden" name="unti" value="${emptyVal(drugInfo.unti,"")}" >
                    <input type="hidden" name="aliasName" value="${emptyVal(drugInfo.aliasName,"")}" >
                    <input type="hidden" name="infoId" value="${emptyVal(infoid,"")}">
                    <input type="hidden" name="useId" value="${emptyVal(infoid,"")}">
                    <input type="hidden" name="drugInfo.id" value="${emptyVal(drugInfo.id,"")}">
                    <span class="input-group-addon empty" ></span>
                    <input type="text" name="usage" class="form-control" placeholder="数量" style="width:60px;" value="${emptyVal(usage,"")}">
                    <span class="input-group-addon" >${emptyVal(drugInfo.unti,"")}</span>
                    <div class="input-group-btn">
                        <button type="button"  class="btn btn-danger delete" data-id="${emptyVal(id,"")}">删除</button>
                    </div>
                </div>
             </div>
                `);
    }
    var fillPerson=function (person){
        $.hform.val($("#personForm [name]"), $.extend({},DEFAULT_ENTITY.person,person));
        $(".input_sex").html(person.sex==2?"女":"男");
        $("#personAge").val(person.birthday?jsGetAge(person.birthday):"");
    };
    var fillPrescriptionList=function(diagnose){
        $("#prescriptionUseListForm tbody").html("");
        for(var i=0;i<diagnose.prescriptionUse.length;i++){
            fillPrescriptionUse(diagnose.prescriptionUse[i]);
        }
    }
    var fillPrescriptionUse=function(use){
        $("#prescriptionUseListForm tbody").append(`
                    <tr>
                        <td>${emptyVal(use.name)}</td>
                        <td>${emptyVal(use.cnt)}</td>
                        <td>${emptyVal(use.cost)}</td>
                        <td>${emptyVal(use.remark)}</td>
                        <td>
                            <span class="hide">${JSON.stringify(use)}</span>
                            <a href="javascript:;" class="edit" data-toggle="modal" data-target="#prescriptionInfoModal">修改</a>
                            <a href="javascript:;" class="delete" data-id="${use.id}" >删除</a>
                        </td>
                    </tr>
                    `);
    }
    var getHtmlData=function (ele){
        var options={};
        for(var i=0;i<ele.attributes.length;i++){
            var k=ele.attributes[i].name;
            if(k.startsWith("data-")){
                if(k=="data-options"){
                    $.extend(options,eval(`({${ele.getAttribute(k)}})`));
                }else{
                    options[k.replace("data-","")]=ele.getAttribute(k);
                }
            }
        }
        return options;
    };
    var emptyVal=function(value,empty){
        empty=empty!==void 0?empty:'-';
        return value===void 0?empty:value;
    };
    var jsGetAge=function (date){
        var returnAge;
        var birthday=new Date(date);
        var birthYear = birthday.getFullYear();
        var birthMonth = birthday.getMonth();
        var birthDay = birthday.getDate();

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth();
        var nowDay = d.getDate();

        if(nowYear == birthYear)
        {
            returnAge = 0;//同年 则为0岁
        }
        else
        {
            var ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0)
            {
                if(nowMonth == birthMonth)
                {
                    var dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
                else
                {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
            }
            else
            {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    };
    var MathUtils={
        minus:function(n,m){
            n=typeof n =="string"?n:this.numToString(n);
            m=typeof m =="string"?m:this.numToString(m);
            var F= n.indexOf(".")!=-1?this.handleNum(n):[n,0,0],
                S= m.indexOf(".")!=-1?this.handleNum(m):[m,0,0],
                l1=F[2],
                l2=S[2],
                L=l1>l2?l1:l2,
                T=Math.pow(10,L);
            return (F[0]*T+F[1]*T/Math.pow(10,l1)-S[0]*T-S[1]*T/Math.pow(10,l2))/T
        },
// *
        multiply:function(n,m){
            n=typeof n =="string"?n:this.numToString(n);
            m=typeof m =="string"?m:this.numToString(m);
            var F= n.indexOf(".")!=-1?this.handleNum(n):[n,0,0],
                S= m.indexOf(".")!=-1?this.handleNum(m):[m,0,0],
                l1=F[2],
                l2=S[2],
                L=l1>l2?l1:l2,
                T=Math.pow(10,L);
            return ((F[0]*T+F[1]*T/Math.pow(10,l1))*(S[0]*T+S[1]*T/Math.pow(10,l2)))/T/T
        },
// /
        division:function(n,m){
            n=typeof n =="string"?n:this.numToString(n);
            m=typeof m =="string"?m:this.numToString(m);
            var F= n.indexOf(".")!=-1?this.handleNum(n):[n,0,0],
                S= m.indexOf(".")!=-1?this.handleNum(m):[m,0,0],
                l1=F[2],
                l2=S[2],
                L=l1>l2?l1:l2,
                T=Math.pow(10,L);
            return ((F[0]*T+F[1]*T/Math.pow(10,l1))/(S[0]*T+S[1]*T/Math.pow(10,l2)))
        },
        numToString:function(tempArray){
            if(Object.prototype.toString.call(tempArray) == "[object Array]"){
                var temp=tempArray.slice();
                for(var i,l=temp.length;i<l;i++){
                    temp[i]=typeof temp[i] == "number"?temp[i].toString():temp[i];
                }
                return temp;
            }
            if(typeof tempArray=="number"){
                return tempArray.toString();
            }
            return []
        },
        plus:function(n,m){
            n=typeof n =="string"?n:this.numToString(n);
            m=typeof m =="string"?m:this.numToString(m);
            var F= n.indexOf(".")!=-1?this.handleNum(n):[n,0,0],
                S= m.indexOf(".")!=-1?this.handleNum(m):[m,0,0],
                l1=F[2],
                l2=S[2],
                L=l1>l2?l1:l2,
                T=Math.pow(10,L);
            return (F[0]*T+F[1]*T/Math.pow(10,l1)+S[0]*T+S[1]*T/Math.pow(10,l2))/T

        },
        handleNum:function(n){
            n=typeof n !=="string"?n+"":n;
            var temp= n.split(".");
            temp.push(temp[1].length);
            return temp
        }
    }
    $(function(){
        welcome.viewInit();
        welcome.eventInit();
        welcome.actionInit();
    });







});
