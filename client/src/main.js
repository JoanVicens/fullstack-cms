import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import VueSessionStorage from 'vue-sessionstorage'

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

Vue.config.productionTip = false

new Vue({
  $,
  router,
  render: h => h(App),
}).$mount('#app')
