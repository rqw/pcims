var depends = [
    {name: "utils"},
    {name: "rsa"},
    {name: "jwerty"},
    {name: "bsIE"},
    {name: "bootstrap-validate"},
    {name: "login", type: "css",lazy:false}
];
modular.define({name: "index.login"}, depends, function () {
    var rsa=this.rsa;
    var bsIE=this.bsIE;
    var utils=this.utils;
    
  //判断浏览器版本 如果低于ie8 跳转到指定提示页面
    if(modular.IE.lt(8)){
    	//TODO
    	//modular.topModular().win.location.href=utils.common.url.rewrite("")+"/index/lowBrowser.html";
    }
    
    
    function initForm() {
//          $('#loginForm').bootstrapValidator(
        //                 {
        //                     message : '此值无效',
        //                     group : ".rowBox",
        //                     excluded : [
        //                         ':disabled'
        //                     ],
        //                     submitButtons : '#submit',
        //                     feedbackIcons :
        //                         {
        //                             valid : 'glyphicon glyphicon-ok',
        //                             invalid : 'glyphicon glyphicon-remove',
        //                             validating : 'glyphicon glyphicon-refresh'
        //                         },
        //                     fields :
        //                         {
        //                             userName :
        //                                 {
        //                                     validators :
        //                                         {
        //                                             notEmpty :
        //                                                 {
        //                                                     message : '用户名不能为空'
        //                                                 }
        //                                         }
        //                                 },
        //                             password :
        //                                 {
        //                                     validators :
        //                                         {
        //                                             notEmpty :
        //                                                 {
        //                                                     message : '密码不能为空'
        //                                                 }
        //                                         }
        //                                 }
        //                         }
        //                 });

        $('#dataform').bootstrapValidator(
            {
                message: '此值无效',
                group: ".form-group-input",
                excluded: [
                    ':disabled'
                ],
                submitButtons: '#submit2',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    userName: {
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空'
                            }
                        }
                    },
                    mail: {
                        validators: {
                            notEmpty: {
                                message: '邮箱信息不能为空'
                            },
                            emailAddress: {
                                message: '邮箱格式不正确'
                            }
                        }
                    }
                }
            });
        $("#submit2").click(resetSub);

    }

    function initPosition() {
        var topDist = ($(".content").height() - 335) / 2;
        $(".content .standardBox").css(
            {
                "top": topDist
            }, 500)
        $(".standardBox").fadeIn(1000);
    }

    //登录校验方法
    function sub() {
        //             if (!$("#loginForm").data('bootstrapValidator').isValid()) {
        //                 $("#loginForm").data('bootstrapValidator').validate();
        //                 return;
        //             }
        $.hform.trim($("#loginForm"));
        $.secAjax(
            {
                type: 'POST',
                url: "index/login",
                data: {
                    userName: rsa.encrypt($('#userName').val()),
                    password: rsa.encrypt($('#password').val()),
                    type:"WEB"
                },
                dataType: 'json',
                success: function (data) {
                    if (data.message) {
                        $.hjk.messageBox.show('系统提示', data.message, {
                            '确认': {
                                'primary': true,
                                'callback': function () {
                                    location.href = $.htmlUrl("html/index/index.html");
                                }
                            }
                        });
                    } else {
                        location.href = $.htmlUrl("html/index/index.html");
                    }
                }
            });
        return true;
    }

    //打开重置密码界面
    function resetPassword() {
        $("#dataform").data('bootstrapValidator').resetForm()
        $.hform.val($("#dataform [name]"),
            {
                userName: "",
                mail: ""
            });
        $("#datamodal").modal("show");
    }

    function resetSub() {
        if (!$("#dataform").data('bootstrapValidator').isValid()) {
            $("#dataform").data('bootstrapValidator').validate();
            return;
        }
        $.secAjax(
            {
                type: 'POST',
                url: "index/resetPassword",
                data: $.hform.data($("#datamodal [name]")),
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        $.hjk.alert(
                            {
                                body: data.message
                            });
                    }
                }
            });

    }
    $(window).resize(initPosition);
    initPosition();
    initForm();
    $("#btn-resetpwd").click(resetPassword);
    $("#btn-login").click(sub);
    if(!modular.IE.lt(9))
	jwerty.key("enter",sub);
    return null;
});