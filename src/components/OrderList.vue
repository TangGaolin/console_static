<template>
    <div>
        <Table stripe :columns="columns" :data="userOrders.data"></Table>
        <br/>
        <div style="float: right;">
            <Page :total = userOrders.totalSize :page-size = limit :current = curPage @on-change="changePage"></Page>
        </div>
    </div>



</template>
<script>

    import { getOrderList } from '../api/user'
    import expandRow from './OrderInfoTableRow.vue'

    export default {
        props: {
            currentUserData: Object,
            globalConfig: Object
        },
        data() {
            return {
                userOrders: {},
                curPage:1,
                limit: 10,
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '订单号',
                        key: 'order_id'
                    },
                    {
                        title: '类 型',
                        key: 'order_type',
                        render: (h, params) => {
                            return this.globalConfig.order_types[params.row.order_type]
                        },
                        width: 100
                    },
                    {
                        title: '金 额',
                        key: 'pay_money'
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        render: (h, params) => {
                            return this.globalConfig.order_status[params.row.status]
                        }
                    },
                    {
                        title: '收银员',
                        key: 'cashier_name'
                    },
                    {
                        title: '结算时间',
                        key: 'add_time'
                    }
                ]
            }
        },

        created(){
            this.getUserOderData()
        },
        methods: {
            getUserOderData() {
                getOrderList({
                    uid: this.currentUserData.uid,
                    cur_page: this.curPage,
                    limit: this.limit
                }).then((response) => {
                    if(0 !== response.statusCode){
                        this.$Message.error(response.msg)
                    }else{
                        this.userOrders = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            changePage(page) {
                this.curPage = page
                this.getUserOderData()
            }
        }

    }


</script>
