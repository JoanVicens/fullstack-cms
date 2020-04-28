<template lang="html">
  <div class="container">
    <b-alert variant="success" :show="alertSucces">{{msg}}</b-alert>
    <b-alert variant="warning" :show="$route.params.msgError">{{$route.params.msgError}}</b-alert>

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
    props: ['msg', 'msgError'],
    data() {
      return {
        alertSucces: false,
        alertWarning: false
      }
    },
    mounted() {
      if(this.msg !== undefined)
        this.alertSucces = true

      if(this.msgError !== undefined)
        this.alertWarning = true
    }
  }
</script>

<style lang="css" scoped>
</style>
