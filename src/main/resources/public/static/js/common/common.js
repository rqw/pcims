var depend = [ {
	name : "utils",
	name : "combox"
} ];
modular.define({
	name : "common.common"
}, depend, function() {
	var self ={};
	var combox =this.combox;
	var topModular=modular.topModular();
	//注册数据到顶级modular
	if (topModular.commonData == void 0){
		topModular.commonData={
				dataDic:{
					token:-1,
					flush:function(call){
						var _this=this;
						call("dataDic",_this.data);
						$.postJson({
					        url: "common/obtain/dataDic/"+_this.token,
					        success: function(ssto) {
					        	if(ssto&&ssto.state){
					        		if(ssto.message!=_this.token){
						        		_this.token=ssto.message;
						        		_this.data=ssto.data;
					        		}
					        	}
					        	call("dataDic",_this.data);
					        }
					    });
					}
				},
				flush:function(call){
					this.dataDic.flush(call);
				}
		}; 
		
	};
	self.callback={dataDic:[]};
	//刷新数据
	topModular.commonData.flush(function(type,data){
		if(type=="dataDic"){
			self.data=data;
			self.dataDic=function(name, val,opt){

				for(var i in data[name]){
					var rt=_.map(data[name][i],function(v,k){
						if(opt=='key'){
							if(k==val)
								return v;
						}else{
							if(v==val)
								return k;
						}
					});
					if(rt[0]!==void 0)
						return rt;
					
				};
				return "";
			
			};
			//注册helper
			Handlebars.registerHelper('_dataDic', self.dataDic);
			//更改下拉框选项
			_.map(data,function(v,k){
				$("select[plugin-combox-dataDic="+k+"]").each(function(){
					var firstOptions=$(this).attr("data-firstOptions");
					if(firstOptions==="true"){
						firstOptions={"":""};
					}
					var placeholder=$(this).attr("placeholder");
					if(placeholder){
                        firstOptions={"":placeholder,hide:true};
					}
					combox.changeOptions(this,v,firstOptions);
				});
			});
			//执行当前页面注册的回调
			_.each(self.callback.dataDic,function(f){
        		f(data);
        	});
		}
	});
	// 定义字典格式化显示函数，适合[{key:name}]格式
    Handlebars.registerHelper('EQ', function (v1, v2, options) {
    	 if(v1==v2){
	      //满足添加继续执行
	      return options.fn(this);
    	 }else{
	      //不满足条件执行{{else}}部分
	      return options.inverse(this);
    	 }
    });
	return self;
});
