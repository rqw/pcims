import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from './views/Home.vue';
import Frame from './components/home/Frame.vue';
import session from "./components/tools/untils.js";
import store from "./store.js";
Vue.use(Router);
// 需要缓存并验证
const meta = {
    requiresAuth: true,
    keepAlive: true
};
let url=location.href.substring(0,location.href.indexOf("/", 9))+"/";
export var rmt = {
    "sysmgr/user": {Frame,src:"html/sysmgr/user.html"},
    "sysmgr/orgParentCode": {Frame,src:"html/sysmgr/orgParentCode.html"},
    "sysmgr/role": {Frame,src:"html/sysmgr/role.html"},
    "sysmgr/organization": {Frame,src:"html/sysmgr/organization.html"},
    "sysmgr/orgDeviceNum": {Frame,src:"html/sysmgr/orgDeviceNum.html"},
    "sysmgr/user": {Frame,src:"html/sysmgr/user.html"},
    "sysmgr/user": {Frame,src:"html/sysmgr/user.html"},
    // "sysmgr/dataDictionary": {Frame,src:"html/sysmgr/dataDictionary.html"},
    "sysmgr/configuration": {Frame,src:"html/sysmgr/configuration.html"},
    // "sysdev/cache": {Frame,src:"html/sysdev/cache.html"},
    "sysmgr/sysmgrParameter": {Frame,src:"html/sysmgr/sysmgrParameter.html"},
    "sysmgr/uploadfile": {Frame,src:"html/sysmgr/uploadfile.html"},
    // "sysmgr/jurisdiction": {Frame,src:"html/sysmgr/jurisdiction.html"},
    "sysmgr/resource": {Frame,src:"html/sysmgr/resource.html"}
};
let router = {
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {path: "/", name: "login", component: Login},
        {
            path: "/home", component: Home,children: [
                {
                    path: "welcome",
                    name: "welcome",
                    meta,
                    component: () => import(/* webpackChunkName: "Welcome" */ './views/Welcome.vue')
                },
				{
					path: "sysmgr/jurisdiction",
					name: "jurisdiction",
                    meta,
					component: () => import(/* webpackChunkName: "jurisdiction" */ './views/sysmgr/jurisdiction.vue')
				},
                {
                    path: "sysmgr/dataDictionary",
                    name: "dataDictionary",
                    meta,
                    component: () => import(/* webpackChunkName: "dataDictionary" */ './views/sysmgr/dataDictionary.vue')
                },
                {
                    path: "sysmgr/configuration",
                    name: "configuration",
                    meta,
                    component: () => import(/* webpackChunkName: "configuration" */ './views/sysmgr/configuration.vue')
                },
                {
                    path: "sysdev/cache",
                    name: "cache",
                    meta,
                    component: () => import(/* webpackChunkName: "cache" */ './views/sysmgr/cache.vue')
                }
                
            ]

        },
        
    ]
};
let rs = router.routes[1].children;
for (let i in rmt) {
    let val = rmt[i];
    var r={
        path: i,
        name: i,
        component: val
    };
    if(r.component.Frame){
        r.props={};
        r.props.src=url+r.component.src;
        r.component={extends:r.component.Frame};
    }
    rs.push(r);
}
let routers = new Router(router);
/**
 * 路由拦截
 * 权限验证
 */
routers.beforeEach((to, from, next) => {
    if(from.query.mode =="full" || to.query.mode =="full") {
        store.commit("full")
    }
    if (to.matched.some(r => r.meta.requiresAuth)) {
        let token = session.token.getToken('token')
        if (token && token !== 'null') {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    } else {
        next()
    }
})
export default routers;
