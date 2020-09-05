<template lang="html">
  <main>
    <div class="container">
      <div id="assistencia">
        <h2>Assistència per semestres</h2>
        <div class="row opcions-grafic">
          <div class="col-xs-12 col-sm-4">
            <b-form-group label="Semestre">
              <b-form-radio-group
                v-model="semestreId"
                :options="optionsSemestre"
                buttons
              ></b-form-radio-group>
            </b-form-group>
          </div>
          <div class="col-xs-12 col-sm-4 offset-sm-4 push-down">
            <b-form-checkbox
              v-model="separarCordes"
            >
              Separar per cordes
            </b-form-checkbox>
          </div>
        </div>

        <div class="grafic">
          <AssistenciaChart :chartData="{labels, datasets: dataset}" :options="options" v-if="dataset.length > 0"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import AssistenciaChart from  './charts/AssistenciaChart'

  import axios from 'axios'

  export default {
    name: 'dashboard',
    components: {
      AssistenciaChart
    },
    data() {
      return {
        totalAssistents: [],
        curs: {},
        musics: [],
        semestreId: '',
        optionsSemestre: [],
        options: {
          responsive: true,
          title: {
            display: false,
          },
          scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]
          },
          maintainAspectRatio: false
        },
        separarCordes: false,
        labels: [],
        dataset: [],
        assistenciaCordes: {
          Clarinets: {
            label: "Clarinets",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(144, 103, 167, 1)",
            pointBackgroundColor: "rgba(107, 76, 154, 1)"
          },
          Flautes: {
            label: "Flautes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(225, 151, 76, 0.50)",
            pointBackgroundColor: "rgba(218, 124, 48, 1)"
          },
          Oboes: {
            label: "Oboes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(132, 186, 91, 0.50)",
            pointBackgroundColor: "rgba(62, 150, 81, 1)"
          },
          Saxos: {
            label: "Saxos",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(211, 94, 96, 0.50)",
            pointBackgroundColor: "rgba(204, 37, 41, 1)"
          },
          Tubes: {
            label: "Tubes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(128, 133, 133, 0.50)",
            pointBackgroundColor: "rgba(83, 81, 84, 1)"
          },
          Trombons: {
            label: "Trombons",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(171, 104, 87, 0.50)",
            pointBackgroundColor: "rgba(146, 36, 40, 1)"
          },
          Trompetes: {
            label: "Trompetes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(204, 194, 16, 0.50)",
            pointBackgroundColor: "rgba(148, 139, 61, 1)"
          },
          Percusionistes: {
            label: "Percusionistes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          Trompes: {
            label: "Trompes",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          Fagotos: {
            label: "Fagotos",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          Bombardins: {
            label: "Bombardins",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }

        }
      }
    },
    methods: {
       carregarCurs() {
        return axios.get('/info/curs/actiu')
        .then(response => {
          if(response.data.curs === null) {
            // this.errors.noCursActiu = true
          } else {
            this.curs = response.data.curs
            this.semestreId = this.curs.semestres[0].semestreId

            this.optionsSemestre = this.curs.semestres.map((semestre, index) => {
              return {
                text: index + 1,
                value: semestre.semestreId
              }
            })
          }
        })
      },
      carregarMusics() {
        return axios.get('/info/musics')
        .then(response => {
          this.musics = response.data.musics
        })
      },
      afegirCordes(afegir) {
        if(afegir) {
          // Afegeix l'assistencia de les cordes al gràfic
          Object.keys(this.assistenciaCordes).forEach(corda => {
            this.dataset.push(this.assistenciaCordes[corda])
          });
        }
      },
      obtindreInfoAssistencia(semestre) {
        const assajos = semestre.assajos

        this.totalAssistents = []
        this.labels = []
        this.dataset = []

        // Incialitza la assistència de totes les cordes a 0
        Object.keys(this.assistenciaCordes).forEach(corda => {
          this.assistenciaCordes[corda].data = new Array(assajos.length).fill(0);
        });

        // Recorre tots els assajos e incrementa la assistència general i la de les cordes
        assajos.forEach((assaig, numeroAssaig) => {
          this.labels.push(assaig.data.split('T')[0])

          this.totalAssistents.push(assaig.assistents.length)

          assaig.assistents.forEach(assistent => {
            let musicAssistent
            this.musics.forEach(music => {
              if(music._id === assistent) {
                let assistenciaCordaAssaig = this.assistenciaCordes[music.corda].data[numeroAssaig]
                if(assistenciaCordaAssaig !== undefined) {
                  this.assistenciaCordes[music.corda].data[numeroAssaig]++
                } else {
                  this.assistenciaCordes[music.corda].data[numeroAssaig] = 1
                }
              }
            })
          });

        })

        if(this.separarCordes) {
          // Afegeix l'assistencia de les cordes al gràfic
          Object.keys(this.assistenciaCordes).forEach(corda => {
            this.dataset.push(this.assistenciaCordes[corda])
          });
        }

        // Afegeix l'assistència total al gràfic
        this.dataset.push({
          label: "Assistència general",
          data: this.totalAssistents,
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "rgba(171, 71, 188, 1)"
        })
      }
    },
    watch: {
      separarCordes: function (value) {
        if(value) {
          this.afegirCordes(value)
        } else {
          this.dataset = [{
            label: "Assistència general",
            data: this.totalAssistents,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }]
        }
      },
      semestreId: function (id) {
        const semestre = this.curs.semestres.find(semestre => semestre.semestreId === id)
        this.obtindreInfoAssistencia(semestre)
      }
    },
    created() {
      this.carregarCurs()
      .then(async () => {
        await this.carregarMusics()
      })
      .then(() => {
        const semestre = this.curs.semestres[1]
        this.semestreId = semestre.semestreId

        this.obtindreInfoAssistencia(semestre)

      })
    }
  }
</script>

<style lang="sass" scoped>
  .grafic
    // background-color: #fff
    margin: 30px 0
    padding: 10px
    max-height: calc(100vh - 80px)

  .opcions-grafic
    padding: 20px
    div.push-down
      display: flex
      flex-direction: column
      justify-content: flex-end
      padding-bottom: 10px

  .btn-group
    display: flex

  .btn-group .btn
    flex: 1
</style>
