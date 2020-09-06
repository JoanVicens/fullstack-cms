<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Assistència</h2>
    </div>
    <div class="grafic-wrapper">
      <div class="c100 orange grafic" >
          <span class="tantpercent">{{ percentatge }}%</span>
          <div class="slice">
              <div class="bar"></div>
              <div class="fill"></div>
          </div>
      </div>
    </div>
    <div class="contingut">
      <div class="info text-center" style="margin: 0 auto">
        <span>Número d'assaijos</span>
        {{info.semestres[numeroSemetre].assajosAssistits}} de {{info.semestres[numeroSemetre].assajosSemestre}}
      </div>
      <!-- <div class="info">
        <span>Tant per cent</span>
        {{info.semestres[numeroSemetre].percentatge.toFixed(0)}}%
      </div> -->

      <div class="alerta" v-if="percentatge < 80">
        Per a poder demanar els 1.5 crèdits del semestre has de tindre com a mínim un 80% d’assistència
      </div>

    </div>
  </div>
</template>

<script>
  import { calcularPercentatge } from '../../mixins/helpers'

  export default {
    name: 'AssistenciaChart',
    props: {
      info: Object
    },
    data() {
      return {
        numeroSemetre: 0,
        //percentatge: ''
      }
    },
    computed: {
      percentatge_class: function () {
        let percentatge = this.info.semestres[this.numeroSemetre].percentatge.toFixed(0)
        return percentatge != NaN ? 'p ' : `p${percentatge}`
      },
      percentatge: function () {
        let percentatge = this.info.semestres[this.numeroSemetre].percentatge.toFixed(0)
        return (!isNaN(percentatge)) ? percentatge : ''
      },
      pg: function() {

        return this.info.semestres[this.numeroSemetre].percentatge.toFixed(0)
      }
    },
    mounted() {
      // Calcula a quin semestre ens trobem
      let data = new Date();
      this.numeroSemetre = (data.getMonth() > 0 && data.getMonth() < 7) ? 1 : 0;

    }
  }
</script>

<style lang="sass" scoped>
  @import ../../sass/circle.scss

  .grafic-wrapper
    margin: 16px auto
    width: 120px
    height: 120px

</style>
