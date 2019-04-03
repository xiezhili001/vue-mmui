<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import "./static/hot.scss";
@import "./static/reset.scss";
#app {
  font-size: px2rem(16);
  box-sizing: border-box;
  height: 100%
}
</style>
