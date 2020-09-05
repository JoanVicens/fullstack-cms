<template lang="html">
  <div class="">

  </div>
</template>

<script>
  import store from "../store.js";
  import axios from 'axios'

  export default {
    name: 'logout',
    data() {
      return {
        store,
        API_URL: ''
      }
    },
    created() {
      this.API_URL = '/auth/logout'
    },
    mounted() {
      axios.get(this.API_URL, {withCredentials: true})
        .then(response => {
          store.commit('logoutMusic');
          localStorage.removeItem('musics')
          localStorage.removeItem('cursos')
          localStorage.removeItem('cursIdSeleccionat')
          localStorage.removeItem('idCursActiu')
          localStorage.removeItem('id')
          this.$session.clear('token')
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>

<style lang="css" scoped>
</style>
