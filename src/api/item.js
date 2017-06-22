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

export function addItemType(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/item/addItemType',
        method: 'post',
        data
    });
}

export function modifyItem(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/item/modifyItem',
        method: 'post',
        data
    });
}

export function modifyItemType(params) {
    const data = params
    return fetch({
        url:  process.env.API_ROOT + '/item/modifyItemType',
        method: 'post',
        data
    });
}




