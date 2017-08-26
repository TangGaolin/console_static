<style scoped>

</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>会员管理 - 会员信息</h2>
        </div>
        <div class="content-main">
            <div>
                <h1>
                    <Icon type="person"></Icon>
                    {{currentUserData.user_name}}
                    <Tag color="green">A 类</Tag>
                </h1>
                <br>
                <UserInfo :currentUserData = currentUserData></UserInfo>
            </div>
            <br/>

            <Tabs value="items" >
                <Tab-pane label="卡项服务" name="items">
                    <ItemList  :currentUserData = currentUserData
                               :globalConfig = globalConfig
                    ></ItemList>
                </Tab-pane>

                <Tab-pane label="购买记录" name="buys">
                    <OrderList :currentUserData = currentUserData
                               :globalConfig = globalConfig
                    ></OrderList>
                </Tab-pane>

                <Tab-pane label="耗卡记录" name="used">
                    <UseOrderList :currentUserData = currentUserData
                                  :globalConfig = globalConfig
                    >
                    </UseOrderList>
                </Tab-pane>
            </Tabs>
            </div>
            <br/>
            <br/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getUserDetail } from '../../api/user'

    export default {
        data() {
            return {
                orderList:[],
                currentUserData:{}
            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
            this.currentUserData.uid = this.$route.query.uid
            this.getCurrentUserData()
        },
        methods: {
            getCurrentUserData(){
                getUserDetail(this.$route.query).then((response) => {
                    if(0 !== response.statusCode) {
                        Message.error(response.msg)
                    }else{
                        if(false === response.data){
                            this.$Message.error('用户信息不存在!')
                        }else{
                            this.currentUserData = response.data
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>
