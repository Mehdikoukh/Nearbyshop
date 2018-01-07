import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    userLoc: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user){
      state.user = user
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', true)
    },
    setLoc(state, userLoc){
      state.userLoc = userLoc
    },
    logout(state){
      state.user = null,
      state.userLoc = null,
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', false)
    }
  },
  actions: {
    setUser({commit}, user){
      commit('setUser', user)
    },
    setLoc({commit}, userLoc){
      commit('setLoc', userLoc)
    },
    logout({commit}){
      commit('logout')
    }
  }
})
