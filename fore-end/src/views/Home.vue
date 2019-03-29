<template>
  <div class="zl-homepage">
    <mt-header title>
      <mt-button icon="back" slot="left">返回</mt-button>
      <mt-button slot="right" class="money">￥545</mt-button>
      <div>sdfj</div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="main1">
      <div class="prize">
        <div>期开奖</div>
        <div>
          <span v-for="(item, index) in prise" :key="index" :style="{background: item.color}">05</span>
        </div>
      </div>
      <div class="countdown">
        <div>sdf</div>
        <div class="lastTime">00:00:00</div>
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
            <div class="everylist" v-for="items in item.data" :key="items.id" @click="selectOptions(items.id)" >
              <span :class="['selectedData',selectedData.includes(items.id) ? 'active' : '']">{{items.data}}</span>
              <span>{{items.odds}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <div class="mesHeader2" v-for="item in mesHeader2" :key="item.title">
          <div>{{ item.title }}</div>
          <div>
            <div class="everylist" v-for="items in item.data" :key="items.id" @click="selectOptions(items.id)">
              <span :class="['selectedData',selectedData.includes(items.id) ? 'active' : '']">{{items.data}}</span>
              <span>{{items.odds}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <div class="mesHeader2">
          <div>冠、亚军组合</div>
          <div>
            <div class="everylist" v-for="item in mesHeader3" :key="item.id" @click="selectOptions(item.id)">
              <span :class="['selectedData',selectedData.includes(item.id) ? 'active' : '']">{{ item.data }}</span>
              <span>{{ item.odds }}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <footer>
      <div @click="reset">重置</div>
      <div>
        单价:
        <input type="text" placeholder="0" v-model="singlePrice">
        <span class="fr" style="padding-top:1px;padding-right:1px">元</span>
      </div>
      <div>{{ selectedData.length }}注 共{{ allMoney }}元</div>
      <div>确认</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data() {
    return {
      selected: "1",
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
      mesHeader1: [
        {
          title: "冠军",
          data: [
            { id: "冠军:01", data: "01", odds: "9.85" },
            { id: "冠军:02", data: "02", odds: "9.85" },
            { id: "冠军:03", data: "03", odds: "9.85" },
            { id: "冠军:04", data: "04", odds: "9.85" },
            { id: "冠军:05", data: "05", odds: "9.85" },
            { id: "冠军:06", data: "06", odds: "9.85" },
            { id: "冠军:07", data: "07", odds: "9.85" },
            { id: "冠军:08", data: "08", odds: "9.85" },
            { id: "冠军:09", data: "09", odds: "9.85" },
            { id: "冠军:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "亚军",
          data: [
            { id: "亚军:01", data: "01", odds: "9.85" },
            { id: "亚军:02", data: "02", odds: "9.85" },
            { id: "亚军:03", data: "03", odds: "9.85" },
            { id: "亚军:04", data: "04", odds: "9.85" },
            { id: "亚军:05", data: "05", odds: "9.85" },
            { id: "亚军:06", data: "06", odds: "9.85" },
            { id: "亚军:07", data: "07", odds: "9.85" },
            { id: "亚军:08", data: "08", odds: "9.85" },
            { id: "亚军:09", data: "09", odds: "9.85" },
            { id: "亚军:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第三名",
          data: [
            { id: "第三名:01", data: "01", odds: "9.85" },
            { id: "第三名:02", data: "02", odds: "9.85" },
            { id: "第三名:03", data: "03", odds: "9.85" },
            { id: "第三名:04", data: "04", odds: "9.85" },
            { id: "第三名:05", data: "05", odds: "9.85" },
            { id: "第三名:06", data: "06", odds: "9.85" },
            { id: "第三名:07", data: "07", odds: "9.85" },
            { id: "第三名:08", data: "08", odds: "9.85" },
            { id: "第三名:09", data: "09", odds: "9.85" },
            { id: "第三名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第四名",
          data: [
            { id: "第四名:01", data: "01", odds: "9.85" },
            { id: "第四名:02", data: "02", odds: "9.85" },
            { id: "第四名:03", data: "03", odds: "9.85" },
            { id: "第四名:04", data: "04", odds: "9.85" },
            { id: "第四名:05", data: "05", odds: "9.85" },
            { id: "第四名:06", data: "06", odds: "9.85" },
            { id: "第四名:07", data: "07", odds: "9.85" },
            { id: "第四名:08", data: "08", odds: "9.85" },
            { id: "第四名:09", data: "09", odds: "9.85" },
            { id: "第四名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第五名",
          data: [
            { id: "第五名:01", data: "01", odds: "9.85" },
            { id: "第五名:02", data: "02", odds: "9.85" },
            { id: "第五名:03", data: "03", odds: "9.85" },
            { id: "第五名:04", data: "04", odds: "9.85" },
            { id: "第五名:05", data: "05", odds: "9.85" },
            { id: "第五名:06", data: "06", odds: "9.85" },
            { id: "第五名:07", data: "07", odds: "9.85" },
            { id: "第五名:08", data: "08", odds: "9.85" },
            { id: "第五名:09", data: "09", odds: "9.85" },
            { id: "第五名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第六名",
          data: [
            { id: "第六名:01", data: "01", odds: "9.85" },
            { id: "第六名:02", data: "02", odds: "9.85" },
            { id: "第六名:03", data: "03", odds: "9.85" },
            { id: "第六名:04", data: "04", odds: "9.85" },
            { id: "第六名:05", data: "05", odds: "9.85" },
            { id: "第六名:06", data: "06", odds: "9.85" },
            { id: "第六名:07", data: "07", odds: "9.85" },
            { id: "第六名:08", data: "08", odds: "9.85" },
            { id: "第六名:09", data: "09", odds: "9.85" },
            { id: "第六名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第七名",
          data: [
            { id: "第七名:01", data: "01", odds: "9.85" },
            { id: "第七名:02", data: "02", odds: "9.85" },
            { id: "第七名:03", data: "03", odds: "9.85" },
            { id: "第七名:04", data: "04", odds: "9.85" },
            { id: "第七名:05", data: "05", odds: "9.85" },
            { id: "第七名:06", data: "06", odds: "9.85" },
            { id: "第七名:07", data: "07", odds: "9.85" },
            { id: "第七名:08", data: "08", odds: "9.85" },
            { id: "第七名:09", data: "09", odds: "9.85" },
            { id: "第七名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第八名",
          data: [
            { id: "第八名:01", data: "01", odds: "9.85" },
            { id: "第八名:02", data: "02", odds: "9.85" },
            { id: "第八名:03", data: "03", odds: "9.85" },
            { id: "第八名:04", data: "04", odds: "9.85" },
            { id: "第八名:05", data: "05", odds: "9.85" },
            { id: "第八名:06", data: "06", odds: "9.85" },
            { id: "第八名:07", data: "07", odds: "9.85" },
            { id: "第八名:08", data: "08", odds: "9.85" },
            { id: "第八名:09", data: "09", odds: "9.85" },
            { id: "第八名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第九名",
          data: [
            { id: "第九名:01", data: "01", odds: "9.85" },
            { id: "第九名:02", data: "02", odds: "9.85" },
            { id: "第九名:03", data: "03", odds: "9.85" },
            { id: "第九名:04", data: "04", odds: "9.85" },
            { id: "第九名:05", data: "05", odds: "9.85" },
            { id: "第九名:06", data: "06", odds: "9.85" },
            { id: "第九名:07", data: "07", odds: "9.85" },
            { id: "第九名:08", data: "08", odds: "9.85" },
            { id: "第九名:09", data: "09", odds: "9.85" },
            { id: "第九名:10", data: "10", odds: "9.85" }
          ]
        },
        {
          title: "第十名",
          data: [
            { id: "第十名:01", data: "01", odds: "9.85" },
            { id: "第十名:02", data: "02", odds: "9.85" },
            { id: "第十名:03", data: "03", odds: "9.85" },
            { id: "第十名:04", data: "04", odds: "9.85" },
            { id: "第十名:05", data: "05", odds: "9.85" },
            { id: "第十名:06", data: "06", odds: "9.85" },
            { id: "第十名:07", data: "07", odds: "9.85" },
            { id: "第十名:08", data: "08", odds: "9.85" },
            { id: "第十名:09", data: "09", odds: "9.85" },
            { id: "第十名:10", data: "10", odds: "9.85" }
          ]
        }
      ],
      mesHeader2: [
        {
          title: "冠军",
          data: [
            { id: "冠军:大", data: "大", odds: "9.85" },
            { id: "冠军:小", data: "小", odds: "9.85" },
            { id: "冠军:单", data: "单", odds: "9.85" },
            { id: "冠军:双", data: "双", odds: "9.85" },
            { id: "冠军:龙", data: "龙", odds: "9.85" },
            { id: "冠军:虎", data: "龙", odds: "9.85" }
          ]
        },
        {
          title: "亚军",
          data: [
            { id: "亚军:大", data: "大", odds: "9.85" },
            { id: "亚军:小", data: "小", odds: "9.85" },
            { id: "亚军:单", data: "单", odds: "9.85" },
            { id: "亚军:双", data: "双", odds: "9.85" },
            { id: "亚军:龙", data: "龙", odds: "9.85" },
            { id: "亚军:虎", data: "龙", odds: "9.85" }
          ]
        },
        {
          title: "第三名",
          data: [
            { id: "第三名:大", data: "大", odds: "9.85" },
            { id: "第三名:小", data: "小", odds: "9.85" },
            { id: "第三名:单", data: "单", odds: "9.85" },
            { id: "第三名:双", data: "双", odds: "9.85" },
            { id: "第三名:龙", data: "龙", odds: "9.85" },
            { id: "第三名:虎", data: "龙", odds: "9.85" }
          ]
        },
        {
          title: "第四名",
          data: [
            { id: "第四名:大", data: "大", odds: "9.85" },
            { id: "第四名:小", data: "小", odds: "9.85" },
            { id: "第四名:单", data: "单", odds: "9.85" },
            { id: "第四名:双", data: "双", odds: "9.85" },
            { id: "第四名:龙", data: "龙", odds: "9.85" },
            { id: "第四名:虎", data: "龙", odds: "9.85" }
          ]
        },
        {
          title: "第五名",
          data: [
            { id: "第五名:大", data: "大", odds: "9.85" },
            { id: "第五名:小", data: "小", odds: "9.85" },
            { id: "第五名:单", data: "单", odds: "9.85" },
            { id: "第五名:双", data: "双", odds: "9.85" },
            { id: "第五名:龙", data: "龙", odds: "9.85" },
            { id: "第五名:虎", data: "龙", odds: "9.85" }
          ]
        },
        {
          title: "第六名",
          data: [
            { id: "第六名:大", data: "大", odds: "9.85" },
            { id: "第六名:小", data: "小", odds: "9.85" },
            { id: "第六名:单", data: "单", odds: "9.85" },
            { id: "第六名:双", data: "双", odds: "9.85" }
          ]
        },
        {
          title: "第七名",
          data: [
            { id: "第七名:大", data: "大", odds: "9.85" },
            { id: "第七名:小", data: "小", odds: "9.85" },
            { id: "第七名:单", data: "单", odds: "9.85" },
            { id: "第七名:双", data: "双", odds: "9.85" }
          ]
        },
        {
          title: "第八名",
          data: [
            { id: "第八名:大", data: "大", odds: "9.85" },
            { id: "第八名:小", data: "小", odds: "9.85" },
            { id: "第八名:单", data: "单", odds: "9.85" },
            { id: "第八名:双", data: "双", odds: "9.85" }
          ]
        },
        {
          title: "第九名",
          data: [
            { id: "第九名:大", data: "大", odds: "9.85" },
            { id: "第九名:小", data: "小", odds: "9.85" },
            { id: "第九名:单", data: "单", odds: "9.85" },
            { id: "第九名:双", data: "双", odds: "9.85" }
          ]
        },
        {
          title: "第十名",
          data: [
            { id: "第十名:大", data: "大", odds: "9.85" },
            { id: "第十名:小", data: "小", odds: "9.85" },
            { id: "第十名:单", data: "单", odds: "9.85" },
            { id: "第十名:双", data: "双", odds: "9.85" }
          ]
        }
      ],
      mesHeader3: [
        { id: "冠亚:大", data: "冠亚大", odds: "9.85" },
        { id: "冠亚:小", data: "冠亚小", odds: "9.85" },
        { id: "冠亚:单", data: "冠亚单", odds: "9.85" },
        { id: "冠亚:双", data: "冠亚双", odds: "9.85" },
        { id: "冠亚:03", data: "03", odds: "9.85" },
        { id: "冠亚:04", data: "04", odds: "9.85" },
        { id: "冠亚:05", data: "05", odds: "9.85" },
        { id: "冠亚:06", data: "06", odds: "9.85" },
        { id: "冠亚:07", data: "07", odds: "9.85" },
        { id: "冠亚:08", data: "08", odds: "9.85" },
        { id: "冠亚:09", data: "09", odds: "9.85" },
        { id: "冠亚:10", data: "10", odds: "9.85" },
        { id: "冠亚:11", data: "11", odds: "9.85" },
        { id: "冠亚:12", data: "12", odds: "9.85" },
        { id: "冠亚:13", data: "13", odds: "9.85" },
        { id: "冠亚:14", data: "14", odds: "9.85" },
        { id: "冠亚:15", data: "15", odds: "9.85" },
        { id: "冠亚:16", data: "16", odds: "9.85" },
        { id: "冠亚:17", data: "17", odds: "9.85" },
        { id: "冠亚:18", data: "18", odds: "9.85" },
        { id: "冠亚:19", data: "19", odds: "9.85" }
      ],
      selectedData: [],
      singlePrice: ''
    };
  },
  computed: {
    allMoney() {
      return this.selectedData.length*this.singlePrice
    }
  },
  methods: {
    // 重置
    reset() {
      this.selectedData = [];
    },
    // 选定投注
    selectOptions(id) {
      if(this.selectedData.includes(id)){
        this.selectedData = this.selectedData.filter(item => {
          return item != id
        })
      } else {
         this.selectedData.push(id);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../static/hot.scss";
.zl-homepage {
  .active {
    background-color: rgb(33, 47, 61)!important;
    color: rgb(255, 255, 255)!important;
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
      text-align: left;
      padding-left: px2rem(5);
      width: 30%;
      background: rgb(231, 76, 60);
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
        background: rgb(231, 76, 60);
        border: 0;
        outline: none;
      }
    }
    & div:nth-child(3) {
      width: 40%;
      background: #eb984e;
    }
    & div:nth-child(4) {
      width: 15%;
      background: rgb(231, 76, 60);
    }
  }
}
</style>
