<template lang="html">
  <div class="">

  </div>
</template>

<script>
  import { store } from "../store.js";
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
      axios.get(this.API_URL)
        .then(response => {
          this.store.commit('logoutMusic');
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
