import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  mobile: '',
  avatar: '',
  introduction: '',
  administrativename: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ADMINISTRATIVENAME: (state, administrativeName) => {
    state.administrativeName = administrativeName
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: username.trim(), password: password }).then(response => {
        const data = {}
        data['x-ysmall-session-id'] = response.sessionId
        data['x-ysmall-user-id'] = response.userId
        data.memberType = response.memberType
        data.administrativeId = response.administrativeId
        data.gridId = response.gridId
        data.gridType = response.gridType
        commit('SET_TOKEN', data)
        setToken(JSON.stringify(data))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const postData = {}
      postData.id = state.token['x-ysmall-user-id']
      getInfo(postData).then(response => {
        const data = response

        if (!data) {
          reject('验证失败，请重新登录')
        }
        const myArry = []
        myArry[0] = data.memberType // 0-超级管理员 1-街道管理员 2-村管理员 3-小组长
        console.log(myArry)
        data.roles = myArry
        const { roles, name, avatarUrl, remark, administrativeName, mobile } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo:角色必须是非空数组!')
        }
        console.log(administrativeName)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_MOBILE', mobile)
        commit('SET_AVATAR', avatarUrl)
        commit('SET_INTRODUCTION', remark)
        commit('SET_ADMINISTRATIVENAME', administrativeName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()

      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
