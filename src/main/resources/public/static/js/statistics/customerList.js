/**
 * 
 */
var depends = [  
	{name: "utils"},
	{name: "combox"},
	{name: "common.common"},
    {name: "font-awesome",type:"css"},   
    {name: "hjkplug",type:"css"},
    {name: "bootstrap"},
    //时间选择插件
    {name: "daterangepicker"},
	{name: "bootstrap-datetimepicker"},
    {name:"floatWindow"}
    
];

modular.define({name:"statistics.customerList"},depends,function(){
	var utils=this.utils;
	//加载定制报表列表
	var dataModel={};
	var template="";
	$.loading.show();
	$.postJson({url:"statistics/list",data:{capacity:100},
		success:function(data){
			_.map(data.page.dataList,function(v,k){
				dataModel[v.id]=v;
				if(!$("#choice-data").html()){
					$("#choice-data").html(v.name);
					$("#choice-dataid").val( v.id);
					initQueryRange(dataModel[v.id]);
					$("#choice-list").append("<a href='javascript:void(0)' class='list-group-item active' data-id='"+v.id+"'>"+v.name+"</a>");
				}else{
					$("#choice-list").append("<a href='javascript:void(0)' class='list-group-item' data-id='"+v.id+"'>"+v.name+"</a>");
				}
			});
			$("#choice-range a").click(function(){
				$("#choice-range a").removeClass("active");
    			$(this).addClass("active");
    			$("#choice-data").text($(this).text());
    			$("#choice-dataid").val( $(this).attr("data-id"));
    			initQueryRange(dataModel[$(this).attr("data-id")]);
			});
			$.loading.hide();
		}
	});
	//初始化查询区域
	function initQueryRange(model){
		$("#content-head").html("");
		template="{{#each data.dataList}}";
		template+="<tr>";
		
		_.map(model.viewDef.split(","),function(v,k){
			$("#content-head").append("<td>"+v.split(":")[1]+"</td>");
			template+="<td>{{"+v.split(":")[0]+"}}</td>";
		});
		
		template+="</tr>";
		template+="{{/each}}";
		initQueryComponent();
	}
	//初始化查詢組件
	function initQueryComponent(){
		$('[data-select=dateselect]').datetimepicker({
			language:  'zh-CN',
			minView:2,
			format: 'yyyy-mm-dd'
		});
		var end=new Date();
		var start=new Date();
		start.setMonth(end.getMonth()-1);
		//设置日期默认值
		$("#start").val(moment(start).format('YYYY-MM-DD'));
		$("#end").val(moment(end).format('YYYY-MM-DD'));
	}
	
	$("#btn-search").click(function(){
		var querydata=$.hform.data($(".h_container_top_tools [name]"));
		querydata=$.hform.cvMap("conditions",querydata);
		$.loading.show();
		$.postJson({url:"statistics/see",data:querydata, success:function(data){
			 var listInfo = Handlebars.compile(template);
	         $("#dataList tbody").html(listInfo(data));
	         $.loading.hide();
			}}
		)
	});
	$("#downExcel").click(function(){
		var querydata=$.hform.data($(".h_container_top_tools [name]"));
		querydata=$.hform.cvMap("conditions",querydata);
		var data="1=1";
		_.map(querydata,function(v,k){
			data+="&"+k+"="+v;
		});
		utils.common.fn.download("statistics/seeExcel",data);
	});
});