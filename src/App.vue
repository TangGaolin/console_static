<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapGetters([
            'userInfo',
            'globalConfig'
        ])
    },
    created() {
        this.getConfig()
    },
    methods: {
        getConfig(){
            if(this.globalConfig === "") {
                this.$store.dispatch('getConfigAction')
            }
        }
    }
}
</script>

<style>
    #app {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: 0px;
        width: 100%;
  }
    .content-header{
        border-bottom: 1px solid #ccc;
    }
    .content-header h2{
        width: auto;
        margin-left: 30px;
        line-height: 70px;
        font-weight: 400;
        font-style: normal;
    }
    .red {
      color:#f60;
    }

</style>
