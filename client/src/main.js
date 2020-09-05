import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import VueSessionStorage from 'vue-sessionstorage'
import VuePlyr from 'vue-plyr'




import VueResource from 'vue-resource';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import $ from 'jquery'
// Fa que Jquery sigui accesible per a tots el components
window.$ = window.jQuery = require('jquery');

Vue.use(BootstrapVue )
Vue.use(Vuex)
Vue.use(VueResource);
Vue.use(VueSession)
Vue.use(VueSessionStorage)

const moment = require('moment')
require('moment/locale/ca')

Vue.use(require('vue-moment'), {
    moment
})

import router from './router.js';

import axios from 'axios';

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status == 401) {
      console.log('sessió caducada redirigint a /');

      localStorage.removeItem('musics')
      localStorage.removeItem('cursos')
      localStorage.removeItem('cursIdSeleccionat')
      localStorage.removeItem('idCursActiu')

      router.push({name: 'error', params: {msgError: 'Sessió Caducada'}})
    }
    return Promise.reject(error);
  });

Vue.config.productionTip = false

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

new Vue({
  $,
  router,
  render: h => h(App),
}).$mount('#app')
