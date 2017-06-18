import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {LoadingBar} from 'iview'


const Login = resolve => require(['../pages/account/Login'], resolve)
const Layout = resolve => require(['../pages/Layout'], resolve)
const dashboard = resolve => require(['../pages/dashboard'], resolve)
const storeList = resolve => require(['../pages/personnel/store'], resolve)
const storeInfo = resolve => require(['../pages/personnel/storeDetails'], resolve)
const employee = resolve => require(['../pages/personnel/employee'], resolve)

Vue.use(Router)
const router =  new Router({
    routes: [
        {
            path: '/login',
            component: Login,
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: '首页',
            hidden: true,
            children: [
                {
                    path: 'dashboard', 
                    component: dashboard
                }
            ]
        },
        {
            path: "/personnel",
            component: Layout,
            name: '人事行政',
            icon: 'person-stalker',
            hidden: false,
            children: [
                {
                    name: "门店管理",
                    path: "storeManage",
                    component: storeList
                },
                {
                    name: "门店详情",
                    path: "storeManage/shoreInfo",
                    component: storeInfo,
                    hidden: true
                },
                {
                    name: "职工信息",
                    path: "employee",
                    component: employee
                }
            ]
        },
        {
            path: "/analysis",
            component: Layout,
            name: '数据统计',
            icon: 'ios-pie',
            hidden: false,
            children: [
                {
                    name: "门店数据",
                    path: "storeData",
                    component: dashboard
                },
                {
                    name: "品项数据",
                    path: "employee",
                    component: dashboard
                }
            ]
        },
        {
            path: "/operation",
            component: Layout,
            name: '运营管理',
            icon: 'ios-filing',
            hidden: false,
            children: [
                {
                    name: "项目信息",
                    path: "items",
                    component: dashboard
                },
                {
                    name: "商品信息",
                    path: "goods",
                    component: dashboard
                }
            ]
        }
    ]
})


router.beforeEach((to, from, next) => {
    var account = store.state.account

    if(to.path === '/login') {
        return next()
    }

    if (typeof(account.userInfo) === "undefined") {
        return next(`/login?redirect=${encodeURIComponent(to.path)}`)
    }else {
        return next()
    }

})

router.afterEach(transition => {

});

export default router
