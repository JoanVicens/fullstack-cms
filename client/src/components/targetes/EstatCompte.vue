<template lang="html">
  <div class="targeta targeta-btn">
    <div class="btn btn-lg btn-block actiu" v-if="compteActiu" v-b-toggle.compteActiu>
      COMPTE ACTIU
    </div>

    <div class="btn btn-lg btn-block descativat" v-else>
      COMPTE NO ACTIU
    </div>

    <b-collapse id="compteActiu" class="mt-2">
      <p>El teu compte està actiu, això vol dir que sortiràs a la llista dels assajos</p>
    </b-collapse>
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
  @import ../../sass/colors.scss

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

  p
    font-size: 1rem !important
    font-weight: normal
    padding: 0 10px

</style>
