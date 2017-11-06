<style scoped>
    .ivu-form-item {
        margin-bottom: 8px;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>门店员工数据</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">

                <DatePicker type="month" size = "large"  placeholder="选择月" style="width: 120px;float: left" v-model = chooseDate :options="options1"></DatePicker>
                &nbsp;&nbsp;
                <Select v-model="searchData.shop_id" size = "large" style="width:200px">
                    <Option v-for="shop in storeList" :value="shop.shop_id" :key="shop.shop_id">
                        {{ shop.shop_name }}
                    </Option>
                </Select>

                <Button type="primary" icon="ios-search" size = "large" v-on:click="getShopEmpDataView">查询</Button>
            </div>

            <br/>
            <div v-if="currentShopEmpData.length > 0">
                <Table stripe :columns="empColumns" :data="currentShopEmpData"></Table>
            </div>
            <br/>

        </div>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList, getShopEmpData } from '../../api/shop'
import { formatDate } from '../../utils/utils'
import EmpDataTableRow from '../../components/EmpDataTableRow.vue'

export default {
    components: {
        EmpDataTableRow
    },
    data() {
        return {
            store: "all",
            storeList: [],
            currentShopEmpData: [],
            chooseDate: new Date(),
            options1: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            searchData: {
                shop_id: 0,
            },
            empColumns:[
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(EmpDataTableRow, {
                            props: {
                                row: params.row.list
                            }
                        })
                    }
                },
                {
                    title: '员工',
                    key: 'emp_name',
                    render: (h, params) => {
                        return h('div', [
                            h('LinkButton', {
                                props: {
                                    to: "../personnel/emp-info?emp_id=" + params.row.emp_id + "&shop_id=" + params.row.shop_id,
                                    name: params.row.emp_name,
                                    size: "small",
                                    type: "text"
                                },
                            }, params.row.emp_name)
                        ])
                    }
                },
                {
                    title: '业绩',
                    key: 'yeji_sum',
                },
                {
                    title: '消耗',
                    key: 'xiaohao_sum',
                },
                {
                    title: '手工',
                    key: 'fee_sum'
                }
            ],
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

        getShopEmpDataView(){
            if(0 == this.searchData.shop_id) {
                this.$Message.error("选择门店！")
                return
            }
            this.searchData.year = formatDate(this.chooseDate, 'yyyy')
            this.searchData.mouth = formatDate(this.chooseDate, 'MM')
            getShopEmpData(this.searchData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.currentShopEmpData = response.data
                }
            }).catch((error) => {
                console.log(error)
            })
        }

    }
}
</script>


