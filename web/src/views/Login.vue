<template>
    <div class="login">
        <div class="top">
            <div class="logo">
                <img src="../../public/logos/login_hjk.png">
            </div>
        </div>
        <div class="content" id='content'>
            <div id='msg' style='width: 100%;'>
                    <el-col :span="10" :offset='2'>
                        <div class="text">
                            <p class="title">含山县区域心电会诊</p>
                            <p class="word">安全、高效、便捷</p>
                            <div class="img">
                                <img src="../../public/img/content_left-image_notitle.png">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8" :offset="3">
                        <div class="loginForm" id='loginForm'>
                            <span class='formtitle'>用户登陆</span>
                            <el-form ref='loginfrom' :model='loginfrom' :rules="rules">
                                <el-form-item prop='username'>
                                    <el-col>
                                        <el-input v-model='loginfrom.username' auto-complete="off">
                                            <template slot="prepend"><i class="fa fa-user" style='font-size: 20px'></i></template>
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item prop='password'>
                                    <el-col>
                                        <el-input v-model='loginfrom.password' type='password' auto-complete="off">
                                            <template slot="prepend"><i class="fa fa-lock" style='font-size: 20px'></i></template>
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-col>
                                        <el-button type="primary" @click="login('loginfrom')" style='width: 100%;margin-bottom: 5px'>登陆</el-button>
                                        <span>如登录异常,请清理浏览器缓存后再试。<span @click='forgetPassword' class='mark'>忘记密码？</span></span>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <!-- <el-col :span="2"><div></div></el-col> -->
            </div>
        </div>
        <div class="footer">
            <p>技术支持：{{company.name}} 服务热线：{{company.phone}}</p>
        </div>
        <v-reset></v-reset>
    </div>
</template>

<script>
import {LOGIN_URL} from "../components/tools/const-url.js";
import rsa from "../components/tools/rsa.js";
import { mapState } from "vuex";
import vReset from "../components/login/resetPassword.vue";
import session from "../components/tools/untils.js";
    export default {
        components: {vReset},
        data() {
            var validatePass = (rule, value, callback) => {
                let reg = /^[a-zA-Z]\w{5,17}$/;
                let result = reg.test(value)
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else {
                    if (result) {
                        callback()
                        return;
                    }
                    callback(new Error('以字母开头，长度在6~18之间，只能包含字符、数字和下划线'  ));
                }
            };
            return {
                loginfrom: {
                    username: '',
                    password: ''
                },
                windowWidth:"",
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]

                }
            }
        },
        computed: {
            ...mapState({
                company: state => state.about.company
            })
        },
        methods: {
            forgetPassword() {
                window.bus.$emit('forgetPassword')
            },
            login(formName) {
                let _this = this;
                let loginForm={
                    userName:rsa.encrypt(_this.loginfrom.username),
                    password:rsa.encrypt(_this.loginfrom.password),
                    type:"WEB",
                }
                this.$http.form(LOGIN_URL,loginForm).then((data) => {
                    // console.log(data.data.data)
                    session.token.init(data.data.data.token);
                    localStorage.setItem("role",data.data.data.roles[1]);
                    _this.$store.commit("session",data.data);
                    _this.$store.commit("saveStorage");
                    _this.$router.push('/home');
                }).catch((err) => {
                    console.log(err)
                });
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         this.$http.post(LOGIN_URL,{username:"default",password:"123456",type:"WEB"}).then((data) => {
                //             console.log(data);
                //         }).catch((err) => {
                //             console.log(err)
                //         })
                //     }else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            }
        },
        mounted() {
            this.windowWidth = window.innerWidth;
            let content = document.getElementById("content");
            content.style.height = window.innerHeight - 95 - 95 + "px"
            window.onresize = () => {
                this.windowWidth = window.innerWidth;
                content.style.height = `${window.innerHeight - 95 - 95}px`;
            };
        },
        watch: {
            windowWidth: {
                handler: function(val,oldval) {
                    console.log(val)
                    let loginForm = document.getElementById("loginForm");
                    if(val <= 1024) {
                        console.log(val)
                        loginForm.style.right = '6%'
                    }else {
                        loginForm.style.right = ''
                    }
                },
                deep:true
            }

        }
    }
</script>

<style lang="scss">
    .login {
        img {
            width: 100%;
        }
        .top {
            height: 95px;
            position: relative;
            .logo {
                width: 145px;
                height: 46px;
                position: absolute;
                top: 50%;
                left: 30px;
                transform: translateY(-50%);
            }
        }
        .content {
            box-sizing: border-box;
            background-color: #0082CE;
            position: relative;
            #msg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
                .text {
                    .title {
                        text-align: left;
                        color: #ebf8ff;
                        font-size: 35px;
                        letter-spacing: 5px;
                    }
                    .word {
                        text-align: left;
                        color: #d0e6f2;
                        font-size: 21px;
                        letter-spacing: 2px;
                    }
                    .img {
                        width: 100%;
                        margin-top: 30px;
                    }
                }
                .loginForm {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    box-sizing: border-box;
                    background-color: #CFE5F1;
                    width: 400px;
                    height: 335px;
                    padding: 50px 30px;
                    border-radius: 7px;
                    form {
                        margin-top: 20px;
                        .mark {
                            color: #409EFF;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .footer {
            height: 95px;
            line-height: 95px;
            text-align: center;
            font-size: 14px;
            color: #727272;
        }
    }
</style>