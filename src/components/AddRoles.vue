<template>
    <span>
        <Button type="primary" icon="android-add" @click = "showModel = true">新增角色</Button>
        <Modal v-model="showModel" width="360">
            <p slot="header" style="color:#f60;text-align:center" class = "red" >
                <Icon type="android-add"></Icon>
                <span>新增角色</span>
            </p>
            <h3 class="red">* 角色名称:</h3>
            <Input v-model= "roleData.role_name" ></Input>

            <p slot="footer" style="text-align: center">
                <i-button type="success" v-on:click="addRoleAction" long size="large">
                    确 认 添 加
                </i-button>
            </p>

        </Modal>
    </span>
</template>
<script>
    import { addRole } from '../api/account'
    export default {
        data () {
            return {
                showModel: false,
                roleData: {
                    role_name: ""
                }
            }
        },
        methods: {
            addRoleAction: function () {
                if(!this.roleData.role_name) {
                    this.$Message.error("角色名称不能为空")
                    return
                }
                addRole(this.roleData).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.$emit('addRole')
                        this.$Message.success('添加成功')
                        this.showModel = false
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>
