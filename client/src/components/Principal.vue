<template>
  <main class="container pt-4">
    <div class="card-columns" v-if="infoCargada">
      <InfomarcioPersonal class="card" :music="music"/>
      <DetallAssistenciaSemestres class="card" :info="infomarcio" />
      <AssistenciaChart class="card" :info="infomarcio"/>
      <Actuacions class="card" :info="curs.semestres" :id="music._id" />
      <Newsletters class="card"/>
      <EstatCompte class="card border-0" :compteActiu="music.compte_actiu"/>
    </div>
  </main>
</template>

<script>
  import axios  from 'axios'

  import store from '../store.js'

  import InfomarcioPersonal from './targetes/InformacioPersonal.vue'
  import AssistenciaChart from './targetes/AssistenciaChart.vue'
  import DetallAssistenciaSemestres from './targetes/Semestres.vue'
  import Actuacions from './targetes/Actuacions.vue'
  import Newsletters from './targetes/Newsletters.vue'
  import EstatCompte from './targetes/EstatCompte.vue'

  export default {
    name: 'Principal',
    components: {
      InfomarcioPersonal,
      AssistenciaChart,
      DetallAssistenciaSemestres,
      Actuacions,
      Newsletters,
      EstatCompte
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
        return axios.get('/auth/info')
        .then(response => {
          this.music = response.data.music
        })
      },
      carregarInfoCursActiu() {
        return axios.get('/info/curs/actiu')
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
        // localStorage.idCursActiu = this.curs._id

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
    column-gap: .75rem !important;

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
