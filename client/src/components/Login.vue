<template lang="html">

  <section class="container mt-4">
    <!-- <b-breadcrumb :items="breadcrumb" class="mb-4"></b-breadcrumb> -->

    <div v-if="error" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <form class="" @submit.prevent="validator">

      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-group">
          <input class="form-control" type="text " name="email" v-model="music.email">
        </div>
      </div>

      <div class="form-group">
        <label for="password">Contrasenya</label>
        <input class="form-control" type="password" name="password" v-model="music.password" v-on:focusout="validarContrasenya" required>
      </div>

      <div class="pt-3">
        <strong>
          Has oblidat la contrasenya?
          <router-link :to="{ path: '/recuperacio', params: {} }">clicka aquí!</router-link>
        </strong>
      </div>

      <div class="row mt-5">
        <div class="col-sm-3 d-none d-sm-block">
          <b-button variant="info" class="btn-lg btn-block mb-2" @click="$router.push('/')">Atras</b-button>
        </div>
        <div class="col-sm-9">
          <button type="submit" class="btn btn-primary btn-lg btn-block" name="button">Entrar</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import store from "../store.js";
  import axios from 'axios'

  import Vue from 'vue';

  const lletra_numero_caracter = new RegExp('^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$');
  //https://gist.github.com/ravibharathii/3975295

  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  // Passwords will contain at least 8 characters in length
  // Password maximum length should not be arbitrarily limited



  export default {
    name: 'login',
    components: {

    },
    data () {
      return {
        error: '',
        loggingIn: false,
        music: {
          email: '',
          password: ''
        },
        store,
        API_URL: '',
      }
    },
    watch: {
      music: {
        handler() {
          this.error = '';
          document.querySelectorAll('input[type=password]').forEach(input => input.classList.remove('is-invalid'))
        },
        deep: true,
      },
    },
    created() {
      this.API_URL = `/auth/autenticacio`
    },
    methods: {
      validarContrasenya(e) {
        // const input = e.target;
        // const contrasenya = input.value;
        // if(contrasenya.trim().length < 8) {
        //   this.error = 'La contrasenya ha de tindre un mínim de 8 caracters';
        //   input.classList.add('is-invalid');
        // } else if(! lletra_numero_caracter.test(contrasenya)) {
        //   this.error = 'Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial';
        //   input.classList.add('is-invalid');
        // }
      },
      submit () {
        this.error = '';
        this.loggingIn = true;

        const credencials = {
          email: this.music.email,
          password: this.music.password,
        };

        axios
          .post(this.API_URL, credencials)
          .then(response => { // Responsa del servidor
            if (response.status === 200 && 'token' in response.data) {
              // this.$session.start()
              this.$session.set('token', response.data.token)
              Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.token

              store.commit('loggedMusic')

              this.$router.push('/compte/principal');

            }
          })
          .catch(err => {
            console.log(err);
            setTimeout(() => {
              this.loggingIn = false;
              this.error = err.message;
            }, 1000);
          });
      },
      validator() {
        this.submit();
        /*
        if(this.music.password.trim().lenght < 8) {
          this.error = 'La contrasenya ha de tindre un mínim de 8 caracters';
          return false;
        } else if(! lletra_numero_caracter.test(this.music.password)) {
          this.error = 'Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial';
          return false;
        } else {
          this.submit();
        }
        */
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
