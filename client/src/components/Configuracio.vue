<template lang="html">
  <main class="pb-5">
    <div class="mt-3 container-sm">
      <!--" @reset="onReset" -->
      <b-overlay :show="!music.compte_actiu" rounded="sm">

        <template v-slot:overlay>
          <h2>El compte no està actiu</h2>
        </template>



        <b-form @submit="onSubmit" class="mb-3">
          <b-card class="mb-3 transparent" border-variant="info">
            <b-form-group
              label="Nom"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="music.nom"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Cognoms"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="music.cognoms"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Instrument"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="music.instrument"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="DNI"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="music.dni"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <template v-slot:header>
              <small class="float-right">Informació necessaria per a obtenir els crèdits</small>
            </template>

          </b-card>

          <b-form-group
            label="AL"
            label-for="input-x"
          >
            <b-input-group append="@uji.es">
              <b-form-input
                id="input-x"
                v-model="music.al"
                type="text"

              ></b-form-input>
            </b-input-group>

          </b-form-group>

          <b-form-group
            label="Correu"
            label-for="input-x"
            description="Si no has introduit el teu al has d'introduir un correu de contacte"
          >
            <b-form-input
              id="input-1"
              v-model="music.email"
              type="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Telefon"
            label-for="input-x"
          >
            <b-form-input
              id="input-1"
              v-model="music.telefon"
              type="tel"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            label="Data de naixement"
            label-for="input-x"
          >
            <b-form-input
              id="input-x"
              v-model="music.data_naixement"
              type="date"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Tipus de compte"
            label-for="input-x"
          >
            <b-form-input
              id="input-x"
              v-model="music.tipo_compte"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Registrat"
            label-for="input-x"
          >
            <b-form-input
              id="input-x"
              v-model="music.registratFa"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-checkbox
              v-model="music.llista_correu"
            >
              Vull rebre correus informatius
            </b-form-checkbox>
          </b-form-group>


          <b-button type="submit" variant="info">Guardar</b-button>
        </b-form>
      </b-overlay>


      <!-- DESCATIVAR -->
      <b-card class="mt-5 mb-2 transparent" border-variant="warning" v-if="music.compte_actiu">
         <b-card-text class="flex-text">
           <div class="">
             <h5 class="m-0">Desactivar de forma temporal el compte</h5>
             <small class="">
               No sortiràs a llista d'assistència
             </small>
           </div>
           <b-button @click="demanarAutenticacio(desactivarUsuari)" variant="warning" class="dreta">Desactivar ususari</b-button>
         </b-card-text>
      </b-card>

      <!-- ACTIVAR -->
      <b-card class="mt-5 mb-2 transparent" border-variant="success" v-else>
         <b-card-text class="flex-text">
           <div class="">
             <h5 class="m-0">Activar el compte</h5>
           </div>
           <b-button @click="demanarAutenticacio(activarUsuari)" variant="success" class="dreta">Activar ususari</b-button>
         </b-card-text>
      </b-card>

      <!-- BORRAR -->
      <b-card class="mt-3 mb-2 transparent " border-variant="danger">
         <b-card-text class="flex-text">
           <h5 class="m-0">Borrar de forma permanent el compte</h5>
           <b-button @click="demanarAutenticacio(borrarUsuari)" variant="danger">Borrar ususari</b-button>
         </b-card-text>
      </b-card>

      <Confirmacio @autenticat="accio" :email="music.email" />
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  import Confirmacio from './formularis/ConfirmacioEliminacio.vue'

  export default {
    name: 'Configuracio',
    components: {
      Confirmacio
    },
    data() {
      return {
        music: {},
        accio: 'null'
      }
    },
    methods: {
      activarUsuari() {
        axios.put(`/info/music/activar/${this.music._id}`)
        .then(response => {
          console.log(response);
          this.music = response.data
          this.modificacionsInfo()
        })
        .catch(console.error)
      },
      desactivarUsuari() {
        axios.put(`/info/music/desactivar/${this.music._id}`)
        .then(response => {
          console.log(response);
          this.music = response.data
          this.modificacionsInfo()
        })
        .catch(console.error)
      },
      borrarUsuari() {
        axios.delete(`/info/music/${this.music._id}`)
        .then(response => {
          this.$router.push({ path: '/', params: { msg: 'Compte borrat correctament' } })
        })
        .catch(console.error)
      },
      demanarAutenticacio(accio) {
        this.accio = accio
        this.$bvModal.show('formulari')
      },
      modificacionsInfo() {
        this.music.data_naixement = this.music.data_naixement.split('T')[0]
        this.music.registratFa = moment(this.music.data_registre, "YYYY-MM-DD").fromNow();
      },
      carregarInfoMusic() {
        return axios.get('/auth/info').then(response => {
          this.music = response.data.music
          this.modificacionsInfo()
        })
      },
      onSubmit(evt) {
        evt.preventDefault()

        axios.put('/info/music', this.music)
        .then(response => {
          console.log(response);
          this.music = response.data
          this.modificacionsInfo()
        })
        .catch(console.error)
      }
    },
    mounted() {
      this.carregarInfoMusic()
      .then(console.log)
      .catch(console.error)
    }
  }
</script>

<style lang="sass" scoped>
  .flex-text
    display: flex
    align-content: space-between
    justify-content: space-between
    align-items: center
    flex-direction: row
  .desactivat


</style>
