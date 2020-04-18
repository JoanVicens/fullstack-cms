<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Assistència</h2>
    </div>
    <div class="grafic-wrapper">
      <div class="c100 p25 orange grafic">
          <span class="tantpercent">25%</span>
          <div class="slice">
              <div class="bar"></div>
              <div class="fill"></div>
          </div>
      </div>
    </div>
    <div class="contingut">
      <div class="info">
        <span>Número d'assaijos</span>
        20/30
      </div>
      <div class="info">
        <span>Tant per cent</span>
        25%
      </div>

      <div class="alerta">
        Per a poder demanar els 1.5 crèdits del trimestre has de tindre com a mínim un 80% d’assistència
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'AssistenciaChart',
    mount() {
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
