<template>
	<div class="style">
		<el-dialog
	        title= "切换主题颜色"
			:visible.sync= "openColorTool"
	        width="350px"
	        center>
	        <div style="width: 100%;text-align: center">主题色</div>
        	<el-row>
        		<el-col :span='6' v-for="color in colorList">
        			<div class="colorBtn"><span :class="'them-select-'+color" @click="changeColor(color)"></span></div>
        		</el-col>
        	</el-row>
	        <span slot="footer" class="dialog-footer">
	            <el-button @click="openColorTool = false">关闭</el-button>
	            <el-button @click="reset">重置</el-button>
	        </span>
	    </el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
			    color:"theme-1",
				colorList:["theme-1","theme-2","theme-3","theme-4"],
				openColorTool: false
			}
		},
		created() {
			window.bus.$on("showColorPicker",() => {
				this.openColorTool = true
			});
			let storage = window.localStorage;
            let styleColor = storage.getItem("theme");
            this.changeColor(styleColor);

		},
		methods: {
			reset() {
				this.changeColor(this.colorList[0]);
			},
			changeColor(color) {
                if(!this.colorList.includes(color)) {
                    color="theme-1";
                }
                this.color=color;
                this.$store.commit("changeTheme",["theme-header-"+color,"theme-menuBar-"+color,"theme-footer-"+color]);
				this.openColorTool = false;
                let storage = window.localStorage;
                storage.setItem("theme",color);
			}
		},
		mounted() {
		}
	}
</script>
<style lang="scss">
	.style {
		.colorBtn {
			width: 40px;
			height: 40px;
			border: 1px solid #ccc;
			border-radius: 4px;
			margin-top: 25px;
			position: relative;
			top: 0;
			left: 50%;
			transform: translateX(-50%) ;
			span {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 30px;
				height: 30px;
				transform: translateX(-50%) translateY(-50%);
				border: 1px solid #aaa;
				border-radius: 4px;
			}
		}
	}
</style>