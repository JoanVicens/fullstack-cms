<template lang="html">
  <main class="">
    <div class="container-sm configuracio">
      <div class="text-right mb-2 mt-1">
        <small class="mr-1">
          Tipus de compte
          <span class="badge badge-primary" v-if="music.tipo_compte === 0">normal</span>
          <span class="badge badge-info" v-if="music.tipo_compte === 1">junta</span>
          <span class="badge badge-danger" v-if="music.tipo_compte === 2">president</span>
          <span class="badge badge-dark" v-if="music.tipo_compte === 3">admin</span>
          , 
        </small>
        <small>
          registrat {{ registratFa }}
        </small>

      </div>

      <b-overlay :show="!music.compte_actiu" rounded="sm">
        <template v-slot:overlay v-if="!music.compte_actiu">
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

            <SelectInstrument v-bind:corda.sync="music.corda" />

            <b-form-group
              label="DNI"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="music.dni"
                type="text"
              ></b-form-input>
            </b-form-group>

            <template v-slot:footer>
              <small class="float-right text-muted">Informació necessaria per a obtenir els crèdits</small>
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

      <div class="mt-4">
        <!-- DESCATIVAR -->
        <b-card class="mt-3 mb-2 transparent desactivar" border-variant="warning" v-if="music.compte_actiu">
          <b-card-text class="flex-text">
            <div class="">
              <h5 class="m-0">Desactivar el compte de forma temporal</h5>
              <small class="">
                No sortiràs a llista d'assistència
              </small>
            </div>
            <b-button @click="demanarAutenticacio(desactivarUsuari)" variant="warning" class="dreta">Desactivar ususari</b-button>
          </b-card-text>
        </b-card>

        <!-- ACTIVAR -->
        <b-card class="mt-3 mb-2 transparent activar" border-variant="success" v-else>
          <b-card-text class="flex-text">
            <div class="">
              <h5 class="m-0">Activar el compte</h5>
            </div>
            <b-button @click="demanarAutenticacio(activarUsuari)" variant="success" class="dreta">Activar ususari</b-button>
          </b-card-text>
        </b-card>

        <!-- BORRAR -->
        <b-card class="mt-3 mb-2 transparent borrar">
          <b-card-text class="flex-text">
            <h5 class="m-0">Borrar el compte de forma permanent</h5>
            <b-button @click="demanarAutenticacio(borrarUsuari)">Borrar ususari</b-button>
          </b-card-text>
        </b-card>
      </div>



      <ConfirmacioPassword @autenticat="accio" :email="music.email" />
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  import SelectInstrument from './formularis/SelectInstrument.vue'
  import ConfirmacioPassword from './formularis/ConfirmacioPassword.vue'

  export default {
    name: 'Configuracio',
    components: {
      SelectInstrument,
      ConfirmacioPassword
    },
    data() {
      return {
        music: {},
        accio: 'null',
      }
    },
    computed: {
      registratFa: function() {
        return moment(this.music.data_registre, "YYYY-MM-DD").fromNow();
      }
    },
    methods: {
      activarUsuari() {
        axios.put(`/info/music/activar/${this.music._id}`, {withCredentials: true})
        .then(response => {
          this.music = response.data
          this.modificacionsInfo()
        })
        .catch(console.error)
      },
      desactivarUsuari() {
        axios.put(`/info/music/desactivar/${this.music._id}`, {withCredentials: true})
        .then(response => {
          this.music = response.data
          this.modificacionsInfo()
        })
        .catch(console.error)
      },
      borrarUsuari() {
        axios.delete(`/info/music/${this.music._id}`, {withCredentials: true})
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
        return axios.get('/auth/info', {withCredentials: true}).then(response => {
          this.music = response.data.music
          this.modificacionsInfo()
        })
      },
      onSubmit(evt) {
        evt.preventDefault()

        axios.put('/info/music',  this.music)
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

<style lang="scss" scoped>
  @import '../sass/colors';

  .flex-text {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
  .configuracio {
    background-color: white;
    padding: 1.5rem;
    padding-top: .5rem;
  }
  .desactivar {
    background: linear-gradient(-230deg, #ffc107 60%, white);
    button {
      border: 1px solid  #ffc107;
      background-color:  #ffc107;
      color: white;
    }
  }
  .activar {
    background: linear-gradient(-230deg, #218838 60%, white);
    button {
      border: 1px solid  #218838;
      background-color:  #218838;
      color: white;
    }
  }
  .borrar {
    background: linear-gradient(-230deg, $brick-red 60%, white);
    border: 1px solid $brick-red;
    button {
      border: 1px solid $brick-red;
      background-color: $brick-red;
    }
  }
</style>
