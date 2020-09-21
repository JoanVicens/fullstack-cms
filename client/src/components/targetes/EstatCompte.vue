<template lang="html">
  <div class="targeta targeta-btn">
    <div class="btn btn-lg btn-block header actiu" v-if="compteActiu" v-b-toggle.compteActiu>
      COMPTE ACTIU
    </div>

    <div class="btn btn-lg btn-block header descativat" v-else>
      COMPTE NO ACTIU
    </div>

    <b-collapse id="compteActiu" class="desplegar mt-2">
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
    padding: 5px
  
  .header
    font-size: 1.5em

  .desplegar
    border: 1px solid rgba(0, 0, 0, 0.125)
    border-top: none
    margin-top: -2px !important
    padding-top: 7px

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
    font-weight: normal
    padding: 10px 10px
    margin: 0


</style>
