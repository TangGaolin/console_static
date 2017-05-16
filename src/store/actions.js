import * as types from './types'
import { login } from '../api/login'

export const loginAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> { 
	    login(params).then((response) => {
	    	console.log(response)
	        commit(types.SET_ACCOUNT, response.data); //获得的数据通过mutation，存入store中
	        resolve(response)
	    }).catch((error) => {
	    	console.log(error)
	    })
  })
}