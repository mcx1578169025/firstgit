import Vue from 'vue'
import Vuex from 'vuex'
import http from '../axios'
Vue.use(Vuex)
//每次刷新都会执行这个文件，从本地存储中获取数据，在初始化时放入state中
let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
export default new Vuex.Store({
  state: {
    //用户的菜单
    menulist: [],
    //用户信息
    userInfo: userInfo,
  },
  getters: {
    myList(state) {
      return state.menulist
    }
  },
  mutations: {
    getMenu(state, list) {
      state.menulist = list
    },
    //保存用户信息
    saveUserInfo(state, payload) {
      state.userInfo = payload
      //本地储存
      localStorage.setItem('userInfo', JSON.stringify(payload))
    },
    //清除用户信息
    clearUserInfo(state) {
      //清除vuex
      state.userInfo = {}
      //清除本地
      localStorage.removeItem('userInfo')
    },
  },

  actions: {
    getMenuInfo({ commit }) {
      http('/menulist')
        .then(res => {
          commit('getMenu', res.list)
        })
    }
  },
  modules: {
  }
})
