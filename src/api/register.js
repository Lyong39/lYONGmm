import axios from 'axios';

// 获取手机验证码
export function apiGetCode({code, phone}) {
    return axios({
        url: process.env.VUE_APP_ONLINEURL + '/sendsms',
        method: 'POST',
        data: {
            code: code,
            phone: phone
        },
        // 携带cookie跨域
        withCredentials: true
    })
}

// 用户注册
export function apiRegister({username, phone, email, avatar, password, rcode}) {
    return axios({
        url: process.env.VUE_APP_ONLINEURL + '/register',
        method: 'POST',
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}