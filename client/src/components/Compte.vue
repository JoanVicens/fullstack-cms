<template lang="html">
  <div id="compte">
    <aside>
      <ul>
        <li >
          <router-link :to="{ path: '/compte/principal', params: {} }">Principal</router-link>
        </li>
        <!-- <li >
          <router-link :to="{ path: '/compte/assistencia', name: 'assistencia', params: {} }">Assistència</router-link>
        </li> -->
        <li >
          <router-link :to="{ path: '/compte/actuacions', name: 'Actuacions', params: {} }">Actuacions</router-link>
        </li>
        <!-- <li >
          <router-link to="">Enquestes</router-link>
        </li> -->
        <li >
          <router-link :to="{ path: '/compte/preferencies', name: 'Preferències', params: {} }">Preferències</router-link>
        </li>
        <!-- <li >
          <router-link to="">Notificacions</router-link>
        </li> -->
        <li v-if="store.getters.esJunta || store.getters.esAdmin" style="background-color: lightblue" >
          <b-dropdown id="dropdown"   variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              <span style="color: #444">GESTIÓ</span>
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
        </li>
        <li>
          <router-link :to="{ path: '/compte/logout', name: 'logout', params: {} }">Tancar sessió</router-link>
        </li>
      </ul>
    </aside>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from "../store.js";
  export default {
    name: 'Compte',
    data() {
      return {
        store
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import ../sass/animacions
  aside
    margin: 0 auto
    display: flex
    flex-wrap: wrap
    width: 100%
    align-items: center
    justify-content: center
    background-color: #017C72
    line-height: 1.5 !important
    margin-bottom: 25px
    min-height: 49px
    ul
      list-style: none
      padding: 0
      margin: 0
      display: block
      li
        display: inline
        margin: 0 10px
        padding: 16px 6px
        padding-bottom: 14px
        border-bottom: 3px solid transparent
        flex: auto
        &:hover
          border-bottom: 3px solid #fff
        a
          color: #fff
          text-transform: uppercase
  #dropdown
    a
      color: #444 !important
    li
      margin: 0 !important
      padding: 15px 0 !important
      &:hover
        background-color: lightblue !important

  @media (max-width: 1000px)
    aside
      display: none
    #compte
      padding-top: 25px
</style>
