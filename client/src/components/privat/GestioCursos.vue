<template lang="html">
  <main>
    <div class="container">
      <b-button block v-b-modal.formulari @click="mostrarFormulari({}, 'Nou curs')" class="btn btn-info btn-lg mt-3 mb-3">CREAR CURS</b-button>
      <div class="card mb-4" id="cursos" v-for="(curs, index) in cursos" :key="index">
        <h5
          class="card-header"
          v-b-toggle="'collapse-' + index"
          >
          <div v-if="curs.curs_actiu" class="curs-actual">
            <star-icon size="1x"></star-icon>
          </div>
          {{curs.curs}}
        </h5>

        <b-collapse :id="'collapse-' + index" class="text-normal">
          <div v-if="curs.curs_actiu" class="curs-actual-badge">
            curs actual
          </div>
          <div class="card-body">
            <p class="card-text">
              <strong>Director:</strong> {{curs.director}}
            </p>
            <p class="card-text">
              <strong>Anotacions: </strong> {{curs.anotacio}}
            </p>

          </div>
          <div class="card-body botons">
            <b-button variant="outline-danger" @click="eliminarCurs(curs._id)">Eliminar</b-button>
            <b-button variant="outline-info" v-b-modal.formulari @click="mostrarFormulari(curs, 'Modificar curs')">Modificar</b-button>
          </div>
        </b-collapse>
      </div>
    </div>
    <CursForm :info="formulari" :accio="enviarFormulari" />
  </main>
</template>

<script>
  import { StarIcon  } from 'vue-feather-icons'

  import axios from 'axios';

  import CursForm from './formularis/FormulariCurs.vue';

  export default {
    components: {
      StarIcon,
      CursForm
    },
    data() {
      return {
        cursId: 0,
        cursos: [],
        formulari: {
          curs: {},
          titol: ''
        }
      }
    },
    methods: {
      demanarInfo() {
        axios.get('/info/cursos', {withCredentials: true})
        .then(response => {
          this.cursos = response.data.cursos
        })
        .catch(err => console.log(err))
      },
      mostrarFormulari(curs, titol) {
        this.formulari = {
          curs: { ...curs },
          titol: titol
        }
      },
      enviarFormulari() {
        axios.put('/info/curs',  this.formulari.curs)
        .then(response => {
          console.log(response);
          this.demanarInfo();
        })
        .catch(err => console.log(err));
      },
      eliminarCurs(id) {
        axios.delete(`/info/curs/${id}`, {withCredentials: true})
        .then(response => {
          console.log(response);
          this.demanarInfo();
        })
        .catch(err => console.log(err));
      }
    },
    mounted() {
      this.demanarInfo();
    }
  }
</script>

<style lang="sass" scoped>
  .card-header:hover
    cursor: pointer
  .curs-actual
    font-size: 1.3em
    margin-left: -5px
    margin-right: 10px
    display: inline
    svg
      fill: gold
  .curs-actual-badge
    background-color: gold
    font-size: 1.1rem
    text-align: center
    display: block
    padding: 2px
    -webkit-box-shadow: 0px 3px 5px 1px rgba(204,204,204,0.56)
    -moz-box-shadow: 0px 3px 5px 1px rgba(204,204,204,0.56)
    box-shadow: 0px 3px 5px 1px rgba(204,204,204,0.56)
  .botons
    min-height: 38px
    box-sizing: content-box
    padding-top: 5px
    padding-bottom: 10px
    button
      float: right
      margin-right: 10px
      margin-bottom: 5px
      &:first-child
        margin-right: 0

</style>
