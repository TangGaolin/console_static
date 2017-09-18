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
        text-align: center;
    }
    .layout-body{
        width: 85%;
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
            <div class="layout-logo">
                <a href="/" style="color: #b3b6b7">德美店务后台</a>
            </div>
            <div class='layout-account'  v-if="userInfo !== null">
                 {{userInfo.role_name }} *
                <AdminAccount
                    :userInfo = userInfo
                ></AdminAccount>
            </div>
        </div>

        <div class="layout-body">
            <div class="layout-content">
                <Row>
                    <i-col span="4">
                        <Menu :active-name="$route.path | activeName" width="auto" :open-names="[currentMenu]" theme="light">
                            <Submenu v-for="(item,index) in routerNodes" :name="item.path"  :key="item.path" v-if="item.show">
                                <template slot="title">
                                    <Icon :type="item.icon" :size=16></Icon>
                                    {{item.name}}
                                </template>
                                <router-link v-for="(child, childIndex) in item.children" :key="child.path" :to="item.path + '/' + child.path" v-if="child.show">
                                    <Menu-item :name="item.path+'/'+child.path" :index="item.path+'/'+child.path" >{{child.name}} </Menu-item>
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
    import router from '../router'
    export default {
        data() {
            return {
                currentMenu: "",
                routerNodes: router.options.routes
            }
        },
        filters: {
            activeName: function(name){
                const routes = name.split("/")
                return "/" + routes[1] + "/" + routes[2]
            }
        },
        computed: {
            ...mapGetters([
              'userInfo',
              'userRulesNode'
            ])
        },
        watch: {
            "userRulesNode": "checkNode"
        },
        created() {
            this.currentMenu = "/" + this.$route.path.split("/")[1]
        },
        methods: {
            logout() {
                this.$store.dispatch('logoutAction',{}).then(() => {
                    // 退出成功
                    this.$router.push('/login')
                })
            },

            checkNode() {
                router.options.routes.forEach((item_1) => {
                    if(item_1.show) {
                        if(item_1.node_id) {
                            item_1.show = this.userRulesNode[item_1.node_id]
                        }
                        if(item_1.children) {
                            item_1.children.forEach((item_2) => {
                                if(item_2.show) {
                                    if(item_2.node_id) {
                                        item_2.show = this.userRulesNode[item_2.node_id]
                                    }
                                }
                            })
                        }
                    }
                })
            }

        }
    }
</script>
