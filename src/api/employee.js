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




