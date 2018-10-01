<template>
    <div id="app-home" :class="state.theme">
        <el-container class="full-container">
            <el-header id="app-header">
                <v-header></v-header>
            </el-header>
            <el-container class="full-container">
                <el-aside id="app-menuBar" width="none">
                	<v-menu-bar></v-menu-bar>
                </el-aside>
                <el-container class="full-container">
                    <el-header id="app-tabBar">
                    	<v-tabbar></v-tabbar>
                    </el-header>
                    <el-main  id="app-mainArea">
                        <v-main :class=[full]></v-main>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer id="app-footer">
                <v-footer></v-footer>
            </el-footer>
        </el-container>
	<!-- 主题选择模态框 -->
    <v-theme></v-theme>
    <!--工具模态框-->
    <v-download></v-download>
    <!--修改密码模态框-->
    <v-passwd></v-passwd>
    </div>
</template>

<script>
    import vHeader from "@/components/home/Header.vue";
    import vFooter from "@/components/home/Footer.vue";
    import vPasswd from "@/components/home/Passwd.vue";
    import vDownload from "@/components/home/Download.vue";
    import vMenuBar from "@/components/home/MenuBar.vue";
    import vTabbar from "@/components/home/TabBar.vue";
    import vMain from "@/components/home/Main.vue";
    import vTheme from "@/components/home/Theme.vue";
    import { mapState } from "vuex";
    export default {
    	name: "home",
	    components: {vHeader,vFooter,vPasswd,vDownload,vMenuBar,vTabbar,vTheme,vMain},
	    data(){
	        return {
	            state:this.$store.state,
	            iframeUrl: "",
	            iframeHeight: "",
                // full: ""
	        }
	    },
	    computed: {
			...mapState({
				full: (state) => state.full
			})
		},
	    mounted() {
	       	let menu = document.querySelector("#menu");
	       	window.addEventListener("click",() => {
	       		menu.style.width = 0 + "px";
	       	})
	    },
	    beforeUpdate() {
	    }
    }
</script>


<style lang="scss">
	.full {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
</style>
