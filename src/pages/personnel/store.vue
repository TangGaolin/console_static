<template>
    <div class="content">
        <div class="content-header">
            <h2>门店管理</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <div>
                    <label style="font-size:16px">
                        <b>门店数据 （总部 + {{ storeList.length -1 }} 个门店）</b>
                    </label>
                    <span style="float:right">
                    <Button icon="android-add" type="success">新增门店</Button>
                    </span>
                </div>
                
            </div>
            <br/>
            <Row>
                <Col span="6" class="card" v-for="item in storeList" :key="item.shop_id">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-home-outline"></Icon>
                            {{item.shop_name}}
                        </p>
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                            <Icon type="edit"></Icon>
                            编辑
                        </a>
                        <a>
                        <ul>
                            <p>电话: {{item.shop_tel}}</p>
                            <p>地址: {{item.address}}</p>
                        </ul>
                        </a>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
export default {
    data() {
        return {
            storeList: [],
        }
    },
    created() {
        this.getStoreList()
    },
    methods: {
        getStoreList() {
            getStoreList().then((response) => {
                if(0 != response.statusCode) {
                    Message.error(response.msg)
                }else{
                    this.storeList = response.data
                }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
    .content-main {
        padding: 40px 40px;
    }
    .sub_title {
        line-height: 40px;
    }
    .card {
        padding-right:20px;
    }
    .card a{
        color: #657180;
    }
    .card a:hover{
        color: #58b957;
    }

</style>

