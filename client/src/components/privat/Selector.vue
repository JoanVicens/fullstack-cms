<template lang="html">
  <div id="selector" class="row">

    <div class="col-sm-10">
      <span class="titol-selector">Curs</span>
      <div>
        <select v-model="cursId"  class="custom-select">
          <option v-for="curs in cursos" :key="curs._id" :value="curs._id">{{curs.curs}}</option>
        </select>
      </div>
    </div>

    <div class="col-sm-2">
      <span class="titol-selector">Semestre</span>
      <div>
        <b-form-group label="">
          <b-form-radio-group
            v-model="semestreId"
            :options="options"
            buttons
          ></b-form-radio-group>
        </b-form-group>
      </div>
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
      forcarUpdate() {
        this.carregarInfo();

        let curs = this.cursos.find(curs => curs._id == this.cursId)
        let semestre = curs.semestres.find(semestre => semestre.semestreId === this.semestreId)
        let actuacions = this.semestre.actuacions
      },
      carregarInfo() {
        axios.get('/info/cursos')
        .then(response => {
          response.data.cursos.forEach((curs, index) => {
            this.$set(this.cursos, index, curs)
          })

          let cursActiu = this.cursos.find(curs => curs.curs_actiu == true) || this.cursos[this.cursos.length - 1]
          let idCursActiu = cursActiu._id

          if(this.cursId != idCursActiu) {
            //activa el watcher de cursId
            this.cursId = idCursActiu;
            this.$emit('update:semestreId', this.semestreId);
          } else {
            this.curs = this.cursos.find(curs => curs._id == this.cursId)
            this.actualizar(this.curs)
          }

          this.actualizar(this.curs)
        })
        .catch(err => {
          console.log(err);
        })
      },
      actualizar(curs) {
        curs.semestres.forEach((semestre, index) => {
          this.$set(this.semestres, index, semestre)
        });

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

        if(this.semestreId != semestre.semestreId) {
          // activa el watcher de semestreId
          this.semestreId = semestre.semestreId;
        } else {
          this.semestre = this.semestres.find(semestre => semestre.semestreId == this.semestreId)

          this.actuacions = this.semestre.actuacions
          this.assajos = this.semestre.assajos

          this.$emit('update:actuacions', this.actuacions);
          this.$emit('update:assajos', this.assajos);
        }
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
    .titol-selector + div
      margin-top: 3px
    .element-selector
      margin-top: 5px

  .btn-group
    display: flex

  .btn-group .btn
    flex: 1
</style>
