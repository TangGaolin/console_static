<style>

</style>
<template>
    <div class="content">

        <div class="content-header">
            <h2>门店数据</h2>
        </div>

        <div class="content-main">

            <h2 style="text-align: center">整体数据</h2>
            <div class="sub_title">

                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="selectStoreIds" @on-change = "checkAllGroupChange"  size="large">
                    <Checkbox size="large" v-for="store in storeList" :key="store.shop_id" :label="store.shop_id">{{store.shop_name}} </Checkbox>
                </CheckboxGroup>
                <br/>
                <DatePicker type="month" placeholder="选择月" style="width: 200px;float: left" v-model = chooseDate :options="options1"></DatePicker>
                &nbsp;&nbsp;
                <Button type="primary" icon="ios-search" v-on:click="getShopsData">查询</Button>
            </div>

            <p>&nbsp;</p>
            <ShopsDataView
                :countShopsData = countShopsData
            ></ShopsDataView>

            <h2 style="text-align: center">单店数据</h2>
            <p style="text-align: center">
                <RadioGroup v-model="currentShop" type="button" @on-change="changeCurrentShop">
                    <Radio v-for="shop_id in selectStoreIds"  :key="shop_id" :label="shop_id">{{ shopCovertData[shop_id] }}</Radio>
                </RadioGroup>
            </p>
            <br/><br/>
            <ShopDataView
                    :shopData = currentShopData
            ></ShopDataView>


        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getShopsDataView } from '../../api/analysis'
    import { getStoreList } from '../../api/shop'
    import { formatDate } from '../../utils/utils'
    export default {
        data() {
            return {
                chooseDate: new Date(),
                selectStoreIds:[],
                storeList:[],
                indeterminate: false,
                checkAll:true,
                searchData: {
                    shop_id: 0,
                    select_date: "",
                    cur_page: 1,
                    limit: 15
                },
                shopCovertData:{},

                options1: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                shopsData: [], //接口返回的数据
                countShopsData: [], //计算门店数据

                currentShop: 0,
                currentShopData:[]
            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
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

                        this.storeList.forEach((item) => {
                            this.shopCovertData[item.shop_id] = item.shop_name
                            this.selectStoreIds.push(item.shop_id)
                        })
                        this.getShopsData()
                        this.currentShop = this.storeList[0].shop_id

                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                    this.storeList.forEach((item) => {
                        this.shopCovertData[item.shop_id] = item.shop_name
                        this.selectStoreIds.push(item.shop_id)
                    })
                } else {
                    this.selectStoreIds = []
                }
            },

            checkAllGroupChange (data) {
                if (data.length === this.storeList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },

            getShopsData() {
                getShopsDataView({
                    shop_ids:this.selectStoreIds,
                    year: formatDate(this.chooseDate,"yyyy"),
                    mouth: formatDate(this.chooseDate,"MM")
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.shopsData = response.data
                        this.countShopsData = []
                        for (var shop_id in this.shopsData) {
                            var shopDta = {
                                shop: this.shopCovertData[shop_id],
                                yeji: 0,
                                xiaohao: 0
                            }
                            this.shopsData[shop_id].forEach((item) => {
                                shopDta.yeji += Number(item.yeji)
                                shopDta.xiaohao += Number(item.xiaohao)
                            })
                            this.countShopsData.push(shopDta)
                        }
                        this.changeCurrentShop()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            changeCurrentShop() {
                if(!this.shopsData[this.currentShop]) {
                    return
                }
                this.currentShopData = this.shopsData[this.currentShop]
            }

        }
    }
</script>


