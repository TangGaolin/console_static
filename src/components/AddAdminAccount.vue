<template>
    <span>
        <Button type="primary" icon="android-add" @click = "showModel = true">新建管理员</Button>
        <Modal v-model="showModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增后台管理员</span>
            </p>
            <h3 class="red">* 姓名:</h3>
            <Input v-model="adminData.emp_name"></Input>
            <br/><br/>
            <h3 class="red">* 手机:</h3>
            <Input v-model="adminData.phone_no"></Input>
            <br/><br/>
            <h3 class="red">* 选择角色:</h3>
            <Select v-model="adminData.role_id">
                <Option v-for="role in roleList" :value="role.role_id" :key="role.role_id">{{ role.role_name }}</Option>
            </Select>
            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addAccount" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { getRoleList, openAccount} from '../api/account'
    export default {
        props: {
            globalConfig: Object,
            storeList: Array,
            employeeInfo: Object
        },
        data () {
            return {
                showModel: false,
                roleList: [],
                adminData: {
                    emp_name: "",
                    phone_no: "",
                    role_id: "",
                }
            }
        },
        created() {
            this.getRoleData()
        },
        methods: {
            addAccount: function () {
                if(!this.adminData.emp_name){
                    this.$Message.error('账户名称不能为空')
                    return
                }

                if(!this.adminData.phone_no) {
                    this.$Message.error('电话号码不能为空')
                    return
                }

                if(!this.adminData.role_id) {
                    this.$Message.error('角色不能空')
                    return
                }

                openAccount(this.adminData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.$emit('addAccount')
                        this.showModel = false
                        this.adminData = {
                            emp_name: "",
                            phone_no: "",
                            role_id: "",
                        }
                        this.$Message.success("添加成功")
                    }
                })
            },

            getRoleData() {
                getRoleList().then((response) => {
                    this.roleList = response.data
                }).catch((error) => {
                    console.log(error)
                })
            }

        }
    }
</script>
