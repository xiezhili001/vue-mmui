<template>
  <div style="height: 100%" class="zl-login">
    <div class="header">用户登录</div>
    <div class="main">
      <input type="text" placeholder="请输入用户名" v-model="userName">
      <br>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="footer">
      <button @click="login">确定</button>
    </div>
  </div>
</template>

<script>
import axios from '../static/axios.js'
import { Toast } from "mint-ui";
export default {
  name: "App",
  data() {
    return {
      userName: "",
      password: "",
      returnPath: ""
    };
  },
  methods: {
    login() {
      if (this.userName && this.password) {
        console.log(1);
        var that = this;
        axios
          .get("/api/user/login", {
            params: {
              userName: that.userName, //admin
              password: that.password //123456
            }
          })
          .then(function(response) {
            if (response.Errcode == 0) {
              console.log(response.Message);
              localStorage.setItem("token", response.Message);
              localStorage.setItem("username", response.Data);
              console.log(response);
              if (that.returnPath) {
                location.href = that.returnPath;
              } else {
                that.$router.push({ name: "homepage" });
              }
            } else {
              console.log(response);
              Toast(response.Message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast("请输入用户名或密码");
      }
    }
  },
  created() {
    if (this.$route.params.returnPath) {
      this.returnPath = this.$route.params.returnPath;
    }
  },
  mounted() {
    var that = this;
    document.querySelector('input[type="password"]').onkeydown = function(e) {
      if (e.key == "Enter") {
        that.login();
      }
    };
  }
};
</script>

<style lang="scss">
@import "../static/hot.scss";
.zl-login {
  margin-top: px2rem(-40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .header {
    text-align: center;
    font-size: px2rem(20);
    margin-bottom: px2rem(20);
  }
  input {
    display: inline-block;
    outline: none;
    border: px2rem(1) solid #ccc;
    height: px2rem(30);
    width: px2rem(200);
    border-radius: px2rem(2);
    margin: px2rem(10) px2rem(0);
  }
  button {
    display: inline-block;
    width: px2rem(100);
    height: px2rem(30);
    background: #26a2ff;
    color: #fff;
    outline: none;
  }
}
</style>
