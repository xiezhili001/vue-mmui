<template>
  <div class="zl-gamblingRecord">
    <mt-header title="购买记录">
      <router-link to="/homepage" slot="left">
        <mt-button icon="back">后退</mt-button>
      </router-link>
    </mt-header>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未结明细</mt-tab-item>
      <mt-tab-item id="2">今日已结</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="header">
          <span :class=" active == 'jiesuan' ? 'active' : '' " @click="getData('jiesuan')">未结算</span>
          <span :class=" active == 'chedan' ? 'active' : '' " @click="getData('chedan')">撤单</span>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2"></mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: "gamblingRecord",
  data() {
    return {
      selected: "1",
      active: 'jiesuan'
    };
  },
  methods: {
    getData(mes) {
      this.active = mes;
    }
  }
};
</script>
<style lang="scss">
@import "../static/hot.scss";
.zl-gamblingRecord {
  display: flex;
  flex-direction: column;
  height: 100%;
  .mint-navbar {
    margin-bottom: px2rem(3)
  }
  .mint-tab-container {
    flex: 1;
    height: 100%;
    background: #f5f5f9;
    overflow-y: scroll;
    .header {
      margin: px2rem(10);
      span {
        display: inline-block;
        width: 50%;
        height: px2rem(25);
        color: #108ee9;
        font-size: 14px;
        line-height: px2rem(24);
        text-align: center;
        border: 1px solid #108ee9;

        &:first-child {
          border-radius: px2rem(4) 0 0 px2rem(4);
          border-right: none;
        }
        &:last-child {
          border-radius: 0 px2rem(4) px2rem(4) 0;
          border-left: none;
        }
        &.active {
          color: rgb(255, 255, 255);
          background: #108ee9;
        }
      }
    }
  }
}
</style>
