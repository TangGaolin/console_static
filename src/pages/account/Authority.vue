<style scoped>
    .ivu-checkbox-wrapper{
        font-size: 14px;
        font-weight: 400;
    }

</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>编辑角色权限 - {{this.$route.query.role_name}}</h2>
        </div>
        <div class="content-main" style="font-size: 18px">
            <Row v-for="firsetNode in nodeData" :key="firsetNode.node_id">
                <Row v-for="secNode in firsetNode.child" :key="secNode.node_id">
                    <Checkbox v-model="secNode.checked" @on-change="checkSecNode(secNode)"> &nbsp;<b>{{ secNode.title }}</b>
                    </Checkbox>
                    <div style="border-top: 1px solid #ccc;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox v-for="thirdNode in secNode.child" :key = "thirdNode.node_id" v-model="thirdNode.checked"  @on-change="checkThirdNode(secNode)">
                            &nbsp;{{ thirdNode.title }}
                        </Checkbox>
                    </div>

                    <div style="padding-bottom:6px;margin-bottom:6px;">
                    </div>
                </Row>
            </Row>
        </div>

        <p slot="footer" style="text-align: center">
            <Button type="primary" icon="checkmark-round" @click="saveRoleData">保 存</Button>
            <Button type="ghost" icon="chevron-left" @click="cancel" style="margin-left: 50px;">取 消</Button>
        </p>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { roleAccess, modifyRoleAccess } from '../../api/account'

export default {
    data() {
        return {
            convertNodeData:[],
            nodeData: []
        }
    },
    created() {
        this.getNodeData()
    },
    methods: {
        getNodeData() {
            roleAccess({
                role_id: this.$route.query.role_id
            }).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.nodeData = response.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        checkSecNode(secNode) {
            if(secNode.checked) {
                secNode.child.forEach((item) => {
                    item.checked = true
                })
            }else{
                secNode.child.forEach((item) => {
                    item.checked = false
                })
            }
        },
        checkThirdNode(secNode){
            secNode.checked = false
            secNode.child.forEach((item) => {
                if(item.checked) {
                    secNode.checked = true
                }
            })
        },
        saveRoleData() {
            let resource = []
            this.nodeData.forEach((firstNode) => {
                firstNode.child.forEach((secNode) => {
                    secNode.child.forEach((thirdNode) => {
                        if(thirdNode.checked) {
                            resource.push(thirdNode.node_id)
                        }
                    })
                })
            })

            if(!resource.length) {
                this.$Message.success("请选择功能权限!")
                return
            }

            modifyRoleAccess({
                role_id: this.$route.query.role_id,
                resource: resource
            }).then((response) => {
                if(0 !== response.statusCode) {
                    this.$Message.error(response.msg)
                }else{
                    this.$Message.success("修改成功!")
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        cancel() {
            this.$router.go(-1)
        }

    }
}
</script>


