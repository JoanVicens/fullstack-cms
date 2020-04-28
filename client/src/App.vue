<template>
  <div id="app">
    <header class="navegacio">
      <div class="navbar navbar-dark bg-transparent" id="header">
        <div class="container">
          <div class="">
            <router-link :to="{ path: '/', params: {} }">
              <img src="./assets/logo.png" id="logo" alt="logo banda uji">
            </router-link>
            <h2>Associació Cultural Banda UJI</h2>
          </div>

          <MenuIcon size="2x"
            id="menuIcon"
            v-on:click="obrirMenu"
            class="float-right" />
          <div class="pr-3" v-if="$route.name=== 'landingPage'" id="botonsCompte" style="margin-left: auto">
            <router-link :to="{ path: '/comptes/entrar', name:'login', params: {} }" class="btn btn-outline-light float-right mr-3">Entrar</router-link>
            <router-link :to="{ path: '/comptes/crear', name:'crearCompte', params: {} }" class="btn btn-outline-light float-right">Crear comopte</router-link>
          </div>
        </div>

      </div>

    </header>
    <Navbar />
    <div class="" id="content">
      <router-view></router-view>
    </div>
    <div class="overlay" v-on:click="tancarMenu"></div>
  </div>
</template>
<!-- {{this.$route.meta.titol}} -->

<script>
  import Navbar from './components/nav/Navbar.vue'
  import { accionsMenuMixin } from './mixins/accionsMenuMixin'

  import { MenuIcon } from 'vue-feather-icons'

  import store from './store.js'

  import Vue from 'vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      MenuIcon
    },
    mixins: [accionsMenuMixin],
    mounted() {
      if(this.$session.exists('token')) {
        const token = this.$session.get('token')
        this.$session.set('token', token)
        Vue.http.headers.common['Authorization'] = 'Bearer ' + token
        store.commit('loggedMusic')
        this.$router.push('/compte/principal');
      }
    }
  }
</script>

<style lang="sass">
  @import ./sass/colors
  @import ./sass/fonts
  @import ./sass/master
  @import ./sass/header
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
    display: grid
    grid-template-rows: 80px auto
    min-height: 100vh

  #content
    background-color: #fffc


  @media (min-width: 1000px)
    #sidebar,
    #menuIcon
      display: none

  @media (max-width: 1000px)
    #botonsCompte
      display: none !important


</style>
