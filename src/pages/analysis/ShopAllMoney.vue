<style scoped>
    .ivu-form-item {
        margin-bottom: 8px;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>门店金额总览</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <Select v-model="searchData.shop_id" size = "large" style="width:200px">
                    <Option v-for="shop in storeList" :value="shop.shop_id" :key="shop.shop_id">
                        {{ shop.shop_name }}
                    </Option>
                </Select>

                <Button type="primary" icon="ios-search" size = "large" v-on:click="getShopDataAllMoney">查询</Button>
            </div>
            <br/>
            <div v-if="currentStoreData.all_balance">
                <Row style="padding: 20px;color: #ffffff">
                    <Col span = "8">
                        <Card style="background-color: #19be6b">
                            <div style="text-align:center">
                                <h4>会员卡剩余</h4>
                                <h1>
                                    <Icon type="social-usd"></Icon>
                                    {{ currentStoreData.all_balance }}
                                </h1>
                            </div>
                        </Card>
                    </Col>
                    <Col span = "8" offset="1">
                        <Card style="background-color: #ff9900">
                            <div style="text-align:center">
                                <h4>产品卡剩余</h4>
                                <h1>
                                    <Icon type="android-cart"></Icon>
                                    {{ currentStoreData.all_good_money }}
                                </h1>

                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row style="padding: 20px;color: #ffffff">
                    <Col span = "8">
                        <Card style="background-color: #2baee9">
                            <div style="text-align:center">
                                <h4>项目卡剩余</h4>
                                <h1>
                                    <Icon type="android-hand"></Icon>
                                    {{ currentStoreData.all_now_money }}
                                </h1>
                            </div>
                        </Card>
                    </Col>

                    <Col span = "8" offset="1">
                        <Card style="background-color: #ed3f14">
                            <div style="text-align:center">
                                <h4>欠款</h4>
                                <h1>
                                    <Icon type="document-text"></Icon>
                                    {{ currentStoreData.all_debt }}
                                </h1>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row style="padding: 20px;color: #ffffff">
                    <Col span = "16">
                    <vePie :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></vePie>
                    </Col>
                </Row>
            </div>
        </div>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList, getStoreAllMoney } from '../../api/shop'
import vePie from 'v-charts/lib/pie'
export default {
    components: {
        vePie
    },
    data() {
        return {
            store: "all",
            storeList: [],
            selectStoreData: {},
            currentStoreData:{},
            searchData: {
                shop_id: 0,
            },
            chartData: {},
            chartSettings:{}
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'globalConfig'
        ])
    },
    created() {
        this.getStoreList()
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

        getShopDataAllMoney(){
            if(0 == this.searchData.shop_id) {
                this.$Message.error("选择门店！")
                return
            }
            if(this.selectStoreData[this.searchData.shop_id]) {
                console.log(this.selectStoreData[this.searchData.shop_id])
                this.currentStoreData = this.selectStoreData[this.searchData.shop_id]
                this.setChartData()
                return
            }

            getStoreAllMoney(this.searchData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.currentStoreData = this.selectStoreData[this.searchData.shop_id] = response.data
                    this.setChartData()
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        setChartData() {
            this.chartData = {
                columns: ['col1', 'col2'],
                rows: [
                    { 'col1': '剩余会员卡', 'col2': this.currentStoreData.all_balance },
                    { 'col1': '剩余产品金额', 'col2': this.currentStoreData.all_good_money },
                    { 'col1': '剩余卡项金额', 'col2': this.currentStoreData.all_now_money },
                    { 'col1': '欠款', 'col2': this.currentStoreData.all_debt}
                ]
            }
            this.chartSettings = {
                dimension: 'col1',
                metrics: 'col2',
                dataType: 'KMB',
                selectedMode: 'single',
                hoverAnimation: false,
                radius: 100,
                offsetY: 200
            }
        }

    }
}
</script>


