<template>
	<div id="app" class="full-container theme-blue">
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import base64 from "./components/tools/base64.js";
    import {PROFILE_URL} from "./components/tools/const-url.js";
    import("./components/compatible/compatible.js");
	export default {
		created(){
		    this.$store.commit("loadStorage");
            this.$http.get(PROFILE_URL.replace("{hash}",this.$store.state.hash)).then((res)=>{
		        if(res.data.hash!=this.$store.state.hash){
                    let profile=JSON.parse(base64.decode(res.data.profile));
                    this.$store.commit("profile",profile);
                    this.$store.commit("hash",res.data.hash);
                    this.$store.commit("saveStorage");
				}
			});
		}
	}
</script>
<style lang="scss">
@import "/scss/App.scss";
</style>
