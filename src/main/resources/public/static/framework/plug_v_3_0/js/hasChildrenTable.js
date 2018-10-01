
var depends = [
    {name: "hjkplug",type:"css"},
    {name: "jquery"}
];

modular.define({name:"hasChildrenTable"},depends,function(){
	var hasChildrenTable={
    		option:{
    			bindClass:".hasChildren",
    		},
    		tableData:null,
    		currentClickElement:null,
    		init:function(option){
    			var _table=this; 
    			if(option)$.extend(this.option,option);    			   			
    			 $("body").delegate(_table.option.bindClass,"click",function(){
    				 _table.currentClickElement=$(this);
    				 _table.clickTr();
    			 });
    		},
    		clickTr:function(){
    			this.showBefore();
    			var id=$(this.currentClickElement).data("id");
    	    	if(id){
    	    		var child=$("tr[data-childid='"+id+"']");
    	    		
    	    			if(child.is(":hidden")){
    	        			child.slideDown();
    	        		}else{
    	        			child.slideUp();
    	        		}    		
    	    		
    	    	}else{
	    			//获取数据
    	    		this.getData();
    	    	}
    		},
    		//没用
    		getData:function(){
    			var table="<table class='h_table h_table_blue childTable'><tr class='hasChildren'><td>标题1</td><td>标题2</td><td>标题</td><td>标题</td><td>标题</td><td>标题</td></tr><tr class=''><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>r</td></tr></table>";//document.createElement("tr");
    			this.showChildTable(table);
    		},
    		showBefore:function(){
    			
    		},
    		showAfter:function(){
    			
    		},
    		showChildTable:function(tableData){
    			var id=new Date().getTime()+"";	    			
    			$(this.currentClickElement).attr("data-id",id);
    			colspan=$(this.currentClickElement).children().length;
    			
    			var table=tableData;
    			
    			if(!table)return;
    			
    			var td=document.createElement("td");
    			var tr=document.createElement("tr");
    			
    			$(tr).attr("data-childid",id);
    			$(td).attr("colspan",colspan);
    			
    			$(td).append(table);
    			$(tr).append(td);	    			
    	    	$(tr).insertAfter($(this.currentClickElement));
    	    	
    	    	this.showAfter();
    		}
    		
    }
	return hasChildrenTable;
});
