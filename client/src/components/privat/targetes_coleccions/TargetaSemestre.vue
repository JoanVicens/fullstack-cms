<template lang="html">
  <div class="alert alet" :id="semestre.semestreId">
    <h5 class="card-header" v-if="semetre.numero == 1">Primer semestre</h5>
    <h5 class="card-header" v-else-if="semetre.numero == 2">Segón semestre</h5>

    <div class="card-body">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaretaSemestre',
    props: {
      semestre: Object
    }
  }
</script>

<style lang="css" scoped>
</style>
