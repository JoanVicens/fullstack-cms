<template lang="html">
  <div class="targeta targeta-btn descativar">
    <div class="btn btn-lg btn-block actiu" v-if="compteActiu">
      COMPTE ACTIU
    </div>

    <div class="btn btn-lg btn-block descativat" v-else>
      COMPTE NO ACTIU
    </div>


  </div>
</template>

<script>
  export default {
    name: 'estatCompte',
    props: {
      compteActiu: Boolean
    }
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
