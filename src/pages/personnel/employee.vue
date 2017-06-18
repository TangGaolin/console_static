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
                    <AddEmployee :employeeInfo = employeeInfo :globalConfig = globalConfig :storeList = storeList v-on:addEmployee = "addEmployee"></AddEmployee>
                    <Button type="primary" icon="share">导入</Button>
                </span>
            </div>
            <br/>
            <Table stripe :columns="empColumns" :data="empData"></Table>
        </div>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
import { getEmployeeList, addEmployee } from '../../api/employee'

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
            newEmployee: false,
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
                    title: '性别',
                    key: 'sex',
                    render: (h, params) =>  {
                        const sexName = params.row.sex ? "女" : "男"
                        return h('span',sexName)
                    }
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
                            }, '离职')
                        ]);
                    }
                }
            ],
            empData:[]
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
            getEmployeeList().then((response) => {
                if(0 !== response.statusCode) {
                    Message.error(response.msg)
                }else{
                    this.empData = response.data.data
                }
            }).catch((error) => {
                    console.log(error)
            })
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
                }
            }).catch((error) => {
                console.log(error)
            })
            console.log(this.employeeInfo)
        }
    }
}
</script>


