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
                    <AddCashier
                                 :globalConfig = globalConfig
                                 :storeList = storeList
                                 v-on:addEmployee = "getEmployeeList"></AddCashier>
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
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
import { getEmployeeList, updateCashier, removeCashier } from '../../api/employee'

export default {
    data() {
        return {
            store: "all",
            storeList: [],
            currentEmployee: {
                emp_name: "",
                phone_no: "",
                shop_id: ""
            },
            updateEmployeeModel: false,
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
                                        this.delCashier(params.row)
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
                    this.storeList.unshift(
                        {
                            shop_id: 0,
                            shop_name: "总部"
                        }
                    )
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
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.currentEmployee = {
                        emp_name: "",
                        phone_no: "",
                        shop_id: ""
                    }
                    this.updateEmployeeModel = false
                    this.$Message.success("修改成功")
                }
            }).catch((error) => {
                console.log(error)
            })
        },


        delCashier(cashierInfo) {
            this.$Modal.confirm({
                title: '确认删除？',
                content: '<p>确认删除 <b>'+cashierInfo.emp_name+'</b> 这个前台账号吗？</p><p>删除之后，无法登录前台收银系统！</p>',
                onOk: () => {
                    removeCashier({
                        emp_id: cashierInfo.emp_id
                    }).then((response) => {
                        if(0 !== response.statusCode) {
                            this.$Message.error(response.msg)
                        }else {
                            this.$Message.success("删除成功！")
                            this.getEmployeeList()
                        }
                    })
                },
                onCancel: () => {

                }
            });
        }
    }
}
</script>


