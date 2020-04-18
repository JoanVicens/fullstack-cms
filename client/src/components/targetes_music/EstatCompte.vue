<template lang="html">
  <div class="targeta targeta-btn descativar">
    <div class="collapse" id="accioCompte">
      <div class="btn btn-lg btn-block m-1">
        DESACTIVAR
      </div>
    </div>

    <a class="btn btn-lg btn-block actiu" data-toggle="collapse" href="#accioCompte" role="button" aria-expanded="false">
      COMPTE ACTIU
    </a>
  </div>
</template>

<script>
  export default {
    name: 'estatCompte'
  }
</script>

<style lang="sass" scoped>
  @import ../../sass/colors.sass

  .collapse
    padding: 5px 0
    border-top-left-radius: 5px
    border-top-right-radius: 5px

  .actiu
    border: 3px solid $verdet
    background-color: #fff
  .activar
    background-color: $verdet
  .descativat
    border: 3px solid $rojet
  .descativar
    background-color: $rojet !important
</style>
