import * as types from '../types'
import Cookies from 'js-cookie'
import router from '../../router'

const state = {
    userInfo: Cookies.getJSON('userinfo'),
    userRulesNode: "",
    roleNode: "",
    globalConfig: ""
}
const mutations = {
    [types.SET_ACCOUNT] (state, account) {
        state.userInfo = account
        Cookies.set('userinfo', account)
    },
    [types.UNSET_ACCOUNT] (state) {
        state.userInfo = null
        Cookies.remove('userinfo')
    },
    [types.SET_CONFIG] (state, config) {
        state.globalConfig = config
    },
    [types.SET_ROLE_NODE] (state, data, roleNode) {
        state.userRulesNode = data
        state.roleNode = roleNode
    }
}
export default {
    state: state,
    mutations: mutations
}
