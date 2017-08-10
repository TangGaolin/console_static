<style scoped>
    .content-main {
        padding: 40px 40px;
    }
    .ivu-form-item {
        margin-bottom: 8px;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>收银账户管理</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Input v-model="searchData.emp_name_phone" placeholder="姓名/手机..." size = "large" style="width: 300px" @on-enter="getEmployeeList"></Input>
                <Button type="primary" icon="ios-search" size = "large" v-on:click="getEmployeeList">查询</Button>
                <span style="float:right">
                    <AddCashier :employeeInfo = employeeInfo
                                 :globalConfig = globalConfig
                                 :storeList = storeList
                                 v-on:addEmployee = "addEmployee"></AddCashier>
                </span>
            </div>
            <br/>
            <Table stripe :columns="empColumns" :data="empData"></Table>
            <br/>
            <div style="float: right;">
                <Page :total= empTotal :current= searchData.cur_page @on-change="changePage"></Page>
            </div>
        </div>

        <Modal v-model="updateEmployeeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="edit"></Icon>
                <span>更新前台账户</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="currentEmployee.emp_name"></Input>
            <h3 class="red">* 手机:</h3>
            <Input v-model="currentEmployee.phone_no"></Input>
            <h3 class="red">* 部门:</h3>
            <Select v-model="currentEmployee.shop_id">
                <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
            </Select>
            <p slot="footer">
                <i-button type="success" v-on:click="updateEmployee" long size="large">
                    确 认 修 改
                </i-button>
            </p>

        </Modal>


        <Modal v-model="removeEmployeeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>禁用之后，该账户就无法登陆前台收银系统！</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer" >
                <Button type="warning" size="large" long  @click="removeEmployee">禁 用</Button>
            </div>
        </Modal>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
import { getEmployeeList, addCashier, updateCashier, removeCashier } from '../../api/employee'

export default {
    data() {
        return {
            store: "all",
            storeList: [],
            employeeInfo: {
                emp_name: "",
                phone_no: "",
                shop_id: "",
            },
            currentEmployee: {
                emp_name: "",
                phone_no: "",
                shop_id: ""
            },
            updateEmployeeModel: false,
            removeEmployeeModel: false,
            empColumns: [
                {
                    title: '姓名',
                    key: 'emp_name'
                },
                {
                    title: '手机',
                    key: 'phone_no'
                },
                {
                    title: '门店',
                    key: 'shop_name'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modifyEmployee(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.showRemoveEmployee(params.row)
                                    }
                                }
                            }, '删除')


                        ]);
                    }
                }
            ],
            empData:[],
            empTotal:0,
            searchData: {
                emp_name_phone: "",
                is_cashier: 1,
                cur_page: 1,
                limit: 10
            }
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'globalConfig'
        ])
    },
    filters: {
        sexName(sex) {
            return globalConfig.sex[sex];
        }
    },
    created() {
        this.getStoreList()
        this.getEmployeeList()
    },
    methods: {
        getStoreList() {
            getStoreList().then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.storeList = response.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getEmployeeList() {
            getEmployeeList(this.searchData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.empData = response.data.data
                    this.empTotal = response.data.totalSize
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        changePage(page) {
            this.searchData.cur_page = page
            this.empData = this.getEmployeeList()
        },
        addEmployee() {
            addCashier(this.employeeInfo).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.employeeInfo.emp_name = ""
                    this.employeeInfo.phone_no  = ""
                    this.employeeInfo.shop_id = ""
                    this.$Message.success("添加成功！")
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        modifyEmployee(emp_info) {
            this.empData.forEach((item, index) => {
                if(item.emp_id === emp_info.emp_id){
                    this.currentEmployee = item
                }
            })
            this.updateEmployeeModel = true
        },
        updateEmployee() {
            updateCashier(this.currentEmployee).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.currentEmployee.emp_name = ""
                    this.currentEmployee.phone_no  = ""
                    this.currentEmployee.shop_id = ""
                    this.updateEmployeeModel = false
                    this.$Message.success("修改成功")
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        showRemoveEmployee(emp_info) {
            this.empData.forEach((item, index) => {
                if(item.emp_id === emp_info.emp_id){
                    this.currentEmployee = item
                }
            })
            this.removeEmployeeModel = true
        },

        removeEmployee() {
            removeCashier(this.currentEmployee).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.removeEmployeeModel = false
                    this.$Message.success("删除成功")
                }
            }).catch((error) => {
                console.log(error)
            })
        },
    }
}
</script>


