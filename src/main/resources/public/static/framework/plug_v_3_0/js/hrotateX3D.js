/**
 * Created by hjk on 2017/4/10.
 */
//多选支持需要引入的依赖
var depends = [
    {name: "jquery"},
    {name:"hjkplug",type:"css"}
];
modular.define({name: "hrotateX3D"}, depends, function () {
    var rotateX3D={
        option:{
            selector:".rotateX3D"
        },
        position:0,
        beforce:function(){
        },
        toggleView:function(){
            var _this=this;

            if($(_this.option.selector).hasClass("fadeOut")){
                $(_this.option.selector).addClass("fadeIn").removeClass("fadeOut");
            }else{
                $(_this.option.selector).addClass("fadeOut").removeClass("fadeIn");
            }

          
        },
        toggle:function(){
            var _this=this;
            _this.toggleView();
            setTimeout(function(){
                _this.beforce();
                _this.toggleView();
            },225)

        }
    }

    return rotateX3D;

});