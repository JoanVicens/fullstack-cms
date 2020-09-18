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

import interceptors from './interceptors';


Vue.config.productionTip = false

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

new Vue({
  interceptors,
  router,
  render: h => h(App),
}).$mount('#app')
