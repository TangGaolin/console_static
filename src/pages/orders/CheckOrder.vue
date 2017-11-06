<style>

</style>
<template>
    <div class="content">

        <div class="content-header">
            <h2>业绩审核</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <Input v-model="searchData.order_id" placeholder="订单号..."  style="width: 250px;float: left;padding-right: 10px;"   @on-enter="getOrderList"></Input>
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


            <Modal v-model="showModel" width="720">
                <p slot="header" style="color:#f60;text-align:center" class = "red" >
                    <Icon type="edit"></Icon>
                    <span>单据详情</span>
                </p>

                <div>
                    <Row>
                        <Col span="8">
                        <div>
                            <label>单据编号：</label>
                            {{currentOrder.order_id}}
                        </div>
                        </Col>
                        <Col span="6">
                        <div>
                            <label>是否使用余额：</label>
                            {{currentOrder.pay_balance}}
                        </div>
                        </Col>
                        <Col span="6">
                        <div>
                            <label>是否欠款：</label>
                            {{currentOrder.debt}}
                        </div>
                        </Col>
                    </Row>

                    <br/>
                    <h3>项目使用状态</h3>
                    <Table stripe :columns="itemColumns" :data="currentOrderItems"></Table>
                </div>

                <p v-if="cancelFlag" style="font-size: 14px;color: red;text-align: center">该单据不支持撤销操作，请联系技术支持！</p>

                <p slot="footer" style="text-align: center">
                    <Button type="primary" :disabled="cancelFlag" :loading="submitLoading" @click="cancelOrderAction()">
                        <span v-if="!submitLoading">确认撤销</span>
                        <span v-else>Loading...</span>
                    </Button>
                </p>
            </Modal>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getOrderList,  } from '../../api/orders'
    import { getItemListByOrderId, cancelOrderAction  } from '../../api/user'
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
                        width: 85,
                        render: (h, params) => {
                            return  this.shopCovertData[params.row.shop_id]
                        }
                    },
                    {
                        title: '订单号',
                        key: 'order_id',
                    },
                    {
                        title: '会员姓名',
                        key: 'user_name',
                        width: 85,
                        render: (h, params) => {
                            return h('div', [
                                h('LinkButton', {
                                    props: {
                                        to: "../customer-center/customer-info?uid=" + params.row.uid + "&shop_id=" + params.row.shop_id,
                                        name: params.row.user_name,
                                        size: "small",
                                        type: "text"
                                    },
                                }, params.row.emp_name)
                            ])
                        }
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
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            if(1 !== params.row.order_type || 0 === params.row.uid) {
                                return "暂不支持操作"
                            }
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.chooseOrder(params.row)
                                        }
                                    }
                                }, '撤销单据')
                            ]);
                        }
                    }
                ],

                showModel: false,

                currentOrder:{},
                currentOrderItems:[],

                cancelFlag: false,
                itemColumns: [
                    {
                        title: '项目名称',
                        key: 'item_name'
                    },
                    {
                        title: '总次数',
                        key: 'times'
                    },
                    {
                        title: '剩余次数',
                        key: 'used_times',
                        render: (h, params) => {
                            return params.row.times - params.row.used_times
                        }
                    },
                    {
                        title: '剩余金额',
                        key: 'now_money'
                    }
                ],
                submitLoading: false,

            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
            let yestoday = formatDate(new Date(), 'yyyy-MM-dd')
            this.date_range = [yestoday, yestoday]
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
                    formatDate(new Date(this.date_range[1]),'yyyy-MM-dd') + ' 23:59:59',
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
            },

            chooseOrder(orderInfo) {
                this.showModel = true
                this.cancelFlag = false
                this.currentOrder = orderInfo
                if(this.currentOrder.pay_balance > 0 || this.currentOrder.debt > 0) {
                    this.cancelFlag = true
                }
                getItemListByOrderId({order_id:orderInfo.order_id}).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.currentOrderItems = response.data
                        this.currentOrderItems.forEach((item) => {
                            if(item.used_times > 0){
                                this.cancelFlag = true  //若是使用过，暂时不支持撤销
                            }
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            cancelOrderAction() {
                cancelOrderAction({
                    order_id: this.currentOrder.order_id
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.showModel = false
                        this.$Message.success("撤销成功!")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>


