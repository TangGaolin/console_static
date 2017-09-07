<template>
    <div>
        <vLine :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></vLine>
    </div>
</template>
<script>
    import vLine from 'v-charts/lib/line'
    export default {
        props: {
            shopData: Array
        },
        components: {
            vLine
        },
        data() {
            return {
                chartData: {
                    columns: ['day', 'yeji', 'xiaohao'],
                    rows: []
                },
                chartSettings: {
                    dimension: ['day'],
                    metrics: ['yeji', 'xiaohao'],
                    yAxisName: ['业绩', '消耗'],
                    yAxisType: ['KMB'],
                    area: false,
                    labelMap: {
                        day: '日期',
                        xiaohao: '消耗',
                        yeji: '业绩'
                    }
                },
            }
        },
        created: function () {

        },
        watch: {
            // 如果路由有变化，清空相关数据
            'shopData': 'setData'
        },
        methods: {
            setData() {
                this.chartData.rows = this.shopData
            }

        }
    }


</script>
