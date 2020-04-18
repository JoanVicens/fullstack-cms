<template lang="html">
  <section class="perfil-sidebar">
    <img class="img-perfil" src="https://image.flaticon.com/icons/svg/482/482636.svg" alt="">
    <p class="nom">Joan Vicens</p>
    <p class="cognoms">Vallés Cervera</p>
    <p class="corda">Clarinet</p>
  </section>
</template>

<script>
export default {
  name: 'Perfil'
}
</script>

<style lang="sass" scoped>
  .perfil-sidebar
    display: grid
    grid-template-columns: 20px 30px auto
    grid-template-rows: 30px 30px 30px
    padding: 20px
    color: #666
    .img-perfil
      grid-column-start: 1
      grid-column-end: 3
      grid-row-start: 1
      grid-row-end: 3
    .nom
      grid-column-start: 3
      grid-column-end: 3
      grid-row-start: 1
      grid-row-end: 1
      margin-left: 10px
      padding: 0px
    .cognoms
      grid-column-start: 3
      grid-column-end: 3
      grid-row-start: 2
      grid-row-end: 2
      margin-left: 10px
    .corda
      grid-column-start: 1
      grid-column-end: 3
      grid-row-start: 3
      grid-row-end: 3
</style>
