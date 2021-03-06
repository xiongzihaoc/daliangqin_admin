import axios from 'axios'
import { removeToken } from '@/utils/auth'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/api/admin',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    // 让每个请求携带自定义token
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  console.groupCollapsed('%c' + res.config.method.toUpperCase() + '%c ' + res.request.responseURL, 'background:#FF6958;color:white', 'color:#000')
  console.log(res.config.data ? JSON.parse(res.config.data) : '<null>')
  console.log(res.data ? res.data : '<null>')
  console.groupEnd()

  // 未设置状态码则默认成功状态
  const code = res.data.code || 'OK';
  // 获取错误信息
  if (code !== "OK") {
    // 如果没有登录或者没有权限
    if (code === 'NO_AUTH' || code === 'FORBIDDEN') {
      removeToken()
      window.localStorage.clear()
      window.sessionStorage.clear()
      window.location.href = '/login'
    } else { // 其他错误报出错误信息
      Message.error(res.data.message)
      return res.data
    }
  } else {
    return res.data
  }
},
  error => {
    console.log('err' + error)
    let {
      message
    } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
