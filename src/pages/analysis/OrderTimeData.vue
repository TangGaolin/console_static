<style scoped>

</style>

<template>
    <div class="content">
        <div class="content-header">
            <h2>会员预约表</h2>
        </div>
        <div class="content-main">
            <Tag type="dot" style="font-size: 16px;" color="green">{{year +"年" + month + "月"}}</Tag>
            <ButtonGroup style="float: right;margin-bottom: 20px;">
                <Button type="ghost" @click="changeMonth(-1)">
                    <Icon type="chevron-left"></Icon>
                    上个月
                </Button>
                <Button type="ghost" @click="changeMonth(0)">
                    本月
                </Button>
                <Button type="ghost" @click="changeMonth(1)">
                    下个月
                    <Icon type="chevron-right"></Icon>
                </Button>
            </ButtonGroup>
            <Calendar
                :orderTimeData = convertOrderTimeData
                :year = year
                :month = month
            ></Calendar>
        </div>
  </div>
</template>



<script>
    import { formatDate } from '../../utils/utils'
    import { getOrderTimeList } from '../../api/analysis'
    export default {
        data() {
            return {
                year: Number(formatDate(new Date(), 'yyyy')),
                month: Number(formatDate(new Date(), 'MM')),
                orderTimeData: [],
                convertOrderTimeData: {}
            }
        },
        created() {
            this.getOrderTimeData()
        },
        methods: {
            changeMonth(diff) {
                this.month = Number(this.month) + Number(diff)
                if(13 === this.month) {
                    this.year = Number(this.year) + 1
                    this.month = 1
                }
                if(0 === this.month) {
                    this.year = Number(this.year) - 1
                    this.month = 12
                }
                if(diff === 0) {
                    let now_year = Number(formatDate(new Date(), 'yyyy'))
                    let now_month = Number(formatDate(new Date(), 'MM'))
                    if(this.now_year === now_year &&  this.month === now_month) {
                        return
                    }else{
                        this.now_year = now_year
                        this.month = now_month
                    }
                }
                this.getOrderTimeData()
            },

            getOrderTimeData() {
                let start_time = this.year + '-' +  this.month + '-' + '01' + " 00:00:00"
                let end_time = this.year + '-' +  (Number(this.month) + 1) + '-' + '01' + " 00:00:00"
                getOrderTimeList({
                    start_time: start_time,
                    end_time: end_time
                }).then((response) => {
                    if(0 !== response.statusCode) {
                        this.$Message.error(response.msg)
                    }else{
                        this.convertOrderTimeData = {}
                        this.orderTimeData = response.data
                        //转化数据
                        this.orderTimeData.forEach((item) => {
                            const day = new Date(item.order_time).getDate()
                            if(!this.convertOrderTimeData[day]) {
                                this.convertOrderTimeData[day] = {}
                            }
                            if(!this.convertOrderTimeData[day][item.shop_name]) {
                                this.convertOrderTimeData[day][item.shop_name] = []
                            }
                            this.convertOrderTimeData[day][item.shop_name].push(item)
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                })

            }

        }
    }
</script>
