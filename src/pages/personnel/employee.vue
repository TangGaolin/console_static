<style scoped>
    .content-main {
        padding: 40px 40px;
    }
    .red {
        color:#f60;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>员工信息</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <Input v-model="employee" placeholder="员工姓名/手机..." size = "large" style="width: 300px"></Input>
                <Button type="primary" icon="ios-search" size = "large">搜索</Button>
                <span style="float:right">
                    <Button type="primary" icon="android-add" @click = "newEmployee = true">新建</Button>
                    <Button type="primary" icon="share">导入</Button>
                </span>
            </div>
            <br/>
        </div>
        <Modal v-model="newEmployee" width="400">
            <p slot="header" class = "red" style="text-align:center">
                <Icon type="android-add"></Icon>
                <span>新增员工</span>
            </p>
            <div>
                <h3 class="red">姓名:</h3>
                <Input v-model="employeeInfo.emp_name"></Input>
                <h3 class="red">手机:</h3>
                <Input v-model="employeeInfo.phone_no"></Input>
                <br/><br/>
                <Row>
                    <Col span="7">  
                        <h3 class="red">性别:</h3>
                        <Radio-group v-model="employeeInfo.sex">
                            <Radio label="1">女</Radio>
                            <Radio label="0">男</Radio>
                        </Radio-group>
                    </Col>
                    <Col span="7" offset="1">
                        <h3 class="red">职位:</h3>
                        <Select v-model="employeeInfo.job" style="width:100px">
                            <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                        <br/>
                    </Col>
                    <Col span="7" offset="1">
                        <h3 class="red">部门:</h3>
                        <Select v-model="employeeInfo.shop" style="width:100px">
                            <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
                        </Select>
                    </Col>
                </Row>
                <h3>备注:</h3>
                <Input v-model="employeeInfo.sex" type = "textarea"></Input>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="success" @click="newEmployee"> 确 认 添 加 </Button>
            </div>
        </Modal>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
export default {
    data() {
        return {
            store: "all",
            storeList: [],
            employee:"",
            employeeInfo: {
                emp_name: "",
                phone_no: "",
                sex: 1,
                shop: "",
                job: ""
            },
            newEmployee: false,
            cityList:[{
                label: "总部",
                value: "0",
            }]
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
        },
        newEmployee() {

        }
    }
}
</script>


