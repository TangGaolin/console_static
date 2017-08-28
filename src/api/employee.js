import { fetch } from '../utils/fetch';

export function getEmployeeList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/getEmployeeList',
        method: 'post',
        data
    });
}

export function addEmployee(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/addEmployee',
        method: 'post',
        data
    });
}

export function updateEmployee(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/updateEmployee',
        method: 'post',
        data
    });
}

export function removeEmployee(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/removeEmployee',
        method: 'post',
        data
    });
}



export function addCashier(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/addCashier',
        method: 'post',
        data
    });
}

export function updateCashier(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/updateCashier',
        method: 'post',
        data
    });
}

export function removeCashier(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/removeCashier',
        method: 'post',
        data
    });
}

export function getEmployeeInfo(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/getEmployeeInfo',
        method: 'post',
        data
    });
}

export function getEmpDataView(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/getEmpDataView',
        method: 'post',
        data
    });
}

export function getEmpOrderList(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/employee/getEmpOrderList',
        method: 'post',
        data
    });
}