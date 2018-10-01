<template>
    <div class='password'>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="550px" >
            <el-form :model="formPW" ref="formPW" status-icon :rules="rules" :label-width="formLabelWidth">
                <el-form-item label="原密码" prop="oldPW" >
                    <el-input v-model="formPW.oldPW" type="password" auto-complete="off" style="width: 300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPW">
                    <el-input v-model="formPW.newPW" type="password" auto-complete="off" style="width: 300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPWR">
                    <el-input v-model="formPW.newPWR" type="password" auto-complete="off" style="width: 300px" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="refuse('formPW')">取 消</el-button>
                <el-button type="primary" @click="submitPW('formPW')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
    export default {
        data() {
            //密码正则验证
            var validatePass = (rule, value, callback) => {
                console.log(value)
                let reg = /^[a-zA-Z]\w{5,17}$/;
                let result = reg.test(value)
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (result) {
                        callback()
                        return;
                    }
                    callback(new Error('密码格式:以字母开头，长度在6~18之间，只能包含字符、数字和下划线'  ));
                }
            };
            var validatePass2 = (rule, value, callback) => {
               if (value === '') {
                   callback(new Error('请再次输入密码'));
               } else if (value !== this.formPW.newPW) {
                   callback(new Error('两次输入密码不一致!'));
               } else {
                   callback();
               }
            };
            return {
                dialogFormVisible: false,
                //修改密码
                formPW: {
                    oldPW: "",
                    newPW: "",
                    newPWR: ""
                },
                formLabelWidth: "100px",
                rules: {
                    oldPW:[
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    newPW:[
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    newPWR:[
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            // ...mapState({
            //     dialogFormVisible: (state) => state.dialogFormVisible
            // })
        },
        methods: {
            refuse(formName){
                // this.$store.commit("showPass");
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            // 密码提交
           submitPW(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // $.secAjax(
                        //     {
                        //         type: 'POST',
                        //         url: "index/modifyPassword",
                        //         data: {
                        //             oldpwd: this.formPW.oldPW,
                        //             newpwd: this.formPW.newPW,
                        //         },
                        //         dataType: 'json',
                        //         success: function (data) {
                        //             if (data.state) {
                        //                  alert('修改密码成功,c重新登陆');
                        //                  loginout();
                        //             } else {
                        //                 //    $("#dataform").bootstrapValidator('disableSubmitButtons', false);
                        //                 // $("#submit").unbind("click.submit");
                        //                 // $("#submit").bind("click.submit", submitPwd);
                        //             }
                        //         }
                        //     });
                        // alert(123)
                    _this.refuse();
                    } else {
                        console.log('error submit!!');
                         return false;
                     }
                 });
           }
        },
        mounted() {
        },
        created() {
            window.bus.$on("showPass",() => {
                this.dialogFormVisible = true
            })
        }
    }
</script>
<style lang='scss'>
    
</style>