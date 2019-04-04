<template>
  <div class="zl-regular">
    <mt-header title="玩法说明">
      <router-link to="/homepage" slot="left">
        <mt-button icon="back">后退</mt-button>
      </router-link>
    </mt-header>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">官方玩法</mt-tab-item>
      <mt-tab-item id="2">信用玩法</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div
          class="am-tabs-pane-wrap am-tabs-pane-wrap-active"
          role="tabpanel"
          aria-hidden="false"
          aria-labelledby="m-tabs-9-0"
          style="height: 583px !important;"
        >
          <div style="padding: 10px;">
            <div
              style="font-size: 16px; color: rgb(98, 101, 103); margin-bottom: 20px; text-align: center;"
            >急速赛车玩法规则说明</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网）），北京时间（GMT+8）每天白天从上午09:30开到晚上23:50，每20分钟开一次奖,每天开奖44期。</div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">具体游戏规则如下:</div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜冠军：从01-10中任意选择1个或1个以上号码。
              <br>投注内容：01；开奖01，02,03,04,05,06,07,08,09,10，即为中奖。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前二：从01-10中选择2个号码组成一注号码。
              <br>投注内容：01，02；开奖01，02,03,04,05,06,07,08,09,10，即为中奖。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前三：从01-10中选择3个号码组成一注号码。
              <br>投注内容：01，02，03；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前四：从01-10中选择4个号码组成一注号码。
              <br>投注内容：01，02，03，04；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前五：从01-10中选择5个号码组成一注号码。
              <br>投注内容：01，02，03，04，05；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前六：从01-10中选择6个号码组成一注号码。
              <br>投注内容：01，02，03，04，05，06；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前七：从01-10中选择7个号码组成一注号码。
              <br>投注内容：01，02，03，04，05，06，07；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前八：从01-10中选择8个号码组成一注号码。
              <br>投注内容：01，02，03，04，05，06，08；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前九：从01-10中选择9个号码组成一注号码。
              <br>投注内容：01，02，03，04，05，06，08，09；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">
              猜前十：从01-10中选择10个号码组成一注号码。
              <br>投注内容：01，02，03，04，05，06，08，09，10；开奖01，02,03,04,05,06,07,08,09,10，即为中奖(按最大奖级中奖)。
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div
          class="am-tabs-pane-wrap am-tabs-pane-wrap-active"
          role="tabpanel"
          aria-hidden="false"
          aria-labelledby="m-tabs-9-1"
          style="height: 583px !important;"
        >
          <div style="padding: 10px;">
            <div
              style="font-size: 16px; color: rgb(98, 101, 103); margin-bottom: 20px; text-align: center;"
            >急速赛车玩法规则说明</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网）），北京时间（GMT+8）每天白天从上午09:30开到晚上23:50，每20分钟开一次奖,每天开奖44期。</div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">具体游戏规则如下:</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >1～10 两面：指 单、双；大、小。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >单、双：号码为双数叫双，如4、8；号码为单数叫单，如5、9。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >大、小：开出之号码大于或等于6为大，小于或等于5为小。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >第一名～第十名 车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。</div>
            <div style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;">1～5龙虎</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >冠 军 龙/虎：“第一名”车号大于“第十名”<span style="color: #26a2ff">(1vs10)</span>车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >亚 军 龙/虎：“第二名”车号大于“第九名”<span style="color: #26a2ff">(2vs9)</span>车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >第三名 龙/虎：“第三名”车号大于“第八名”<span style="color: #26a2ff">(3vs8)</span>车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >第四名 龙/虎：“第四名”车号大于“第七名”<span style="color: #26a2ff">(4vs7)</span>车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >第五名 龙/虎：“第五名”车号大于“第六名”<span style="color: #26a2ff">(5vs6)</span>车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >冠军车号＋亚军车号＝冠亚和值（为3~19)</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >冠亚和单双：“冠亚和值”为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，等于11的注单视为和，其余视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >冠亚和大小：“冠亚和值”大于11时投注“大”的注单视为中奖，小于11时投注“小”的注单视为中奖，等于11的注单视为和，其余视为不中奖。</div>
            <div
              style="font-size: 12px; color: rgb(153, 153, 153); margin-bottom: 10px;"
            >冠亚和指定：“冠亚和值”可能出现的结果为3～19， 投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: "regular",
  data() {
    return {
      selected: "1"
    };
  },
  methods: {}
};
</script>
<style lang="scss">
@import "../static/hot.scss";
.zl-regular {
  display: flex;
  flex-direction: column;
  height: 100%;
  .mint-tab-item-label {
    font-size: px2rem(15);
  }
  .mint-navbar {
    margin-bottom: px2rem(3);
  }
  .mint-tab-container {
    flex: 1;
    height: 100%;
    background: #f5f5f9;
    overflow-y: scroll;
  }
}
</style>
