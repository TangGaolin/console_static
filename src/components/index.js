import Vue from 'vue'


//添加员工组件
Vue.component('AdminAccount', require('./AdminAccount.vue'))
Vue.component('AddEmployee', require('./AddEmployee.vue'))
Vue.component('ImportEmployee', require('./ImportEmployee.vue'))
Vue.component('AddItem', require('./AddItem.vue'))
Vue.component('AddItemType', require('./AddItemType.vue'))
Vue.component('AddCashier', require('./AddCashier.vue'))
Vue.component('AddGood', require('./AddGood.vue'))
Vue.component('AddGoodBrand', require('./AddGoodBrand.vue'))

Vue.component('UserInfo', require('./UserInfo.vue'))
Vue.component('ItemList', require('./ItemList.vue'))
Vue.component('OrderList', require('./OrderList.vue'))

Vue.component('UseOrderList', require('./UseOrderList.vue'))
Vue.component('LinkButton', require('./LinkButton.vue'))

Vue.component('AddUser', require('./AddUser.vue'))
Vue.component('ImportUser', require('./ImportUser.vue'))

Vue.component('EmpUsers', require('./EmpUsers.vue'))
Vue.component('EmpOrders', require('./EmpOrders.vue'))

Vue.component('ShopsDataView', require('./ShopsDataView.vue'))
Vue.component('ShopDataView', require('./ShopDataView.vue'))

Vue.component('AddRole', require('./AddRoles.vue'))
Vue.component('AddAdminAccount', require('./AddAdminAccount.vue'))


