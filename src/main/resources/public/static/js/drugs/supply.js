/**
 * 
 */

var depends = [
    {name: "font-awesome", type: "css"},
    // {name: "iconfont", type: "css"},
    {name: "common.bstable"},
    {name: "common.common"},
    {name: "pinyin"},
    {name: "utils"}
];
modular.define({name: "drugs.supply"}, depends, function () {
    var utils=this.utils;
    var DEFAULT_ENTITY={
        supply:{ id:"",drugstore:"","drugInfo.id":"","drugInfo.name":"",retailPrice:"",costPrice:"",position:"",unitPrice:""}
    };
    var supply={
        viewInit:function(){

            //初始药品信息列表
            $('#table_supply').bootstrapTable({
                url: 'drugs/supply/list',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                toolbar: '#supply_toolbar',
                queryParams: function(){
                    return $.extend(fun_supply(),{orders:"+drugInfo.pym",expression:"drugInfo"});
                },//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                //height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                columns: [
                    {field: 'drugstore',title: '药房名称'},
                    {field: 'drugInfo.name',title: '药品名称'},
                    {field: 'drugInfo.pym',title: '拼音码'},
                    {field: 'drugInfo.produce',title: '厂家'},
                    {field: 'drugInfo.volume',title: '包装容量'},
                    {field: 'costPrice',title: '成本价'},
                    {field: 'retailPrice',title: '零售价'},
                    {field: 'unitPrice',title: '单价'},
                    {field: 'position',title: '位置编号'},
                    {field:"button",
                        formatter:function(){
                            return `
                                        <button type="button" class="btn btn-info edit" data-toggle="modal" data-target="#drugInfoModal">编辑</button>
                                        <button type="button" class="btn btn-danger delete" >删除</button>
                                        `;
                        },
                        events:{
                            "click button.edit":function(e,value,row,index){
                                var supply={};
                                $.extend(supply,row);
                                supply["drugInfo.id"]=row.drugInfo.id;
                                supply["drugInfo.name"]=row.drugInfo.name;
                                $.hform.val($("#supplyForm [name]"),supply);
                            },
                            "click button.delete":function(e,value,row,index){
                                utils.messageBox.show('系统提示', `确认删除?`, {
                                    '确认': {
                                        'primary': true,
                                        'callback': function () {
                                            $.postJson({
                                                url: "drugs/supply/del",
                                                loading:true,
                                                data: JSON.stringify([{id:row.id}]),
                                                contentType: 'application/json;charset=utf-8',
                                                success: function(data) {
                                                    utils.messageBox.alert({body:"删除成功！"});
                                                    $("#table_supply").bootstrapTable("refresh");
                                                }
                                            });
                                        }
                                    },
                                    '取消': {'callback': function () {}}
                                });
                            }
                        }
                    }
                ]
            }).on('click-row.bs.table', function (e, row, element){


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
                    {field: 'volume',title: '包装容量'},
                    {field: 'summary',title: '描述'}
                ]
            }).on('click-row.bs.table', function (e, row, element){
                $("[name='drugInfo.name']").val(row.name);
                $("[name='drugInfo.id']").val(row.id);

            });
        },
        eventInit:function(){
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
            //药品信息查询
            $("#btn-supplySearch").click(function(){
                var searchText=$("#supplySearch").val();
                var searchObj={};
                if(/[^0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["drugInfo.nameLIKE"]=searchText.replace(/[0-9a-zA-Z]/g,'%');
                }
                if(/[0-9a-zA-Z]+/g.test(searchText)){
                    searchObj["drugInfo.pymLIKE"]=Pinyin.GetJP(searchText).toLowerCase();
                }
                if($("#drugstoreSearch").val()){
                    searchObj["drugstore"]=$("#drugstoreSearch").val();
                }
                searchObj=$.hform.cvMap("conditions", searchObj);
                fun_supply=function(){
                    return searchObj;
                };
                $("#table_supply").bootstrapTable("selectPage",1);
            });
            $("#btn-add").click(function(){
                $.hform.val($("#supplyForm [name]"),DEFAULT_ENTITY.supply);
            });
            $("#supplySave").click(function(){
                $.postJson({
                    url:"drugs/supply/save",
                    loading:true,
                    data:$.hform.data($("#supplyForm [name]")),
                    success:function(){
                        utils.messageBox.alert({body:"保存药品信息成功！"});
                        $.hform.val($("#supplyForm [name]"),DEFAULT_ENTITY.supply);
                        $("#table_supply").bootstrapTable("refresh");
                    }
                });
            });
        },
        actionInit:()=>{
            //初始化执行动作
            $("#tabs li:first").click();
        }
    }

    var fun_drugSearch=function(){return {};};
    var fun_supply=function(){return {};};
    var each=function(arrays,expr){
        var rtArr=[];
        for(var i=0;i<arrays.length;i++){
            with(arrays[i]){
                rtArr[i]=eval(`\`${expr}\``)
            }
        }
        return rtArr.join("");
    }

    var emptyVal=function(value,empty){
        empty=empty!==void 0?empty:'-';
        return value===void 0?empty:value;
    };

    $(function(){
        supply.viewInit();
        supply.eventInit();
        supply.actionInit();
    });







});
