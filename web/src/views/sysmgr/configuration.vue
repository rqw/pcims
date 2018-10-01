<template>
	<div class="configuration">
		<el-card>
			<div class="header">
				<span style='font-size: 14px'>关键字：</span>
				<span style="margin-right: 20px">
					<el-input style='width: 150px' placeholder='请输出查询条件' v-model='searchVal' @keyup.enter.native="search"></el-input>
				</span>
				<el-button type="success" icon="el-icon-search" @click='search'>查询</el-button>
				<el-button type="primary" icon='el-icon-plus' @click='add'>新增</el-button>
				<el-button type='danger' icon='el-icon-close' @click='dels'>删除</el-button>
			</div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange"
			 @row-click="clickRow">
				<el-table-column type="selection" width="40">
				</el-table-column>
				<el-table-column prop="configurationGroup" label="配置分组" width="120">
				</el-table-column>
				<el-table-column prop="configurationName" label="配置项名称" width='120'>
				</el-table-column>
				<el-table-column prop="configurationValue" label="配置项值" >
				</el-table-column>
				<el-table-column prop="organizationId" label="机构标识" width='90'>
				</el-table-column>
				<el-table-column prop="callback" label="回调接口" width='100'>
				</el-table-column>
				<el-table-column prop="flag" label="状态" width='90'>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click.native.prevent='showMsg($event,scope.$index, tableData)'>编辑</el-button>
						<el-button type="text" size="small" @click.native.prevent='del($event,scope.$index, tableData)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="项目配置信息" :visible.sync="dialogVisible" width="600px">
			<el-form :model="msg" ref="msg" status-icon label-width="130px" :rules="rules">
				<el-form-item label="配置分组:" prop='configurationGroup'>
					<el-input v-model="msg.configurationGroup" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="配置项名称:" prop='configurationName'>
					<el-input v-model="msg.configurationName" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="配置项值:" prop='configurationValue'>
					<el-input v-model="msg.configurationValue" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="机构标识:" prop='organizationId'>
					<el-input v-model="msg.organizationId" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="回调接口:" prop='callback'>
					<el-input v-model="msg.callback" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态:" required>
					<el-radio v-model="msg.flag" label="1">启用</el-radio>
					<el-radio v-model="msg.flag" label="2">未启用</el-radio>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="save('msg')">保存并退出</el-button>
				<el-button type="primary" @click="closeDialog('msg')">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				msg: {
					configurationGroup: "",
					configurationName: "",
					configurationValue: "",
					organizationId: "",
					callback: "",
					flag: "1",
					id: ""
				},
				searchVal: "",
				tableData: [],
				rules: {
					configurationGroup: [{
							required: true,
							message: '请输入配置分组',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
					configurationName: [{
							required: true,
							message: '请输入配置项名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
					organizationId: [{
							required: true,
							message: '请输入机构标识',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
					configurationValue: [{
							required: true,
							message: '请输入配置项值',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 200,
							message: '长度在 1 到 200 个字符',
							trigger: 'blur'
						}
					],
					callback: [{
							required: true,
							message: '请输入回调接口',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					]
				},
				multipleSelection: []
			}
		},
		methods: {
			showMsg(e, index, datas) {
				e.stopPropagation();
				this.dialogVisible = true;
			},
			dels() {
				if (this.multipleSelection.length == 0) {
					this.$alert('删除失败，请选择后删除', '提示', {
						confirmButtonText: '确定',
						callback: () => {}
					});
				} else {
					let _this = this;
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$http.post({
							url: "/hid/configuration/del",
							data: _this.multipleSelection,
							params: {
								timestamp: new Date().getTime()
							}
						}).then(({
							state
						}) => {
							if (state) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.getlist();
							} else {
								this.$alert('删除失败，请点击确定刷新后删除', '提示', {
									confirmButtonText: '确定',
									callback: () => {
										window.location.reload()
									}
								});
							}
						})

					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});


				}

			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			clickRow(row) {
				this.$refs.multipleTable.toggleRowSelection(row);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			search() {
				if (!this.searchVal) {
					this.tableData = this.getdata();
				} else {
					let arr = [];
					let _this = this;
					let result = this.getdata().map((element) => {
						if (element.configurationGroup.indexOf(this.searchVal)!= -1||
							element.configurationName.indexOf(this.searchVal)!= -1||
							element.configurationValue.indexOf(this.searchVal)!= -1) {
							return element
						}
					})
					result.forEach(function(element, index) {
						if (element) {
							arr.push(element)
						}
					});
					this.tableData = arr;
				}
			},
			add() {
				this.dialogVisible = true;
			},
			del(e, index, tabledata) {
				e.stopPropagation()
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post({
						url: "/hid/configuration/del",
						data: [{
							id: tabledata[index].id,
							name: tabledata[index].name
						}],
						params: {
							timestamp: new Date().getTime()
						}
					}).then(({
						state
					}) => {
						if (state) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getlist();
						} else {
							this.$alert('删除失败，请点击确定刷新后删除', '提示', {
								confirmButtonText: '确定',
								callback: () => {
									window.location.reload()
								}
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			save(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.$http.form({
							url:"/hid/configuration/save", 
							data:_this.msg,
							params: {
								timestamp: new Date().getTime()
							}
						}).then((data) => {
							if (data.state) {
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								_this.getlist();
							} else {
								this.$alert(data.message, '提示', {
									confirmButtonText: '确定',
									callback: action => {}
								});
							}
						})
						_this.dialogVisible = false;
					} else {
						this.$alert('请查看填写内容，点击确定后从新提交', '提示', {
							confirmButtonText: '确定',
							callback: () => {}
						})
					}
				})
			},
			closeDialog(formName) {
				this.dialogVisible = false;
				this.$refs[formName].resetFields();
			},
			getdata() {
				let configurationDataList = JSON.parse(localStorage.getItem("configurationDataList"));
				if (!configurationDataList) {
					this.$alert('数据丢失，请刷新页面', '提示', {
						confirmButtonText: '确定',
						callback: () => {
							window.location.reload();
						}
					});
				}
				return configurationDataList;
			},
			getlist() {
				let _this = this;
				let arr = [];
				this.$http.post({
						url: "/hid/configuration/list",
						params: {
							timestamp: new Date().getTime()
						}
					})
					.then((data) => {
						for(let i in data) {
							data[i].forEach((item)=>{
								if(item.flag == "1"){
									item.flag = "启用"
								}else if(item.flag == 2) {
									item.flag = "未启用"
								}
								arr.push(item);
							})
						}
						_this.tableData.length = 0;
						_this.tableData = arr;
						let datas = JSON.stringify(arr)
						localStorage.removeItem("configurationDataList")
						localStorage.setItem("configurationDataList", datas)
					})
			}
		},
		mounted() {
			localStorage.removeItem("configurationDataList")
			this.getlist();
		},
		watch: {
			dialogVisible: {
				handler: function(val, old) {
					let _this = this;
					!val && setTimeout(function() {
						_this.$refs["msg"].resetFields();
					}, 200)
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	.configuration {
		.header {
			padding: 0px 15px;
			padding-bottom: 15px;
			border-bottom: 1px solid #EBEEF5;

			.el-input__inner {
				padding: 0 5px;
				height: 30px;
				line-height: 30px;
			}

			.el-button {
				padding: 7px 5px;
			}
		}
		.block {
			margin-top: 20px;
		}
		.el-dialog {
			.el-form-item__label {
				font-size: 16px;
			}

			form {
				position: relative;
				left: 39px;
			}
		}
	}
</style>
