<template lang="html">
  <div>
    <section class="container sig-in p-4">

      <NotificacioFixa />

      <form class="" @submit.prevent="validator">

        <small class="text-muted float-right">Els camps amb * són obligatoris</small>

        <h4 class="mb-3">Informació personal</h4>

        <div class="form-group">
          <label for="nom">Nom *</label>
          <div class="input-group">
            <input class="form-control" type="text " name="nom" v-model="music.nom" required>
          </div>
        </div>

        <div class="form-group">
          <label for="cognoms">Cognoms *</label>
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

        <SelectInstrument v-bind:corda="music.corda" />

        <div class="form-group">
          <label for="data_naixement">Data de naixement</label>
          <b-form-datepicker block
            v-model="music.data_naixement"
            :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
            :start-weekday="1"
            ></b-form-datepicker>
        </div>

        <b-form-group label="Sexe">
          <b-form-radio-group
            v-model="music.sexe"
            :options="opcions_sexe"
          ></b-form-radio-group>
        </b-form-group>

        <hr class="mt-4">
        <h4 class="mt-2">Informació de contacte</h4>
        <small class="text-muted mb-3">
          Com a mínim has d'introduir un correu ja sigui el al o el teu personal
        </small>

        <div class="form-group mt-3">
          <label for="al">AL</label>
          <div class="input-group">
            <input class="form-control" type="text" name="al" v-model="music.al">
            <div class="input-group-append">
              <span class="input-group-text">@uji.es</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <input class="form-control" type="text " name="email" v-model="music.email">
          </div>
          <small  class="form-text text-muted">
            Si especifiques un correu s'utilitzarà aquesta per defecte
          </small>
        </div>

        <div class="form-group">
          <label for="telefon">Telefon</label>
          <div class="input-group">
            <input class="form-control" type="text " name="telefon" v-model="music.telefon">
          </div>
        </div>

        <b-form-group>
          <b-form-checkbox
            v-model="music.grup_whatsapp"
            :disabled="music.telefon === ''"
          >
            Vull que se m'afegeixi al grup de whatsapp
          </b-form-checkbox>
        </b-form-group>

        <hr class="mt-4">

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
          <label for="confirm_password">Repeteix la contrasenya</label>
          <input class="form-control" type="password" name="confirm_password" v-model="music.confirm_password" v-on:focusout="validarContrasenya" required>
        </div>

        <hr class="mt-4">
        <h4 class="mt-2">Newsletter</h4>

        <b-form-group>
          <b-form-checkbox
            v-model="music.llista_correu"
          >
            Vull rebre correus informatius
          </b-form-checkbox>
        </b-form-group>

        <button type="submit" class="btn btn-light btn-lg mt-3 mb-5 float-right" name="button">Crear compte</button>
        <b-button variant="info" class="btn-lg mb-2 float-right mt-3 mb-5 mr-3" @click="$router.push('/')">Atras</b-button>
      </form>
    </section>

    <Copyright />
  </div>
</template>

<script>
  import NotificacioFixa from './notificacions/NotificacioFixa.vue'
  import Copyright from './Copyright'

  // Comporova que la contrasenya tingui com a mínim una lletra minúscula, una majuscula, un número i un caracter espcial
  const lletra_numero_caracter = new RegExp(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/);

  import axios from 'axios'
  import store from '../store.js'

  import SelectInstrument from './formularis/SelectInstrument.vue';

  export default {
    name: 'signin',
    components: {
      NotificacioFixa,
      SelectInstrument,
      Copyright
    },
    data () {
      return {
        store,
        music: {
          nom: '',
          cognoms: '',
          dni: '',
          al: null,
          email: '',
          telefon: '',
          corda: '',
          data_naixement: null,
          data_registre: null,
          tipo_compte: 0,
          compte_verificat: false,
          password: '',
          confirm_password: '',
          llista_correu: true,
          grup_whatsapp: false
        },
        opcions_sexe: [
          { text: 'Dona', value: 'Dona' },
          { text: 'Home', value: 'Home' },
          { text: 'Altre', value: 'Altre' },
        ]
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
          .post('/auth/registrar', this.music)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
            this.error = err.message
          })
      },
      validator() {
        this.submit();
      }
    }
  }
</script>

<style lang="scss" scoped>
  #passwordHelpBlock {
    ul {
      list-style: disc !important;
      display: block;
      padding-left: 20px;
      li {
        display: list-item;
        padding: 6px;
      }
    }
  }

  .sig-in {
    background-color: #fff;
    padding-bottom: calc(1.5rem + 60px) !important;
  }

</style>
