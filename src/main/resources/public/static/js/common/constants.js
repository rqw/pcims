//多选支持需要引入的依赖
var depends = [];
modular.define({name: "common.constants"}, depends, function () {
	var self = {
			pagination:{
				footer:{
					customer: 
						 '<div data-select="pageinfo" pagenumber="{{number}}" capacity="{{capacity}}" class="h_container">                                 '+
							'    <div class="h_pagination">                            '+
							'        <span {{#if first}}class="disabled"{{/if}} number="1" >首页</span>'+
							 '{{#each pages}}'+
							'        <span {{#if active}}class="active"{{/if}} number="{{page}}" >{{page}}</span>'+
							'{{/each}}' +
							'        <span {{#if last}}class="disabled"{{/if}} number="{{max}}" >尾页</span>'+
							'        <span>跳转</span>                      '+
							'        <span class="input"><input type="text" plugin-input="number" number onblur="$(this).attr(\'number\',this.value).click();" ></span>'+
							'        <span class="word">页</span>                      '+
							'        <span class="input"><select data-select="pageSize"><select></span>'+
							'		 <span class="word">共{{total}}条'+
							'		 <span class="word">共{{max}}页'+
							'    </div>'+
							'</div>'
				}
			}
			
	};
	return self;
});