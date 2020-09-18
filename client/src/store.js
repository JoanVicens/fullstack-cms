import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    session: {
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
    },
    notifications: {
      state: {
        message: null,
        color: 'white'
      },
      mutations: {
        saveMessage(state, obj) {
          state.message = obj.message
          state.color = obj.color
        },
        dismissMessage(state) {
          state.message = null
        }
      },
      getters: {
        message: state => { return state.message },
        color: state => { return state.color }
      }
    }
  }
});

export default store
