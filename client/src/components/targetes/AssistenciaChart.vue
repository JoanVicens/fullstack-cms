<template lang="html">
  <div class="targeta">
    <div class="header">
      Assistència
    </div>
    <div class="grafic-wrapper">
      <div class="c100 orange grafic" >
          <span class="tantpercent">{{ percentage }}%</span>
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
          {{ attended }} de {{ total }}
        </p>
      </div>

      <div class="reminder" v-if="percentage < 80">
        Per a poder demanar els 1.5 crèdits del semestre has de tindre com a mínim un 80% d’assistència
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'AssistenciaChart',
    props: {
      info: Object
    },
    data() {
      return {
        semester: 0,
        attended: null,
        total: null,
        percentage: null
      }
    },
    computed: {
      percentatge_class: function () {
        return this.percentage != NaN ? 'p ' : `p${this.percentage}`
      }
    },
    methods: {
      calculatePercentage() {
        this.attended = this.info[this.semester].rehersals.attended;
        this.total = this.info[this.semester].rehersals.total;

        return ((this.attended * 100) / this.total).toFixed(0)
      },
      getCurrentSemester() {
        let data = new Date();
        return (data.getMonth() > 0 && data.getMonth() < 7) ? 1 : 0;
      }
    },
    mounted() {
      this.semester = this.getCurrentSemester();
      this.percentage = this.calculatePercentage();
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
      &:first-child {
        font-family: 'Roboto';
      }
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
