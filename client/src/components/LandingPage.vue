<template lang="html">
  <div class="container">
    <b-alert variant="success" :show="mostratAlert">{{msg}}</b-alert>

    <div class="mt-3">
      <router-link :to="{ path: '/comptes/crear', name:'crearCompte', params: {} }" class="btn btn-outline-light float-right">Crear comopte</router-link>
      <router-link :to="{ path: '/comptes/entrar', name:'login', params: {} }" class="btn btn-outline-light float-right mr-3">Entrar</router-link>
    </div>
    <div class="display-1">
      LANDIGN PAGE
    </div>
    <small>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </small>
  </div>
</template>

<script>
  export default {
    name: 'landingPage',
    props: ['msg'],
    data() {
      return {
        mostratAlert: false
      }
    },
    mounted() {
      if(this.msg !== undefined)
        this.mostratAlert = true
    }
  }
</script>

<style lang="css" scoped>
</style>
