<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newAddItemTypeModel = true">新建项目</Button>
        <Modal v-model="newAddItemTypeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增类别</span>
            </p>
            <h3 class="red">* 类别名称:</h3>
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
    import { addItemType } from '../api/item'

    export default {
        props: {
        },
        data () {
            return {
                newAddItemTypeModel: false,
                itemType: {
                    item_type_name: ""
                },
            }
        },
        methods: {
            addItemType() {
                addItemType(this.itemType).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.itemType.item_type_name = ""
                        this.$Message.success("添加成功！")
                        this.$emit('addItemType')
                        this.newAddItemTypeModel = false
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
        }
    }
</script>
