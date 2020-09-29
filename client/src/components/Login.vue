<template lang="html">
  <div class="full-page">
    <section id="login" class="mt-4">

      <NotficacioFixa />

      <form class="container mt-4" @submit.prevent="validator">

        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <input class="form-control" type="text " name="email" v-model="music.email">
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contrasenya</label>
          <input class="form-control" type="password" name="password" v-model="music.password" required>
        </div>

        <div class="pt-3 password-recovery">
          <strong>
            Has oblidat la contrasenya?
            <router-link class="ml-1" :to="{ path: '/recuperacio', params: {} }">clicka aquí!</router-link>
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
    <Copyright />
  </div>
</template>

<script>
  import store from "../store.js";
  import axios from 'axios'

  import Vue from 'vue';

  import NotficacioFixa from './notificacions/NotificacioFixa.vue'
  import Copyright from './Copyright'

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
      NotficacioFixa,
      Copyright
    },
    data () {
      return {
        loggingIn: false,
        music: {
          email: '',
          password: ''
        },
        store,
      }
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
      login(response) {
        this.$session.set('token', response.data.token)
        Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.token

        localStorage.name = response.data.name;
        localStorage.id = response.data._id;
        
        store.commit('loggedMusic')
        store.commit('dismissMessage')
      },
      submit () {
        this.error = '';
        this.loggingIn = true;

        const credencials = {
          email: this.music.email,
          password: this.music.password,
        };

        axios
          .post('/auth/autenticacio', credencials)
          .then(response => { // Responsa del servidor
            if (response.status === 200 && 'token' in response.data) {
              this.login(response)
              this.$router.push({name: 'principal'});
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

<style lang="scss" scoped>
  @import '../sass/colors';

  #login {
    width: 100%;
    max-width: 790px;
    color: white;
    margin: 0 auto;
  }

  .full-page {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .password-recovery {
    color: white;
    a {
      color: $link !important;
    }
  }
</style>
