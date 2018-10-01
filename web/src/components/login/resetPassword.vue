<template>
	<div class="reset">
        <el-dialog title="重置密码" :visible.sync="showResetPassword" width="550px" >
        	<el-form :model='userinfo' :rules='rules' ref='userinfo' label-width='100px'>
        		<el-form-item label='用户名:' prop='name'>
        			<el-input v-model='userinfo.name'auto-complete="off" style="width: 300px" clearable></el-input>
        		</el-form-item>
        		<el-form-item label='邮箱:' prop='email'>
        			<el-input v-model='userinfo.email' auto-complete="off" style="width: 300px" clearable></el-input>
        		</el-form-item>
        	</el-form>
        	<div slot="footer" class="dialog-footer">
                <el-button @click="refuse('userinfo')">取 消</el-button>
                <el-button type="primary" @click="submitPW('userinfo')">确 定</el-button>
            </div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				showResetPassword: false,
				userinfo: {
					name: "",
					email: ""
				},
				rules: {
					name: [

					],
					email: [

					]
				}
			}
		},
		methods: {
			refuse(formName) {
                this.showResetPassword = false;
                this.$refs[formName].resetFields();
            },
            submitPW(formName) {
            	this.showResetPassword = false;
            }
		},
		created() {
			window.bus.$on("forgetPassword",() => {
				this.showResetPassword = true;
			})
		}
	}
</script>
<style lang='scss'></style>