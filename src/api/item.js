import { fetch } from '../utils/fetch';

export function getItemList(params) {
	const data = params
	return fetch({
		url:  process.env.API_ROOT + '/item/getItemList',
		method: 'post',
		data
	});
}

export function getItemType(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/item/getItemType',
        method: 'post',
        data
    });
}


export function addItem(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/item/addItem',
        method: 'post',
        data
    });
}



