<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newAddItemModel = true">新建项目</Button>
        <Modal v-model="newAddItemModel" width="600">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增项目</span>
            </p>

            <Row>
                <Col span="10">
                    <h3 class="red">* 卡项名称:</h3>
                    <Input v-model="itemData.item_name"></Input>
                </Col>
                <Col span="10" offset="1">
                    <h3 class="red">* 商品简拼:</h3>
                    <Input v-model="itemData.pinyin"></Input>
                    <p class="red">可能有些生僻字不能识别，需要手动调整！</p>
                </Col>
                <Col span="1">
                    <h3 class="red">&nbsp;</h3>
                    <Button type="ghost" @click="getPinyin">生成</Button>
                </Col>
            </Row>

            <br/>
            <Row>
                <Col span="10">
                    <h3 class="red">* 卡项类别:</h3>
                    <Select v-model="itemData.item_type">
                        <Option v-for="item in itemTypeData" :value="item.item_type_id" :key="item.item_type_id" >{{ item.item_type_name }}</Option>
                    </Select>
                </Col>
                <Col span="10" offset="1">
                    <h3 class="red">* 建议次数:</h3>
                     <Input v-model="itemData.times"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="10">
                    <h3 class="red">* 单价:</h3>
                    <Input v-model="itemData.price"></Input>
                </Col>
                <Col span="10" offset="1">
                    <h3 class="red">* 手工费:</h3>
                    <Input v-model="itemData.emp_fee"></Input>
                </Col>
            </Row>
            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addItem" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addItem } from '../api/item'
    import {getPinyin} from '../utils/utils'
    export default {
        props: {
            itemTypeData: Array,
        },
        data () {
            return {
                newAddItemModel: false,
                itemData: {
                    item_name: "",
                    pinyin:"",
                    item_type: "",
                    price: "",
                    times: "",
                    emp_fee: ""
                }
            }
        },
        methods: {
            addItem() {
                addItem(this.itemData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.itemData = {
                            item_name: "",
                            pinyin:"",
                            item_type: "",
                            price: "",
                            times: "",
                            emp_fee: ""
                        }
                        this.newAddItemModel = false
                        this.$emit('addItem')
                        this.$Message.success("添加成功！")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            getPinyin() {
                this.itemData.pinyin = getPinyin(this.itemData.item_name)
            }
        }
    }
</script>
