import { fetch } from '../utils/fetch'

// 获取门店数据
export function getShopsDataView (params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/storeData/getShopsDataView',
        method: 'post',
        data
    })
}


// 获取门店预约数据情况
export function getOrderTimeList (params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/storeData/getOrderTime',
        method: 'post',
        data
    })
}
