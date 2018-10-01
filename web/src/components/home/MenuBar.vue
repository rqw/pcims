<template>
	<div id="menu-bar">
		<el-menu class="el-menu-vertical-demo" :collapse="!application.menuBar" menu-trigger="click" :active-text-color="textColor"
		 unique-opened style='background-color: transparent' router>
			<div :class="{hide:application.menuBar}">
				<el-menu-item v-for="(item,index) in menuData" :key='index' @click.native='showlist' index='' style='background-color: transparent'>
					<i :class="item.icon" style="width:15px;height:15px;color:white"></i>
					<span slot="title">{{item.name}}</span>
				</el-menu-item>
			</div>
			<div :class="{hide:!application.menuBar}">
				<el-submenu v-for="(it,indexx) in menuData" :key='indexx' :index="it.name" style='background-color: transparent'>
					<template slot="title">
						<i :class="it.icon" style="width:15px;height:15px;color:white"></i>
						<span slot="title">{{it.name}}</span>
					</template>
					<el-menu-item v-for='(element,index) in it.sons' :index="element.url" :title="element.name" :key='index' style='background-color: transparent'
					 class="menu-item" @click.native='addpage($event,element.url)'>{{element.name}}
					</el-menu-item>
				</el-submenu>
			</div>
		</el-menu>
	</div>
</template>
<script type="text/javascript">
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				menuData: "",
				num: "1",
				textColor: "#000",
				application: this.$store.state.application,
				hash: "hash",
				isresh: false,
			}
		},
		methods: {
			showlist(e) {
				if (!this.application.menuBar)
					this.$store.commit("changeMenuBar", true);
				this.num = e.index + "-1";
			},
			addpage(e, url) {
				let urls = url;
				console.log(url)
				let title = e.target.innerText;
				bus.$emit("add", title, url)
			},
			checkData(data) {
				let _this = this;
				// let msg = window.Base64(data.data);
				data.forEach((val) => {
					let msgs = eval("({" + val.properties + "})");
					val.icon = "fa " + msgs.icon
					val.sons.forEach((item) => {
						let msg = eval("({" + item.properties + "})");
						item.icon = "fa " + msg.icon;
						item.url = "/home/" + msg.url;
					})
				})
				_this.menuData = data;
			},
			contrast(obj1, obj2) {
				let val1 = obj1.no;
				let val2 = obj2.no;
				if (val1 > val2) {
					return -1;
				} else if (val1 < val2) {
				 	return 1;
				} else {
				 	return 0;
					}
			}
		},
		mounted() {
			let _this = this;
			let msg = JSON.parse(localStorage.getItem("APP-VUEX-STORE-STATE"));
			let menuList = msg.profile.menuList;
			let roleList = msg.profile.roleList;
			let role = localStorage.getItem("role");
			let result = [];
			roleList.forEach( function(element, index) {
				if(Object.keys(element)[0] == role){
					for(let i in element) {
						roleList = element[i]
					}
				}
			});
			menuList.forEach( function(j) {
				roleList.forEach( function(k) {
					if(j.code == k){
						result.push(j)
					}
				});
			});
			let parentArr = [];
			let children = [];
			result.forEach((val,index)=>{
				if(val.parentno == "00"){
					parentArr.push(val)
				}else {
					children.push(val)
				}
			})
			parentArr.forEach((val)=> {
				val.sons = [];
				children.forEach((item)=> {
					if(item.parentno == val.no){
						val.sons.push(item)
						val.sons.sort(_this.contrast).reverse()
					}
				})
			})
			parentArr.sort(this.contrast).reverse()
			let newArr = this.checkData(parentArr)

		}
	}
</script>
<style lang="scss">

</style>
