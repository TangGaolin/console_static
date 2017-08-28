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
                        {{currentEmpData.shop_name}}
                    </div>
                    </Col>
                    <Col span="6">
                    <div>
                        <label>职位：</label>
                        {{currentEmpData.job}}
                    </div>
                    </Col>
                    <Col span="6">
                    <div>
                        <label>手机：</label>
                        {{currentEmpData.phone_no}}
                    </div>
                    </Col>
                </Row>
                <br>
                <div>
                    <label>是否跨店服务：</label>
                    {{currentEmpData.is_server_all ? "是" : "否"}}
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
                                    {{ currentEmpDataView.yeji_today }}
                                </h1>
                                <h5>本月累计 {{ currentEmpDataView.yeji_sum }}</h5>
                            </div>
                        </Card>
                    </Col>
                    <Col span = "7" offset="1">
                        <Card style="background-color: #2baee9">
                            <div style="text-align:center">
                                <h4>今日消耗</h4>
                                <h1>
                                    <Icon type="coffee"></Icon>
                                    {{ currentEmpDataView.xiaohao_today }}

                                </h1>
                                <h5>本月累计 {{ currentEmpDataView.xiaohao_sum }}</h5>

                            </div>
                        </Card>
                    </Col>
                    <Col span = "7" offset="1">
                        <Card style="background-color: #e9660f">
                            <div style="text-align:center">
                                <h4>今日手工</h4>
                                <h1>
                                    <Icon type="android-hand"></Icon>
                                    {{ currentEmpDataView.fee_today }}
                                </h1>
                                <h5>本月累计 {{ currentEmpDataView.fee_sum }}</h5>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div>
                <VeLine :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></VeLine>
            </div>

            <Tabs value="items" >
                <Tab-pane label="她的会员" name="users">
                    <EmpUsers
                            :currentEmpData = currentEmpData
                    ></EmpUsers>
                </Tab-pane>

                <Tab-pane label="单据流水" name="items">
                    <EmpOrders
                            :currentEmpData = currentEmpData
                    ></EmpOrders>
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
    import { getEmployeeInfo, getEmpDataView } from '../../api/employee'
    import VeLine from 'v-charts/lib/line'

    export default {
        components: {
            VeLine
        },
        data() {
            return {
                orderList:[],
                currentEmpData:{},
                currentEmpDataView:{},
                chartData: {
                    columns: ['day', 'yeji', 'xiaohao', 'fee'],
                    rows: []
                },
                chartSettings: {
                }
            }
        },
        computed: {
            ...mapGetters([
                'globalConfig',
            ])
        },
        created() {
            this.currentEmpData.emp_id = this.$route.query.emp_id
            this.getCurrentEmpInfo()
        },
        methods: {
            getCurrentEmpInfo(){
                // 获取员工数据
                getEmpDataView(this.$route.query).then((response) => {
                    if(0 !== response.statusCode){
                        this.$Message.error(response.msg)
                    }else{
                        this.currentEmpDataView = response.data
                        this.chartData = {
                            columns: ['day', 'yeji', 'xiaohao', 'fee'],
                            rows: this.currentEmpDataView.list
                        }
                        this.chartSettings = {
                            dimension: ['day'],
                            metrics: [ 'yeji', 'xiaohao','fee'],
                            yAxisName: ["业绩/消耗", '手工'],
                            axisSite: {
                                right: ['fee']
                            },
                            yAxisType: ['KMB'],
                            area: false,
                            labelMap: {
                                day: '日期',
                                yeji: '业绩',
                                xiaohao: '消耗',
                                fee: '手工'
                            }
                        }
                    }
                })
                //获取员工信息
                getEmployeeInfo(this.$route.query).then((response) => {
                    if(0 !== response.statusCode){
                        this.$Message.error(response.msg)
                    }else{
                        this.currentEmpData = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },




        }
    }
</script>
