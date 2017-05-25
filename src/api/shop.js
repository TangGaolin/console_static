import { fetch } from '../utils/fetch';

export function getStoreList(params) {
	const data = params
	return fetch({
		url:  process.env.API_ROOT + '/store/getStoreList',
		method: 'post',
		data
	});
}


