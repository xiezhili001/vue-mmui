<template>
  <div class="zl-test">
    <zlHeader title="标题" fixed>
      <div slot="left" slot-scope="{sty}">{{sty}}</div>
      <span slot="right">right</span>
      <span></span>
    </zlHeader>
  </div>
</template>
<script>
import zlHeader from '../component/zl-header';
export default {
  name: "zl-test",
  components: {
    zlHeader
  },
};
</script>
<style lang="scss">
@import "../static/hot.scss";
#allmap,
.zl-test {
  height: 10000px;
  width: 100%;
}
</style>
