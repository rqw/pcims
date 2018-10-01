<template>
<div id="frame" ref="frameDiv">
    <iframe :src="src" :width="width" :height="height" frameborder="0"></iframe>
</div>
</template>

<script>
import { mapState } from "vuex";
    export default {
        props:["src"],
        data(){
            return {width:"0px",height:"0px"}
        },
        computed: {
            ...mapState({
                full: state => state.full
            })
        },
        methods:{
            resize(){
                this.width = "100%";
                this.height = window.innerHeight - 45- 41- 30 -10 + "px";
            },
            hide(){
                this.width=0;
                this.height=0;
            }
        },
        mounted(){
            let _this = this;
            this.resize();
            if(_this.full == "full") {
                _this.width = document.documentElement.clientWidth;
                _this.height = document.documentElement.clientHeight;
                let main = document.getElementById("main");
                main.style.paddingTop='0';
            }
            window.onresize = () => {
                if(_this.full == "full") {
                    _this.width = window.innerWidth;
                    _this.height = window.innerHeight;
                }else {
                    _this.resize();
                }
            }
        }
    }
</script>

<style scoped>
#frame{
    width:100%;
    height:100%;
}
</style>