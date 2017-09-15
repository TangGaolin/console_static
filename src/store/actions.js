import * as types from './types'
import { login,logout,getConfig } from '../api/login'
import { getNode } from '../api/account'
import { LoadingBar, Message } from 'iview'

export const loginAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        login(params).then((response) => {
            if(0 !== response.statusCode) {
                Message.error(response.msg)
            }else{
                commit(types.SET_ACCOUNT, response.data); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}

export const logoutAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        logout(params).then((response) => {
            if(0 !== response.statusCode) {
                Message.error(response.msg)
            }else{
                commit(types.UNSET_ACCOUNT); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}


export const getConfigAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        getConfig(params).then((response) => {
            if(0 !== response.statusCode) {
                Message.error(response.msg)
            }else{
                commit(types.SET_CONFIG,response.data); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}


export const getNodeAction = ({commit}, params) => {
    return new Promise((resolve, reject)=> {
        getNode(params).then((response) => {
            if(0 !== response.statusCode) {
                Message.error(response.msg)
            }else{
                let roleNode = response.data
                let roleNodeObject = {}
                roleNode.forEach((item_1) => {
                    roleNodeObject[item_1.node_id] = item_1.checked
                    item_1.child.forEach((item_2) => {
                        roleNodeObject[item_2.node_id] = item_2.checked
                        item_2.child.forEach((item_3) => {
                            roleNodeObject[item_3.node_id] = item_3.checked
                        })
                    })
                })

                commit(types.SET_ROLE_NODE, roleNodeObject); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}