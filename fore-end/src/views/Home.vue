<template>
  <div class="zl-homepage" @click="quiuuijm">
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

    <div class="order" v-show="order4Switch">
      <div>
        <div class="order4SwitchTitle">请确定注单</div>
        <div class="orderHeader">
          <span>名次</span>
          <span style="margin-left: 10%">已选车号</span>
        </div>
        <div class="orderList">
          <ul>
            <li v-for="item in selectedMesHeader4Obj" :key="item.pos">
              <span>第{{ item.pos+1 }}名</span>
              <span style="margin-left: 15%; text-align: left">{{ item.numbers.join(',') }}</span>
            </li>
          </ul>
        </div>
        <div class="orderMoney" id="order4SwitchMoney" style="height: auto;padding-bottom: 5px">
          <div>组合数量： {{mh4Data.validcount}}</div>
          <div>倍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数： {{amt}}（单位：{{ctype}}）</div>
          <div>下注金额： {{mh4Data.bet}} 元</div>
          <div>可&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;赢： {{mh4Data.canwin}} 元</div>
        </div>
        <div class="orderconfim">
          <mt-button type="default" @click="order4Switch=false;">取消</mt-button>
          <mt-button type="primary" @click="confirm4" class="fr">确认</mt-button>
        </div>
      </div>
    </div>

    <div class="qiuu" v-show="qiuuSwitch">
      <div v-for="(item,index) in qiuuList" :key="index">
        {{item.period}}期开奖结果
        <span style="background: rgb(75, 221, 221);">{{item.records[0]}}</span>
        <span style="background: rgb(234, 29, 29);">{{item.records[1]}}</span>
        <span style="background: rgb(92, 42, 42);">{{item.records[2]}}</span>
        <span style="background: rgb(37, 150, 255);">{{item.records[3]}}</span>
        <span style="background: rgb(0, 197, 0);">{{item.records[4]}}</span>
        <span style="background: rgb(254, 137, 42);">{{item.records[5]}}</span>
        <span style="background: rgb(253, 225, 40);">{{item.records[6]}}</span>
        <span style="background: rgb(176, 174, 174);">{{item.records[7]}}</span>
        <span style="background: rgb(64, 24, 255);">{{item.records[8]}}</span>
        <span style="background: rgb(107, 107, 107);">{{item.records[9]}}</span>
      </div>
    </div>
    <div class="stop" v-show="stopSwitch">
      <div>距开奖 00:{{minutes}}:{{seconds}}</div>
    </div>

    <div class="menu" v-show="menuSwitch" @click="showMenu">
      <ul>
        <li v-for="(item, index) in menuData" :key="index" @click="goto(item.name)">{{ item.data }}</li>
      </ul>
    </div>
    <mt-header title>
      <mt-button slot="left">您好：{{username}}</mt-button>
      <mt-button slot="right" class="money">余额￥{{balance - freeze}}</mt-button>
      <mt-button slot="right" @click="showMenu">
        <span class="iconfont iconrenjijiaohu"></span>
      </mt-button>
    </mt-header>

    <div class="main1">
      <div class="prize" @click.stop="showQiuu" style="position: relative">
        <div style="text-align: left;padding-left:12px">
          {{LastPeriod}}期开奖结果
          <span class="iconfont iconxiala1"></span>
          <audio id="music1">
            <source src="../static/07PlayerWin_OpenCardChip.mp3">
          </audio>
          <span v-if="voiceSwitch" class="iconfont iconlaba" @click.stop="voiceSwitch=false"></span>
          <span v-else class="iconfont iconjingyin" @click.stop="voiceSwitch=true"></span>
        </div>

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
        <div
          :class="['lastTime', 'animated', animate, 'infinite']"
          v-show="timeSwitch"
        >{{hours}}:{{minutes}}:{{seconds}}</div>
      </div>
    </div>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">冠军</mt-tab-item>
      <mt-tab-item id="2">两面</mt-tab-item>
      <mt-tab-item id="3">冠亚和</mt-tab-item>
      <mt-tab-item id="4">官方</mt-tab-item>
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
                v-html="items.data"
              ></span>
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
                v-html="item.data"
              >{{item.data}}</span>
              <span>{{ item.odds}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="4">
        <div class="mesHeader4" v-for="item in mesHeader4" :key="item.title" style="height: auto">
          <div class="mesHeader4Title" style="background: #d6eaf8;">{{ item.title }}</div>

          <div class="mesHeader4Main">
            <div class="mesHeader4Left">
              <span @click="setQuickly(item.id,1)">清</span>
              <span @click="setQuickly(item.id,2)">全</span>
              <span @click="setQuickly(item.id,3)">小</span>
              <span @click="setQuickly(item.id,4)">大</span>
              <span @click="setQuickly(item.id,5)">单</span>
              <span @click="setQuickly(item.id,6)">双</span>
            </div>

            <div class="mesHeader4Right">
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'1')}"
                @click="showClass(item.id,'1')"
              >01</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'2')}"
                @click="showClass(item.id,'2')"
              >02</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'3')}"
                @click="showClass(item.id,'3')"
              >03</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'4')}"
                @click="showClass(item.id,'4')"
              >04</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'5')}"
                @click="showClass(item.id,'5')"
              >05</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'6')}"
                @click="showClass(item.id,'6')"
              >06</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'7')}"
                @click="showClass(item.id,'7')"
              >07</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'8')}"
                @click="showClass(item.id,'8')"
              >08</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'9')}"
                @click="showClass(item.id,'9')"
              >09</span>
              <span
                :class="{'active': selectedMesHeader4.includes(item.id+'10')}"
                @click="showClass(item.id,'10')"
              >10</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <footer v-show="selected=='4'">
      <div @click="reset4">重置</div>
      <div style="width: 0"></div>
      <div style="width: 60%">
        <span class="ctypeBox">
          <span :class="['ctype',ctype=='元'?'activectype':'']" @click="setCtype('元')">元</span>
          <span :class="['ctype',ctype=='角'?'activectype':'']" @click="setCtype('角')">角</span>
          <span :class="['ctype',ctype=='分'?'activectype':'']" @click="setCtype('分')">分</span>
        </span>
        <span class="bzuu">
          <span @click="amtreduce">-</span>
          <span>{{amt}}</span>倍
          <span @click="amtadd">+</span>
        </span>
      </div>
      <div @click="showOrder4">确认</div>
    </footer>

    <footer v-show="selected!='4'">
      <div @click="reset">重置</div>
      <div @click="showQuickMoney">快捷金额</div>
      <div>
        单注金额:
        <input type="text" placeholder="0" v-model="singlePrice">
        <span class="fr yuan">元</span>
      </div>
      <div @click="showOrder">确认</div>
      <div class="allMoney" v-show="allMoneySwitch">{{ selectedData.length }}注 共{{ allMoney }}元</div>
      <div class="quickMoney" v-show="quickMoneySwitch">
        <span v-for="(item,index) in quickMoney" :key="index" @click="setMoney(item)">{{item}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import axios from "../static/axios.js";
import qs from "qs";
import { Toast } from "mint-ui";
export default {
  name: "homepage",
  data() {
    return {
      voiceSwitch: false,
      mh4Data: {},
      amt: 1,
      ctype: "元",
      selectedMesHeader4: [],
      selectedMesHeader4Obj: [],
      mesHeader4: [
        {
          title: "冠军",
          id: 0
        },
        {
          title: "亚军",
          id: 1
        },
        {
          title: "第三名",
          id: 2
        },
        {
          title: "第四名",
          id: 3
        },
        {
          title: "第五名",
          id: 4
        },
        {
          title: "第六名",
          id: 5
        },
        {
          title: "第七名",
          id: 6
        },
        {
          title: "第八名",
          id: 7
        },
        {
          title: "第九名",
          id: 8
        },
        {
          title: "第十名",
          id: 9
        }
      ],
      animate: "",
      timeSwitch: false,
      qiuuSwitch: false,
      username: "",
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
        { name: "gamblingRecord", data: "投注记录" },
        { name: "twoWeekReport", data: "两周报表" },
        { name: "prizeHistory", data: "开奖历史" },
        { name: "regular", data: "玩法说明" },
        { name: "login", data: "退出登录" }
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
      freeze: [],
      hours: "00",
      qiuuList: [],
      order4Switch: false
    };
  },
  computed: {
    allMoney() {
      return this.selectedData.length * this.singlePrice;
    }
  },
  watch: {
    singlePrice(val) {
      if (isNaN(parseInt(val)) && val != "") {
        Toast({
          message: "请输入正确的数字",
          duration: 1000
        });
        this.singlePrice = "";
      } else if (val == "") {
        return;
      } else if (parseInt(val) > 10000) {
        this.singlePrice = 10000;
      } else {
        this.singlePrice = parseInt(val);
      }
    }
  },
  methods: {
    //官方订单页面提交
    confirm4() {
      var that = this;
      var data = {};
      data.bets = this.selectedMesHeader4Obj;
      data.amt = this.amt;
      data.ctype = this.ctype == "元" ? 0 : this.ctype == "角" ? 1 : 0;
      data.period = this.LastPeriod + 1;
      axios({
        url: "/api/pk10/GroupBet",
        method: "post",
        data: {
          prebet: 0,
          data: data
        }
      })
        .then(function(response) {
          if (response.Errcode == 0) {
            Toast("下单成功");
            that.order4Switch = false;
          } else {
            Toast(response.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
          Toast("网络异常，请稍后重试");
        });
    },
    //官方订单页面
    showOrder4() {
      this.selectedMesHeader4Obj = [];
      for (let i = 0; i < 10; i++) {
        var arr = this.selectedMesHeader4.filter(function(item) {
          return item.charAt(0) == i;
        });
        if (arr.length != 0) {
          arr = arr.map(function(item) {
            return Number(item.substr(1, item.length - 1));
          });
          this.selectedMesHeader4Obj.push({ pos: i, numbers: arr });
        }
      }
      if (this.selectedMesHeader4Obj.length <= 1) {
        Toast("至少选择两个名次");
        this.order4Switch = false;
        return;
      }
      Indicator.open();
      this.getOrder4();
    },
    // 获取订单
    getOrder4() {
      var that = this;
      var data = {};
      data.bets = this.selectedMesHeader4Obj;
      data.amt = this.amt;
      data.ctype = this.ctype == "元" ? 0 : this.ctype == "角" ? 1 : 0;
      data.period = this.LastPeriod + 1;
      axios({
        url: "/api/pk10/GroupBet",
        method: "post",
        data: {
          prebet: 1,
          data: data
        }
      })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            console.log(response);
            that.order4Switch = true;
            that.mh4Data = response.Data;
          } else {
            Toast('请输入有效的组合');
          }
            Indicator.close();
        })
        .catch(function(error) {
          console.log(error);
          Toast("网络异常，请稍后重试");
        });
    },
    amtadd() {
      if (this.amt < 9) {
        this.amt++;
      }
    },
    amtreduce() {
      if (this.amt > 1) {
        this.amt--;
      }
    },
    // 设置setCtype
    setCtype(type) {
      this.ctype = type;
    },
    // 设置清全大小带双
    setQuickly(id, data) {
      switch (data) {
        case 1:
          this.selectedMesHeader4 = this.selectedMesHeader4.filter(function(
            item
          ) {
            return item.charAt(0) != id;
          });
          break;
        case 2:
          for (let i = 1; i < 11; i++) {
            if (!this.selectedMesHeader4.includes(id + "" + i)) {
              this.selectedMesHeader4.push(id + "" + i);
            }
          }
          break;
        case 3:
          for (let i = 1; i < 6; i++) {
            if (!this.selectedMesHeader4.includes(id + "" + i)) {
              this.selectedMesHeader4.push(id + "" + i);
            }
          }
          break;
        case 4:
          for (let i = 6; i < 11; i++) {
            if (!this.selectedMesHeader4.includes(id + "" + i)) {
              this.selectedMesHeader4.push(id + "" + i);
            }
          }
          break;
        case 5:
          for (let i = 1; i < 11; i += 2) {
            if (!this.selectedMesHeader4.includes(id + "" + i)) {
              this.selectedMesHeader4.push(id + "" + i);
            }
          }
          break;
        case 6:
          for (let i = 2; i < 11; i += 2) {
            if (!this.selectedMesHeader4.includes(id + "" + i)) {
              this.selectedMesHeader4.push(id + "" + i);
            }
          }
          break;

        default:
          break;
      }
    },
    showClass(id, data) {
      if (this.selectedMesHeader4.includes(id + data)) {
        this.selectedMesHeader4 = this.selectedMesHeader4.filter(item => {
          return item != id + data;
        });
      } else {
        this.selectedMesHeader4.push(id + data);
      }
    },
    quiuuijm() {
      this.qiuuSwitch = false;
    },
    setVoice() {
      if(!this.voiceSwitch) {
        return
      }
      var audio = document.getElementById("music1");
      console.log(audio);
      audio.play();
    },
    setMoney(price) {
      this.quickMoneySwitch = false;
      this.singlePrice = price;
    },
    showQuickMoney() {
      this.quickMoneySwitch = !this.quickMoneySwitch;
    },
    showQiuu() {
      this.qiuuSwitch = !this.qiuuSwitch;
    },
    goto(name) {
      if (name == "login") {
        localStorage.removeItem("token");
      }
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
    reset4() {
      this.selectedMesHeader4 = [];
      this.selectedMesHeader4Obj = [];
    },
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
        if (LeftSecond == 0) {
          this.setVoice();
        }
        if (LeftSecond < 5) {
          that.animate = "tada";
        }
        that.stopSwitch = false;
        that.hours = that.num(parseInt(LeftSecond / 3600));
        that.minutes = that.num(parseInt((LeftSecond % 3600) / 60));
        that.seconds = that.num(LeftSecond % 60);
      } else if (LeftSecond == -31) {
        that.animate = "";
        that.stopSwitch = false;
        that.seconds = "00";
        that.getData();
        that.setVoice();
      } else if (LeftSecond <= 0 && LeftSecond >= -30) {
        that.animate = "";
        that.stopSwitch = true;
        that.order4Switch = false;
        LeftSecond += 30;
        that.seconds = that.num(LeftSecond);
      } else {
        that.animate = "";
        return;
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
            Toast(response.Message);
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
            Toast(response.Message);
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
            that.mesHeader2 = response.Data.mesHeader2.map(function(
              item,
              index
            ) {
              if (index == 0) {
                item.data[4].data = "龙<span class='vsSpan'>1vs10</span>";
                item.data[5].data = "虎<span class='vsSpan'>1vs10</span>";
              } else if (index == 1) {
                item.data[4].data = "龙<span class='vsSpan'>2vs9</span>";
                item.data[5].data = "虎<span class='vsSpan'>2vs9</span>";
              } else if (index == 2) {
                item.data[4].data = "龙<span class='vsSpan'>3vs8</span>";
                item.data[5].data = "虎<span class='vsSpan'>3vs8</span>";
              } else if (index == 3) {
                item.data[4].data = "龙<span class='vsSpan'>4vs7</span>";
                item.data[5].data = "虎<span class='vsSpan'>4vs7</span>";
              } else if (index == 4) {
                item.data[4].data = "龙<span class='vsSpan'>5vs6</span>";
                item.data[5].data = "虎<span class='vsSpan'>5vs6</span>";
              }
              return item;
            });
            that.mesHeader3 = response.Data.mesHeader3;
          } else {
            Toast(response.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    confirm() {
      if (this.balance < this.allMoney) {
        Toast("余额不足");
        return;
      }
      var that = this;
      var data = this.selectedObj.map(function(item) {
        item.bet = that.singlePrice;
        delete item.data;
        return item;
      });
      axios
        .get("/api/pk10/bet", {
          params: {
            period: that.LastPeriod + 1,
            data: JSON.stringify(data),
            bettype: 0
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.Errcode == 0) {
            Toast("交易成功");
            that.reset();
            that.orderSwitch = false;
            that.singlePrice = "";
            that.balance = response.Data.balance;
            that.freeze = response.Data.freeze;
          } else {
            Toast(response.Message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getqiuu() {
      function dateToString(date) {
        function getDB(num) {
          return num < 10 ? "0" + num : num;
        }
        var dateStr = "";
        var y = date.getFullYear();

        var m = date.getMonth() + 1;
        var d = date.getDate();
        dateStr += y + "-" + getDB(m) + "-" + getDB(d) + "";
        return dateStr;
      }
      var date = new Date();
      var that = this;
      axios
        .get("/api/pk10/History", {
          params: {
            date: dateToString(date)
          }
        })
        .then(function(response) {
          if (response.Errcode == 0) {
            that.qiuuList = response.Data.filter(function(item, index) {
              return index < 5;
            });
            console.log(that.qiuuList);
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
    this.getqiuu();

    this.getMesHeader();
    this.getCurrentMoney();
    this.getData();

    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username");
    }
  },
  mounted() {
    this.timeSwitch = true;
    this.timer();
    this.animate = "";
    var that = this;
    var time = window.setInterval(function() {
      that.LeftSecond -= 1;
      that.timer();
    }, 1000);
    setTimeout(function() {
      that.voiceSwitch = true;
    },1000)
  }
};
</script>

<style lang="scss">
@import "../static/hot.scss";
.zl-homepage {
  .mint-indicator-mask {
    z-index: 10;
  }
  #order4SwitchMoney {
    line-height: px2rem(28);
  }
  .order4SwitchTitle {
    text-align: center;
    height: px2rem(40);
    line-height: px2rem(40);
    font-size: px2rem(20);
    border-bottom: px2rem(2) solid #ccc;
  }
  .ctypeBox {
    .activectype {
      background: #009933;
      color: #fff;
    }
    span {
      border-top: px2rem(1) solid #009933;
      padding: px2rem(5) px2rem(7);
      border-bottom: px2rem(1) solid #009933;
      height: 70%;
      background: #fff;
      color: #009933;
      &:first-child {
        border-left: px2rem(1) solid #009933;
      }
      &:last-child {
        border-right: px2rem(1) solid #009933;
      }
    }
  }
  .bzuu {
    span:first-child,
    span:last-child {
      border: px2rem(1) solid #009933;
      background: #fff;
      padding: px2rem(5) px2rem(7);
      font-size: px2rem(16);
      font-weight: 700;
      color: #000;
    }
    span:first-child {
      margin: 0 px2rem(4);
      padding: px2rem(5) px2rem(9);
    }
    span:nth-child(2) {
      border: px2rem(1) solid #009933;
      background: #009933;
      padding: px2rem(5) px2rem(10);
      margin: 0 px2rem(3);
    }
  }
  .mesHeader4 {
    .mesHeader4Title {
      height: px2rem(30);
      line-height: px2rem(30);
      padding-left: px2rem(8);
    }
    .mesHeader4Main {
      height: px2rem(100);
      display: flex;
      .mesHeader4Left {
        width: 20%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        span {
          background: #26a2ff;
          width: px2rem(22);
          height: px2rem(22);
          margin: 0 px2rem(5);
          color: #fff;
          text-align: center;
          line-height: px2rem(22);
          font-size: px2rem(12);
        }
      }
      .mesHeader4Right {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        span {
          text-align: center;
          display: inline-block;
          height: px2rem(35);
          line-height: px2rem(35);
          width: px2rem(35);
          border-radius: 50%;
          color: #000;
          -webkit-box-shadow: lightgrey 0px 0.08533rem 0.08533rem;
          box-shadow: lightgrey 0px 0.08533rem 0.08533rem;
          font-size: px2rem(15);
          background-color: white;
          margin: 0 px2rem(11);
        }
      }
    }
  }
  .qiuu {
    position: absolute;
    margin-top: px2rem(114);
    width: 100%;
    height: px2rem(120);
    z-index: 2;
    background: #ccc;
    div {
      padding-left: px2rem(7);
      span {
        display: inline-block;
        color: #fff;
        line-height: 0.896rem;
        display: inline-block;
        position: relative;
        width: px2rem(18);
        text-align: center;
        height: 0.85333rem;
        border-radius: 50%;
        background: red;
        font-size: 0.42667rem;
      }
      span:first-child {
        margin-left: px2rem(25);
      }
    }
  }
  .priceNumber {
    flex-direction: row !important;
  }
  .priceNumber span {
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
  .iconfont {
    font-size: px2rem(17);
  }
  .prize {
    position: relative;
  }
  .iconxiala1:before {
    position: absolute;
    top: px2rem(17);
    right: px2rem(80);
  }
  .iconlaba:before {
    position: absolute;
    top: px2rem(5);
    right: px2rem(8);
    font-size: px2rem(10);
  }
  .iconjingyin:before {
    position: absolute;
    top: px2rem(5);
    right: px2rem(8);
    font-size: px2rem(10);
  }


  .stop {
    position: absolute;
    z-index: 3;
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
    z-index: 4;
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
    z-index: 2;
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
          > span:first-child {
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
      & > div:nth-child(2) {
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
        width: 30%;
        text-align: right;
        top: 0;
        line-height: px2rem(50);
        color: #fff;
        right: px2rem(17);
        height: 100%;
        font-size: 100%;
        background: #eb984e;
        border: 0;
        outline: none;
      }
      .yuan {
        display: inline-block;
        line-height: px2rem(53);
      }
    }
    & div:nth-child(4) {
      width: 25%;
      background: rgb(231, 76, 60);
    }
  }
  .vsSpan {
    display: inline;
  }
}
</style>
