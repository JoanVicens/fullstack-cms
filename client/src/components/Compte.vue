<template lang="html">
  <div id="compte">
    <SubheaderNav />
    <NotifiacioFixa />
    <router-view></router-view>

    <Copyright class="pt-4" />
  </div>
</template>

<script>
  import store from "../store.js";
  import SubheaderNav from './nav/SubheaderNav.vue'
  import NotifiacioFixa from './notificacions/NotificacioFixa';
  import Copyright from './Copyright';

  export default {
    name: 'Compte',
    components: { SubheaderNav, NotifiacioFixa, Copyright },
    data() {
      return {
        store
      }
    }
  }
</script>

<style lang="scss">
  #compte {
    padding-bottom: 64px;
    main {
      position: relative;
      z-index: 99;
    }  
  }

</style>
