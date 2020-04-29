<template lang="html">
  <div class="container mt-4">
    <b-alert variant="success" :show="enviatCorrectament">Si el correu coincideix amb un email registrar s'enviarà un correu amb les indicacions per recuperar el compte</b-alert>
    <b-alert variant="danger" :show="error !== ''">{{error}}</b-alert>
    <div class="form-group">
      <label for="email">Email</label>
      <div class="input-group">
        <input class="form-control" type="text " name="email" v-model="email">
      </div>
      <b-button variant="info" class="btn mb-2 mt-4 float-right" @click="recuperar">Recuperar</b-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'recuperacio',
    data() {
      return {
        email: '',
        enviatCorrectament: false,
        error: ''
      }
    },
    methods: {
      recuperar() {
        axios.post('/auth/token_recuperacio')
        .then(response => {
          this.enviatCorrectament = true
        })
        .catch(err => {
          this.error = "Ho sentim, no s'ha trovat el correu"
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
