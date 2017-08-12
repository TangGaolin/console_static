<template>
    <span>
        <Button type="primary" icon="share" @click = "showModel = true">导入</Button>
        <Modal v-model="showModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>导入员工</span>
            </p>

            <p>
                <label>导入模板：</label>
                <a :href= userModel >点击下载</a>
                (要求按照模板格式填写)
            </p>
            <br/>
            <Select v-model="shopData.shop_id" placeholder="选择门店...">
                <Option v-for="item in storeList" :value = item.shop_id :key = item.shop_id>{{ item.shop_name }}</Option>
            </Select>
            <br/><br/>


            <Upload
                type="drag"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['xls','xlsx']"
                :max-size="512"
                :action= actionUrl
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :data = shopData
            >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>

            <p slot="footer" style="text-align: center">
            </p>
        </Modal>
    </span>
</template>
<script>
    export default {
        props: {
            storeList: Array
        },
        data () {
            return {
                showModel: false,
                shopData: {
                    shop_id: ""
                },
                actionUrl: process.env.API_ROOT + '/users/importUser',
                userModel: "http://orsx11cb5.bkt.clouddn.com/%E4%BC%9A%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%E8%A1%A8.xlsx"
            }
        },
        methods: {
            handleSuccess (res, file) {
                this.$Message.success("导入成功！")
                this.showModel = false
                this.$emit('addUser')
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {

            }
        }
    }
</script>
