<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
</style>
