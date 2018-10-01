<template>
	<div class="sysmgrParameter">
		<el-card class="card">
			<div slot="header" class='cardHeader'>
				<span>系统参数配置表</span>
			</div>
			<div class='cardBody'>
				<div class='bh'>
					<el-input placeholder="请输入内容" v-model="searchVal" class='fl' style='width: 25%;'>
						<el-button slot="append" type='primary' icon="el-icon-search" @click.native="search"></el-button>
					</el-input>
					<el-button icon='el-icon-menu' type='primary' class='fr' style='margin-left: 10px' click='headerList'>
					</el-button>
					<el-button icon='el-icon-refresh' type='primary' class='fr' @click='refresh'></el-button>
					<!-- <div class='checkList'>
						<el-checkbox-group v-model="checkList">
							<el-checkbox label="参数名称"></el-checkbox>
							<el-checkbox label="检查项目小类"></el-checkbox>
							<el-checkbox label="检查项目大类"></el-checkbox>
							<el-checkbox label="检查项目所属类型"></el-checkbox>
							<el-checkbox label="缩写"></el-checkbox>
							<el-checkbox label="数据单位"></el-checkbox>
							<el-checkbox label="显示顺序"></el-checkbox>
							<el-checkbox label="数据展示格式"></el-checkbox>
							<el-checkbox label="未检测时是否展示该项目"></el-checkbox>
							<el-checkbox label="分组"></el-checkbox>
							<el-checkbox label="参考值"></el-checkbox>
						</el-checkbox-group>
					</div> -->
				</div>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width:100%" @row-click="clickRow" border stripe fit>
					<el-table-column prop="name" label="参数名称" align='center' fixed='left'
					>
					</el-table-column>
					<el-table-column prop="code" label="检查项目小类" align='center'>
					</el-table-column>
					<el-table-column prop="checktype" label="检查项目大类" align='center'>
					</el-table-column>
					<el-table-column prop="datatype" label="检查项目所属类型" align='center'>
					</el-table-column>
					<el-table-column prop="abbreviate" label="缩写" align='center'>
					</el-table-column>
					<el-table-column prop="unitname" label="数据单位" align='center'>
					</el-table-column>
					<el-table-column prop="ordernum" label="显示顺序" align='center'>
					</el-table-column>
					<el-table-column prop="format" label="数据展示格式" align='center'>
					</el-table-column>
					<el-table-column prop="nulldisplay" label="未检测时是否展示该项目"  align='center'>
					</el-table-column>
					<el-table-column prop="groupId" label="分组" align='center'>
					</el-table-column>
					<el-table-column prop="ref" label="参考值" align='center'>
					</el-table-column>
					<el-table-column label="操作" align='center' fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click.native.prevent='showMsg(scope.$index, tableData)'>编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [],
				searchVal: "",
				listval: "",
				checkList:["A","B","C"]
			}
		},
		methods: {
			refresh() {
				this.tableData.splice(0);
				this.getlist()
			},
			headerList() {

			},
			search() {

			},
			clickRow() {

			},
			showMsg(index,data) {
				console.log(data[index])
			},
			getlist() {
				this.$http.form({
					url:"/hid/sysmgrParameter/list", 
					data: { "orders": "+name" },
					params: {
						timestamp: new Date().getTime()
					}
				}).then(({page})=>{
					console.log(page.dataList)
					this.tableData = page.dataList;
				})
			}
		},
		mounted() {
			this.getlist()
		}
	}
</script>
<style lang='scss'>
	.fr {
		float: right;
	}
	.fl {
		float: left;
	}
	.sysmgrParameter {
		padding: 20px;
		.el-card__header {
			background-color: #409EFF;
			color: #fff;
		}
		.cardBody {
			position: relative;
			font-size: 14px !important;
			.bh {
				margin-bottom: 20px;
				overflow: hidden;
			}
			.checkList {
				position: absolute;
				right: 90px;
				top: 30px;
				width: 115px;
				height: 200px;
				background-color: #fff;
				z-index: 99;
				.el-checkbox+.el-checkbox {
					margin-left: 0;
				}
				.el-checkbox {
					margin-bottom: 10px;
				}
				.el-checkbox__label {
					// display: block;
				}
			}
		}
	}
</style>
