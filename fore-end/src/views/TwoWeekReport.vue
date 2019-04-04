<template>
  <div class="zl-twoWeekReport">
    <mt-header title="两周报表">
      <router-link to="/homepage" slot="left">
        <mt-button icon="back">后退</mt-button>
      </router-link>
    </mt-header>

    <div class="header">
      <span>时间</span>
      <span>笔数</span>
      <span>金额</span>
      <span>输赢</span>
    </div>
    <div class="main">
      <div>
        <span>2019-03-27至2019-04-210</span>
        <span>543</span>
        <span>45</span>
        <span>453</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "twoWeekReport",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
@import "../static/hot.scss";
.zl-twoWeekReport {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: px2rem(36);
    display: flex;
    text-align: center;
    line-height: px2rem(36);
    color: rgb(102, 102, 102);
    font-size: px2rem(14);
    span {
      width: 15%;
    }
    span:first-child {
      width: 55%;
    }
  }
  .main {
    margin-top: px2rem(2);
    flex: 1;
    background-color: rgb(244, 246, 247);
    div {
      height: px2rem(26);
      display: flex;
      text-align: center;
      line-height: px2rem(26);
      color: rgb(102, 102, 102);
      font-size: px2rem(13);
      border-bottom: px2rem(1) solid #DCDCDC;
      span {
        width: 15%;
      }
      span:first-child {
        width: 55%;
      }
    }
  }
}
</style>
