import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    music: null,
    logged: false,
    admin: false,
    junta: false
  },
  mutations: {
    loggedMusic(state) {
      state.logged = true
    },
    logoutMusic(state) {
      state.logged = false
    },
    esJunta(state) {
      state.junta = true
    },
    esAdmin(state) {
      state.admin = true
    }
  },
  getters: {
    isLogged: state => {
      return state.logged
    },
    esJunta: state => {
      return state.junta
    },
    esAdmin: state => {
      return state.admin
    }
  }
});

export default store
