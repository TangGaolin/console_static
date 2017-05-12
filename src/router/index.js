import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
routes: [
    {
    	path: '/',
    	name: 'Login',
    	component: resolve => require(['../pages/account/Login.vue'], resolve)
    },
    {
    	path: '/login',
    	component: resolve => require(['../pages/account/Login.vue'], resolve)
    },
    {
    	path: '/home',
    	component: resolve => require(['../pages/home/Index.vue'], resolve)
    }
  ]
})
