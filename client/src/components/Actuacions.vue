<template lang="html">
  <main>
    <div class="container-sm">
      <b-card no-body class="overflow-hidden mb-3" v-for="(actuacio, index) in actuacions" :key="index">
        <div class="custom-card">
          <b-card-body :title="actuacio.titol">
            <b-card-text>
            </b-card-text>
            <b-card-text>
              <h5>Repertori:</h5>
              <ul>
                <li v-for="(obra, index) in actuacio.repertori" :key="index">
                  {{obra}}
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </div>

        <div class="border rounded m-2">
          <div class="assistencia" v-if="haAssistit(actuacio.assistents)">
            <button type="button" class="btn btn-danger float-right" @click="noAssistir(actuacio._id)" >No hi podré assistir ;(</button>
            <span class="si"></span>
            Assistiré
          </div>

          <div class="assistencia" v-else>
            <button type="button" class="btn btn-success float-right" @click="assistir(actuacio._id)">Si que hi assistiré!!</button>
            <span class="no"></span>
            No hi assistiré
          </div>
        </div>
      </b-card>
    </div>
  </main>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Actuacions',
    data() {
      return {
        actuacions: [],
        errors: {}
      }
    },
    methods: {
      avui() {
        return new Date();
      },
      haAssistit(assistents) {
        return assistents.includes(localStorage.id)
      },
      assistir(idActuacio) {
        axios.put('/info/actuacio/afegir/assistent',  {idAssistent: localStorage.id, idActuacio})
        .then(response => {
          this.actuacions = []
          this.carregarInfo()
        })
        .catch(err => {
          console.log(err);
        })
      },
      noAssistir(idActuacio) {
        console.log(localStorage.id, idActuacio);
        axios.put('/info/actuacio/llevar/assistent',   {idAssistent: localStorage.id, idActuacio})
        .then(response => {
          this.actuacions = []
          this.carregarInfo()
        })
        .catch(err => {
          console.log(err);
        })
      },
      carregarInfo() {
        axios.get('/info/actuacio/actiu', {withCredentials: true})
        .then(response => {
          if(response.data.curs === null) {
            this.errors.noCursActiu = true
          } else {
            let curs = response.data.curs
            curs.semestres.forEach(semestre => {
              semestre.actuacions.forEach(actuacio => {
                let dataActuacio = Date.parse(actuacio.data)
                if(dataActuacio >= this.avui()) {
                  this.actuacions.push(actuacio)
                }
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.carregarInfo()
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap'
  @import ../sass/colors
  @import ../sass/botons

  .assistencia
    align-self: stretch
    padding: 6px 8px
    font-size: 1.25rem
    min-width: 100px
    line-height: 38px
    span
      border-radius: 100%
      width: 15px
      height: 15px
      display: inline-block
      margin-right: 5px
    span.no
      background-color: $rojet
    span.si
      background-color: $verdet


</style>
