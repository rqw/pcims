/**
 * Created by hjk on 2017/4/5.
 */
/**
 * Created by hjk on 2017/3/10.
 */
//多选支持需要引入的依赖
var depends = [
    {name: "jquery"}
];
modular.define({name: "loopView"}, depends, function () {
    var loopView={
        option:{
            position:0,
            selector:".lp02",
            elementWidth:163,
            showCount:4,
            margin:"auto",
            retainLeftAndRightMargin:true,
            isCycle:false,//目前支持不循环
            moveToLeftSelector:".leftBtn",
            moveToRightSelector:".rightBtn",
            deviationY:15,
            leftCallback:function(){},
            rightCallback:function(){}
        },
        children:[],
        init:function(i){
            var _children;
            if(i){
                this.option.position=i;
            }
            //绑定left、right事件
            var _loopView=this;
            if(this.option.moveToLeftSelector){
                $("body").delegate(this.option.moveToLeftSelector,"click",function(){
                    _loopView.moveToLeft();
                });
            }
            if(this.option.moveToRightSelector){
                $("body").delegate(this.option.moveToRightSelector,"click",function(){
                    _loopView.moveToRight();
                });
            }
            //如果margin为auto就自动设置
            if(this.option.margin=="auto"){
                this.setAutoMargin();
            }

            //如果子元素数量小于第一次赋值的数量 判定为多次init操作
            _children=$(this.option.selector).children();
            if(this.children<_children.length){
                this.children=_children;
            }
            console.log(this.children);
            //设置所有子元素为绝对定位
            for(var j=0;j<this.children.length;j++){
                $(this.children[j]).css({"position": "absolute"});
            }

            //移除元素
            $(this.option.selector).children().remove();
            //添加元素
            for(var _i=0;_i<this.option.showCount;_i++){
                var element=this.children[i+_i];
                if(element){
                    //添加元素
                    $(this.option.selector).append(element);
                    //移动元素到制定位置
                    var position=this.calculate(_i);
                    $(element).animate({"left":position.left,"top":this.option.deviationY},500*(_i*0.5),function(){
                        //显示元素
                        $(this).fadeIn();
                    });
                }

            }
            //预加载加载左侧元素
            this.loadLeftChild();
            //预加载加载右侧元素
            this.loadRightchild();


        },
        moveToLeft:function(){

            if(this.option.position+this.option.showCount<this.children.length){
                this.option.position++;

                var children=$(this.option.selector).children();

                //如果左侧即将插入新元素，先删除左边可视的第一个元素

                if(this.option.position>=2){
                    $(children[0]).remove();
                }
                children=$(this.option.selector).children();
                //所有元素向左移动一位

                for(var i=0;i<children.length;i++){
                    //var left=$(children[i]).position().left-this.option.elementWidth-this.option.margin;
                    var position=this.calculate(i-1);
                    $(children[i]).animate({"left":position.left,"top":this.option.deviationY});
                }
                //预加载加载右侧元素
                this.loadRightchild();
                this.option.leftCallback();
            }else{
                console.log("left end")
            }

        },
        moveToRight:function(){
            if(this.option.position>0){
                this.option.position--;
                var children=$(this.option.selector).children();
                //如果左侧即将插入新元素，先删除右边可视的第一个元素
                if(children.length>=this.option.showCount+2){
                    $(children.last()).remove();
                }
                children=$(this.option.selector).children();
                //所有元素向右移动一位
                for(var i=0;i<children.length;i++){
                    //var left=$(children[i]).position().left-this.option.elementWidth-this.option.margin;
                    var position=this.calculate(i);
                    $(children[i]).animate({"left":position.left,"top":this.option.deviationY});
                }
                //预加载加载左侧元素
                this.loadLeftChild();
                this.option.rightCallback();
            }else{
                console.log("left end")
            }

        },
        //预加载左侧子节点
        loadLeftChild:function(){
            //如果左侧有元素 就预加载左侧一位
            if(this.option.position>0){
                var element=this.children[this.option.position-1];
                $(this.option.selector).prepend(element);
                var position=this.calculate(-1);
                //$(element).css({"left":(this.option.showCount)*(this.option.margin+this.option.elementWidth)});
                $(element).css({"left":position.left});
                $(element).show();
            }
        },
        //预加载右侧子节点
        loadRightchild:function(){
            //如果右侧有元素 就预加载右侧一位
            if(this.option.position+this.option.showCount<this.children.length){
                var element=this.children[this.option.position+this.option.showCount];
                $(this.option.selector).append(element);
                var position=this.calculate(this.option.showCount);
                //$(element).css({"left":(this.option.showCount)*(this.option.margin+this.option.elementWidth)});
                $(element).css({"left":position.left,"top":this.option.deviationY});
                $(element).show();
            }
        },
        //根据容器宽度自动设置margin
        setAutoMargin:function(){
            var width=$(this.option.selector).width();
            var _margin;
            _margin=width-(this.option.showCount*this.option.elementWidth);
            if(this.option.retainLeftAndRightMargin){
                _margin=_margin/(this.option.showCount+1);
            }else{
                if(this.option.showCount<=1){
                    _margin=0;
                }else{
                    _margin=_margin/(this.option.showCount-1);
                }

            }

            this.option.margin=_margin;

        },
        //计算某个元素的位置
        calculate:function(i){
            var position={};
            position.left=i*(this.option.elementWidth+this.option.margin);
            if(this.option.retainLeftAndRightMargin){
                if(i>=0){
                    position.left=position.left+this.option.margin;
                }else{
                    position.left=position.left-this.option.margin;
                }
            }
            return position;
        }
    }

    return loopView;
});