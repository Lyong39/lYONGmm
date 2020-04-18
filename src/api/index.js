import axios from 'axios';
import {getToken} from "../utils/myToken";


// 创建实例时设置配置的默认值（默认基地址）
let instance = axios.create({
    baseURL: process.env.VUE_APP_ONLINEURL,
    withCredentials: true
});

export function apiInfo() {
    return instance({
        url: '/info',
        headers: {
            token: getToken()
        }
    })
}

export function apiLogout() {
    return instance({
        url: '/logout',
        headers: {
            token: getToken()
        }
    })

}