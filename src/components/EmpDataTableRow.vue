<style scoped>
</style>
<template>
    <div>
        <Table stripe :columns="dayColumns" :data="row"></Table>
    </div>
</template>
<script>
    export default {
        props: {
            row: Array
        },
        data () {
            return {
                dayColumns:[
                    {
                        title: '日期',
                        key: 'day',
                    },
                    {
                        title: '业绩',
                        key: 'yeji',
                    },
                    {
                        title: '消耗',
                        key: 'xiaohao',
                    },
                    {
                        title: '手工',
                        key: 'fee'
                    }
                ],
            }
        },
    }
</script>