import axios from 'axios'

import router from '../router';
import { Toast } from "mint-ui";

// 创建一个 axios 的实例
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://cp.che.ba'
  // baseURL: 'http://192.168.2.9'
})

// 处理请求拦截
instance.interceptors.request.use(
  config => {
    // console.log(config);
    if (localStorage.getItem('token')) {
      config.params.token = localStorage.getItem('token');
    } else {
      router.push({
        name: 'login',
        params: {
          returnPath: location.href,
        }
      });
    }
    // 加上 token
    // let token = sessionStorage.getItem('token');
    // if (token) {
    //   config.headers['X-Access-Token'] = token;
    // }

    // 对 config 处理之后，记得要 return config
    return config
  },

  () => {
    // console.log('发送到服务器失败的话，会进入到这个函数')
  }
)

// 处理响应拦截
instance.interceptors.response.use(
  response => {
    console.log(response)
    if (response.data.Errcode == 888) {
      router.push({
        name: 'login',
        params: {
          returnPath: location.href,
        }
      });


    }
    return response.data
  },

  error => {
    if (error.response.data.Errcode == 888) {
      router.push({
        name: 'login',
        params: {
          returnPath: location.href,
        }
      });
      Toast({
        message: "登录过期，请重新登录",
        duration: 1000
      })
    }

    // console.log('请求响应回来的时候报错了');
    // console.log(location.href);



    // 最后记得 再次将错误给 reject 出去，已让具体调用的地方能够使用
    return Promise.reject(error);
  }
)

export default instance
