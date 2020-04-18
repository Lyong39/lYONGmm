import axios from 'axios';
import {getToken} from "../utils/myToken";


// 创建实例时设置配置的默认值（默认基地址）
let instance = axios.create({
    baseURL: process.env.VUE_APP_ONLINEURL,
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;