import { fetch } from '../utils/fetch';


export function addRole(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/addRole',
        method: 'post',
        data
    });
}

export function disableRole(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/disableRole',
        method: 'post',
        data
    });
}


export function getRoleList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/getRoleList',
        method: 'post',
        data
    });
}

export function getNode(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/getNode',
        method: 'post',
        data
    });
}

export function roleAccess(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/roleAccess',
        method: 'post',
        data
    });
}

export function modifyRoleAccess(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/modifyRoleAccess',
        method: 'post',
        data
    });
}

export function openAccount(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/openAccount',
        method: 'post',
        data
    });
}

export function getAccountList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/getAccountList',
        method: 'post',
        data
    });
}

export function disableAccount(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/admin/disableAccount',
        method: 'post',
        data
    });
}