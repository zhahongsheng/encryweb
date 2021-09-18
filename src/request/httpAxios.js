import axios from 'axios';
import { message } from 'antd';
var CancelToken = axios.CancelToken;
var call1 = CancelToken.source();
let loadingRequestCount = 0;
let loadingInstance;

const showLoading = () => {
    if (loadingRequestCount === 0){
        loadingInstance = message.loading('数据请求中！', 0);
    }
    loadingRequestCount++;
}

const hideLoading = () => {
    if (loadingRequestCount <= 0){
        return;
    }
    loadingRequestCount--;
    if(loadingRequestCount == 0){
        if(loadingInstance){
            loadingInstance();
            loadingInstance = null;
        }
    }
}

// 拦截响应reponse，并做一些错误处理
axios.interceptors.response.use(response => {
    return response;
}, (err) => {
    if(axios.isCancel(err)){
        return new Promise(() => {});
    }
    if(err && err.response){
        switch (err.response.status) {
            case 401:
                err.message = '未授权，请登录！'
                break;
                case 403:
                    err.message = '拒绝访问'
                    break
          
                  case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break
          
                  case 408:
                    err.message = '请求超时'
                    break
          
                  case 500:
                    err.message = '服务器内部错误'
                    break
          
                  case 501:
                    err.message = '服务未实现'
                    break
          
                  case 502:
                    err.message = '网关错误'
                    break
          
                  case 503:
                    err.message = '服务不可用'
                    break
          
                  case 504:
                    err.message = '网关超时'
                    break
          
                  case 505:
                    err.message = 'HTTP版本不受支持'
                    break          
            default:
                break;
        }
    }else if(err.response == undefined){
        err.message = '服务不可用'
    }
    return Promise.reject(err)
});

const httpAxios = (apiMoudle, data) =>{
    // console.log('token', sessionStorage.token)
    // console.log('type', sessionStorage.type)
    // if(apiMoudle.url.indexOf('taskmonitor/taskMonitors')>-1){
    //     call1.cancel('Operation canceled by the user.');
    //     call1 = axios.CancelToken.source()
    // }

    let options = {
        url:apiMoudle.url,
        method:apiMoudle.method,
        headers:{
            // 'token':sessionStorage.token,
            // 'type':sessionStorage.type,
            // pragma:'no-cache'
        },
    };

    if (apiMoudle.method !== 'get') {
        // options.headers['Accept'] = 'application/json';
        options.headers['Content-Type'] = 'application/json;charset=UTF-8';
        options.data = data;
    }
    if (apiMoudle.method === 'get'&& data !== undefined && data) {
        options.params = data;
    }

    return new Promise((resolve, reject) => {
        axios(options).then((res) => {
            const apiurl = apiMoudle.url;
            if(res.data&res.data.errcode == 1){
                if(res.status != '401'){
                    message.error(res.data.errmsg);
                }
                reject(res);
            }else{
                resolve(res.data);
            }
            setTimeout(() => {
                hideLoading()
            }, 200);
        }).catch((response) => {
            setTimeout(() => {
                hideLoading()
            }, 200);
            if(response.response && response.response.status != '401'){
                message.error(response.message)
              }
                // if(response.response && response.response.status == '401' && sessionStorage.type=='1'){
                //     let a=location.href.split('#/');
                //     window.top.location.replace(a[0]+'#/login');
                // }else if(response.response && response.response.status == '401' && (sessionStorage.type==undefined||sessionStorage.type=='')){
                //   setTimeout(()=>{
                //     if(window.managmentLogin){
                //       window.parent.location.href = window.managmentLogin;
                //     }else{
                //       window.parent.location.href = 'http://192.168.2.58:8080/console/index.html#/login';
                //     }
                //   },1000);
                // }
                reject(response);
            })
    })
}

export default httpAxios;