<template lang="html">
  <main>
    <div class="container">
      <Selector
        v-bind:cursId.sync="cursId"
        v-bind:semestreId.sync="semestreId"
        v-bind:actuacioId.sync="actuacioId"
        v-bind:actuacions.sync="actuacions"
        ref="info"

      />
      <div class="">
        <div class="card mb-4" id="actuacio" v-for="(actuacio, index) in actuacions" :key="index">
          <h5
            class="card-header"
            v-b-toggle="'collapse-' + index"
            >
            {{actuacio.titol}}
          </h5>
          <b-collapse :id="'collapse-' + index" class="mt-2 text-normal">
            <div class="card-body">

              <!-- DIA HORA LLOC -->
              <div class="row alert alert-dia-lloc" role="alert" v-if="actuacio.data || actuacio.hora_inici || actuacio.hora_fi || actuacio.lloc">
                <div class="col-sm-6">
                  <div id="dia-hora">
                    <strong>{{actuacio.data | moment("DD MMMM YYYY")}}</strong>
                    <span v-if="actuacio.hora_inici && actuacio.hora_fi">
                      de <strong>{{actuacio.hora_inici}}</strong> a <strong>{{actuacio.hora_fi}}</strong>
                    </span>
                    <span v-else-if="actuacio.hora_inici">
                      a les <strong>{{actuacio.hora_inici}}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div id="lloc" v-if="actuacio.lloc">
                    <a :href="actuacio.lloc" target="_blank">{{actuacio.lloc}}</a>
                    <map-pin-icon size="1x" class="">
                    </map-pin-icon>
                  </div>
                </div>
              </div>

              <!-- INFO -->
              <p class="card-text" v-if="actuacio.descripcio">
                <strong>Descripó: </strong>{{actuacio.descripcio}}
              </p>

              <div v-if="actuacio.repertori">
                <div v-if="actuacio.repertori.length > 0">
                  <strong>Repertori:</strong>
                  <ul clas="card-text">
                    <li v-for="(obra, index) in actuacio.repertori"  v-bind:key="index" >
                      {{obra}}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- ASSISTENTS -->
              <strong>Assistents:</strong>
              <LlistaMusics
                :llistat="actuacio.assistents"
                :nom="actuacio.titol"
                v-if="actuacio.assistents.length > 0"
                v-on:actualitzar="mostrarFormulari(actuacio, 'Modificar assistents', 'formulari-assistencia-musics')"
              />
              <div v-else>
                No hi ha assistents
                <span class="ml-2">
                  <user-plus-icon
                    size="1.5x"
                    class="boto"
                    @click="mostrarFormulari(actuacio, 'Modificar assistents', 'formulari-assistencia-musics')"
                    v-b-modal.formulari-assistencia-musics
                    >
                    </user-plus-icon>
                  </span>
                </div>

              </div> <!--  card-body -->

            <div class="card-footer text-muted">
              <div class="btn-editar row">
                <!-- MODIFICAR -->
                <div class="col-sm-6 editar" @click="mostrarFormulari(actuacio, 'Modificar actuació')" v-b-modal.formulari>
                  <edit-3-icon size="1.5x"></edit-3-icon>
                </div>
                <!-- ELIMINAR -->
                <div class="col-sm-6 borrar" @click="borrar(actuacio._id)">
                  <trash-2-icon size="1.5x"></trash-2-icon>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
        <b-button v-b-modal.formulari @click="mostrarFormulari({}, 'Nova actuació')" class="btn btn-info btn-lg float-right mt-3">CREAR ACTUACIÓ</b-button>
      </div>
    </div>

    <!-- MODAL -->
    <ActuacioForm :info="formulari" :accio="enviarFormulari"/>
    <AssistenciaMusics :formulari="formulari" :accio="modificarAssistents" />
  </main>
</template>

<script>
  import Selector from './Selector.vue';
  import LlistaMusics from './LlistaMusics.vue';
  import ActuacioForm from './formularis/FormulariActuacio.vue'
  import AssistenciaMusics from './formularis/AssistenicaMusics.vue'

  import {MapPinIcon} from 'vue-feather-icons'
  import { Trash2Icon } from 'vue-feather-icons'
  import { Edit3Icon  } from 'vue-feather-icons'
  import { UserPlusIcon  } from 'vue-feather-icons'

  import axios from 'axios';

  export default {
    name: 'GestioActuacions',
    components: {
      Selector,
      LlistaMusics,
      AssistenciaMusics,
      // ICONOS
      MapPinIcon,
      Trash2Icon,
      Edit3Icon,
      ActuacioForm,
      UserPlusIcon
    },
    data() {
      return {
        cursId: 0,
        semestreId: 0,
        actuacioId: 0,
        actuacions: [],
        formulari: {}
      }
    },
    watch: {
      actuacions: {
        handler() {
          console.log('actuacions watcher');
        }
      }
    },
    methods: {
      mostrarFormulari(actuacio, titol, modal) {
        this.formulari = {
          actuacio: { ...actuacio },
          titol: titol
        }
        this.$bvModal.show(modal)
      },
      modificarAssistents(assistents) {
        const actuacioId = this.formulari.actuacio._id;

        axios.put('/info/actuacio/assistents', { actuacioId, assistents })
        .then(response => {
          // this.$forceUpdate();
          this.$refs.info.carregarInfo()
        })
        .catch(err => console.log(err))
      },
      // ACCIONS CONTRA EL BACKEND
      enviarFormulari(actuacio) {
        // Envia la informació tant quan es crea com quan es modifica
        axios.put('/info/actuacio', {
          actuacio,
          semestreId: this.semestreId
        })
        .then(response => {
          this.$refs.info.carregarInfo()
        })
        .catch(err => console.log(err))
      },
      borrar(id) {
        axios.delete(`/info/actuacio/${id}`)
        .then(response => {
          this.$refs.info.carregarInfo()
        })
        .catch(err => {
          console.log(err);
        })
      }

    }
  }
</script>

<style lang="sass" scoped>
  .card
    .btn-editar
      margin: -12px -20px -12px -20px
      text-align: center
      // border-bottom: 1px solid rgba(0, 0, 0, 0.125)
      border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px)
      svg
        padding: 3px
        margin-left: 15px
        border-radius: 5px
      .editar
        padding: 10px
        border-bottom-left-radius: calc(0.25rem - 1px)
        background-color: #53D43E77
        &:hover
          background-color: #53D43E
          svg
            stroke: #fff
      .borrar
        padding: 10px
        border-bottom-right-radius: calc(0.25rem - 1px)
        background-color: #FF574077
        &:hover
          background-color: #FF5740
          svg
            stroke: #fff
  .separacio-interna>
    *
      margin-bottom: 15px
    label
      margin-bottom: 0
  .alert-dia-lloc
    margin: 0 -10px 16px -10px
    // background-color: #517EF2cc
    background-image: linear-gradient(-60deg, #517EF2cc, #517EF2)
    color: #fff
    padding: 12px 6px
    #lloc
      text-transform: capitalize
      text-align: right
      font-weight: bold
      a
        color: #fff !important
      *
        stroke-width: 3
        margin-left: 5px

</style>
