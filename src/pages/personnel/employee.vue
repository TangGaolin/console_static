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
            <h2>员工管理</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Select v-model="searchData.shop_id" size = "large" style="width:100px">
                    <Option v-for="shop in selectStoreData" :value="shop.shop_id" :key="shop.shop_id">
                        {{ shop.shop_name }}
                    </Option>
                </Select>
                <Input v-model="searchData.emp_name_phone" placeholder="员工姓名/手机..." size = "large" style="width: 300px"   @on-enter="getEmployeeList"></Input>
                <Button type="primary" icon="ios-search" size = "large" v-on:click="getEmployeeList">查询</Button>
                <span style="float:right">
                    <AddEmployee :employeeInfo = employeeInfo
                                 :globalConfig = globalConfig
                                 :storeList = storeList
                                 v-on:addEmployee = "getEmployeeList"></AddEmployee>
                    <ImportEmployee :storeList = storeList v-on:addEmployee = "getEmployeeList"></ImportEmployee>
                </span>
            </div>
            <br/>

            <Tag color="blue">员工数量: {{empTotal}}</Tag>
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
                <Col span="7" >
                    <h3 class="red">* 职位:</h3>
                    <Select v-model="currentEmployee.job" style="width:100px">
                        <Option v-for="item in globalConfig.shop_job" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                    <br/>
                </Col>
                <Col span="7" offset="1">
                <h3 class="red">* 门店:</h3>
                <Select v-model="currentEmployee.shop_id" style="width:100px">
                    <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
                </Select>
                </Col>
                <Col span="7" offset="1">
                    <h3 class="red">是否跨店:</h3>
                    <Radio-group v-model="currentEmployee.is_server_all">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </Radio-group>
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

        <Modal v-model="removeEmployeeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>员工删除之后，在前台收银就不会被显示！</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="removeEmployee">删除</Button>
            </div>
        </Modal>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
import { getEmployeeList, addEmployee, updateEmployee,removeEmployee } from '../../api/employee'

export default {
    data() {
        return {
            store: "all",
            storeList: [],
            selectStoreData: [],
            employeeInfo: {
                emp_name: "",
                phone_no: "",
                is_server_all: 0,
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
            removeEmployeeModel: false,
            empColumns: [
                {
                    title: '姓名',
                    key: 'emp_name',
                    render: (h, params) => {
                        return h('div', [
                            h('LinkButton', {
                                props: {
                                    to: "emp-info?emp_id=" + params.row.emp_id + "&shop_id=" + params.row.shop_id,
                                    name: params.row.emp_name,
                                    size: "small",
                                    type: "text"
                                },
                            }, params.row.emp_name)
                        ])
                    }
                },
                {
                    title: '手机',
                    key: 'phone_no'
                },
                {
                    title: '门店',
                    key: 'shop_name',
                    render: (h, params) => {
                        return params.row.shop_name + ""
                    }

                },
                {
                    title: '跨店服务',
                    key: 'is_server_all',
                    render: (h, params) => {
                        return params.row.is_server_all ? "是" : "否"
                    }
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
                shop_id: 0,
                emp_name_phone: "",
                is_server: 1,
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
                    this.selectStoreData = response.data.slice(0)
                    this.selectStoreData.unshift(
                        {
                            "shop_id": 0,
                            "shop_name": "全部门店"
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
            updateEmployee(this.currentEmployee).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getEmployeeList()
                    this.currentEmployee.emp_name = ""
                    this.currentEmployee.phone_no  = ""
                    this.currentEmployee.sex = 1
                    this.currentEmployee.shop_id = ""
                    this.currentEmployee.job = ""
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
            removeEmployee(this.currentEmployee).then((response) => {
                if(0 !== response.statusCode) {
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


