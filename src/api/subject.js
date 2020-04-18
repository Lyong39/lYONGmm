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


export function apiGetSubject({name, page, limit, rid, username, status}) {
    return instance({
        url: '/subject/list',
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}

export function apiChangeStatus(id) {
    return instance({
        url: '/subject/status',
        method: 'POST',
        data: {
            id
        }
    })
}

export function apiAddSubject({rid, name, short_name, intro, remark}) {
    return instance({
        url: '/subject/add',
        method: 'POST',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function apiEditSubject({rid, name, short_name, intro, remark, id, create_time, update_time}) {
    return instance({
        url: '/subject/edit',
        method: 'POST',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark,
            id,
            create_time,
            update_time
        }
    })
}

export function apiDelSubject(id) {
    return instance({
        url: '/subject/remove',
        method: 'POST',
        data: {
            id
        }
    })
}