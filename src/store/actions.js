import * as types from './types'
import { login,logout,getConfig } from '../api/login'
import { getNode } from '../api/account'
import { LoadingBar, Message } from 'iview'

import router from '../router'

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
                let item_1, item_2, item_3
                for(let i = 0,len1 = roleNode.length; i < len1; i++) {
                    item_1 =  roleNode[i]
                    roleNodeObject[item_1.node_id] = item_1.checked
                    for(let j = 0,len2 = item_1.child.length; j < len2; j++) {
                        item_2 =  item_1.child[j]
                        roleNodeObject[item_2.node_id] = item_2.checked
                        for(let x = 0,len3 = item_2.child.length; x < len3; x++) {
                            item_3 = item_2.child[x]
                            roleNodeObject[item_3.node_id] = item_3.checked
                        }
                    }
                }
                router.options.routes.forEach((item_1) => {
                    if(item_1.show) {
                        if(item_1.node_id) {
                            item_1['open'] = roleNodeObject[item_1.node_id]  //赋予开启权限
                        }
                        if(item_1.children) {
                            item_1.children.forEach((item_2) => {
                                if(item_2.show) {
                                    if(item_2.node_id) {
                                        item_2['open'] = roleNodeObject[item_2.node_id]
                                    }
                                }
                            })
                        }
                    }
                })
                commit(types.SET_ROLE_NODE, router.options.routes, roleNodeObject); //获得的数据通过mutation，存入store中
                resolve(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}