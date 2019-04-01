<template>
  <div class="zl-homepage">
    <div class="stop" v-show="stopSwitch">
      <div>距开奖 00:{{minutes}}:{{seconds}}</div>
    </div>
    <div class="menu" v-show="menuSwitch" @click="showMenu">
      <ul>
        <li v-for="(item, index) in menuData" :key="index" @click="goto(item.name)">{{ item.data }}</li>
      </ul>
    </div>
    <mt-header title>
      <mt-button icon="back" slot="left">返回</mt-button>
      <mt-button slot="right" class="money">余额￥{{balance - freeze}}</mt-button>
      <mt-button slot="right" @click="showMenu">
        <span class="iconfont iconrenjijiaohu"></span>
      </mt-button>
    </mt-header>

    <div class="main1">
      <div class="prize">
        <div>距{{LastPeriod}}期封盘</div>
        <div>
          <span
            v-for="(item, index) in prise"
            :key="index"
            :style="{background: item.color}"
          >{{item.data}}</span>
        </div>
      </div>
      <div class="countdown">
        <div>距{{LastPeriod+1}}期封盘</div>
        <div class="lastTime">{{hours}}:{{minutes}}:{{seconds}}</div>
      </div>
    </div>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">冠军</mt-tab-item>
      <mt-tab-item id="2">两面</mt-tab-item>
      <mt-tab-item id="3">冠亚和</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="mesHeader1" v-for="item in mesHeader1" :key="item.title">
          <div>{{ item.title }}</div>
          <div>
            <div
              class="everylist"
              v-for="items in item.data"
              :key="items.id"
              @click="selectOptions(items.id,items.data,items.odds)"
            >
              <span
                :class="['selectedData',selectedData.includes(items.id) ? 'active' : '']"
              >{{items.data}}</span>
              <span>{{items.odds}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <div class="mesHeader2" v-for="item in mesHeader2" :key="item.title">
          <div>{{ item.title }}</div>
          <div>
            <div
              class="everylist"
              v-for="items in item.data"
              :key="items.id"
              @click="selectOptions(items.id,items.data,items.odds)"
            >
              <span
                :class="['selectedData',selectedData.includes(items.id) ? 'active' : '']"
              >{{items.data}}</span>
              <span>{{items.odds}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <div class="mesHeader2">
          <div>冠、亚军组合</div>
          <div>
            <div
              class="everylist"
              v-for="item in mesHeader3"
              :key="item.id"
              @click="selectOptions(item.id,item.data,item.odds)"
            >
              <span
                :class="['selectedData',selectedData.includes(item.id) ? 'active' : '']"
              >{{ item.data }}</span>
              <span>{{ item.odds }}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <footer>
      <div @click="reset">重置</div>
      <div @click="showQuickMoney">快捷金额</div>
      <div>
        单注金额:
        <input type="text" placeholder="0" v-model="singlePrice">
        <span class="fr" style="padding-top:1px;padding-right:1px">元</span>
      </div>
      <div @click="showOrder">确认</div>
      <div class="allMoney" v-show="allMoneySwitch">{{ selectedData.length }}注 共{{ allMoney }}元</div>
      <div class="quickMoney" v-show="quickMoneySwitch">
        <span v-for="(item,index) in quickMoney" :key="index" @click="setMoney(item)">{{item}}</span>
      </div>
    </footer>

    <div class="order" v-show="orderSwitch">
      <div>
        <div class="orderHeader">
          <span>号码</span>
          <span>赔率</span>
          <span>金额</span>
        </div>
        <div class="orderList">
          <ul>
            <li v-for="(item,index) in selectedObj" :key="index">
              <span>{{ item.id }}</span>
              <span>{{ item.odds }}</span>
              <span>{{ singlePrice }}</span>
            </li>
          </ul>
        </div>
        <div class="orderMoney">
          <span>总计{{ selectedData.length }}注</span>
          <span class="fr">{{ allMoney }}元</span>
        </div>
        <div class="orderconfim">
          <mt-button type="default" @click="hideOrder">取消</mt-button>
          <mt-button type="primary" @click="confirm" class="fr">确认</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../static/axios.js";
import { Toast } from "mint-ui";
export default {
  name: "homepage",
  data() {
    return {
      quickMoney: [5, 50, 100, 200, 500, 1000],
      quickMoneySwitch: false,
      allMoneySwitch: false,
      time: "",
      LastPeriod: "",
      stopSwitch: false,
      menuSwitch: false,
      orderSwitch: false,
      selected: "1",
      menuData: [
        { name: "gamblingRecord", data: "博彩记录" },
        { name: "prizeHistory", data: "两周报表" },
        { name: "prizeHistory", data: "开奖历史" },
        { name: "prizeHistory", data: "两面长龙" },
        { name: "prizeHistory", data: "遗漏排行" },
        { name: "prizeHistory", data: "路珠走势" },
        { name: "prizeHistory", data: "玩法说明" }
      ],
      prise: [
        { color: "rgb(75, 221, 221)" },
        { color: "rgb(234, 29, 29)" },
        { color: "rgb(92, 42, 42)" },
        { color: "rgb(37, 150, 255)" },
        { color: "rgb(0, 197, 0)" },
        { color: "rgb(254, 137, 42)" },
        { color: "rgb(253, 225, 40)" },
        { color: "rgb(176, 174, 174)" },
        { color: "rgb(64, 24, 255)" },
        { color: "rgb(107, 107, 107)" }
      ],
      mesHeader1: [],
      mesHeader2: [],
      selectedData: [],
      singlePrice: "",
      selectedObj: [],
      minutes: "00",
      seconds: "00",
      LeftSecond: "",
      balance: "",
      mesHeader3: [],
      freeze:[],
      hours: ''
    };
  },
  computed: {
    allMoney() {
      return this.selectedData.length * this.singlePrice;
    }
  },
  methods: {
    setMoney(price) {
      this.quickMoneySwitch = false;
      this.singlePrice = price;
    },
    showQuickMoney() {
      this.quickMoneySwitch = !this.quickMoneySwitch;
    },
    goto(name) {
      this.$router.push({ name: name });
    },
    showMenu() {
      this.menuSwitch = !this.menuSwitch;
    },
    hideOrder() {
      this.orderSwitch = false;
    },
    showOrder() {
      console.log(this.selectedObj);
      if (this.selectedData.length == 0) {
        Toast({
          message: "请选择号码",
          duration: 1000
        });
      } else if (this.singlePrice == "") {
        Toast({
          message: "请设置单价",
          duration: 1000
        });
      } else {
        this.orderSwitch = true;
      }
    },

    // 重置
    reset() {
      this.selectedData = [];
      this.selectedObj = [];
      this.allMoneySwitch = false;
    },
    // 选定投注
    selectOptions(id, data, odds) {
      if (this.selectedData.includes(id)) {
        this.selectedData = this.selectedData.filter(item => {
          return item != id;
        });
        this.selectedObj = this.selectedObj.filter(item => {
          return item.id != id;
        });
      } else {
        this.selectedData.push(id);
        this.selectedObj.push({ id: id, data: data, odds: odds });
      }
      if (this.selectedData.length == 0) {
        this.allMoneySwitch = false;
      } else {
        this.allMoneySwitch = true;
      }
    },
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    timer() {
      var that = this;
      var LeftSecond = this.LeftSecond;
      if (LeftSecond >= 0) {
        that.stopSwitch = false;
        that.hours = that.num(parseInt(LeftSecond / 3600))
        that.minutes = that.num(parseInt((LeftSecond % 3600) / 60));
        that.seconds = that.num(LeftSecond % 60);
      } else if (LeftSecond <= -30) {
        that.stopSwitch = false;
        that.getData();
      } else {
        that.stopSwitch = true;
        LeftSecond += 30;
        that.seconds = that.num(LeftSecond);
      }
    },
    // 获取数据
    getData() {
      var that = this;
      axios
        .get("/api/pk10/status", {
          params: {}
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            var data = response.Data;
            that.LastPeriod = data.LastPeriod;
            data.LastResult.map(function(item, index) {
              that.prise[index].data = item;
            });
            that.LeftSecond = data.LeftSecond;
          } else {
            Toast(response.Data.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 余额
    getCurrentMoney() {
      var that = this;
      axios
        .get("/api/user/status", {
          params: {}
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            that.balance = response.Data.balance;
            that.freeze = response.Data.freeze;
            console.log(response);
          } else {
            Toast(response.Data.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 主信息
    getMesHeader() {
      var that = this;
      axios
        .get("/api/pk10/getodds", {
          params: {}
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            that.mesHeader1 = response.Data.mesHeader1;
            that.mesHeader2 = response.Data.mesHeader2;
            that.mesHeader3 = response.Data.mesHeader3;
          } else {
            Toast(response.Data.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    confirm() {
      if(this.balance < this.allMoney) {
        Toast('余额不足');
        return
      }
      var that = this;
      var data = this.selectedObj.map(function(item) {
        item.bet = that.singlePrice;
        delete item.data;
        return item
      })
      axios
        .get("/api/pk10/bet", {
          params: {
            period: that.LastPeriod + 1,
            data: JSON.stringify(data)
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            Toast('交易成功');
            that.reset();
            that.orderSwitch = false;
            that.balance = response.Data.balance;
            that.freeze = response.Data.freeze;
          } else {
            Toast(response.Data.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getMesHeader();
    this.getCurrentMoney();
    var that = this;
    this.getData();
    var time = window.setInterval(function() {
      that.LeftSecond -= 1;
      that.timer();
    }, 1000);
  },
  mounted() {
    this.timer();
  }
};
</script>

<style lang="scss">
@import "../static/hot.scss";
.zl-homepage {
  .stop {
    position: absolute;
    z-index: 2;
    margin-top: px2rem(40);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    div {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      text-align: center;
      line-height: px2rem(80);
      background: #fff;
      height: px2rem(80);
      width: px2rem(300);
      margin: auto;
      font-size: px2rem(30);
      transform: translateY(-80%);
      border-radius: px2rem(5);
    }
  }
  .menu {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    margin-top: px2rem(40);
    background: rgba(0, 0, 0, 0.8);
    ul {
      position: absolute;
      right: 0;
      top: 0;
      width: px2rem(150);
      background: #fff;
      border-radius: px2rem(4) 0 0 px2rem(4);
      li {
        color: gray;
        width: 100%;
        height: px2rem(40);
        text-align: center;
        line-height: px2rem(40);
        border-bottom: 1px solid lightgray;
      }
    }
  }
  .order {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      background: #fff;
      width: 80%;
      border-radius: px2rem(5);

      .orderconfim {
        height: px2rem(50);
        padding: 0 px2rem(40) 0 px2rem(40);
        button {
          width: px2rem(70);
          height: px2rem(30);
          font-size: px2rem(16);
        }
      }
      .orderMoney {
        height: px2rem(40);
        line-height: px2rem(40);
        padding: 0 px2rem(20) 0 px2rem(20);
      }
      .orderHeader {
        display: flex;
        text-align: center;
        border-bottom: 1px solid #ededed;
        height: px2rem(40);
        line-height: px2rem(40);

        span {
          width: 33%;
        }
      }
      .orderList ul {
        max-height: px2rem(300);
        overflow-y: scroll;
        border-bottom: 1px solid #ededed;
      }
      .orderList ul li {
        display: flex;
        text-align: center;
        height: px2rem(40);
        line-height: px2rem(40);
        span {
          width: 33%;
        }
      }
    }
  }
  .active {
    background-color: rgb(33, 47, 61) !important;
    color: rgb(255, 255, 255) !important;
  }
  background: #f4f6f7;
  height: 100%;
  font-size: px2rem(16);
  display: flex;
  flex-direction: column;

  .mint-tab-container {
    margin-top: px2rem(3);
    padding-top: px2rem(3);
    .mint-tab-container-wrap {
      background: #f4f6f7;
      padding-top: px2rem(10);
    }

    .mesHeader2 {
      display: flex;
      flex-direction: column;
      & > div:first-child {
        background: rgb(214, 234, 248);
        height: px2rem(27);
        line-height: px2rem(27);
        font-size: px2rem(14);
        padding-left: px2rem(20);
      }
      & > div:nth-child(2) {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .everylist {
          width: 25%;
          height: 50%;
          display: flex;
          text-align: center;
          flex-direction: column;
          padding-top: px2rem(10);
          span:first-child {
            display: inline-block;
            height: px2rem(50);
            line-height: px2rem(50);
            width: px2rem(70);
            border-radius: px2rem(4);
            color: #000;
            box-shadow: lightgrey 0px px2rem(2) px2rem(2);
            font-size: px2rem(16);
            font-weight: normal;
            background-color: rgb(255, 255, 255);
            margin: 0 auto;
          }
          span:last-child {
            margin-top: px2rem(5);
            font-size: px2rem(14);
            color: rgb(192, 57, 43);
          }
        }
      }
    }

    .mesHeader1 {
      height: px2rem(200);
      display: flex;
      flex-direction: column;
      & > div:first-child {
        background: rgb(214, 234, 248);
        height: px2rem(27);
        line-height: px2rem(27);
        font-size: px2rem(14);
        padding-left: px2rem(20);
      }
      & > div:nth-child(2) {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .everylist {
          width: 20%;
          height: 50%;
          display: flex;
          text-align: center;
          flex-direction: column;
          padding-top: px2rem(10);
          span:first-child {
            display: inline-block;
            height: px2rem(50);
            line-height: px2rem(50);
            width: px2rem(50);
            border-radius: 50%;
            color: #000;
            box-shadow: lightgrey 0px px2rem(2) px2rem(2);
            font-size: px2rem(22);
            background-color: rgb(255, 255, 255);
            margin: 0 auto;
          }
          span:last-child {
            margin-top: px2rem(5);
            font-size: px2rem(14);
            color: rgb(192, 57, 43);
          }
        }
      }
    }
  }

  .money {
    margin-right: px2rem(60);
  }

  .main1 {
    display: flex;
    height: px2rem(70);
    box-sizing: border-box;
    div {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      width: 100%;
      font-size: px2rem(14);
      color: rgb(102, 102, 102);
    }

    .prize {
      text-align: center;
      line-height: px2rem(35);
      border-right: 1px solid #ccc;
      & > div:first-child {
        padding-top: px2rem(4);
      }
      & > div:last-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          color: #fff;
          line-height: px2rem(21);
          display: inline-block;
          position: relative;
          width: 10%;
          height: px2rem(20);
          border-radius: 50%;
          background: red;
          font-size: px2rem(10);
        }
      }
    }

    .countdown {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      line-height: px2rem(35);
      & > div:first-child {
        padding-top: px2rem(5);
      }
      .lastTime {
        font-size: px2rem(30);
        color: red;
      }
    }
  }

  .mint-tab-item-label {
    font-size: px2rem(16);
  }

  .mint-navbar {
    height: px2rem(50);
  }

  .mint-tab-container {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }

  footer {
    position: relative;
    height: px2rem(50);
    background: #000;
    display: flex;
    text-align: center;
    line-height: px2rem(50);
    color: #fff;

    & div:first-child {
      width: 15%;
      background: rgb(52, 152, 219);
    }
    & div:nth-child(2) {
      width: 20%;
      background: rgb(231, 76, 60);
    }
    .quickMoney {
      position: absolute;
      top: px2rem(-80);
      left: 0;
      height: px2rem(60);
      background: #eb984e;
      width: 100%;
      color: #fff;
      font-size: px2rem(14);
      text-align: left;
      padding-top: px2rem(8);
      span {
        border: px2rem(1) solid rgb(255, 255, 255);
        border-radius: px2rem(3);
        color: rgb(255, 255, 255);
        text-align: center;
        display: inline-block;
        width: px2rem(56);
        margin: 0 px2rem(3);
        height: px2rem(34);
        line-height: px2rem(34);
      }
    }
    .allMoney {
      position: absolute;
      top: px2rem(-20);
      left: 0;
      height: px2rem(20);
      background: #eb984e;
      width: 100%;
      color: #fff;
      font-size: px2rem(14);
      line-height: px2rem(20);
    }
    & div:nth-child(3) {
      text-align: left;
      background: #eb984e;
      padding-left: px2rem(5);
      width: 50%;
      position: relative;
      overflow: hidden;
      input {
        position: absolute;
        width: 40%;
        text-align: right;
        top: 0;
        color: #fff;
        right: px2rem(17);
        height: 100%;
        font-size: 100%;
        background: #eb984e;
        border: 0;
        outline: none;
      }
    }
    & div:nth-child(4) {
      width: 15%;
      background: rgb(231, 76, 60);
    }
  }
}
</style>
