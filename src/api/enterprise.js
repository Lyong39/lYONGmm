import instance from "../utils/myHttp";

export function apiGetList({name, page, limit, eid, username, status}) {
    return instance({
        url: '/enterprise/list',
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}

export function apiAddEnt({eid, name, short_name, intro, remark}) {
    return instance({
        url: '/enterprise/add',
        method: 'POST',
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function apiEditEntStatus(id) {
    return instance({
        url: '/enterprise/status',
        method: 'POST',
        data: {
            id
        }
    })
}

export function apiDelEnt(id) {
    return instance({
        url: '/enterprise/remove',
        method: 'POST',
        data: {
            id
        }
    })
}

export function apiUpdateEnt({id, eid, name, tag, short_name, intro, remark, create_time, update_time}) {
    return instance({
        url: '/enterprise/edit',
        method: 'POST',
        data: {
            id,
            eid,
            name,
            tag,
            short_name,
            intro,
            remark,
            create_time,
            update_time
        }
    })
}