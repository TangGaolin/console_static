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
            <h2>管理员账号</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Input v-model="searchData.emp_name_phone" placeholder="姓名/账号..." size = "large" style="width: 300px"   @on-enter="getEmployeeList"></Input>
                <Button type="primary" icon="ios-search" size = "large" v-on:click="getEmployeeList">查询</Button>
                <span style="float:right">
                    <AddAdminAccount v-on:addAccount = "getEmployeeList"></AddAdminAccount>
                </span>
            </div>
            <br/>

            <Table stripe :columns="empColumns" :data="empData"></Table>
            <br/>
            <div style="float: right;">
                <Page :total= empTotal :current= searchData.cur_page @on-change="changePage"></Page>
            </div>
        </div>

    </div>

</template>


<script>
    import { getAccountList,disableAccount } from '../../api/account'

    export default {
        data() {
            return {
                empColumns: [
                    {
                        title: '姓名',
                        key: 'emp_name',
                    },
                    {
                        title: '账号',
                        key: 'phone_no'
                    },
                    {
                        title: '管理角色',
                        key: 'role_name'
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeAccount(params.row)
                                        }
                                    }
                                }, '删除账号')
                            ]);
                        }
                    }
                ],
                empData:[],
                empTotal:0,
                searchData: {
                    emp_name_phone: "",
                    is_admin: 1,
                    cur_page: 1,
                    limit: 10
                }
            }
        },


        created() {
            this.getEmployeeList()
        },
        methods: {

            getEmployeeList() {
                getAccountList(this.searchData).then((response) => {
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
            removeAccount(accountInfo) {
                this.$Modal.confirm({
                    title: '确认删除？',
                    content: '<p>确认删除 <b>'+accountInfo.emp_name+'</b> 这个账户吗？</p>',
                    onOk: () => {
                        disableAccount({
                            emp_id: accountInfo.emp_id
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


