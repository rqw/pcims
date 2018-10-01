<template>
    <div id="tab">
        <el-tabs v-model="tabsValue" type="card" closable @tab-remove="removeTab" @click.native='changepage' @contextmenu.native="showMenu" >
            <el-tab-pane
                    v-for="(item, index) in tabbars"
                    :key="index"
                    :label="item.title"
                    :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
        <!--自定义右键菜单-->
        <div id="menu">
            <el-button @click='closeOthers'>关闭其他</el-button>
            <el-button @click='closeLeft'>关闭左边</el-button>
            <el-button @click='closeRight'>关闭右边</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return{
                tabsValue: "1",
                tabbars: [
                    {
                        title: '首页',
                        name: '1',
                        path: '/home/welcome'
                    }
                ],
                activeName: 1,
                tabIndex: 2,
                tabPath: ''
            }
        },
        computed: {
        },
        methods: {
            openTab(options){
                console.log("open tab "+options);
                //此处打开一个新tab
                //{
                //     id:tabid,
                //     name: title,
                //     url: url
                // }
            },
            menuHide() {
                let menu = document.querySelector("#menu");
                menu.style.width = 0 + "px";
            },
            addTab(targetName,path) {
                let newTabName = ++this.tabIndex + '';
                if(this.tabbars.find((element) => (element.title == targetName))) {
                    let res = this.tabbars.find((element) => (element.title == targetName));
                    this.tabsValue = res.name;
                    this.$router.push(path);
                    // window.bus.$emit("iframeShow",path)
                    return
                }else {
                    this.tabbars.push({
                        title: targetName,
                        name: newTabName,
                        path: path
                    });
                    this.tabsValue = newTabName;
                    this.$router.push(path);
                    // window.bus.$emit("createIframe",path);
                }
            },
            removeTab(targetName) {
                let tabs = this.tabbars;
                let activeName = this.tabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                                // window.bus.$emit("iframeShow",nextTab.path)
                                this.$router.push(nextTab.path);
                            }
                        }
                    });
                }
                this.tabsValue = activeName;
                this.tabbars = tabs.filter(tab => tab.name !== targetName);
            },
            changepage(e) {
                let menu = document.querySelector("#menu");
                menu.style.width = 0 + "px";
                if(e.path[0].innerText){
                    let text = e.path[0].innerText;
                    let result = this.tabbars.find((element) => (element.title == text))
                    let path = result.path;
					this.$router.push(path);
                    // window.bus.$emit("iframeShow",path)
                }
            },
            showMenu (e) {
                e.preventDefault();
                console.log(e)
                this.tabPath = e.path;
                let x = e.clientX;
                let y = e.clientY;
                let menu = document.querySelector("#menu");
                menu.style.left = x +'px';
                menu.style.top = y +'px';
                menu.style.width = '125px';

            },
            closeOthers () {
                let home = [{
                    title: '首页',
                    name: '1',
                    path: '/home/welcome'
                }]
                let text = this.tabPath[0].innerText;
                let path = this.tabbars.find((element) => (element.title == text)).path;
                let name = this.tabbars.find((element) => (element.title == text)).name;
                let tabNumber = this.tabbars.findIndex((element) => (element.title == text));
                let newArray = this.tabbars.splice(tabNumber,1);
                this.tabsValue = name;
                if(text !== "首页" ) {
                    let newArray1 = home.concat(newArray);
                    this.tabbars = newArray1;
                    this.$router.push(path)
                    // this.iframeUrl = path;
                    // window.bus.$emit("iframeShow",path)
                    this.menuHide()
                    return
                }
                this.tabbars = newArray;
                this.$router.push(path)
                // this.iframeUrl = path;
                // window.bus.$emit("iframeShow",path)
                this.menuHide()
            },
            closeLeft () {
                let home = [{
                    title: '首页',
                    name: '1',
                    path: '/home/welcome'
                }]
                let text = this.tabPath[0].innerText;
                let path = this.tabbars.find((element) => (element.title == text)).path;
                let name = this.tabbars.find((element) => (element.title == text)).name;
                let tabNumber = this.tabbars.findIndex((element) => (element.title == text));
                let newArray = this.tabbars.splice(tabNumber);
                if(text !== "首页" ) {
                    let newArray1 = home.concat(newArray);
                    this.tabbars = newArray1;
                    this.tabsValue = name
                    // window.bus.$emit("iframeShow",path)
                    this.$router.push(path);
                    this.menuHide()
                    return
                }
                this.tabbars = newArray;
                this.$router.push(path);
                // window.bus.$emit("iframeShow",path)
                this.menuHide()
            },
            closeRight() {
                let text = this.tabPath[0].innerText;
                let path = this.tabbars.find((element) => (element.title == text)).path;
                let name = this.tabbars.find((element) => (element.title == text)).name;
                let tabNumber = this.tabbars.findIndex((element) => (element.title == text));
                let newArray = this.tabbars.slice(0,tabNumber+1);
                this.tabbars = newArray;
                this.tabsValue = name;
                this.$router.push(path);
                // window.bus.$emit("iframeShow",path)
                this.menuHide()
            },
            //读取tab缓存
            readCach() {
                
            }
        },
        created() {
            let _this = this;
            window.bus.$on("add",(title,url)=>{
				console.log(title,url)
                    _this.addTab(title,url)
                }
            )
        },
        mounted() {
            // this.readCach();
            let _this = this;
            let msg = JSON.parse(localStorage.getItem("tabbars"));
            if(msg&&msg.length > 1) {
                this.$confirm('是否加载上次未关闭标签页?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let value = localStorage.getItem("tabsValue");
                    let Index = localStorage.getItem("tabIndex");
                    // if(msg){ 
                        _this.tabbars = msg; 
                        _this.tabsValue = value; 
                        _this.tabIndex = parseInt(Index);
                    // }
                    _this.tabbars.forEach((val,index)=>{
                        if(val.name == _this.tabsValue) {
                            _this.$router.push(val.path)
                        }
                    })
                    // localStorage.removeItem("tabbars");
                    // localStorage.removeItem("tabsValue");
                    _this.$message({
                        type: 'success',
                        message: '加载完成'
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消加载'
                    });
                });
            }
            window.onbeforeunload = () => {
                let tabs = JSON.stringify(_this.tabbars);
                let tabsValue = _this.tabsValue;
                let tabIndex = _this.tabIndex + "";
                console.log(tabsValue,tabIndex)
                localStorage.setItem("tabbars",tabs);
                localStorage.setItem("tabsValue",tabsValue);
                localStorage.setItem("tabIndex",tabIndex);
            }
            if(this.tabbars.length == 1) {
                this.$router.push("/home/welcome");
            }
        },
        beforeDestroy() {
            let tabs = JSON.stringify(this.tabbars);
            let tabsValue = this.tabsValue;
            let tabIndex = this.tabIndex + "";
            localStorage.setItem("tabbars",tabs);
            localStorage.setItem("tabsValue",tabsValue);
            localStorage.setItem("tabIndex",tabIndex);
        }
    }
</script>
<style lang='scss'>

</style>