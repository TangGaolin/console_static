import { fetch } from '../utils/fetch';

export function login(params) {
	const data = params
	return fetch({
		url: '/login',
		method: 'post',
		data
	});
}