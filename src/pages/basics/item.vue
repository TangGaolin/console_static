<style scoped>
    .content-main {
        padding: 40px 40px;
    }
    .ivu-form-item {
        margin-bottom: 8px;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>项目管理</h2>
        </div>
        <div class="content-main">

            <Tabs value="name1">
                <Tab-pane label="项目列表" name="name1">
                    <div class="sub_title">
                        <Select v-model="searchData.item_type" size = "large" style="width:100px">
                            <Option v-for="item in itemTypeData" :value="item.item_type_id">
                                {{ item.item_type_name }}
                            </Option>
                        </Select>
                        <Input v-model="searchData.item_name" placeholder="项目名称..." size = "large" style="width: 200px"  @keyup.13="getItemList"></Input>
                        <Button type="primary" icon="ios-search" size = "large" v-on:click="getItemList">搜索</Button>
                        <span style="float:right">
                            <AddItem :itemTypeData = itemTypeData
                                     :itemData  = itemData
                                     v-on:addItem  = "addItem"
                            ></AddItem>
                        </span>
                    </div>
                    <br/>
                    <Table stripe :columns="itemColumns" :data="itemList"></Table>
                    <br/>
                    <div style="float: right;">
                        <Page :total= itemTotal :current= "1" @on-change="changePage"></Page>
                    </div>
                </Tab-pane>
                
                <Tab-pane label="项目分类" name="name2">



                </Tab-pane>
            </Tabs>

        </div>

    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getItemList, getItemType,addItem } from '../../api/item'

export default {
    data() {
        return {
            itemType:0,
            itemTypeData:[],
            itemData: {
                item_name: "",
                item_type: "",
                price: "",
                times: "",
                emp_fee: ""
            },
            searchData:{
                item_name: "",
                item_type: 0,
                cur_page: 1,
                limit: 20,
            },
            itemColumns: [
                {
                    title: '项目名称',
                    key: 'item_name'
                },
                {
                    title: '项目类型',
                    key: 'item_type'
                },
                {
                    title: '单价',
                    key: 'price'
                },
                {
                    title: '建议次数',
                    key: 'times'
                },
                {
                    title: '手工费',
                    key: 'emp_fee'
                },
            ],
            itemList: [],
            itemTotal: 0,
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'globalConfig'
        ])
    },
    created() {
        this.getItemList()
        this.getItemType()
    },
    methods: {
        getItemType() {
            getItemType().then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.itemTypeData = response.data
                    this.itemTypeData.unshift(
                        {
                            "item_type_id": 0,
                            "item_type_name": "全部"
                        }
                    )
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getItemList() {
            getItemList(this.searchData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.itemList = response.data.data
                    this.itemTotal = response.data.totalSize
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        changePage(){

        },
        addItem() {
            addItem(this.itemData).then((response) => {
                if(0 != response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.getItemList()
                    this.itemData.item_name = ""
                    this.itemData.item_type  = ""
                    this.itemData.price = ""
                    this.itemData.times = ""
                    this.itemData.emp_fee = ""
                    this.$Message.success("添加成功！")
                }
            }).catch((error) => {
                console.log(error)
            })

        }
    }
}
</script>


