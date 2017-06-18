<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newEmployee = true">新建</Button>
        <Modal v-model="newEmployee" width="360">
            <p slot="header" style="text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增员工</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="employeeInfo.emp_name"></Input>
            <h3 class="red">* 手机:</h3>
            <Input v-model="employeeInfo.phone_no"></Input>
            <br/><br/>
            <Row>
                <Col span="7">
                <h3 class="red">* 性别:</h3>
                    <Radio-group v-model="employeeInfo.sex">
                        <Radio label="1">女</Radio>
                        <Radio label="0">男</Radio>
                    </Radio-group>
                </Col>
                <Col span="7" offset="1">
                <h3 class="red">* 职位:</h3>
                    <Select v-model="employeeInfo.job" style="width:100px">
                        <Option v-for="item in globalConfig.shop_job" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                <br/>
                </Col>
                <Col span="7" offset="1">
                <h3 class="red">* 部门:</h3>
                    <Select v-model="employeeInfo.shop_id" style="width:100px">
                        <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
                    </Select>
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
    export default {
        props: {
            globalConfig: Object,
            storeList: Array,
            employeeInfo: Object
        },
        data () {
            return {
                newEmployee: false
            }
        },
        methods: {
            addEmployee: function () {
                this.$emit('addEmployee')
                this.newEmployee = false
            }
        }
    }
</script>
