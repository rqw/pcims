/**
 * 
 */

//多选支持需要引入的依赖
var depends = [
    {name: "jquery"}
];
modular.define({name: "toggleViewCtrl"}, depends, function () {
	//图表和tab表切换    
    var toggleView={    		
    		option:{
    			"butnClass":"switchBetweenChartsAndTableBtn",
    			"op1":{
    				//tag:"showTable",
    				text:"表格显示",
    				tClass:"htableView"
    			},
    			"op2":{
    				//tag:"showCharts",
    				text:"图表显示",
    				tClass:"hchatsView"
    			},
    			callback:function(tag){}
    			
    		},
    		toggle:function(){
    			
    			var tag=$("."+this.option.butnClass).attr("data-tag");
    			
    			if(!tag){
    				tag="op1";
    			}	
    			if(tag=="op1"){
    				$("."+this.option["op1"].tClass).hide();
    				$("."+this.option["op2"].tClass).show();
    				$("."+this.option.butnClass).attr("data-tag","op2");    				
    				$($("."+this.option.butnClass).find("span")).text(this.option["op1"].text);
    				
    				if($("."+this.option.butnClass).find("span").length<=0){
    					$("."+this.option.butnClass).text(this.option["op1"].text);
    				}
    				this.option.callback("op2");
    			}else{
    				
    				$("."+this.option["op2"].tClass).hide();
    				$("."+this.option["op1"].tClass).show();
    				
    				$("."+this.option.butnClass).attr("data-tag","op1");
    				$($("."+this.option.butnClass).find("span")).text(this.option["op2"].text);
    				
    				if($("."+this.option.butnClass).find("span").length<=0){
    					$("."+this.option.butnClass).text(this.option["op2"].text);
    				}
    				
    				this.option.callback("op1");
    			}
    			
    			
    			
    			
    		}   		
    } 
    
    return toggleView;
    
});