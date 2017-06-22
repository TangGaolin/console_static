<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newAddItemTypeModel = true">新建项目</Button>
        <Modal v-model="newAddItemTypeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增类别</span>
            </p>
            <h3 class="red">* 卡项名称:</h3>
            <Input v-model= "itemType.item_type_name" ></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addItemType" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    export default {
        props: {
            itemType: Object,
        },
        data () {
            return {
                newAddItemTypeModel: false
            }
        },
        methods: {
            addItemType: function () {
                this.$emit('addItemType')
                this.newAddItemTypeModel = false
            }
        }
    }
</script>
