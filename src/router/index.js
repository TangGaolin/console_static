import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { LoadingBar } from 'iview'

const Login     = resolve       => require(['../pages/account/Login'], resolve)
const Layout    = resolve       => require(['../pages/Layout'], resolve)
const dashboard = resolve       => require(['../pages/dashboard'], resolve)
const storeList = resolve       => require(['../pages/personnel/store'], resolve)
const storeInfo = resolve       => require(['../pages/personnel/storeDetails'], resolve)
const employee  = resolve       => require(['../pages/personnel/employee'], resolve)
const item      = resolve       => require(['../pages/basics/item'], resolve)
const goods     = resolve       => require(['../pages/basics/goods'], resolve)

const cashier   = resolve       => require(['../pages/account/cashier'], resolve)
const user      = resolve       => require(['../pages/users/user'], resolve)
const userTail  = resolve       => require(['../pages/users/userTail'], resolve)
const userInfo  = resolve       => require(['../pages/users/userInfo'], resolve)
const orderCheck = resolve      => require(['../pages/orders/CheckOrder'], resolve)
const orderUseCheck = resolve   => require(['../pages/orders/CheckUseOrder'], resolve)
const empInfo = resolve         => require(['../pages/personnel/empInfo'], resolve)
const ShopData = resolve        => require(['../pages/analysis/ShopData'], resolve)
const Roles = resolve           => require(['../pages/account/Roles'], resolve)
const Authority = resolve       => require(['../pages/account/Authority'], resolve)
const Account = resolve         => require(['../pages/account/Account'], resolve)

const ItemData = resolve        => require(['../pages/analysis/ItemData'], resolve)
const OrderTimeData = resolve   => require(['../pages/analysis/OrderTimeData'], resolve)
const ShopAllMoney = resolve   => require(['../pages/analysis/ShopAllMoney'], resolve)

Vue.use(Router)
const router =  new Router({
    routes: [
        {
            path: '/login',
            component: Login,
            show: false  //是否需要显示
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: '首页',
            show: false,
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
            show: true,
            node_id: 1,
            children: [
                {
                    name: "门店管理",
                    path: "storeManage",
                    node_id: 2,
                    component: storeList,
                    show: true
                },
                {
                    name: "门店详情",
                    path: "storeManage/shoreInfo",
                    component: storeInfo,
                    show: false //未开发
                },
                {
                    name: "职工信息",
                    path: "employee",
                    node_id: 5,
                    show: true,
                    component: employee
                },
                {
                    name: "员工详情",
                    path: "emp-info",
                    component: empInfo,
                    show: false
                },
                {
                    name: "前台账号",
                    path: "cashier",
                    component: cashier,
                    node_id: 10,
                    show: true,
                }
            ]
        },
        {
            path: "/basics",
            component: Layout,
            name: '品项管理',
            node_id: 13,
            icon: 'ios-filing',
            show: true,
            children: [
                {
                    name: "项目管理",
                    path: "items",
                    component: item,
                    node_id: 14,
                    show: true
                },
                {
                    name: "产品管理",
                    path: "goods",
                    component: goods,
                    node_id: 17,
                    show: true
                }
            ]
        },
        {
            path: "/customer-center",
            component: Layout,
            name: '会员中心',
            icon: 'ios-people',
            show: true,
            node_id: 20,
            children: [
                {
                    name: "会员管理",
                    path: "customer",
                    node_id: 21,
                    component: user,
                    show: true
                },
                {
                    name: "会员详情",
                    path: "customer-info",
                    component: userInfo,
                    show: false
                },
                {
                    name: "会员跟踪",
                    path: "analysis",
                    component: userTail,
                    show: false  // 待开发
                }
            ]
        },
        {
            path: "/shop-order",
            component: Layout,
            name: '收银单据',
            icon: 'cash',
            node_id: 25,
            show: true,
            children: [
                {
                    name: "业绩单据",
                    path: "order-check",
                    component: orderCheck,
                    node_id: 26,
                    show: true
                },
                {
                    name: "消耗单据",
                    path: "use-order",
                    component: orderUseCheck,
                    node_id: 28,
                    show: true
                }
            ]
        },
        {
            path: "/analysis",
            component: Layout,
            name: "数据统计",
            icon: 'ios-pie',
            show: true,
            node_id: 30,
            children: [
                {
                    name: "门店数据",
                    path: "storeData",
                    component: ShopData,
                    node_id: 31,
                    show: true
                },
                {
                    name: "门店总览",
                    path: "shopAllMoney",
                    component: ShopAllMoney,
                    node_id: 35,
                    show: true
                },
                {
                    name: "品项数据",
                    path: "itemData",
                    component: ItemData,
                    show: false // 待开发
                },
                {
                    name: "预约统计",
                    path: "OrderTimeData",
                    component: OrderTimeData,
                    node_id: 33,
                    show: true
                }
            ]
        },
        {
            path: "/account",
            component: Layout,
            name: '权限管理',
            icon: 'settings',
            node_id: 1001,
            show: true,
            children: [
                {
                    name: "角色管理",
                    path: "roles",
                    component: Roles,
                    node_id: 1002,
                    show: true
                },
                {
                    name: "编辑角色",
                    path: "edit-roles",
                    component: Authority,
                    show: false
                },
                {
                    name: "账户管理",
                    path: "admin-account",
                    component: Account,
                    node_id: 1006,
                    show: true
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

})

export default router
