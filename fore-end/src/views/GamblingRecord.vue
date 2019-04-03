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
          <span :class=" active == 'jiesuan' ? 'active' : '' " @click="getData('jiesuan',0)">未结算</span>
          <span :class=" active == 'chedan' ? 'active' : '' " @click="getData('chedan',1)">撤单</span>
        </div>
        <div class="main">
          <div v-show="!imgSwitch">
            <span>期数</span>
            <span>号码</span>
            <span>赔率</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <div v-for="item in dataList" :key="item.id">
            <span>{{item.period}}</span>
            <span>{{item.betid}}</span>
            <span>{{item.odds}}</span>
            <span>{{item.bet}}</span>
            <span v-if="status == 0">
              <mt-button type="primary" @click="cancelOrder(item.id)">撤单</mt-button>
            </span>
            <span v-else>已撤单</span>
          </div>
          <img v-show="imgSwitch" src="../static/nodata.png" alt>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="main">
          <div v-show="!imgSwitch">
            <span>期数</span>
            <span>号码</span>
            <span>赔率</span>
            <span>金额</span>
            <span>盈亏</span>
          </div>
          <div v-for="item in dataList" :key="item.id">
            <span>{{item.period}}</span>
            <span>{{item.betid}}</span>
            <span>{{item.odds}}</span>
            <span>{{item.bet}}</span>
            <span>{{item.win}}</span>
          </div>
          <img v-show="imgSwitch" src="../static/nodata.png" alt>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "../static/axios.js";
export default {
  name: "gamblingRecord",
  data() {
    return {
      selected: "1",
      active: "jiesuan",
      status: 0,
      dataList: [],
      imgSwitch: false
    };
  },
  watch: {
    selected: function(val) {
      if (val == "2") {
        this.status = 2;
      } else {
        this.status = 0;
        this.active = "jiesuan";
      }
    },
    status: function(val) {
      this.getData(this.active, this.status);
    }
  },
  methods: {
    cancelOrder(id) {
      MessageBox.confirm("你确认要撤消此单?", "撤单操作").then(action => {
        if(action == 'confirm') {
          var that = this;
      axios
        .get("/api/pk10/CancelBet", {
          params: {
            id: id
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            Toast("撤单成功");
            that.getData();
          } else {
            Toast("撤单失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        }
      });

    },
    getData(mes, status) {
      var that = this;
      this.active = mes ? mes : "jiesuan";
      this.status = status ? status : 0;
      axios
        .get("/api/pk10/Records", {
          params: {
            gameid: 1,
            status: this.status
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            that.dataList = response.Data;
            if (response.Data.length == 0) {
              that.imgSwitch = true;
            } else {
              that.imgSwitch = false;
            }
          } else {
            Toast(response.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
@import "../static/hot.scss";
.zl-gamblingRecord {
  display: flex;
  flex-direction: column;
  height: 100%;
  img {
    height: px2rem(127);
    width: px2rem(150);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .main {
    margin: px2rem(10);
    div {
      height: px2rem(30);
      display: flex;
      text-align: center;
      line-height: px2rem(30);
      color: rgb(102, 102, 102);
      font-size: px2rem(13);
      border-bottom: px2rem(1) solid #dcdcdc;
      span {
        width: 20%;
        button {
          height: px2rem(20);
          width: px2rem(50);
          font-size: px2rem(12);
        }
      }
    }
  }
  .mint-navbar {
    margin-bottom: px2rem(3);
  }
  .mint-tab-container {
    flex: 1;
    position: relative;
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
