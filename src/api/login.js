import { fetch } from '../utils/fetch';

export function login(params) {
	const data = params
	return fetch({
		url:  process.env.API_ROOT + '/admin/login',
		method: 'post',
		data
	});
}

export function logout(params) {
	const data = params
	return fetch({
		url:  process.env.API_ROOT + '/admin/logout',
		method: 'post',
		data
	});
}

