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
        },
        setName(state, name) {
          state.name = name
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
        class: '',
        action: ''
      },
      mutations: {
        saveMessage(state, obj) {
          state.message = obj.message
          state.class = obj.class
        },
        setAction(state, action) {
          state.action = action
        },
        unsetAction(state) {
          state.action = null
        },
        dismissMessage(state) {
          state.message = null
          state.action = null
        }
      },
      getters: {
        message: state => { return state.message },
        class: state => { return state.class },
        action: state => { return state.action }
      }
    }
  }
});

export default store