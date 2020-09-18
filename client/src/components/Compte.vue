<template lang="html">
  <div id="compte">
    <aside class="subheader-nav">
      <div class="container">
        <CompteNav />
        <GestioNav v-if="store.getters.esJunta || store.getters.esAdmin" />
      </div>    
    </aside>
    <router-view class="mt-3"></router-view>
  </div>
</template>

<script>
  import store from "../store.js";
  import CompteNav from "./nav/CompteNav";
  import GestioNav from "./nav/GestioNav";
  export default {
    name: 'Compte',
    components: {CompteNav, GestioNav},
    data() {
      return {
        store
      }
    }
  }
</script>

<style lang="sass">
  @import ../sass/subheader-nav

  #dropdown
    a
      color: #444 !important
    li
      margin: 0 !important
      padding: 15px 0 !important
      &:hover
        background-color: lightblue !important

</style>
