<template>
  <b-dropdown id="dropdown" variant="link" toggle-class="text-decoration-none" no-caret>
    <template v-slot:button-content>
      <span>GESTIÓ</span>
    </template>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/dashboard', params: {} }">Dashboard</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/musics', params: {} }">Músics</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/assitencia', params: {} }">Assitència</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/assajos', params: {} }">Assajos</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/cursos', params: {} }">Cursos</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/actuacions', params: {} }">Actuacions</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/credits', params: {} }">Crèdits</router-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <router-link :to="{ path: '/gestio/newsletter', params: {} }">Newsletter</router-link>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
  export default {
    name: 'GestioNav'
  }
</script>

<style lang="sass" scoped>
  @import ../../sass/colors
  
  span
    color: $atomic-orange
    font-weight: 600

  #dropdown
    border-left: 2px solid $atomic-orange

</style>