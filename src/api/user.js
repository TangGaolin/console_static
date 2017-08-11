import { fetch } from '../utils/fetch';

// 获取用户列表
export function getUserList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/getUserList',
        method: 'post',
        data
    });
}


// 更新用户数据
export function updateUser(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/updateUser',
        method: 'post',
        data
    });
}

// 更新用户用户详情
export function getUserDetail(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/getUserDetail',
        method: 'post',
        data
    });
}

// 获取用户项目数据
export function getUserItemList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/getUserItemList',
        method: 'post',
        data
    });
}


// 获取用户购买数据
export function getOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/getOrderList',
        method: 'post',
        data
    });
}

// 获取用户消耗数据
export function getUseOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/users/getUseOrderList',
        method: 'post',
        data
    });
}

