<template>
	<div class="dataDictionary">
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
			 @row-click="clickRow" :height="tableHeight">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="140">
				</el-table-column>
				<el-table-column prop="content" label="内容">
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click.native.prevent='showMsg($event,scope.$index, tableData)'>编辑</el-button>
						<el-button type="text" size="small" @click.native.prevent='del($event,scope.$index, tableData)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- <div style="margin-top: 20px">
				<el-button @click="toggleSelection()">取消选择</el-button>
			</div> -->
		</el-card>
		<el-dialog title="数据字典信息" :visible.sync="dialogVisible" width="350px">
			<el-form :model="msg" ref="msg" status-icon label-width="100" :rules="rules">
				<el-form-item label="名称:" prop='name'>
					<el-input v-model="msg.name" auto-complete="off" style="width: 150px" clearable></el-input>
				</el-form-item>
				<el-form-item label="内容:" prop='content' required>
					<el-input v-model="msg.content" auto-complete="off" style="width: 150px" clearable></el-input>
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
			var valContent = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入符合json格式内容'));
				} else {
					let reg = /^[0-9]+$/;
					if (reg.test(value)) {
						callback()
						return;
					}
					try {
						eval('(' + value + ')');
						callback()
					} catch (e) {
						callback(new Error('请输入符合json格式内容'))
						return;
					}
				}
			}
			return {
				dialogVisible: false,
				msg: {
					name: "",
					content: '',
					id: ""
				},
				searchVal: "",
				tableData: [],
				rules: {
					name: [{
							required: true,
							message: '请输入字典名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
					content: [{
						validator: valContent,
						trigger: 'blur'
					}]
				},
				multipleSelection: []
			}
		},
		computed: {
			tableHeight: ()=>{
				let main = document.getElementById("main");
				return (main.offsetHeight-46 -40 -20);
			}
		},
		methods: {
			showMsg(e, index, datas) {
				e.stopPropagation();
				this.dialogVisible = true;
				this.msg.name = datas[index].name;
				this.msg.content = datas[index].content;
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
							url: "/hid/dataDictionary/del",
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
				console.log(2222)
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
						if (element.name.indexOf(this.searchVal) != -1) {
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
						url: "/hid/dataDictionary/del",
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
						_this.$http.form("/hid/dataDictionary/save", _this.msg).then((data) => {
							if (data.state) {
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								this.getlist();
							} else {
								this.$alert('添加失败，请检查是否使用双引号', '提示', {
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
				let dataList = JSON.parse(localStorage.getItem("dataList"));
				if (!dataList) {
					this.$alert('数据丢失，请刷新页面', '提示', {
						confirmButtonText: '确定',
						callback: () => {
							window.location.reload();
						}
					});
				}
				return dataList;
			},
			getlist() {
				let _this = this;
				this.$http.post({
						url: "/hid/dataDictionary/list",
						data: {
							orders: "+createTime"
						}
					})
					.then(({
						page
					}) => {
						_this.tableData = page.dataList.reverse();
						let data = JSON.stringify(page.dataList)
						localStorage.setItem("dataList", data)
					})
			}
		},
		mounted() {
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
	.dataDictionary {
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
