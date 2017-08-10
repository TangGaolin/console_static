import { fetch } from '../utils/fetch';


export function getBrandList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/getBrandList',
        method: 'post',
        data
    });
}

export function addGoodBrand(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/addGoodBrand',
        method: 'post',
        data
    });
}

export function updateBrand(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/updateBrand',
        method: 'post',
        data
    });
}

export function getGoodsList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/getGoodsList',
        method: 'post',
        data
    });
}

export function addGood(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/addGood',
        method: 'post',
        data
    });
}


export function updateGood(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/goods/updateGood',
        method: 'post',
        data
    });
}
