<template>
    <div>
        <VeHistogram :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></VeHistogram>
    </div>
</template>
<script>
    import VeHistogram from 'v-charts/lib/histogram'
    export default {
        props: {
            countShopsData: Array
        },
        components: {
            VeHistogram
        },
        data() {
            return {
                chartData: {
                    columns: ['shop', 'yeji', 'xiaohao'],
                    rows: []
                },
                chartSettings: {
                    dimension: ['shop'],
                    metrics: ['yeji', 'xiaohao'],
                    yAxisName: ['业绩', '消耗'],
                    yAxisType: [''],
                    area: false,
                    labelMap: {
                        shop: '门店',
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
            'countShopsData': 'setData'
        },
        methods: {
            setData() {
                this.chartData.rows = this.countShopsData
            }

        }
    }


</script>
