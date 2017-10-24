<style>

</style>
<template>
    <div class="content">

        <div class="content-header">
            <h2>业绩审核</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <Input v-model="searchData.order_id" placeholder="订单号..."  style="width: 250px;float: left;padding-right: 10px;"   @on-enter=""></Input>
                <DatePicker type="daterange" :options="options2" format="yyyy/MM/dd"placeholder="选择日期" style="width: 200px" v-model = date_range></DatePicker>
                &nbsp;&nbsp;
                <Select v-model="searchData.shop_id" style="width:100px">
                    <Option v-for="shop in selectStoreData" :value="shop.shop_id" :key="shop.shop_id">
                        {{ shop.shop_name }}
                    </Option>
                </Select>
                &nbsp;&nbsp;
                <Button type="primary" icon="ios-search" v-on:click="getOrderList">查询</Button>
            </div>

            <br/>
            <div v-if="orderList.data">
                <Tag color="blue">单据数量: {{orderList.totalSize}}</Tag>
                <Tag color="red">业绩总和: {{orderList.totalMoney}}</Tag>
                <Table stripe :columns="columns_yeji" :data="orderList.data"></Table>
                <br/>
                <div style="float: right;">
                    <Page :total = orderList.totalSize :page-size = searchData.limit :current = searchData.cur_page @on-change="changePage"></Page>
                </div>
            </div>
            <p>&nbsp;</p>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getOrderList } from '../../api/orders'
    import { getStoreList } from '../../api/shop'
    import { formatDate } from '../../utils/utils'
    import OrderInfoTableRow from '../../components/OrderInfoTableRow.vue'
    export default {
        components: { OrderInfoTableRow },
        data() {
            return {
                selectStoreData:[],
                date_range: [],
                storeList:[],
                searchData: {
                    order_id:"",
                    date_range:[],
                    shop_id: 0,
                    cur_page: 1,
                    limit: 15
                },
                shopCovertData:{},
                orderList:[],
                options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                columns_yeji:[
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(OrderInfoTableRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '门店',
                        key: 'shop_id',
                        render: (h, params) => {
                            return  this.shopCovertData[params.row.shop_id]
                        }
                    },
                    {
                        title: '订单号',
                        key: 'order_id'
                    },
                    {
                        title: '会员姓名',
                        key: 'user_name',
                        width: 85

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
                        key: 'pay_money',
                        width: 90
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        render: (h, params) => {
                            return this.globalConfig.order_status[params.row.status]
                        },
                        width: 85,
                    },
                    {
                        title: '收银员',
                        width: 80,
                        key: 'cashier_name'
                    },
                    {
                        title: '结算时间',
                        key: 'add_time'
                    }
                ],

            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
            let yestoday = new Date()
            yestoday.setTime(yestoday.getTime() - 1000 * 60 * 60 * 24)
            this.date_range = [
                formatDate(yestoday, 'yyyy-MM-dd'),
                formatDate(new Date(), 'yyyy-MM-dd')
            ]
            this.getStoreData()
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
                        this.storeList.forEach((item) => {
                            this.shopCovertData[item.shop_id] = item.shop_name
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            getOrderList() {
                this.searchData.date_range = [
                    formatDate(new Date(this.date_range[0]),'yyyy-MM-dd'),
                    formatDate(new Date(this.date_range[1]),'yyyy-MM-dd'),
                ]
                getOrderList(this.searchData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.orderList = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            changePage(page) {
                this.searchData.cur_page = page
                this.getOrderList()
            }
        }
    }
</script>


