<template>
  <div id="app">
    <header class="navbar navbar-dark bg-transparent" v-if="$route.name!== 'landingPage' && $route.name!== 'login' && $route.name!== 'crearCompte'" >
      <img src="./assets/logo.png" id="logo" alt="logo banda uji">
      <h1>{{this.$route.meta.titol}}</h1>
      <MenuIcon size="2x" v-on:click="obrirMenu" />
    </header>
    <Navbar />
    <div class="wrapper">
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
    mixins: [accionsMenuMixin]
  }
</script>

<style lang="sass">
  @import ./sass/colors
  @import ./sass/fonts
  @import ./sass/master
  @import ./sass/helper
  @import ./sass/sidebar
  @import ./sass/animacions
  @import ./sass/botons

  @import '../node_modules/bootstrap/scss/bootstrap'

  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50

</style>
