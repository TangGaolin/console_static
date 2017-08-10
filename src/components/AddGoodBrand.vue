<template>
    <span>
        <Button type="primary" icon="android-add" @click = "showModel = true">新建品牌</Button>
        <Modal v-model="showModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增产品品牌</span>
            </p>
            <h3 class="red">* 品牌名称:</h3>
            <Input v-model= "brandData.good_brand_name" ></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addBrand" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addGoodBrand } from '../api/good'
    export default {
        data () {
            return {
                showModel: false,
                brandData: {
                    good_brand_name: ""
                }
            }
        },
        methods: {
            addBrand: function () {
                if(!this.brandData.good_brand_name) {
                    this.$Message.error("品牌名称不能为空")
                    return
                }
                addGoodBrand(this.brandData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.$emit('addBrand')
                        this.$Message.success('添加成功')
                        this.showModel = false
                    }
                }).catch((error) => {
                    console.log(error)
                })


            }
        }
    }
</script>
