<template>
    <div id="welcome">
    	welcome
        <!--<iframe id='iframe' :src="iframeUrl" width="100%" :height="iframeHeight" frameborder="0" scrolling="auto"></iframe>-->
    </div>
</template>
<script>
    export default {
        name: "Welcome",
        data() {
        	return {
        		iframeUrl: "",
        		iframeHeight: ""
        	}
        },
        computed: {
        	
        },
        created() {
        	let _this = this;
        	window.bus.$on("change",function(url) {
        		_this.iframeUrl = url;
        		// console.log(_this.iframeUrl)
        	})
        	window.bus.$on("iframeHeight",(ih) => {
        		_this.iframeHeight = ih;
        		// console.log(_this.iframeHeight)
        	})
        },
        mounted() {
        	// console.log(this)
        }
    }
</script>

<style scoped>

</style>