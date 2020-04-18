<template lang="html">
  <div id="selector" class="row">

    <div class="col-sm-10">
      <span class="titol-selector">Curs</span>
      <select v-model="cursId"  class="custom-select">
        <option v-for="curs in cursos" :key="curs._id" :value="curs._id">{{curs.curs}}</option>
      </select>
    </div>

    <div class="col-sm-2">
      <span class="titol-selector">Semestre</span>
      <b-form-group label="">
        <b-form-radio-group
          v-model="semestreId"
          :options="options"
          buttons
        ></b-form-radio-group>
      </b-form-group>
    </div>

  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'Selector',
    props: {
      selectors: Array
    },
    model: {
      prop: 'id',
      event: 'update'
    },
    data() {
      return {
        cursos: [],
        curs: {},
        cursId: '',

        options: [],
        semestres: [],
        semestre: {},
        semestreId: '',

        actuacions: [],
        assajos: []
      }
    },
    watch: {
      cursId: {
        handler() {
          this.curs = this.cursos.find(curs => curs._id == this.cursId)
          this.actualizar(this.curs)
        }
      },
      semestreId: {
        handler() {
          this.semestre = this.semestres.find(semestre => semestre.semestreId == this.semestreId)

          this.actuacions = this.semestre.actuacions
          this.assajos = this.semestre.assajos

          this.$emit('update:actuacions', this.actuacions);
          this.$emit('update:assajos', this.assajos);
        }
      }
    },
    methods: {
      carregarInfo() {
        axios.get('/info/cursos')
        .then(response => {
          console.log(response);
          this.cursos = response.data.cursos

          //activa el watcher de cursId
          this.cursId = this.cursos.find(curs => curs.curs_actiu == true)._id;
          this.$emit('update:semestreId', this.semestreId);

          this.actualizar(this.curs)
        })
        .catch(err => {
          console.log(err);
        })
      },
      actualizar(curs) {
        this.semestres = curs.semestres
        this.seleccionarSemestreAdient()

        this.options = this.semestres.map((semestre, index) => {
          return {
            text: index + 1,
            value: semestre.semestreId
          }
        })


        this.actuacions = this.semestre.actuacions
        this.assajos = this.semestre.assajos

        this.$emit('update:actuacions', this.actuacions);
        this.$emit('update:assajos', this.assajos);
      },
      seleccionarSemestreAdient() {

        // Calcula a quin semestre ens trobem
        let data = new Date();
        let numeroSemetre = (data.getMonth() > 0 && data.getMonth() < 7) ? 2 : 1;

        // Selecciona per defecte el semestre actiu
        let semestre = this.semestres.find(semestre => semestre.numero == numeroSemetre);

        // activa el watcher de semestreId
        this.semestreId = semestre.semestreId;
        this.$emit('update:semestreId', this.semestreId);

      },
    },
    mounted() {
      this.carregarInfo();
    }
  }
</script>

<style lang="sass" scoped>
  #selector
    // border-bottom: 1px solid rgba(0, 0, 0, 0.125)
    margin-bottom: 10px
    .titol-selector
      font-size: 1.5rem
      margin-bottom: 5px
    .element-selector
      margin-top: 5px
</style>
