<template>
  <main>
    <div class="container">
      <div class="card-columns">
        <infomarcio-personal class="card" :music="this.music"/>
        <assistenciaChart class="card"/>
        <semestres class="card" :semestres="this.curs.semestres" :id="this.music._id"/>
        <concerts class="card"/>
        <peticioCredits class="card"/>
        <estatCompte class="card border-0"/>
      </div>
    </div>
  </main>
</template>

<script>
  import { store } from "../store.js";
  import axios from 'axios'

  // COMPONENTS
  import assistenciaChart from './targetes_music/AssistenciaChart.vue'
  import semestres from './targetes_music/Semestres.vue'
  import infomarcioPersonal from './targetes_music/InformacioPersonal.vue'
  import concerts from './targetes_music/Concerts.vue'
  import peticioCredits from './targetes_music/PeticioCredits.vue'
  import estatCompte from './targetes_music/EstatCompte.vue'



  export default {
    name: 'Principal',
    components: {
      assistenciaChart,
      semestres,
      infomarcioPersonal,
      concerts,
      peticioCredits,
      estatCompte
    },
    data() {
      return {
        store,
        music: {},
        curs: {},
        events: [],
        value: '',
        context: null,
        labels: {
          val: {
            labelPrevYear: 'Any anterior',
            labelPrevMonth: 'Mes anterior',
            labelCurrentMonth: 'Mes actual',
            labelNextMonth: 'Mes següent',
            labelNextYear: 'Any següent',
            labelToday: 'Hui',
            labelSelected: 'Seleccionat',
            labelNoDateSelected: 'No seleccionat',
            labelCalendar: 'calendari',
            labelNav: 'Navegació calendari',
            labelHelp: ''
          }
        }
      }
    },
    methods: {
      carregarInfo() {
        axios.get('/auth/info')
          .then(response => {
            this.music = response.data.music

            // Guarda en local el tipus de compte
            if(this.music.tipo_compte == 2) {
              this.store.commit('esJunta');
            } else if (this.music.tipo_compte == 3) {
              console.log('es admin');
              this.store.commit('esAdmin');
            }
          })
          .catch(err => console.log(err));

        axios.get('/info/curs_actiu')
          .then(response => {
            this.curs = response.data.curs
          })
          .catch(err => console.log(err))
      }
    },
    mounted() {
      let me = this;
      setTimeout(function () {
        me.events = [ // you can make ajax call here
          {
            id:1,
            title:'Event 1',
            color: 'panel-danger',
            date: new Date()
          }
        ];
      }, 1000);
      this.carregarInfo();
    }
  }
</script>

<style lang="sass" scoped>
  main
    color: #444
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
