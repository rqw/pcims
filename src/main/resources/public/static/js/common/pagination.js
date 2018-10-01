var depend = [
    {name: "handlebars"},
    {name: "underscore"},
    {name: "jquery"},
    {name: "utils"}
];
modular.define({name: "pagination"}, depend, function () {
    var utils=this.utils;
    
    var self = {};
    self.footer = {
        PAGINATION_PAGE_CUSTOM:  '<div data-select="pageinfo" pagenumber="{{number}}" capacity="{{capacity}}" class="h_container">                                 '+
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
    };
    var pages={};
    self.find=function(id){
        return pages[id];
    };
    self.load=function(id,pageNo, pageSize, dataFun, callback){
	self.find(id).load(pageNo, pageSize, dataFun, callback);
    };
    self.create = function (id,options) {
        var pagination = {};
        pages[id]=pagination;
        pagination.options = {
            template: {
                page: self.footer.PAGINATION_PAGE_CUSTOM,
                data: ""
            },
            selector: {
                data: "",
                page: "",
                size: " [data-select=pageSize]"
            },
            condition: function () {
                return {};
            },
            url: '',
            page:{
            	capacity:10,
                sizeList:[10,15,20]
            },
            pageNumber: 5,
            //获取数据后的回调 page 为数据包
            callback: function (page) {
            },
            callface:function(page){
        	return true;
            }
        };
        pagination.data={min:1,max:1,total:0};
        pagination.init = function (options) {
        	$.extend(true,this,options.prop);
        	delete  options.prop;
            this.options = $.extend(true, this.options, options);
        };
        // 刷新数据列表
        pagination.flushData = function (page) {
            var listInfo = Handlebars.compile(this.options.template.data);
            $(this.options.selector.data).html(listInfo(page));
        };
        // 刷新页码区域
        pagination.flushPageInfo=function (page) {
            var pageinfo = Handlebars.compile(this.options.template.page);
            $(this.options.selector.page).html(pageinfo(page));
        };
        // 计算最大页码、上一页、下一页、首尾页状态、数字页码。
        pagination.pageInit= function (page) {
            page['max'] = Math.ceil(page.total * 1.0 / page.capacity);
            page['first'] = page.number == 1;
            page['upper'] = page.number - 1;
            page['lower'] = page.number + 1;
            page['last'] = page.number == page.max || page.max == 0;
            page['pages'] = [];
            // 设置开始页码为当前页减去页码数量的一半，保证当前也在中间
            var start = page.number - (Math.floor(this.options.pageNumber / 2));
            // 开始页面和最大页码之差小于pageNumber，则修改开始页码为最大页码减pageNumber+1
            start = page.max - start < this.options.pageNumber ? page.max - this.options.pageNumber + 1 : start;
            // 开始页码小于1则重置开始页码为1
            start = start < 1 ? 1 : start;
            for (; start <= page.max && page.pages.length < this.options.pageNumber; start++) {
                page['pages'].push(
                    {
                        "page": start,
                        "active": start == page.number
                    });
            }
        };

        // 绑定翻页事件
        pagination.bindEvent= function (page) {
            var _this = this;
            $(_this.options.selector.page + " [number]").each(function () {
                if (!$(this).hasClass("disabled")) {
                    $(this).click(function () {
                    	if(parseInt($(this).attr("number")))
                    		_this.load(parseInt($(this).attr("number")));
                    });
                }
            });
            //绑定页容量变更事件
            $(_this.options.selector.page + _this.options.selector.size).each(function () {
            	$(this).html(_.map(_this.options.page.sizeList,function(v){
            		return "<option value="+v+">"+v+"</option>";
            	}).join(""));
            	$(this).val(page.capacity);
            	$(this).change(function(){
            		 $(_this.options.selector.page+" [data-select=pageinfo]").attr("capacity",$(this).val());
            		 pagination.data.max=Math.ceil(page.total * 1.0 / $(this).val()); 
            		 pagination.load();
            	});
            });
        };
        // 查找page对象
        pagination.findPage=function (page) {
            if (page) {
                if (page.dataList) {
                    return page;
                }
                if (page.page && page.page.dataList!==void 0) {
                    return page.page;
                }
            }
            return page;
        };
        // 刷新页面数据
        pagination.flush= function (page, back) {
            if(this.options.callface(page)){
                var pageObj = this.findPage(page);
                this.pageInit(pageObj);
                this.flushData(pageObj);
                this.flushPageInfo(pageObj);
                this.bindEvent(pageObj);
                // back为false则不执行回调函数
                back ? this.options.callback(page) : 0;
                pagination.data.total=pageObj.total;
                pagination.data.max=pageObj.max;
				//改变页面元素后触发modular的视图改变事件
                modular.ViewChange();
            }
        };
        //获取数据函数
        pagination.getData=function(data,call){
        	var _this = this;
        	utils.common.fn.sec_ajax(
                    {
                        type: 'POST',
                        url: _this.options.url,
                        data: $.extend(_this.options.condition(),data),
                        dataType: 'json',
                        success: call
                    });
        };

        // 加载指定页码和页容量的数据
        pagination.load=function (number, capacity, dataFun, callback) {
            utils.loading.show();
            var _this = this;
            dataFun = dataFun ? dataFun : function () {
                return {};
            };
            //无页码时获取当前页码
            if (!number ) {
            	number = $(_this.options.selector.page+" [data-select=pageinfo]").attr("pagenumber");
            }
            //页码大于最大页码时变更为最大页码
            if( pagination.data.max<number){
            	number=pagination.data.max;
            }
            //没有页码时默认取第一页
            if(!number)
            	number=1;
            //优先使用页容量上的内容为pagesize
            if (!capacity) {
            	capacity = $(_this.options.selector.page+" [data-select=pageinfo]").attr("capacity");
            }
            //获取options中的pagesize
            if (!capacity) {
            	capacity=_this.options.page.capacity;
            }
            callback = callback ? callback : function () {
            	return true;
            };
            _this.getData($.extend({"number": number,"capacity": capacity}, dataFun()),function(page){
                 _this.flush(page, callback(page));
                 utils.loading.hide();
            });
        };
        pagination.init(options);
        return pagination;
    };

    return self;

});