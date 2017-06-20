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
            <h2>员工信息</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Input v-model="employee" placeholder="员工姓名/手机..." size = "large" style="width: 300px"></Input>
                <Button type="primary" icon="ios-search" size = "large">搜索</Button>
                <span style="float:right">
                    <AddEmployee :employeeInfo = employeeInfo
                                 :globalConfig = globalConfig
                                 :storeList = storeList
                                 v-on:addEmployee = "addEmployee"></AddEmployee>
                    <ImportEmployee :storeList = storeList></ImportEmployee>
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
                <span>编辑员工</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="currentEmployee.emp_name"></Input>
            <h3 class="red">* 手机:</h3>
            <Input v-model="currentEmployee.phone_no"></Input>
            <br/><br/>
            <Row>
                <Col span="7">
                <h3 class="red">* 性别:</h3>
                <Radio-group v-model="currentEmployee.sex">
                    <Radio label="1">女</Radio>
                    <Radio label="0">男</Radio>
                </Radio-group>
                </Col>
                <Col span="7" offset="1">
                <h3 class="red">* 职位:</h3>
                <Select v-model="currentEmployee.job" style="width:100px">
                    <Option v-for="item in globalConfig.shop_job" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <br/>
                </Col>
                <Col span="7" offset="1">
                <h3 class="red">* 部门:</h3>
                <Select v-model="currentEmployee.shop_id" style="width:100px">
                    <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
                </Select>
                </Col>
            </Row>
            <h3>备注:</h3>
            <Input v-model="currentEmployee.remark" type = "textarea"></Input>
            <p slot="footer" style="text-align: center">
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
import { getEmployeeList, addEmployee, updateEmployee } from '../../api/employee'

export default {
    data() {
        return {
            store: "all",
            storeList: [],
            employee:"",
            employeeInfo: {
                emp_name: "",
                phone_no: "",
                sex: 1,
                shop_id: "",
                job: "",
                remark: ""
            },
            currentEmployee: {
                emp_name: "",
                phone_no: "",
                sex: 1,
                shop_id: "",
                job: "",
                remark: ""
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
                    title: '部门',
                    key: 'shop_name'
                },
                {
                    title: '职位',
                    key: 'job'
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
            addEmployee(this.employeeInfo).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.employeeInfo.emp_name = ""
                    this.employeeInfo.phone_no  = ""
                    this.employeeInfo.shop_address = ""
                    this.employeeInfo.sex = 1
                    this.employeeInfo.shop_id = ""
                    this.employeeInfo.job = ""
                    this.employeeInfo.remark = ""
                    this.$Message.success("添加成功！")
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        modifyEmployee(emp_info) {
            console.log(emp_info)
            this.empData.forEach((item, index) => {
                if(item.emp_id === emp_info.emp_id){
                    this.currentEmployee = item
                }
            })
            this.updateEmployeeModel = true
        },
        updateEmployee() {
            updateEmployee(this.currentEmployee).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.currentEmployee.emp_name = ""
                    this.currentEmployee.phone_no  = ""
                    this.currentEmployee.shop_address = ""
                    this.currentEmployee.sex = 1
                    this.currentEmployee.shop_id = ""
                    this.currentEmployee.job = ""
                    this.updateEmployeeModel = false
                    this.$Message.success("修改成功")
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>


