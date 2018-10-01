/**
 * Created by hjk on 2017/11/13.
 */
/**
 * Created by hjk on 2017/8/16.
 */


var depends = [
    {name: "hjkplug",type:"css"},
    {name:"font-awesome",type:"css"},
    {name: "bootstrap-datetimepicker"},
    {name:"jquery"}
];

modular.define({name:"popMsg"},depends,function(){


    $('#datetimepicker01').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii:ss'
    });

    $('#datetimepicker02').datetimepicker({
        language:  'zh-CN',
        minView:2,
        format: 'yyyy-mm-dd'
    });


    var popMsg={
        setting:{
            msgCtnrHtml:'<div class="msg-wrap" style="overflow: auto"></div>',
            defaultContentTemplate:{
                text:{
                    showCloseBtn:true,
                    showConfirm:true,
                    //{width},{content},{btnText}
                    html:'<!-- 标准模态 开始 --> <div class="modal-frame floatbox msg-box" target-draggable="false" data-id="{dataid}" style="display: block;width:{width} !important"> <!--div class="left-block-blue crumb"></div--> <button class="close"><i class="fa fa-times" aria-hidden="true"></i></button> <!-- 标题 开始--> <div class="floatbox-header">有新消息</div> <!-- 标题 结束--> <hr class="splitline"> <!-- 主体 开始--> <div class="floatbox-body"> <p style="font-size: 14px">{content}</p> </div> <!-- 主体 结束--> <hr class="splitline"> <!-- 底部条 开始 --> <div class="footbar"> <button type="button" class="h_btn_blue_lg confirm">{btnText}</button> <!--button type="button" class="h_btn_blue_lg cancel">取消</button--> </div> <!-- 底部条 结束 --> </div> <!-- 标准模态 开始 -->',
                    closeCallback:function(){}
                },
                custom:{}
            }
        },
        interval:null,
        show:function(optional){
            var defaultOptional={
                position:"top",//top/self/opener(暂未开放)
                width:100,
                templateName:"text",
                title:"",
                content:"",
                btnText:"我知道了",
                dataid:"",
                btnFun:function(){}
            }
            var _optional= $.extend(true,{},defaultOptional,optional);

            var win;
            var winDom;
            var msgCtnrDomObj;
            var msgDomObj;
            if(_optional.position=="top"){
                win=$(top.window);
                winDom=$(top.window.document)
            }else if(_optional.position=="self"){
                win=$(window);
                winDom=$(window.document)
            }

            //检查目标窗口是否有消息容器
            msgCtnrDomObj=winDom.find(".msg-wrap");
            //如果没有就创建
            if(msgCtnrDomObj.length<=0){
                msgCtnrDomObj=$(this.setting.msgCtnrHtml);
                winDom.find("body").append(msgCtnrDomObj);
                msgCtnrDomObj.css({"max-height":$(win).height()});
            }
            //插入消息框
            if(_optional.templateName=="text"){
                if(_optional.dataid==null||_optional.dataid==""){
                    _optional.dataid=Math.random()*1000;
                }
                msgDomObj=$(this.setting.defaultContentTemplate.text.html.replace("{width}",_optional.width).replace("{title}",_optional.title).replace("{content}",_optional.content).replace("{btnText}",_optional.btnText).replace("{dataid}",_optional.dataid));
                msgDomObj.width(_optional.width);
                msgDomObj.find(".close").click(function(){
                    $(this).parents(".modal-frame:eq(0)").remove()
                });
                msgDomObj.find(".close,.confirm").click(function(){
                    $(this).parents(".modal-frame:eq(0)").remove()
                });
                msgDomObj.find(".confirm").click(optional.btnFun);
                msgDomObj.hide();
            }

            $(msgCtnrDomObj).append(msgDomObj);
            msgDomObj.show(500,function(){
                clearInterval(popMsg.interval);
                var scrollCurrentHeight=$(msgCtnrDomObj)[0].scrollTop;
                var scrollHeight=$(msgCtnrDomObj)[0].scrollHeight-$($(msgCtnrDomObj)[0]).height();

                var stemp=(scrollHeight-scrollCurrentHeight)*0.05;


                popMsg.interval=setInterval(function(){
                    if(scrollCurrentHeight<scrollHeight){
                        scrollCurrentHeight=scrollCurrentHeight+stemp;
                        $(msgCtnrDomObj).scrollTop(scrollCurrentHeight);
                        console.log(scrollCurrentHeight+" "+scrollHeight);
                    }else{
                        clearInterval(popMsg.interval);
                    }
                },20);

            });


            //显示消息框
        },
        close:function(dataid){
            $("[data-id='"+dataid+"']").remove();
        }
    }

    //定义消息容器

    //定义消息体模板


    //判断顶级窗口是否有消息容器

    //如果没有创建消息容器

    //插入消息体


    return popMsg;


});