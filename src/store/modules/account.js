import * as types from '../types'
import Cookies from 'js-cookie'
import router from '../../router'

const state = {
    userInfo: Cookies.getJSON('userinfo'),
    userRulesNode: router.options.routes
}
const mutations = {
    [types.SET_ACCOUNT] (state, account) {
        state.userInfo = account.userInfo
        state.roles = account.roles
        Cookies.set('userinfo', account.userInfo)
    }
}
export default {
    state: state,
    mutations: mutations
}
