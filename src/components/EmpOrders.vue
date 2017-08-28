<style scoped>

</style>
<template>
    <div>
        <Table stripe :columns="orderColumns" :data="orderData"></Table>
        <br/>
        <div style="float: right;">
            <Page :total= orderTotal :current= cur_page :page-size = limit @on-change="changePage"></Page>
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
                orderData:[],
                orderTotal: 0,

                orderColumns:[
                    {
                        title: '单据名称',
                        key: 'order_desc'
                    },
                    {
                        title: '业绩',
                        width: 80,
                        key: 'yeji'
                    },
                    {
                        title: '消耗',
                        width: 80,
                        key: 'xiaohao',
                    },
                    {
                        title: '手工',
                        width: 80,
                        key: 'fee',
                    },
                    {
                        title: '单据编号',
                        width: 160,
                        key: 'order_id',
                    },
                    {
                        title: '操作时间',
                        key: 'add_time',
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
                                            this.showOrderInfo(params.row)
                                        }
                                    }
                                }, '单据详情'),
                            ])
                        }
                    }
                ]
            }
        },

        created() {
            this.getEmpOrderData()
        },
        methods: {
            getEmpOrderData() {
                getEmpOrderList({
                    emp_id: this.currentEmpData.emp_id,
                    cur_page: this.cur_page,
                    limit: this.limit,
                }).then((response) => {
                    this.orderData = response.data.data
                    this.orderTotal = response.data.totalSize
                }).catch((error) => {
                    console.log(error)
                })
            },
            changePage(page) {
                this.cur_page = page
                this.getEmpOrderData()
            },
            showOrderInfo(order) {
                console.log(order)
            }
        }
    }
</script>


