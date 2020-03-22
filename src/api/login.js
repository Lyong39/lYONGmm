import axios from 'axios';

// 创建实例时设置配置的默认值（默认基地址）
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL
});

export function apiLogin({phone, password, code}) {
    return instance({
        url: '/login',
        method: 'POST',
        data: {
            phone,
            password,
            code
        },
        // 携带cookie跨域
        withCredentials: true
    });
}