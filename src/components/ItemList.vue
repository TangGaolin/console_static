<style>
    .select-items {
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>

<template>
    <div>

        <Table stripe :columns="columns" :data="userItems.data"></Table>
        <br/>
        <p style="float: right; display: inline-block">
            <Page :total = userItems.totalSize :page-size = limit :current = curPage @on-change="changePage"></Page>
        </p>
    </div>



</template>
<script>

    import { getUserItemList } from '../api/user'
    export default {
        props: {
            currentUserData: Object
        },
        data() {
            return {
                userItems: {},
                curPage: 1,
                limit: 10,
                columns: [
                    {
                        title: '项目名称',
                        key: 'item_name'
                    },
                    {
                        title: '购买价格(元)',
                        key: 'sold_money'
                    },
                    {
                        title: '购买折扣',
                        key: 'discount'
                    },
                    {
                        title: '总次数',
                        key: 'times'
                    },
                    {
                        title: '剩余次数',
                        key: 'used_times',
                        render: (h, params) => {
                            return params.row.times - params.row.used_times
                        }
                    },
                    {
                        title: '剩余金额',
                        key: 'now_money'
                    }
                ]
            }
        },

        created(){
            this.getUserItemData()
        },
        methods: {
            getUserItemData() {
                getUserItemList({
                    uid: this.currentUserData.uid,
                    cur_page: this.curPage,
                    limit: this.limit
                }).then((response) => {
                    if(0 !== response.statusCode){
                        this.$Message.error(response.msg)
                    }else{
                        this.userItems = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            changePage(page) {
                this.curPage = page
                this.getUserItemData()
            }

        }

    }


</script>
