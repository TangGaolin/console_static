<template>
    <div class="content">
        <div class="content-header">
            <h2>员工信息</h2>
        </div>

        <div class="content-main">
            <div class="sub_title">
                <Input v-model="employee" placeholder="员工姓名/手机..." size = "large" style="width: 300px"></Input>
                <Button type="primary" icon="ios-search" size = "large">搜索</Button>
                <label style="float:right">
                    <Button type="primary" icon="android-add" >新建</Button>
                    <Button type="primary" icon="share"  >导入</Button>
                </label>
            </div>
            <br/>
            
        </div>
    </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getStoreList } from '../../api/shop'
export default {
    data() {
        return {
            store: "all",
            storeList: [],
            employee: ""
        }
    },
    created() {
        this.getStoreList()
    },
    methods: {
        getStoreList() {
            getStoreList().then((response) => {
                if(0 != response.statusCode) {
                    Message.error(response.msg)
                }else{
                    this.storeList = response.data
                }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
    .content-main {
        padding: 40px 40px;
    }
/*    .sub_title {
        line-height: 40px;
    }

    .sub_title {
        border-radius: 0;
    }*/
    .card {
        padding-right:20px;
    }
    .card a{
        color: #657180;
    }
    .card a:hover{
        color: #58b957;
    }

</style>

