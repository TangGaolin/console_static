<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newEmployee = true">新建</Button>
        <Modal v-model="newEmployee" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增员工</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="employeeInfo.emp_name"></Input>
            <h3 class="red">* 手机:</h3>
            <Input v-model="employeeInfo.phone_no"></Input>
            <br/><br/>
            <Row>
                <Col span="7" >
                    <h3 class="red">* 职位:</h3>
                    <Select v-model="employeeInfo.job" style="width:100px">
                        <Option v-for="item in globalConfig.shop_job" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                <br/>
                </Col>
                <Col span="7" offset="1">
                    <h3 class="red">* 门店:</h3>
                    <Select v-model="employeeInfo.shop_id" style="width:100px">
                        <Option v-for="item in storeList" :value="item.shop_id" :key="item.shop_id">{{ item.shop_name }}</Option>
                    </Select>
                </Col>
                <Col span="7" offset="1">
                    <h3 class="red">是否跨店:</h3>
                    <Radio-group v-model="employeeInfo.is_server_all">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </Radio-group>
                </Col>
            </Row>
            <h3>备注:</h3>
            <Input v-model="employeeInfo.remark" type = "textarea"></Input>
            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addEmployee" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addEmployee} from '../api/employee'
    export default {
        props: {
            globalConfig: Object,
            storeList: Array,
        },
        data () {
            return {
                employeeInfo: {
                    emp_name: "",
                    phone_no: "",
                    is_server_all: 0,
                    shop_id: "",
                    job: "",
                    remark: ""
                },
                newEmployee: false
            }
        },
        methods: {
            addEmployee() {
                addEmployee(this.employeeInfo).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.employeeInfo= {
                            emp_name: "",
                            phone_no: "",
                            is_server_all: 0,
                            shop_id: "",
                            job: "",
                            remark: ""
                        }
                        this.$Message.success("添加成功！")
                        this.$emit('addEmployee')
                        this.newEmployee = false
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
        }
    }
</script>
