<template>
	<div class="cache">
		<el-card class="card">
			<div slot="header" class='cardHeader'>
				<span>缓存初始化列表</span>
			</div>
			<div class='cardBody'>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width:100%" border stripe fit>
					<el-table-column prop="id" label="序号" align='center' min-width='60px'>
					</el-table-column>
					<el-table-column prop="name" label="缓存名称" align='center'>
					</el-table-column>
					<el-table-column prop="none" label="进度" align='center'>
					</el-table-column>
					<el-table-column  prop="none" label="状态" align='center'>
					</el-table-column>
					<el-table-column label="操作" align='center'>
						<template slot-scope="scope">
							<el-button type="text" size="small" @click.native.prevent='showMsg(scope.$index, tableData)'>初始化</el-button>
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
				tableData:[
					{id:1,name:"体检单详情和检查结果",url:"sysdev/cache/initCheck",none:"-"},
					{id:2,name:"组织机构信息初始化",url:"sysdev/cache/initOrganization",none:"-"},
					{id:3,name:"资源信息初始化",url:"sysdev/cache/initResource",none:"-"},
					{id:4,name:"角色权限信息初始化",url:"sysdev/cache/initRoleJuris",none:"-"},
					{id:5,name:"字典信息初始化",url:"sysdev/cache/initDataDic",none:"-"},
					{id:6,name:"体检项目信息初始化",url:"sysdev/cache/initCheckdef",none:"-"}
				]
			}
		},
		methods: {
			showMsg(index,data) {
				this.$http.post({
					url: "/hid/"+ data[index].url,
					params: {
						timestamp: new Date().getTime()
					}
				}).then((data)=> {
					if(data.code == 200){
						this.$alert('数据初始化成功',"提示",{
							confirmButtonText: '确定',
							callback: () => {}
						})
					}else if(data.code == 500){
						this.$alert('数据初始化已完成,请勿再次初始化',"提示",{
							confirmButtonText: '确定',
							callback: () => {}
						})
					}else {
						this.$alert('数据异常，请在点击确定后重试',"提示",{
							confirmButtonText: '确定',
							callback: () => {
								window.location.reload()
							}
						})
					}
				})
			}
		}
	}
</script>
<style lang='scss'>
	.cache {
		padding: 20px;
		.el-card__header {
			background-color: #409EFF;
			color: #fff;
		}
	}
</style>