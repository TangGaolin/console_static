import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {LoadingBar} from 'iview'

const Login     = resolve       => require(['../pages/account/Login'], resolve)
const Layout    = resolve       => require(['../pages/Layout'], resolve)
const dashboard = resolve       => require(['../pages/dashboard'], resolve)
const storeList = resolve       => require(['../pages/personnel/store'], resolve)
const storeInfo = resolve       => require(['../pages/personnel/storeDetails'], resolve)
const employee  = resolve       => require(['../pages/personnel/employee'], resolve)
const item      = resolve       => require(['../pages/basics/item'], resolve)
const goods     = resolve       => require(['../pages/basics/goods'], resolve)

const cashier = resolve        => require(['../pages/account/cashier'], resolve)
const user = resolve           => require(['../pages/users/user'], resolve)
const userTail = resolve       => require(['../pages/users/userTail'], resolve)
const userInfo = resolve     => require(['../pages/users/userInfo'], resolve)

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
            name: '门店职工',
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
                },
                {
                    name: "前台账号",
                    path: "cashier",
                    component: cashier
                }
            ]
        },
        {
            path: "/basics",
            component: Layout,
            name: '项目商品',
            icon: 'ios-filing',
            hidden: false,
            children: [
                {
                    name: "项目管理",
                    path: "items",
                    component: item
                },
                {
                    name: "商品管理",
                    path: "goods",
                    component: goods
                }
            ]
        },
        {
            path: "/customer-center",
            component: Layout,
            name: '会员中心',
            icon: 'ios-people',
            hidden: false,
            children: [
                {
                    name: "会员管理",
                    path: "customer",
                    component: user
                },
                {
                    name: "会员详情",
                    path: "customer-info",
                    component: userInfo,
                    hidden: true
                },
                {
                    name: "会员跟踪",
                    path: "analysis",
                    component: userTail
                }
            ]
        },
        {
            path: "/shop-order",
            component: Layout,
            name: '店务收银',
            icon: 'cash',
            hidden: false,
            children: [
                {
                    name: "单据审核",
                    path: "order-check",
                    component: item
                },
                {
                    name: "订单管理",
                    path: "order-manager",
                    component: dashboard
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
            path: "/account",
            component: Layout,
            name: '权限管理',
            icon: 'settings',
            hidden: false,
            children: [
                {
                    name: "角色管理",
                    path: "roles",
                    component: dashboard
                },
                {
                    name: "账户管理",
                    path: "admin-account",
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
