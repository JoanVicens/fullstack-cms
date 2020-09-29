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
      <p>
        Pots descativar el compte desde la
        <router-link :to="{ path: '/compte/preferencies', params: {} }">configuració</router-link>
      </p>
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

<style lang="scss" scoped>
  @import '../../sass/colors.scss';

  .collapse {
    padding: 5px;
  }
  
  .header {
    font-size: 1.5em;
    border-radius: 0;
  }

  .desplegar {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: none;
    margin-top: -2px !important;
    padding-top: 7px;
    p {
      padding: 5px;
    }
  }

  .actiu {
    border: 3px solid $verdet;
    background-color: #fff;
  }
  .activar {
    background-color: $verdet;
  }
  .descativat {
    border: 3px solid $brick-red;
  }
  .descativar {
    background-color: $brick-red !important;
  }

  p {
    font-weight: normal;
    padding: 10px 10px;
    margin: 0;
  }


</style>
