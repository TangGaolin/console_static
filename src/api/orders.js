import { fetch } from '../utils/fetch'

// 获取消耗列表
export function getUseOrderList (params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/order/getUseOrderList',
        method: 'post',
        data
    })
}

//获取业绩列表
export function getOrderList (params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/order/getOrderList',
        method: 'post',
        data
    })
}
