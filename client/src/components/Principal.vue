<template>
  <main class="container pt-4">
    <div class="card-columns" v-if="!loading">
      <InfomarcioPersonal class="card" :music="info.user"/>
      <DetallAssistenciaSemestres class="card" :info="info.attendance" />
      <AssistenciaChart class="card" :info="info.attendance"/>
      <Actuacions class="card" />
      <Newsletters class="card"/>
      <EstatCompte class="card border-0" :compteActiu="info.user.compte_actiu"/>
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
        store,
        loading: true,
        info: null
      }
    },
    mounted() {
      axios.get('/info/me')
      .then(response => {
        this.info = response.data;

        if(this.info.user.tipo_compte == 2) {
          this.store.commit('esJunta');
        } else if(this.info.user.tipo_compte == 3) {
          this.store.commit('esAdmin');
        }
      })
      .catch(err => {
        console.error(err)
        this.$router.push('/')
      })
      .finally(() => {
        this.loading = false
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
