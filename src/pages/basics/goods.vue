<style scoped>
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>商品管理</h2>
        </div>
        <div class="content-main">
            <Tabs value="name1">
                <Tab-pane label="产品列表" name="name1">
                    <div class="sub_title">
                        <Select v-model="searchData.good_brand_id" size = "large" style="width:100px">
                            <Option v-for="item in selectBrandData" :value="item.good_brand_id" :key="item.good_brand_id">
                                {{ item.good_brand_name }}
                            </Option>
                        </Select>
                        <Input v-model="searchData.good_name" placeholder="商品名称..." size = "large" style="width: 200px"  @keyup.13="getGoodsData"></Input>
                        <Button type="primary" icon="ios-search" size = "large" v-on:click="getGoodsData">查询</Button>
                        <span style="float:right">
                                <AddGood :brandData = brandData
                                         v-on:addGood  = "getGoodsData"
                                ></AddGood>
                        </span>
                    </div>
                    <br/>
                    <Tag color="blue">产品数量: {{goodTotal}}</Tag>
                    <Table stripe :columns="goodColumns" :data="goodList"></Table>
                    <br/>
                    <div style="float: right;">
                        <Page :total= goodTotal :page-size = searchData.limit :current= searchData.cur_page @on-change="changePage"></Page>
                    </div>
                </Tab-pane>

                <Tab-pane label="品牌管理" name="name2">
                    <div class="sub_title">
                        <AddGoodBrand v-on:addBrand  = "getBrandData"
                        ></AddGoodBrand>
                    </div>
                    <br/>
                    <Row>
                        <Col span="11">
                            <Table border :columns="brandDataColumns" :data="brandData" style="width: 300px" ></Table>
                        </Col>
                        <Col span="11" offset="1">

                        </Col>
                    </Row>
                </Tab-pane>
            </Tabs>
        </div>


        <Modal v-model="goodModel" width="600">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>修改商品</span>
            </p>
            <Row>
                <Col span="10">
                <h3 class="red">* 商品名称:</h3>
                    <Input v-model="currentGoodData.good_name"></Input>
                </Col>
                <Col span="10" offset="1">
                <h3 class="red">* 商品简拼:</h3>
                    <Input v-model="currentGoodData.pinyin" ></Input>
                <p class="red">可能有些生僻字不能识别，需要手动调整！</p>
                </Col>
                <Col span="1">
                <h3 class="red">&nbsp;</h3>
                <Button type="ghost" @click="getPinyin">生成</Button>
                </Col>
            </Row>

            <Row>
                <Col span="10">
                <h3 class="red">* 选择品牌:</h3>
                <Select v-model="currentGoodData.brand">
                    <Option v-for="item in brandData" :value="item.good_brand_id" :key="item.good_brand_id" >{{ item.good_brand_name }}</Option>
                </Select>
                </Col>

                <Col span="10" offset="1">
                <h3 class="red">* 规格:</h3>
                <Input v-model="currentGoodData.speci">
                <Select v-model="currentGoodData.unit" slot="append" style="width: 50px">
                    <Option value="ml">ml</Option>
                    <Option value="L">L</Option>
                    <Option value="片">片</Option>
                    <Option value="g">g</Option>
                    <Option value="盒">盒</Option>
                </Select>
                </Input>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span="10">
                <h3 class="red">* 成本价(元):</h3>
                <Input v-model="currentGoodData.cost" ></Input>
                </Col>
                <Col span="10" offset="1">
                <h3 class="red">* 销售价(元):</h3>
                <Input v-model="currentGoodData.price" ></Input>
                </Col>
            </Row>
            <br/>
            <h3 class="red"> 描述:</h3>
            <Input v-model="currentGoodData.descri" type="textarea" :rows="4" placeholder="请输入..."></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="updateGoodData()" long size="large">
                    确 认 修 改
                </i-button>
            </p>

        </Modal>

        <Modal v-model="brandModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>编辑品牌</span>
            </p>
            <h3 class="red">* 品牌名称:</h3>
            <Input v-model="currentBrandData.good_brand_name"></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="modifyBrand()" long size="large">
                    确 认 修 改
                </i-button>
            </p>
        </Modal>

    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getBrandList, updateBrand, getGoodsList, updateGood } from '../../api/good'

import { getPinyin } from '../../utils/utils'

export default {
    data() {
        return {
            brandData: [],
            selectBrandData: [],
            brandModel: false,
            goodModel: false,
            brandDataColumns:[
                {
                    title: '品牌名称',
                    key: 'good_brand_name',
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
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showModifyBrandModel(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],

            currentBrandData:{},
            currentGoodData :{},

            searchData:{
                good_name: "",
                good_brand_id: 0,
                cur_page: 1,
                limit: 20,
            },

            goodList: [],
            goodTotal: 0,

            convertBrandObject: {},

            goodColumns: [
                {
                    title: '产品名称',
                    key: 'good_name'
                },
                {
                    title: '品牌',
                    key: 'good_brand_name'
                },
                {
                    title: '规格',
                    key: 'speci',
                    render: (h, params) => {
                        return params.row.speci + params.row.unit
                    }
                },
                {
                    title: '成本(元)',
                    key: 'cost'
                },
                {
                    title: '销售价(元)',
                    key: 'price'
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
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showModifyGoodModel(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],

        }
    },
    created() {
        this.getBrandData()
        this.getGoodsData()
    },
    methods: {
        //获取品牌数据
        getBrandData() {
            getBrandList().then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.brandData = response.data
                    this.selectBrandData = response.data.slice(0)
                    this.selectBrandData.unshift(
                        {
                            "good_brand_id": 0,
                            "good_brand_name": "全部"
                        }
                    )
                    this.brandData.forEach((item) => {
                        this.convertBrandObject[item.good_brand_id] = item.good_brand_name
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        //编辑品牌
        showModifyBrandModel(brand) {
            this.brandData.forEach((item, index) => {
                if(item.good_brand_id === brand.good_brand_id){
                    this.currentBrandData = item
                }
            })
            this.brandModel = true
        },

        //确认编辑品牌信息
        modifyBrand() {
            if(!this.currentBrandData.good_brand_name) {
                this.$Message.error("品牌名称不能为空")
                return
            }
            updateBrand(this.currentBrandData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.$Message.success("修改成功！")
                    this.brandModel = false
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        //获取商品列表
        getGoodsData() {
            getGoodsList(this.searchData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.goodList = response.data.data
                    this.goodTotal = response.data.totalSize
                    this.goodList.forEach((item, index) => {
                        item.good_brand_name =  this.convertBrandObject[item.brand]
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        //显示修改商品
        showModifyGoodModel(good_info) {
            this.goodList.forEach((item, index) => {
                if(item.good_id === good_info.good_id){
                    this.currentGoodData = item
                }
            })
            this.goodModel = true
        },

        updateGoodData() {
            updateGood(this.currentGoodData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.$Message.success("修改成功！")
                    this.goodModel = false
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        changePage(page) {
            this.searchData.cur_page = page
            this.getGoodsData()
        },

        getPinyin() {
            this.currentGoodData.pinyin = getPinyin(this.currentGoodData.good_name)
        }
    }
}
</script>


