<template lang="html">
  <main>
    <h2>Assistència per semestres</h2>

    <section>
      <h4>Primer semestre</h4>
      <!-- <AssistenciaChart :chartData="{labels, datasets: dataset}" :options="options" v-if="dataset.length > 0"/> -->
    </section>
  </main>
</template>

<script>
  // import AssistenciaChart from  './charts/AssistenciaChart'

  import Axios from 'axios'

  export default {
    name: 'dashboard',
    components: {
      // AssistenciaChart
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
    mounted() {
      Axios.post('/info/assaig/list', { curentYear: true })
      .then(response => {
        console.log(response.data);
      })
      .catch(console.error)
    }
  }
</script>

<style lang="scss" scoped>
  section {
    margin: 1rem 0;
  }
</style>
