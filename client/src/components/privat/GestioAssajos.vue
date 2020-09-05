<template lang="html">
  <main>
    <div class="container">
      <Selector
        v-bind:semestreId.sync="semestreId"
        v-bind:assajos.sync="assajos"
        ref="info"

      />

      <div style="height: 50px" class="mb-3">
        <b-button v-b-modal.formulari @click="mostrarFormulari({}, 'Afegir assaig')" class="btn btn-info btn-lg float-right">CREAR ASSAIG</b-button>
        <b-button v-b-modal.formulari-programacio @click="mostrarFormulari({}, 'Afegir assaig', 'formulari-programacio')" class="btn btn-info btn-lg float-right mr-3">PROGRAMAR ASSAJOS</b-button>
        <div class="btn-like btn-light" aria-disabled="true" tabindex="-1">{{assajos.length}} Assajos</div>
      </div>

      <b-list-group>

        <b-list-group-item class="flex-column align-items-center element" v-for="(assaig, index) in assajos" :key="index">

              <div class="w-100 justify-content-between">
                <h5 class="mb-1">{{assaig.data | moment("DD MMMM YYYY")}}</h5>
                <!-- <small>{{assaig.assistencia}}</small> -->
              </div>

              <div class="float-right botons">
                <b-button variant="outline-danger" @click="eliminarAssaig(assaig._id)">Eliminar</b-button>
                <b-button variant="outline-info" v-b-modal.formulari @click="mostrarFormulari(assaig, 'Modificar assaig')">Modificar</b-button>
              </div>

              <div class="inline">
                <p class="mb-1" v-if="assaig.lloc">
                  <map-pin-icon size="1x" class="">
                  </map-pin-icon>
                  {{assaig.lloc}}
                </p>

                <small>
                  De <strong>{{assaig.hora_inici}}</strong> a <strong>{{assaig.hora_fi}}</strong>
                </small>

                <p class="mb-1" >
                  Assistencia: {{assaig.assistencia}}
                </p>
                <p class="mb-1" v-if="assaig.anotacio">
                  Anotació: {{assaig.anotacio}}
                </p>
              </div>
        </b-list-group-item>
      </b-list-group>


    </div>

    <AssaigForm :info="formulari" :accio="enviarFormulari"/>
    <ProgramarAssajos :info="formulari" :accio="insertarAssajos" />
  </main>

</template>

<script>
  import axios from 'axios';

  import Selector from './Selector.vue'
  import AssaigForm from './formularis/FormulariAssaig.vue'
  import ProgramarAssajos from './formularis/ProgramarAssajos.vue'

  import {MapPinIcon} from 'vue-feather-icons'

  export default {
    name: 'GestioAssajos',
    components: {
      Selector,
      AssaigForm,
      ProgramarAssajos,
      MapPinIcon
    },
    data() {
      return {
        semestreId: 0,
        assajos: [],
        formulari: {}
      }
    },
    methods: {
      mostrarFormulari(assaig, titol, modal) {
        if(Object.keys(assaig).length === 0) {
          var info = {
            hora_inici: '19:30:00',
            hora_fi: '21:30:00'
          }
        } else {
          var info = assaig
        }

        this.formulari = {
          assaig: info,
          assajos: {
            dia: 2, // dimarts
            hora_inici: '19:30:00',
            hora_fi: '21:30:00'
          },
          titol: titol
        }
        this.$bvModal.show(modal)
      },
      enviarFormulari(formuari) {
        axios.put('/info/assaig',  { assaig: formuari, semestreId: this.semestreId })
        .then(response => {
          // El selector torna a caragar la info
          this.$refs.info.carregarInfo()
        })
        .catch(err => {
          console.log(err);
        })
      },
      eliminarAssaig(id) {
        axios.delete(`/info/assaig/${id}`, {withCredentials: true})
        .then(response => this.$refs.info.carregarInfo())
        .catch(err => console.log(err))
      },
      insertarAssajos(assajos) {
        axios.put('/info/assajos',  { assajos, semestreId: this.semestreId })
        .then(response => this.$refs.info.carregarInfo())
        .catch(err => console.log(err))
      }

    }
  }
</script>

<style lang="sass" scoped>
  .inline
    display: inline-block
  .botons
    padding-bottom: 0
    margin-bottom: -5px
    button
      margin-bottom: 0
  .btn-like
    padding: 0.5rem 1rem
    font-size: 1.25rem
    line-height: 1.5
    border-radius: 0.3rem
    border: 1px solid transparent
    color: #212529
    background-color: #f8f9fa
    border-color: #f8f9fa
    display: inline-block
</style>
