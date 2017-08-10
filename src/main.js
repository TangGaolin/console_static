import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import '../mytheme/index.less'
// import './mock/index.js'  // 使用api请求时请将此行注释，不然将被mock拦截!!

import './components'
Vue.use(iView)


Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
