import Vue from 'vue'
import Vuex from 'vuex'
import TweetStore from './tweet-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tweet: TweetStore
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
