<template>
	<div class="jurisdiction">
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
				<el-table-column prop="jurisdictionName" label="权限名称" width="80">
				</el-table-column>
				<el-table-column prop="jurisdictionCode" label="权限编码" width='95'>
				</el-table-column>
				<el-table-column prop="authenticationType" label="认证类型" width='80'>
				</el-table-column>
				<el-table-column prop="authenticationRule" label="认证规则" >
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click.native.prevent='showMsg($event,scope.$index, tableData)'>编辑</el-button>
						<el-button type="text" size="small" @click.native.prevent='del($event,scope.$index, tableData)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.currentPage"
					:page-sizes="page.pageSizes"
					:page-size="page.pageSize"
					layout= " prev, pager, next, jumper, sizes, total"
					:total="page.total">
				</el-pagination>
			</div>
			<!-- <div style="margin-top: 20px">
				<el-button @click="toggleSelection()">取消选择</el-button>
			</div> -->
		</el-card>
		<el-dialog title="权限信息" :visible.sync="dialogVisible" width="600px">
			<el-form :model="msg" ref="msg" status-icon label-width="100" :rules="rules">
				<el-form-item label="权限名称:" prop='jurisdictionName'>
					<el-input v-model="msg.jurisdictionName" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="权限编码:" prop='jurisdictionCode'>
					<el-input v-model="msg.jurisdictionCode" auto-complete="off" style="width: 350px" clearable></el-input>
				</el-form-item>
				<el-form-item label="认证类型:" required>
					<el-select placeholder="请选择认证类型" v-model='option' style="width: 350px">
						<el-option label="URL" value="URL"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="认证规则:" prop='authenticationRule'>
					<el-input v-model="msg.authenticationRule" auto-complete="off" style="width: 350px" clearable></el-input>
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
				option: "",
				msg: {
					jurisdictionName: "",
					jurisdictionCode: "",
					authenticationType: "",
					authenticationRule: "",
					id: ""
				},
				page: {
					pageSizes: [ 10, 15, 20],
					pageSize: 10,
					total: 0,
					currentPage: 1,
				},
				searchVal: "",
				tableData: [],
				rules: {
					jurisdictionName: [{
							required: true,
							message: '请输入权限名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
					jurisdictionCode: [{
							required: true,
							message: '请输入权限编码',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在 1 到 30 个字符',
							trigger: 'blur'
						}
					],
					authenticationRule: [{
							required: true,
							message: '请输入认证规则',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 200,
							message: '长度在 1 到 200 个字符',
							trigger: 'blur'
						}
					]
				},
				multipleSelection: []
			}
		},
		methods: {
			handleSizeChange(val) {
				this.page.pageSize = val;
				this.getlist(this.page.currentPage,this.page.pageSize);
			},
			handleCurrentChange(val) {
				this.page.currentPage = val;
				this.getlist(this.page.currentPage,this.page.pageSize);
			},
			showMsg(e, index, datas) {
				e.stopPropagation();
				this.dialogVisible = true;
				this.msg.jurisdictionName = datas[index].jurisdictionName;
				this.msg.jurisdictionCode = datas[index].jurisdictionCode;
				this.option = datas[index].authenticationType;
				this.msg.authenticationRule = datas[index].authenticationRule;
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
							url: "/hid/jurisdiction/del",
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
								this.search();
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
				let _this = this;
				if (!this.searchVal) {
					this.tableData = this.getdata();
				} else {
					this.$http.form({
						url: "/hid/jurisdiction/list",
						data: {
							"conditions['authenticationRuleLIKE or authenticationTypeLIKE or jurisdictionNameLIKE or jurisdictionCodeLIKE']" : _this.searchVal + " or " + _this.searchVal + " or " + _this.searchVal + " or " + _this.searchVal,
							"orders[0]": "+jurisdictionCode",
							number: 1,
							capacity: 10	
						},
						params: {
							timestamp: new Date().getTime()
						}
					})
					.then(({
						page
					}) => {
						_this.tableData = page.dataList;
					})
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
						url: "/hid/jurisdiction/del",
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
							this.search();
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
						_this.$http.form("/hid/jurisdiction/save", _this.msg).then((data) => {
							if (data.state) {
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								this.search();
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
				let jurisdictionDataList = JSON.parse(localStorage.getItem("jurisdictionDataList"));
				if (!jurisdictionDataList) {
					this.$alert('数据丢失，请刷新页面', '提示', {
						confirmButtonText: '确定',
						callback: () => {
							window.location.reload();
						}
					});
				}
				return jurisdictionDataList;
			},
			getlist(num,page) {
				let _this = this;
				this.$http.form({
						url: "/hid/jurisdiction/list",
						data: {
							"orders[0]": "+jurisdictionCode",
							number: num,
							capacity: page	
						},
						params: {
							timestamp: new Date().getTime()
						}
					})
					.then(({
						page
					}) => {
						_this.page.total = page.total;
						_this.tableData = page.dataList;
						let data = JSON.stringify(page.dataList)
						localStorage.setItem("jurisdictionDataList", data)
					})
			}
		},
		mounted() {
			localStorage.removeItem("jurisdictionDataList")
			this.getlist(this.page.currentPage,this.page.pageSize);
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
	.jurisdiction {
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
