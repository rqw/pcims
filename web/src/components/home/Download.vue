<template>
    <div>
        <el-dialog
            title= "为了您能够正常使用系统，请您手动下载下方两个软件。"
            :visible.sync= "dialogVisible"
            width="600px" >
            <p class="tool">
                <span>如果没有安装PDF阅读器，请下载并安裝</span>
            <p><el-button event-select="downFlashRead">下载PDF阅读器</el-button></p>
            <p class="tool">
                <span>如果没有启动客户端，请下载并安裝（<span style="color: red;">如果已经安装过本工具，请刷新页面后重试</span>）</span>
            <p><el-button event-select="downEgcRead">下载客户端工具</el-button></p>
            <p class="tool">
                <span>软件安装完成后首次运行前请先点击下方按钮完成初始化</span>
            <p><el-button event-select="initEgc">初始化客户端配置信息</el-button></p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
    export default {
        data() {
            return{
                dialogVisible: false
            }
        },
        computed: {
            // ...mapState({
            //     dialogVisible: state => state.dialogVisible
            // })
        },
        methods: {
        },
        mounted() {
        },
        created() {
            let _this = this;
            window.bus.$on("openTool",() => {
                _this.dialogVisible = true
            })
        }
    }
</script>
<style>
    
</style>