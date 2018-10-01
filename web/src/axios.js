import axios from 'axios';
import Vue from "vue";
import store from "./store";
import { Loading }from 'element-ui'

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
    // console.log(config)
    let loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: '拼命加载中...',
    })
    // console.log(config)
    return config
}, error => {
    let loading = Loading.service({});
    loading.close(); 
    return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
    let loading = Loading.service({});
    loading.close(); 
    // console.log(response)
    return response
}, error => {
    let loading = Loading.service({});
    loading.close(); 
    return Promise.resolve(error)
})

function checkStatus (response) {
    if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
        // Vue.$store.commit("state.fullscreenLoading");
        return response.data 
    }else if(response.status === 401) {
        Vue.$confirm('会话结束, 请重新登陆?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            Vue.$router.push("/login");
        }).catch(()=>{
            Vue.$router.push("/login");
        })
    }else if(response.status === 404) {
        // Vue.$router.push("/undefined");
        }
    // return { 
    //     code: '404',
    //     message: '网络异常'
    // }
}
function axiosOptions(){
    return {
        method:"post",
        headers:{ "X-Requested-With": "XMLHttpRequest","Content-Type": "application/json","htoken":store.state.session.data.token},
        timeout:10000
    };
}

export default {
    post () {
        // Vue.$store.commit("state.fullscreenLoading");
        let options=axiosOptions();
        if(arguments.length>0){
            if(typeof arguments[0]=="string"){//url、data、headers、timeout
                _.merge(options,{url:arguments[0],data:arguments[1],headers:arguments[2],timeout:arguments[3]});
            }else if(typeof arguments[0]=="object"){//options
                _.merge(options,arguments[0]);
            }
        }
        return axios(options).then((res) => {
            return checkStatus(res)
        });
    },
    form(){
        let options={
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        if(arguments.length>0){
            if(typeof arguments[0]=="string"){//url、data、headers、timeout
                var params = new URLSearchParams();
                for(let i in arguments[1]){
                    params.append(i,arguments[1][i]);
                }
                options=_.merge(axiosOptions(),options,{url:arguments[0],data:params,headers:arguments[2],timeout:arguments[3]});
            }else if(typeof arguments[0]=="object"){//options
                var params = new URLSearchParams();
                for(let i in arguments[0].data){
                    params.append(i,arguments[0].data[i]);
                }
                arguments[0].data=params;
                options=_.merge(axiosOptions(),options,arguments[0]);
            }
        }
        // console.log(options);
        return axios(options).then((res) => {
            return checkStatus(res)
        });
    },
    get () {
        // Vue.$store.commit("state.fullscreenLoading");
        let options={
            method: 'get'
        }
        if(arguments.length>0){
            if(typeof arguments[0]=="string"){//url、data、headers、timeout
                _.merge(options,axiosOptions(),{url:arguments[0],params:arguments[1],headers:arguments[2],timeout:arguments[3]});
            }else if(typeof arguments[0]=="object"){//options
                _.merge(options,axiosOptions(),arguments[0],{params:arguments[0].data});
            }
        }
      return axios(options).then(
            (res) => {
                return checkStatus(res)
            }
      )
    }

}
