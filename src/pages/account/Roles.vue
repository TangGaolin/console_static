<style scoped>
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>角色管理</h2>
        </div>
        <div class="content-main">
            <div class="sub_title">
                <AddRole v-on:addRole  = "getRolesData"
                ></AddRole>
            </div>
            <br/>
            <Row>
                <Col span="11">
                    <Table border :columns="dataColumns" :data="rolesData" style="width: 350px" ></Table>
                </Col>
            </Row>
        </div>

    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getRoleList,disableRole } from '../../api/account'

export default {
    data() {
        return {

            rolesData: [],

            dataColumns:[
                {
                    title: '角色',
                    width: 150,
                    key: 'role_name',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
                                        this.editRbac(params.row)
                                    }
                                }
                            }, '编辑权限'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.delRbac(params.row)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
        }
    },
    created() {
        this.getRolesData()
    },
    methods: {
        getRolesData() {
            getRoleList().then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.rolesData = response.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        editRbac(roleInfo) {
            this.$router.push('edit-roles?role_id='+roleInfo.role_id + '&role_name='+roleInfo.role_name)
        },
        delRbac(roleInfo) {
            this.$Modal.confirm({
                title: '确认删除？',
                content: '<p>确认删除 '+roleInfo.role_name+' 这个角色吗？</p>',
                onOk: () => {
                    disableRole({
                        role_id: roleInfo.role_id
                    }).then((response) => {
                        if(0 !== response.statusCode) {
                            this.$Message.error(response.msg)
                        }else {
                            this.$Message.success("删除成功！")
                            this.getRolesData()
                        }
                    })
                },
                onCancel: () => {

                }
            });
        }
    }
}
</script>


