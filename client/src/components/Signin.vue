<template lang="html">
  <section class="container">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{error}}
    </div>
    <form class="" @submit.prevent="validator">
      <div class="form-group">
        <label for="nom">Nom</label>
        <div class="input-group">
          <input class="form-control" type="text " name="nom" v-model="music.nom" required>
        </div>
      </div>

      <div class="form-group">
        <label for="cognoms">Cognoms</label>
        <div class="input-group">
          <input class="form-control" type="text " name="cognoms" v-model="music.cognoms" required>
        </div>
      </div>

      <div class="form-group">
        <label for="dni">DNI</label>
        <div class="input-group">
          <input class="form-control" type="text " name="dni" v-model="music.dni">
        </div>
      </div>


      <div class="form-group">
        <label for="instrument">Intrument</label>
        <div class="input-group">
          <input class="form-control" type="text " name="instrument" v-model="music.instrument" required>
        </div>
      </div>

      <div class="form-group">
        <label for="data_naixement">Data de naixement</label>
        <b-form-datepicker block
          v-model="music.data_naixement"
          :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
          :start-weekday="1"
          ></b-form-datepicker>
      </div>

      <div class="form-group">
        <label for="al">al</label>
        <div class="input-group">
          <input class="form-control" type="text" name="al" v-model="music.al">
          <div class="input-group-append">
            <span class="input-group-text">@uji.es</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email alternatiu</label>
        <div class="input-group">
          <input class="form-control" type="text " name="email" v-model="music.email">
        </div>
      </div>

      <div class="form-group">
        <label for="telefon">Telefon</label>
        <div class="input-group">
          <input class="form-control" type="text " name="telefon" v-model="music.telefon">
        </div>
      </div>

      <div class="form-group">
        <label for="password">Contrasenya</label>
        <input class="form-control" type="password" name="password" v-model="music.password" v-on:focusout="validarContrasenya" required>
        <small id="passwordHelpBlock" class="form-text text-muted">
          <ul>
            <li>Entre 8 i 16 caràcters</li>
            <li>Com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial</li>
          </ul>
        </small>
      </div>

      <div class="form-group">
        <label for="confirm_password">Repeteix Contrasenya</label>
        <input class="form-control" type="password" name="confirm_password" v-model="music.confirm_password" v-on:focusout="validarContrasenya" required>
      </div>

      <button type="submit" class="btn btn-primary" name="button">Crear compte</button>
    </form>
  </section>
</template>

<script>
  // Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial
  const lletra_numero_caracter = new RegExp(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/);

  import axios from 'axios'
  import { store } from '../store.js'

  export default {
    name: 'signin',
    components: {

    },
    data () {
      return {
        error: '',
        music: {
          nom: '',
          cognoms: '',
          dni: '',
          al: null,
          email: '',
          telefon: '',
          instrument: '',
          data_naixement: null,
          data_registre: null,
          tipo_compte: 0,
          compte_verificat: false,
          password: '',
          confirm_password: '',
        },
        store,
        API_URL: ''
      }
    },
    created() {
      this.API_URL = `/auth/signup`
    },
    watch: {
      music: {
        handler() {
          this.error = '';
          document.querySelectorAll('input[type=password]').forEach(input => input.classList.remove('is-invalid'))
        },
        deep: true,
      }
    },
    methods: {
      validarContrasenya(e) {
        console.log('validarContrasenya');
        const input = e.target;
        const contrasenya = input.value;
        if(contrasenya.trim().length < 8) {
          this.error = 'La contrasenya ha de tindre un mínim de 8 caracters';
          input.classList.add('is-invalid');
        } else if(! lletra_numero_caracter.test(contrasenya)) {
          this.error = 'Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula i un número o caracter espcial';
          input.classList.add('is-invalid');
        }
      },
      submit () {
        axios
          .post(this.API_URL, this.music)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
            this.error = err.message
          })
      },
      validator() {
        console.log('validator');
        if(this.music.password != this.music.confirm_password) {
          this.error = 'Les constrasenyes no coincideixen';
          return false;
        } else if(this.music.password.trim().lenght < 8) {
          this.error = 'La contrasenya ha de tindre un mínim de 8 caracters';
          return false;
        } else if(! lletra_numero_caracter.test(this.music.password)) {
          this.error = 'Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula i un número o caracter espcial';
          return false;
        } else {
          this.submit();
        }
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
