<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newAddItemModel = true">新建项目</Button>
        <Modal v-model="newAddItemModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增类别</span>
            </p>
            <h3 class="red">* 卡项名称:</h3>
            <Input v-model="itemData.item_name"></Input>
            <br/><br/>
            <Row>
                <Col span="11">
                    <h3 class="red">* 卡项类别:</h3>
                    <Select v-model="itemData.item_type">
                        <Option v-for="item in itemTypeData" :value="item.item_type_id" :key="item.item_type_id" v-if="0 != item.item_type_id">{{ item.item_type_name }}</Option>
                    </Select>
                </Col>
                <Col span="11" offset="1">
                    <h3 class="red">* 建议次数:</h3>
                     <Input v-model="itemData.times"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                    <h3 class="red">* 单价:</h3>
                    <Input v-model="itemData.price"></Input>
                </Col>
                <Col span="11" offset="1">
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
    export default {
        props: {
            itemTypeData: Array,
            itemData: Object,
        },
        data () {
            return {
                newAddItemModel: false
            }
        },
        methods: {
            addItem: function () {
                this.$emit('addItem')
                this.newAddItemModel = false
            }
        }
    }
</script>
