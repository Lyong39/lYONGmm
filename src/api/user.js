import instance from "../utils/myHttp";


export function apiGetUserList({name,username, email, role_id, page, limit}) {
    return instance({
        url: '/user/list',
        params: {
            name,
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

export function apiAddUser({username, email, phone, role_id, status, remark}) {
    return instance({
        url: '/user/add',
        method: 'POST',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })
}

export function apiChangeStatus(id) {
    return instance({
        url: '/user/status',
        method: 'POST',
        data: {
            id
        }
    })
}

export function apiDelUser(id) {
    return instance({
        url: '/user/remove',
        method: 'POST',
        data: {
            id
        }
    })
}


export function apiUpdateUser({id, username, phone, email, avatar, password, remark, status, role_id}) {
    return instance({
        url: '/user/edit',
        method: 'POST',
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id
        }
    })
}

