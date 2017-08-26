<style scoped>
    .content-main label {
        font-size: 14px;
    }
</style>
<template>
    <div class="content">
        <div class="content-header">
            <h2>员工信息 - 员工信息</h2>
        </div>
        <div class="content-main">
            <div>
                <h1>
                    <Icon type="android-person"></Icon>
                    {{currentEmpData.emp_name}}
                </h1>
                <br>
            </div>

            <div>
                <Row :gutter="16">
                    <Col span="6">
                    <div>
                        <label>所在门店：</label>
                    </div>
                    </Col>
                    <Col span="6">
                    <div>
                        <label>职位：</label>

                    </div>
                    </Col>
                    <Col span="6">
                    <div>
                        <label>手机：</label>

                    </div>
                    </Col>
                </Row>
                <br>
                <div>
                    <label>是否跨店服务：</label>
                </div>

            </div>
            <br/><br/>
            <div>
                <h2>员工数据</h2>
                <Row style="padding: 20px;border-top: 1px solid #ccc;color: #ffffff">
                    <Col span = "7">
                        <Card style="background-color: #008000">
                            <div style="text-align:center">
                                <h4>今日业绩</h4>
                                <h1>
                                    <Icon type="social-usd"></Icon>
                                    10000
                                </h1>
                                <h5>本月累计 10000</h5>
                            </div>
                        </Card>
                    </Col>
                    <Col span = "7" offset="1">
                        <Card style="background-color: #2baee9">
                            <div style="text-align:center">
                                <h4>今日消耗</h4>
                                <h1>
                                    <Icon type="coffee"></Icon>
                                    999
                                </h1>
                                <h5>本月累计 10000</h5>

                            </div>
                        </Card>
                    </Col>
                    <Col span = "7" offset="1">
                        <Card style="background-color: #e9660f">
                            <div style="text-align:center">
                                <h4>今日手工</h4>
                                <h1>
                                    <Icon type="android-hand"></Icon>
                                    80
                                </h1>
                                <h5>本月累计10000</h5>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>


            <Tabs value="items" >
                <Tab-pane label="业绩单据" name="items">
                    xxxx
                </Tab-pane>

                <Tab-pane label="消耗/手工单据" name="buys">
                    xxxx
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
                currentEmpData:{
                    emp_id: 1,
                    emp_name:"唐高林"
                }
            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
            this.currentEmpData.uid = this.$route.query.emp_id
            this.getCurrentUserData()
        },
        methods: {
            getCurrentUserData(){
                getUserDetail(this.$route.query).then((response) => {
                    if(0 !== response.statusCode){
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
