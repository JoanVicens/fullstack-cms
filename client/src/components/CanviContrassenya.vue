<template lang="html">
  <div class="container mt-4">
    <b-alert variant="success" :show="error != ''">{{error}}</b-alert>
    <div class="form-group">
      <label for="password">Contrasenya</label>
      <input class="form-control" type="password" name="password" v-model="password" v-on:focusout="validarContrasenya" required>
      <small id="passwordHelpBlock" class="form-text text-muted">
        <ul>
          <li>Entre 8 i 16 caràcters</li>
          <li>Com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial</li>
        </ul>
      </small>
    </div>

    <div class="form-group">
      <label for="confirm_password">Repeteix la contrasenya</label>
      <input class="form-control" type="password" name="confirm_password" v-model="confirm_password" v-on:focusout="validarContrasenya" required>
    </div>


    <button @click="actualitzar" class="btn btn-light btn-lg mt-3 mb-5 float-right" name="button">Actualitzar</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Canviar_la_contrasenya',
    data() {
      return {
        password: '',
        confirm_password: '',
        error: ''
      }
    },
    methods: {
      comprovarContrasenya() {
        if(this.password != this.confirm_password) {
          this.error = 'Les constrasenyes no coincideixen';
          return false;
        } else if(this.password.trim().lenght < 8) {
          this.error = 'La contrasenya ha de tindre un mínim de 8 caracters';
          return false;
        } /*else if(! lletra_numero_caracter.test(this.password)) {
          this.error = 'Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula i un número o caracter espcial';
          return false;
        } */else {
          return true
        }
      },
      validarContrasenya() {
      },
      actualitzar() {
        if(this.comprovarContrasenya() && this.$route.query.token) {

          axios.post('/auth/recuperar', {token: this.$route.query.token, password: this.password})
          .then(() => {
            this.$router.push('/entrar')
          })
          .catch(err => {
            console.error(err);
          })
        }
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
