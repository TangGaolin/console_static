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
                            <Option v-for="item in selectItemTypeData" :value="item.item_type_id" :key="item.item_type_id">
                                {{ item.item_type_name }}
                            </Option>
                        </Select>
                        <Input v-model="searchData.item_name" placeholder="项目名称..." size = "large" style="width: 200px"  @on-enter="getItemList"></Input>
                        <Button type="primary" icon="ios-search" size = "large" v-on:click="getItemList">查询</Button>
                        <span style="float:right">
                            <AddItem :itemTypeData = itemTypeData
                                     v-on:addItem  = "getItemList"
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
                    <AddItemType
                            v-on:addItemType = "getItemType"
                    ></AddItemType>
                    <br/><br/>
                    <Row>
                        <Col span="11">
                            <Table border :columns="itemTypeColumns" :data="itemTypeData" style="width: 300px" ></Table>
                        </Col>
                        <Col span="11" offset="1">

                        </Col>
                    </Row>
                </Tab-pane>
            </Tabs>
        </div>

        <Modal v-model="modifyAddItemModel" width="600">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>编辑项目</span>
            </p>

            <Row>
                <Col span="10">
                <h3 class="red">* 卡项名称:</h3>
                <Input v-model="currentItemData.item_name"></Input>
                </Col>
                <Col span="10" offset="1">
                <h3 class="red">* 商品简拼:</h3>
                <Input v-model="currentItemData.pinyin"></Input>
                <p class="red">可能有些生僻字不能识别，需要手动调整！</p>
                </Col>
                <Col span="1">
                <h3 class="red">&nbsp;</h3>
                    <Button type="ghost" @click="getPinyin">生成</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span="11">
                <h3 class="red">* 卡项类别:</h3>
                <Select v-model="currentItemData.item_type">
                    <Option v-for="item in itemTypeData" :value="item.item_type_id" :key="item.item_type_id" >{{ item.item_type_name }}</Option>
                </Select>
                </Col>
                <Col span="11" offset="1">
                <h3 class="red">* 建议次数:</h3>
                <Input v-model="currentItemData.times"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                <h3 class="red">* 单价:</h3>
                <Input v-model="currentItemData.price"></Input>
                </Col>
                <Col span="11" offset="1">
                <h3 class="red">* 手工费:</h3>
                <Input v-model="currentItemData.emp_fee"></Input>
                </Col>
            </Row>
            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="modifyItem" long size="large">
                    确 认 修 改
                </i-button>
            </p>
        </Modal>

        <Modal v-model="modifyItemTypeModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>编辑项目类型</span>
            </p>
            <h3 class="red">* 卡项名称:</h3>
            <Input v-model="currentItemTypeData.item_type_name"></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="modifyItemType" long size="large">
                    确 认 修 改
                </i-button>
            </p>
        </Modal>

    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getItemList, getItemType, modifyItem, modifyItemType} from '../../api/item'

export default {
    data() {
        return {
            itemTypeData:[],
            convertItemTypeObject:{},
            selectItemTypeData:[],
            currentItemData: {
                item_name: "",
                pinyin:"",
                item_type: "",
                price: "",
                times: "",
                emp_fee: ""
            },
            currentItemTypeData: {
                item_type_name: ""
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
                    key: 'item_type_name'
                },
                {
                    title: '单价',
                    key: 'price'
                },
                {
                    title: '推荐次数',
                    key: 'times'
                },
                {
                    title: '手工费',
                    key: 'emp_fee'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showModifyItemModel(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],

            itemTypeColumns:[
                {
                    title: '类型名称',
                    key: 'item_type_name',
                    width: 150
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showModifyItemTypeModel(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            itemList: [],
            itemTotal: 0,

            modifyAddItemModel: false,
            modifyItemTypeModel: false
        }
    },
    created() {
        this.getItemType()
        this.getItemList()
    },
    methods: {
        getItemType() {
            getItemType().then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.itemTypeData = response.data
                    this.selectItemTypeData = response.data.slice(0)
                    this.selectItemTypeData.unshift(
                        {
                            "item_type_id": 0,
                            "item_type_name": "全部"
                        }
                    )
                    this.itemTypeData.forEach((item, index) => {
                        this.convertItemTypeObject[item.item_type_id] = item.item_type_name;
                    })
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
                    this.itemList.forEach((item, index) => {
                        item.item_type_name =  this.convertItemTypeObject[item.item_type]
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        changePage(page){
            this.searchData.page = page
            this.getItemList()
        },

        showModifyItemModel(itemInfo) {
            this.itemList.forEach((item, index) => {
                if(item.item_id === itemInfo.item_id){
                    this.currentItemData = item
                }
            })
            this.modifyAddItemModel = true
        },

        modifyItem() {
            modifyItem(this.currentItemData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.modifyAddItemModel = false
                    this.getItemList()
                    this.$Message.success("修改成功！")
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        showModifyItemTypeModel(itemTypeInfo) {
            this.itemTypeData.forEach((item, index) => {
                if(item.item_type_id === itemTypeInfo.item_type_id){
                    this.currentItemTypeData = item
                }
            })
            this.modifyItemTypeModel = true
        },
        modifyItemType() {
            modifyItemType(this.currentItemTypeData).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.modifyItemTypeModel = false
                    this.getItemType()
                    this.$Message.success("修改成功！")
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        getPinyin() {
            console.log('xxx')
            var pinyin = require("pinyin")
            console.log(this.currentItemData)
            this.currentItemData.pinyin = pinyin(this.currentItemData.item_name, {
                style: pinyin.STYLE_FIRST_LETTER
            }).join('')

            console.log(this.currentItemData.pinyin)
        }
    }
}
</script>


