/**
 * Created by hjk on 2017/8/16.
 */
/**
 * Created by hjk on 2017/3/4.
 */

    console.log("--");
var depends = [
    {name: "hjkplug",type:"css"},
    {name:"font-awesome",type:"css"},
    {name: "bootstrap-datetimepicker"},
    {name:"jquery"}
];
var popMsg;
modular.define({name:"demo.demo"},depends,function(){


    $('#datetimepicker01').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii:ss'
    });

    $('#datetimepicker02').datetimepicker({
        language:  'zh-CN',
        minView:2,
        format: 'yyyy-mm-dd'
    });


    popMsg={
        setting:{
            msgCtnrHtml:'<div class="msg-wrap" style="overflow: auto"></div>',
            defaultContentTemplate:{
                text:{
                    showCloseBtn:true,
                    showConfirm:true,
                    //{width},{content},{btnText}
                    html:'<!-- 标准模态 开始 --> <div class="modal-frame floatbox msg-box" target-draggable="false" style="display: block;width:{width} !important"> <!--div class="left-block-blue crumb"></div--> <button class="close"><i class="fa fa-times" aria-hidden="true"></i></button> <!-- 标题 开始--> <div class="floatbox-header">有新消息</div> <!-- 标题 结束--> <hr class="splitline"> <!-- 主体 开始--> <div class="floatbox-body"> <p style="font-size: 14px">{content}</p> </div> <!-- 主体 结束--> <hr class="splitline"> <!-- 底部条 开始 --> <div class="footbar"> <button type="button" class="h_btn h_btn_blue h_btn_lg confirm">{btnText}</button> <!--button type="button" class="h_btn h_btn_lg cancel">取消</button--> </div> <!-- 底部条 结束 --> </div> <!-- 标准模态 开始 -->',
                    closeCallback:function(){}
                },
                custom:{}
            }
        },
        show:function(optional){
            var defaultOptional={
                position:"top",//top/self/opener(暂未开放)
                width:100,
                templateName:"text",
                title:"新消息",
                content:"",
                btnText:"嗯，我知道了"
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
                msgDomObj=$(this.setting.defaultContentTemplate.text.html.replace("{width}",_optional.width).replace("{title}",_optional.title).replace("{content}",_optional.content).replace("{btnText}",_optional.btnText));
                msgDomObj.width(_optional.width);
                msgDomObj.hide();
            }

            $(msgCtnrDomObj).append(msgDomObj);
            msgDomObj.show(500,function(){

                var moveDown=function(y){
                    $(msgCtnrDomObj).scrollTop(y);
                    var scrollCurrentHeight=$(msgCtnrDomObj)[0].scrollTop;
                    var scrollHeight=$(msgCtnrDomObj)[0].scrollHeight;

                    console.log(scrollCurrentHeight+" "+scrollHeight);
                    if(scrollCurrentHeight<scrollHeight){
                        setTimeout(function(){
                            console.log(y);
                            moveDown(scrollCurrentHeight++);
                        },100)
                    }
                }


                //moveDown($(msgCtnrDomObj)[0].scrollTop);


            });


            //显示消息框
        }


    }

    //定义消息容器

    //定义消息体模板


    //判断顶级窗口是否有消息容器

    //如果没有创建消息容器

    //插入消息体

    $(function(){
        console.log("asdf")
        popMsg.show({content:"nihao"})
    })


});