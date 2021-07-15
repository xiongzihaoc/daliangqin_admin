import { httpPublicLogin } from '@/api/public/httpPublicLogin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'


const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        httpPublicLogin.login(userInfo).then(res => {
          if (res.code !== 'OK') {
            return Message.error('用户信息不存在')
          } else {
            if (res.data.adminRoleType) {
              commit('SET_TOKEN', "xzh")
              setToken("xzh")
              resolve()
            } else {
              return Message.error('用户信息不存在')
            }
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(res => {
    //       const user = res.user
    // const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
    //       if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', res.roles)
    //         commit('SET_PERMISSIONS', res.permissions)
    //       } else {
    //         commit('SET_ROLES', ['ROLE_DEFAULT'])
    //       }
    //       commit('SET_NAME', user.userName)
    //       commit('SET_AVATAR', avatar)
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 退出系统
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        httpPublicLogin.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
