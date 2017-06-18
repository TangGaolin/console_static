import * as types from '../types'
import Cookies from 'js-cookie'
import router from '../../router'

const state = {
    userInfo: Cookies.getJSON('userinfo'),
    userRulesNode: router.options.routes,
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
}
export default {
    state: state,
    mutations: mutations
}
