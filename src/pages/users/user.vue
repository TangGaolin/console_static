<style scoped>

</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>会员管理</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Select v-model="searchData.shop_id" size = "large" style="width:100px">
                    <Option v-for="shop in selectStoreData" :value="shop.shop_id" :key="shop.shop_id">
                        {{ shop.shop_name }}
                    </Option>
                </Select>
                <Input v-model="searchData.user_name_phone" placeholder="会员姓名/手机..." size = "large" style="width: 300px"   @on-enter="getUserData"></Input>
                <Button type="primary" icon="ios-search" size = "large" v-on:click="getUserData">查询</Button>
                <span style="float:right">
                    <AddUser
                             :globalConfig = globalConfig
                             :storeList = storeList
                             v-on:addUser = "getUserData"
                    ></AddUser>
                    <ImportUser :storeList = storeList
                                v-on:addUser = "getUserData"></ImportUser>
                </span>
            </div>
            <br/>

            <Table stripe :columns="userColumns" :data="userData"></Table>
            <br/>
            <div style="float: right;">
                <Page :total= userTotal :current= searchData.cur_page :page-size = searchData.limit @on-change="changePage"></Page>
            </div>
        </div>

        <Modal  v-model="userModel">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>编辑会员</span>
            </p>

            <h3 class="red">用户名称:</h3>
            <Input v-model= currentUser.user_name disabled></Input>

            <h3 class="red">用户手机:</h3>
            <Input v-model="currentUser.phone_no" disabled></Input>

            <h3 class="red">选择门店:</h3>
            <Select v-model="currentUser.shop_id" @on-change="getEmpList">
                <Option v-for="shop in storeList" :value="shop.shop_id" :key="shop.shop_id" >{{ shop.shop_name }}</Option>
            </Select>

            <h3 class="red">选择美容师:</h3>
            <Select v-model="currentUser.emp_id">
                <Option v-for="emp in emps" :value="emp.emp_id" :key="emp.emp_id" >{{ emp.emp_name }}</Option>
            </Select>
            <h3 class="red">备注:</h3>
            <Input v-model="currentUser.remark" type="textarea"></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="updateUserData()" long size="large">
                    确 认 修 改
                </i-button>
            </p>
        </Modal>


    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
import { getUserList,updateUser } from '../../api/user'
import { getEmployeeList } from '../../api/employee'

export default {
    data() {
        return {
            userModel: false,
            storeList: [],
            selectStoreData: [],
            searchData: {
                shop_id: 0,
                user_name_phone: "",
                cur_page: 1,
                limit: 15
            },

            userData:[],
            userTotal: 0,
            userColumns:[
                {
                    title: '会员姓名',
                    key: 'user_name',

                },
                {
                    title: '手机号',
                    key: 'phone_no'
                },
                {
                    title: '门店',
                    key: 'shop_name',
                },
                {
                    title: '美容师',
                    key: 'emp_name'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
                                        this.modifyUserAction(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('LinkButton', {
                                props: {
                                    to: "customer-info?uid=" + params.row.uid + "&shop_id=" + params.row.shop_id,
                                    name: "查看详情",
                                    size: "small",
                                    type: "ghost"
                                },
                            }, "查看详情")
                        ])
                    }
                }
            ],
            currentUser:{},
            emps:[],
            loading: false,
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'globalConfig'
        ])
    },

    created() {
        this.getStoreData()
        this.getUserData()
    },
    methods: {
        getStoreData() {
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

        getUserData() {
            getUserList(this.searchData).then((response) => {
                this.userData = response.data.data
                this.userTotal = response.data.totalSize
            }).catch((error) => {
               console.log(error)
            })
        },

        modifyUserAction(userInfo) {
            this.emps = []
            this.userData.forEach((item, index) => {
                if(item.uid === userInfo.uid){
                    this.currentUser = item
                }
            })

            this.userModel = true
        },

        changePage(page) {
            this.searchData.cur_page = page
            this.getUserData()
        },
        getEmpList() {
            this.emps = []
            getEmployeeList({
                shop_id: this.currentUser.shop_id,
                cur_page:1,
                limit: 1000
            }).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.emps = response.data.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        updateUserData() {
            updateUser({
                uid: this.currentUser.uid,
                emp_id: this.currentUser.emp_id,
                shop_id: this.currentUser.shop_id,
                remark: this.currentUser.remark,
            }).then((response) => {
                if(0 !== response.statusCode){
                    this.$Message.error(response.msg)
                }else{
                    this.$Message.success("修改成功")
                    this.userModel = false
                    this.getUserData()
                }
            }).catch((error) => {
                console.log(error)
            })


        }

    }
}
</script>


