<template>
    <div id="header">
        <div class="logo">
            <img  src="@/assets/logos/header_hjk.png" />
        </div>
        <div class="split">
            <span></span>
        </div>
        <span class="title">一体机管理系统</span>
        <i :class="{'el-icon-new-indent':!application.menuBar,'el-icon-new-outdent':application.menuBar,'changebar':true}" title="侧边伸缩" @click='changeMenuBar'></i>
        <i class="el-icon-refresh refresh" title="刷新" @click='reload'></i>
        <i class="el-icon-rank fullScreen" title="全屏" @click='fullScreen'></i>
        <el-button type="primary" class='fr tool' @click.native="user" style='background-color: transparent;border: none'>{{userName}}</el-button>
        <el-button type="primary" class='fr tool' @click.native="loginOut" style='background-color: transparent;border: none'>注销</el-button>
        <el-button type="primary" class='fr tool' @click.native="changePassWord" style='background-color: transparent;border: none'>修改密码</el-button>
        <el-button type="primary" class='fr tool' @click.native="openTool" style='background-color: transparent;border: none'>工具</el-button>
        <el-button type="primary" class='fr style' @click.native="openColor" style='background-color: transparent;border: none'>主题</el-button>
    </div>
</template>
<script>
    import session from "../../components/tools/untils.js";
    import { mapState} from "vuex";
    export default {
        data() {
            return {
                application:this.$store.state.application,
                // session:this.$store.state.session
            }
        },
        computed: {
                ...mapState({
                    userName: state => state.session.userName
                })
        },
        methods:{
            user() {

            },
            loginOut() {
                session.token.destroy();
                localStorage.removeItem("tabbars");
                localStorage.removeItem("userName");
                this.$router.push("/");
            },
            changePassWord() {
                window.bus.$emit("showPass")
            },
            openTool() {
                window.bus.$emit("openTool")
            },
            openColor() {
                window.bus.$emit("showColorPicker")
            },
            reload() {
                let iframe = document.getElementsByTagName("iframe");
                let arr = Array.prototype.slice.call(iframe);
                arr.forEach( function(element, index) {
                    if(element.style.display === "" || element.style.display == 'block'){
                        element.contentWindow.location.reload(true);
                        return;
                    }
                })
            },
            fullScreen() {
                var de = document.documentElement;
                if(de.requestFullscreen) {
                    de.requestFullscreen();
                }else if(de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                }else if(de.webkitRequestFullScreen) {
                    de.webkitRequestFullScreen();
                }
                let me = this;
                setTimeout(function () {
                    me.reload();
                },200);
            },
            changeMenuBar(e) {
                this.$store.commit("changeMenuBar");
            },
            banben() {

            }
        },
        mounted() {
        },
        created() {
        }
    }
</script>
<style scoped  lang="scss">


</style>
