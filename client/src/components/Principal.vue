<template>
  <main>
    <div class="container">
      <b-alert v-model="errors.noCursActiu" dismissible variant="warning">
        <strong>No hi ha cap curs actiu.</strong>
      </b-alert>
    </div>

    <div class="container">
      <div class="card-columns" v-if="infoCargada">
        <infomarcio-personal class="card" :music="music"/>
        <assistenciaChart class="card" :info="infomarcio"/>
        <DetallAssistenciaSemestres class="card" :info="infomarcio" />
        <concerts class="card" :info="curs.semestres" :id="music._id" />
        <ultimCorreu class="card"/>
        <estatCompte class="card border-0" :compteActiu="music.compte_actiu"/>
      </div>
    </div>
  </main>
</template>

<script>
  import axios  from 'axios'

  import store from '../store.js'

  import infomarcioPersonal from './targetes/InformacioPersonal.vue'
  import assistenciaChart from './targetes/AssistenciaChart.vue'
  import DetallAssistenciaSemestres from './targetes/Semestres.vue'
  import concerts from './targetes/Concerts.vue'
  import ultimCorreu from './targetes/UltimCorreu.vue'
  import estatCompte from './targetes/EstatCompte.vue'

  export default {
    name: 'Principal',
    components: {
      infomarcioPersonal,
      assistenciaChart,
      DetallAssistenciaSemestres,
      concerts,
      ultimCorreu,
      estatCompte
    },
    data() {
      return {
        music: {},
        curs: {},
        errors: {
          noCursActiu: false
        },
        infomarcio: {},
        infoCargada: false,
        store
      }
    },
    methods: {
      carregarInfoMusic() {
        return axios.get('/auth/info', {withCredentials: true})
        .then(response => {
          console.log(response);
          this.music = response.data.music
        })
      },
      carregarInfoCursActiu() {
        return axios.get('/info/curs/actiu', {withCredentials: true})
        .then(response => {
          if(response.data.curs === null) {
            this.errors.noCursActiu = true
          } else {
            this.curs = response.data.curs
          }
        })
      },
      calcularAssistencia() {

        if(this.errors.noCursActiu) return

        this.infomarcio.semestres = []

        this.curs.semestres.forEach((semestre, index) => {
            let assajosAssistits = 0;

            semestre.assajos.forEach(assaig => {
              if(assaig.assistents.includes(this.music._id))
                assajosAssistits++
            });

            let assajosSemestre = semestre.assajos.length

            let percentatge = (assajosAssistits * 100) / assajosSemestre

            this.infomarcio.semestres.push({
              assajosAssistits,
              assajosSemestre,
              percentatge
            })
        });
      }
    },
    mounted() {
      Promise.all([this.carregarInfoMusic(), this.carregarInfoCursActiu()])
      .then(() => {

        localStorage.id = this.music._id
        localStorage.idCursActiu = this.curs._id

        // Guarda en local el tipus de compte
        if(this.music.tipo_compte == 2) {
          this.store.commit('esJunta');
        } else if (this.music.tipo_compte == 3) {
          this.store.commit('esAdmin');
        }

        this.infomarcio.curs = this.curs.curs
        this.calcularAssistencia();

        this.infoCargada = true
      })
      .catch(err => {
        console.log(err);
        this.$router.push('/')
      })
    }
  }
</script>

<style lang="sass" scoped>
  main
    color: #444
    padding-top: 0
  td
    background-color: #fff
</style>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap';

  .card-columns {
    @include media-breakpoint-only(sm) {
      column-count: 1;
    }
    @include media-breakpoint-only(md) {
      column-count: 2;
    }
    @include media-breakpoint-only(lg) {
      column-count: 2;
    }
    @include media-breakpoint-only(xl) {
      column-count: 3;
    }
  }


</style>
