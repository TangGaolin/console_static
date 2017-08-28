<style scoped>

</style>
<template>
    <div>
        <Table stripe :columns="userColumns" :data="userData"></Table>
        <br/>
        <div style="float: right;">
            <Page :total= userTotal :current= cur_page :page-size = limit @on-change="changePage"></Page>
        </div>
    </div>

</template>


<script>
    import { getUserList } from '../api/user'
    import { getEmpOrderList } from '../api/employee'

    export default {
        props: {
            currentEmpData: Object
        },
        data() {
            return {
                cur_page: 1,
                limit: 15,
                userData:[],
                userTotal: 0,
                userColumns:[
                    {
                        title: '会员姓名',
                        key: 'user_name'
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
                        title: '会员等级',
                        key: 'user_degree',
                        align: 'center',
                        render: (h, params) => {
                            return "A类"
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('LinkButton', {
                                    props: {
                                        to: "../customer-center/customer-info?uid=" + params.row.uid + "&shop_id=" + params.row.shop_id,
                                        name: "查看详情",
                                        size: "small",
                                        type: "ghost"
                                    },
                                }, "查看详情")
                            ])
                        }
                    }
                ]
            }
        },

        created() {
            this.getUserData()
        },
        methods: {
            getUserData() {
                getUserList({
                    emp_id: this.currentEmpData.emp_id,
                    cur_page: this.cur_page,
                    limit: this.limit,
                }).then((response) => {
                    this.userData = response.data.data
                    this.userTotal = response.data.totalSize
                }).catch((error) => {
                    console.log(error)
                })
            },

            changePage(page) {
                this.cur_page = page
                this.getUserData()
            },
        }
    }
</script>


