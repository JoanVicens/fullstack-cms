<template lang="html">
  <div class="targeta">
    <div class="header">
      Assistència
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
      <div class="info">
        <p class="font-weight-bold">Número d'assajos</p>
        <p class="ml-1">
          {{info.semestres[numeroSemetre].assajosAssistits}} de {{info.semestres[numeroSemetre].assajosSemestre}}
        </p>
      </div>

      <div class="reminder" v-if="percentatge < 80">
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

<style lang="scss" scoped>
  @import '../../sass/circle.scss';
  @import '../../sass/colors';

  .info {
    width: 100%;
    text-align: right;
    padding: 5px 16px;
    p {
      margin: 0;
      
    }
  }

  .reminder {
    padding: 10px 16px;
    padding-left: 8px;
    margin: 5px 16px 16px 16px;
    border-left: 4px solid $atomic-orange;
    background-color: $gris-clar;
  }

  .grafic-wrapper {
    margin: 16px auto;
    width: 120px;
    height: 120px;
  }

</style>
