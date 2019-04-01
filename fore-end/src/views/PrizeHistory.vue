<template>
  <div class="zl-prizeHistory">
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm"  year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日"></mt-datetime-picker>
    <mt-header title="开奖结果">
      <router-link to="/homepage" slot="left">
        <mt-button icon="back">后退</mt-button>
      </router-link>
    </mt-header>
    <div class="main1">
      <div>急速赛车</div>
      <div @click="openPicker">
        选择时间：
        <span style="color: rgb(64, 24, 255)">{{selectedData}}</span>
      </div>
    </div>
    <div class="main2">
      <div>期数</div>
      <div>开出号码</div>
    </div>

    <div class="content">

      <div class="main3" v-for="(item1,index1) in listData" :key="index1">
      <div>
        <div>{{item1.period}}</div>
        <div>{{item1.time}}</div>
      </div>
      <div >
        <div>
          <span style="background: rgb(75, 221, 221)">{{item1.records[0]}}</span>
          <span style="background: rgb(234, 29, 29)">{{item1.records[1]}}</span>
          <span style="background: rgb(92, 42, 42)">{{item1.records[2]}}</span>
          <span style="background: rgb(37, 150, 255)">{{item1.records[3]}}</span>
          <span style="background: rgb(0, 197, 0)">{{item1.records[4]}}</span>
          <span style="background: rgb(254, 137, 42)">{{item1.records[5]}}</span>
          <span style="background: rgb(253, 225, 40)">{{item1.records[6]}}</span>
          <span style="background: rgb(176, 174, 174)">{{item1.records[7]}}</span>
          <span style="background: rgb(64, 24, 255)">{{item1.records[8]}}</span>
          <span style="background: rgb(107, 107, 107)">{{item1.records[9]}}</span>
        </div>
        <div>
          <span v-for="(item, index) in item1.a" :key="index">{{item}}</span>
        </div>
        <div>
          <span v-for="(item, index) in item1.b" :key="index">{{item}}</span>
        </div>
      </div>
    </div>

    </div>




  </div>
</template>

<script>
import axios from '../static/axios.js';
import Vue from "vue";
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  name: "Prizehistory",
  data() {
    return {
      selectedData: "",
      listData: [],
      prise1: [
        { color: "rgb(254, 137, 42)" },
        { color: "rgb(253, 225, 40)" },
        { color: "rgb(176, 174, 174)" },
        { color: "rgb(64, 24, 255)" },
        { color: "rgb(107, 107, 107)" }
      ],
      pickerValue: ""
    };
  },
  methods: {
    dateToString(date) {
      function getDB(num) {
        return num < 10 ? "0" + num : num;
      }
      var dateStr = "";
      var y = date.getFullYear();

      var m = date.getMonth() + 1;
      var d = date.getDate();
      dateStr += y + "-" + getDB(m) + "-" + getDB(d) + "";
      return dateStr;
    },
    handleConfirm() {
      this.selectedData = this.dateToString(this.pickerValue);
      this.getData();
    },
    openPicker() {
      this.pickerValue = new Date();
      this.$refs.picker.open();
    },
    getData() {
      var that = this;
      axios
        .get("/api/pk10/History", {
          params: {
            date: that.selectedData
          }
        })
        .then(function(response) {
          if (response.Errcode == 0) {
            that.listData = response.Data.map(function(item) {
              item.a = [];
              if(item.records[0]>item.records[9]) {
                item.a.push('龙');
              } else {
                item.a.push('虎');
              }
               if(item.records[1]>item.records[8]) {
                item.a.push('龙');
              } else {
                item.a.push('虎');
              }
               if(item.records[2]>item.records[7]) {
                item.a.push('龙');
              } else {
                item.a.push('虎');
              }
               if(item.records[3]>item.records[6]) {
                item.a.push('龙');
              } else {
                item.a.push('虎');
              }
               if(item.records[4]>item.records[5]) {
                item.a.push('龙');
              } else {
                item.a.push('虎');
              }
              item.b = [];
              var c = item.records[0]+item.records[1];
              item.b.push(c);
              if(c<11) {
                item.b.push('小');
              }else if(c == 11){
                item.b.push('和');
              }else{
                item.b.push('大');
              }
              if(c==11) {
                item.b.push('和');
              } else if(c%2 == 0) {
                item.b.push('双');
              } else {
                item.b.push('单');
              }
              return item
            })
            console.log(that.listData);
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
    this.selectedData = this.dateToString(new Date());
    this.getData();
  }
};
</script>
<style lang="scss">
@import "../static/hot.scss";
.content {
  height: 100%;
  overflow: scroll;
}
.zl-prizeHistory {
  background: #f4f6f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  .main3 {
    height: px2rem(106);
    display: flex;
    text-align: center;
    padding: px2rem(3);
    > div {
      background: #fff;
      border: 1px solid #ccc;
    }
    > div:first-child {
      width: 35%;
      div:first-child {
        font-size: px2rem(16);
        color: rgb(33, 47, 61);
        margin-top: px2rem(25);
      }
      div:last-child {
        font-size: px2rem(10);
      }
    }
    > div:last-child {
      width: 65%;
      padding-top: px2rem(7);
      div:first-child {
        height: px2rem(25);
        span {
          display: inline-block;
          width: px2rem(19);
          height: px2rem(19);
          margin: px2rem(2);
          color: #fff;
          font-size: px2rem(10);
          text-align: center;
          border-radius: 50%;
        }
      }
      div:nth-child(2) {
        height: px2rem(23);
        span {
          color: rgb(102, 102, 102);
          width: px2rem(23);
          height: px2rem(21);
          box-shadow: lightgray 0px 1px 2px;
          margin: px2rem(1);
          margin-top: px2rem(5);
          font-size: px2rem(10);
          padding: px2rem(4) px2rem(8);
          background-color: rgb(255, 255, 255);
          align-items: center;
          border-radius: px2rem(4);
        }
      }
      div:nth-child(3) {
        height: px2rem(34);
        padding-top: px2rem(5);
        span {
          display: inline-block;
          width: px2rem(26);
          height: px2rem(30);
          color: rgb(102, 102, 102);
          box-shadow: lightgray 0px 1px 2px;
          margin: px2rem(1);
          font-size: px2rem(12);
          padding: px2rem(4) px2rem(8);
          background-color: rgb(255, 255, 255);
          align-items: center;
          border-radius: px2rem(4);
        }
      }
    }
  }
  .main1 {
    height: px2rem(50);
    line-height: px2rem(30);
    display: flex;
    text-align: center;

    div {
      width: 50%;
      margin: px2rem(4);
      background: #fff;
      border: 1px solid #ccc;
      color: rgb(52, 152, 219);
    }
    div:last-child {
      font-size: px2rem(14);
    }
  }
  .main2 {
    height: px2rem(50);
    line-height: px2rem(40);
    display: flex;
    text-align: center;
    padding: px2rem(3);
    div {
      background: #fff;
      border: 1px solid #ccc;
    }
    div:first-child {
      width: 35%;
    }
    div:last-child {
      width: 65%;
    }
  }
}
</style>
