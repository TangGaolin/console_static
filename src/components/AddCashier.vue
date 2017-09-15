<template>
    <span>
        <Button type="primary" icon="android-add" @click = "newEmployee = true">新建账户</Button>
        <Modal v-model="newEmployee" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增前台账户</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="employeeInfo.emp_name"></Input>
            <br/><br/>
            <h3 class="red">* 手机:</h3>
            <Input v-model="employeeInfo.phone_no"></Input>
            <br/><br/>
            <h3 class="red">* 门店:</h3>
            <Select v-model="employeeInfo.shop_id">
                <Option v-for="item in storeList" :value="item.shop_id" :key="item">{{ item.shop_name }}</Option>
            </Select>
            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addEmployee" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addCashier } from '../api/employee'
    export default {
        props: {
            globalConfig: Object,
            storeList: Array,
        },
        data () {
            return {
                newEmployee: false,
                employeeInfo: {
                    emp_name: "",
                    phone_no: "",
                    shop_id: "",
                },
            }
        },
        methods: {
            addEmployee: function () {
                addCashier(this.employeeInfo).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.employeeInfo = {
                            emp_name: "",
                            phone_no: "",
                            shop_id: "",
                        }
                        this.$Message.success("添加成功！")
                        this.$emit('addEmployee')
                        this.newEmployee = false
                    }
                }).catch((error) => {
                    console.log(error)
                })

            }
        }
    }
</script>
