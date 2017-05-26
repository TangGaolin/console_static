<style scoped>
    .content-main {
        padding: 30px 30px;
    }
    .sub_title {
        line-height: 30px;
    }
    .card {
        padding-right:20px;
        padding-top:20px;
    }
    .card ul {
        min-height: 82px;

    }
    .card ul p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden
    }
    .card a{
        color: #657180;
    }
    .card a:hover{
        color: #58b957;
    }

</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>门店管理</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <div>
                    <label style="font-size:16px">
                        <b>门店列表 （{{ storeList.length }} 个门店）</b>
                    </label>
                    <span style="float:right">
                        <Button icon="android-add" type="success"  @click="newStoreModel = true" >新增门店</Button>
                    </span>
                </div>
            </div>

            <Row>
                <Col span="6" class="card" v-for="item in storeList" :key="item.shop_id">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-home-outline"></Icon>
                            {{item.shop_name}}
                        </p>
                        <a href="javascript:void(0);" slot="extra"  @click="editStoreInfo(item.shop_id)" >
                            <Icon type="edit"></Icon>
                            编辑
                        </a>
                        <!-- <a :href="'#/personnel/storeManage/shoreInfo?shop_id=' + item.shop_id"> -->
                            <ul>
                                <p>电话: {{item.shop_tel}}</p>
                                <p>地区: {{item.city.join('/')}}</p>
                                <p>详细地址: {{item.address}}</p>
                            </ul>
                        <!-- </a> -->
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="newStoreModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="android-add"></Icon>
                <span>新增门店</span>
            </p>
            <div>
                <h3>门店名称:</h3>
                <Input v-model="newStore.shop_name"></Input>
                <h3>门店电话:</h3>
                <Input v-model="newStore.shop_tel" ></Input>
                <br/><br/>
                <h3>门店城市:</h3>
                <Cascader  placeholder="城市选择" :data="addressData" v-model="newStore.city"></Cascader>
                <h3>详细地址:</h3>
                <Input placeholder="详细地址" v-model="newStore.address" ></Input>
                <br/>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long @click="addStore">添 加</Button>
            </div>
        </Modal>

        <Modal v-model="editStoreModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="edit"></Icon>
                <span>修改门店信息</span>
            </p>
            <div>
                <h3>门店名称:</h3>
                <Input v-model="currentStore.shop_name"></Input>
                <h3>门店电话:</h3>
                <Input v-model="currentStore.shop_tel" ></Input>
                <br/><br/>
                <h3>门店城市:</h3>
                <Cascader  placeholder="城市选择" :data="addressData" v-model="currentStore.city"></Cascader>
                <h3>详细地址:</h3>
                <Input placeholder="详细地址" v-model="currentStore.address" ></Input>
                <br/>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long @click="updateStoreInfo">确定修改</Button>
            </div>
        </Modal>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList,updateStoreInfo,addStore } from '../../api/shop'
import { division } from '../../utils/division'
export default {
    data() {
        return {
            storeList: [],
            newStoreModel: false,
            editStoreModel: false,
            addressData: division,
            currentStore:{
                shop_name:"",
                shop_tel:"",
                address:"",
                city:[],
            },
            newStore:{
                shop_name:"",
                shop_tel:"",
                address:"",
                city:[],
            }
        }
    },
    filters: {

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
        },
        editStoreInfo(shop_id) {
            this.storeList.forEach((item, index) => {
                if(item.shop_id === shop_id){
                    this.currentStore = item
                }
            })
            this.editStoreModel = true
        },
        updateStoreInfo() {
            updateStoreInfo(this.currentStore).then((response) => {
                if(0 != response.statusCode) {
                    Message.error(response.msg)
                }else{
                    this.editStoreModel = false
                }
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        addStore() {
            addStore(this.newStore).then((response) => {
                if(0 != response.statusCode) {
                    Message.error(response.msg)
                }else{
                    this.getStoreList()
                    this.newStore.shop_name = ""
                    this.newStore.shop_tel  = ""
                    this.newStore.shop_address = ""
                    this.newStore.shop_city = ""
                    this.newStoreModel = false
                }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

