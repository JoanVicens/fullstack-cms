<template>
  <div id="app">
    <header class="navbar navbar-dark bg-transparent">
      <img src="./assets/logo.png" id="logo" alt="logo banda uji">
      <h1>{{this.$route.meta.titol}}</h1>
      <MenuIcon size="2x" v-on:click="obrirMenu" />
    </header>
    <Navbar />
    <div id="" class="wrapper">
      <div class="" id="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="overlay" v-on:click="tancarMenu"></div>
  </div>
</template>

<script>
  import Navbar from './components/nav/Navbar.vue'
  import { accionsMenuMixin } from './mixins/accionsMenuMixin'

  import { MenuIcon } from 'vue-feather-icons'

  import { store } from './store.js'



  export default {
    name: 'App',
    components: {
      Navbar,
      MenuIcon
    },
    mixins: [accionsMenuMixin],
    created() {
      this.API_URL = `http://${store.getters.express_ip}:5000/auth/info`;
    },
    data() {
      return {
        store,
        API_URL: ''
      }
    }
  }
</script>

<style lang="sass">
  @import ./sass/colors
  @import ./sass/fonts
  @import ./sass/master
  @import ./sass/helper
  @import ./sass/sidebar
  @import ./sass/animacions

  @import '../node_modules/bootstrap/scss/bootstrap'

  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50

</style>
