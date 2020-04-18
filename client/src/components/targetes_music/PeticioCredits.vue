<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h3>Crèdits del 1r semestre curs 19/20</h3>
    </div>
    <div class="contingut">
      <div class="assajos concedir">
        x assajos de y
      </div>
      <div class="botons">
        <div class="btn concedir btn-lg btn-block">
          DEMANAR CRÈDITS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'peticioCredits'
  }
</script>

<style lang="sass" scoped>
  @import ../../sass/colors.sass

  .assajos
    font-weight: bolder
    margin: 10px 0
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.25)
    font-size: 1.2em
    &.concedir
      color: $verdet
    &.no-concedir
      color: $rojet
  .botons
    margin-top: 5px
    .concedir
      background-color: $verdet
    .no-concedir
      background-color: $rojet
  .btn
    color: #fff
    font-weight: bold
    font-size: 1.6em
</style>
