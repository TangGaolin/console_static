<template>
    <span>
        <Button type="primary" icon="android-add" @click = "showModel = true">增加商品</Button>
        <Modal v-model="showModel" width="600">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增商品</span>
            </p>

            <Row>
                <Col span="10">
                    <h3 class="red">* 商品名称:</h3>
                    <Input v-model="goodData.good_name"></Input>
                </Col>
                <Col span="10" offset="1">
                    <h3 class="red">* 商品简拼:</h3>
                    <Input v-model="goodData.pinyin" ></Input>
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
                    <Select v-model="goodData.brand">
                        <Option v-for="item in brandData" :value="item.good_brand_id" :key="item.good_brand_id" >{{ item.good_brand_name }}</Option>
                    </Select>
                </Col>

                <Col span="10" offset="1">
                    <h3 class="red">* 规格:</h3>
                    <Input v-model="goodData.speci">
                        <Select v-model="goodData.unit" slot="append" style="width: 50px">
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
                    <Input v-model="goodData.cost" ></Input>
                </Col>
                <Col span="10" offset="1">
                    <h3 class="red">* 销售价(元):</h3>
                    <Input v-model="goodData.price" ></Input>
                </Col>
            </Row>
            <br/>
            <h3 class="red"> 描述:</h3>
            <Input v-model="goodData.descri" type="textarea" :rows="4" placeholder="请输入..."></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addGoodData" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addGood } from '../api/good'
    import {getPinyin} from '../utils/utils'
    export default {
        props: {
            brandData: Array
        },
        data () {
            return {
                goodData:{
                    good_name:"",
                    pinyin:"",
                    brand:"",
                    speci:"",
                    unit:"ml",
                    cost:"",
                    price:"",
                    good_details:"",
                    descri:""
                },
                showModel: false
            }
        },
        methods: {
            addGoodData: function () {
                //检验
                if(!this.goodData.good_name) {
                    this.$Message.error('商品名称不能为空')
                    return
                }

                addGood(this.goodData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.$emit('addGood')
                        this.$Message.success('添加成功')
                        this.goodData = {
                            good_name:"",
                            pinyin:"",
                            brand:"",
                            speci:"",
                            unit:"ml",
                            cost:"",
                            price:"",
                            good_details:"",
                            descri:""
                        }
                        this.showModel = false
                    }
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getPinyin() {

                this.goodData.pinyin = getPinyin(this.goodData.good_name)
            }
        }
    }
</script>
