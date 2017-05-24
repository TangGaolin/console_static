<style scoped>
    .layout{
        border-top: 5px solid #44b549;
        background: #e7e8eb;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: auto;
        border-radius: 3px;
        line-height: 60px;
        float: left;
        position: relative;
        left: 100px;
        font-size: 30px;
        font-weight: bolder;
        color: #b3b6b7;
    }
    .layout-account{
        width: 300px;
        height: auto;
        border-radius: 3px;
        line-height: 60px;
        float: right;
        margin-left: 100px;
        position: relative;
        font-size: 13px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-body{
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 36px 0 88px;
    }
    .layout-content{
        border: 1px solid #d9dadc;
        background-color: #fff;
        min-height: 700px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-content a{
        color: #657180;
    }
</style>
<template>
    <div class="layout">
        <div class="layout-header">
            <div class="layout-logo">德美店务后台</div>
            <div class='layout-account'  v-if="typeof(userInfo) !== 'undefined'">
                 {{userInfo.job_title }} * {{userInfo.emp_name}} | 
                 <a href="javascript:void(0);" v-on:click="logout">退出</a>
            </div>
        </div>

        <div class="layout-body">
            <div class="layout-content">
                <Row>
                    <i-col span="4">
                        <Menu active-name="" width="auto" :open-names="[2]" theme="light">
                            <Submenu v-for="(item,index) in userRulesNode" :name="index"  :key="item.path" v-if="!item.hidden">
                                <template slot="title">
                                    <Icon :type="item.icon" :size=16></Icon>
                                    {{item.name}}
                                </template>
                                <router-link v-for="(child,childIndex) in item.children" :key="child.path" :to="item.path + '/' + child.path" >
                                    <Menu-item :name="index+'-'+ childIndex" :index="item.path+'/'+child.path">{{child.name}}</Menu-item>
                                </router-link>
                            </Submenu>
                        </Menu>
                    </i-col>
                    <i-col span="20">
                        <div class="layout-content-main">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>

        <div class="layout-copy">
            2011-2017 &copy; 德美中国
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
              'userInfo',
              'userRulesNode'
            ])
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                console.log(this.userRulesNode);
            },
            logout() {
                console.log('xxxx')
                this.$store.dispatch('logoutAction',{}).then(() => {
                    // 登录成功
                    this.$router.push('/login')
                })
            }
        }
    }
</script>
