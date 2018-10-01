import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    full: "",
  	//是否展开侧边栏
  	isShow: true,
  	//修改密码模态框
  	dialogFormVisible: false,
    //工具模态框
    dialogVisible: false,
    //页面信息
    msg: "",
    //会话信息
    session:{
       userName:"用户名",
       data:{
           token:""
       }
    },
    hash:"-1",
    profile:{
  	  security:{
  	      exponent:"",
          modulus:""
      }
    },
    //应用程序状态
    application:{
        menuBar:true
    },
    //关于信息
    about:{
        company:{
            name:"广东健康在线信息技术股份有限公司",
            phone:"400-960-1028"
        },
        app:{
            version:"3.1.0"
        },
        db:{
            version:"3.1.0"
        }
    },
    //主题样式
    theme:["theme-header-blue","theme-menuBar-blue","theme-footer-blue"]
    },
    mutations: {
      	showPass(state) {
      		state.dialogFormVisible = !state.dialogFormVisible;
      	},
        showTool(state) {
            state.dialogVisible = !state.dialogVisible;
        },
        //更改菜单栏状态
        changeMenuBar(state,fig) {
            state.application.menuBar = fig===void 0?!state.application.menuBar:fig;
        },
        addtabs(state,value) {
            state.msg = value;
        },
        changeIframeUrl(state,url) {
            state.iframeUrl = url;
        },
        changeTheme(state,theme) {
      	    console.log("change theme is "+theme);
      	    state.theme=theme;
        },
        getusername(state,userName) {
            localStorage.removeItem("userName");
            localStorage.setItem("userName",userName);
            state.session.body.userName = localStorage.getItem("userName");
        },
        profile(state,profile){
            _.merge(state.profile,profile);
        },
        session(state,session){
      	    _.merge(state.session,session);
        },
        hash(state,hash){
      	    state.hash=hash;
        },
        loadStorage(state){
            let lstate=localStorage.getItem("APP-VUEX-STORE-STATE");
            if(lstate){
                _.merge(state,JSON.parse(lstate));
            }
        },
        saveStorage(state){
            localStorage.setItem("APP-VUEX-STORE-STATE",JSON.stringify(state));
        },
        full(state) {
            state.full = "full"
        }

    },
    actions: {

    }
});
