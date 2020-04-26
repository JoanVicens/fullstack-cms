<template lang="html">
  <nav id="sidebar">
    <div class="sidebar-header">
      <div id="dismiss" v-on:click="tancarMenu">
        <x-icon size="2x"></x-icon>
      </div>
    </div>

    <section class="sidebar-content">

      <ul class="components">

        <div v-if="!store.getters.isLogged">
          <li v-on:click="tancarMenu" >
            <router-link :to="{ path: '/comptes/entrar', name:'login', params: {} }">Entrar</router-link>
          </li>
          <li v-on:click="tancarMenu">
            <router-link :to="{ path: '/comptes/crear', name:'crearCompte', params: {} }">Crear compte</router-link>
          </li>
        </div>

        <div v-else v-on:click="tancarMenu">
          <li>
            <router-link :to="{ path: '/principal', params: {} }">Principal</router-link>
          </li>
          <!-- MENUS GESTIO -->
          <!-- ====================================== -->
          <div v-if="store.getters.esJunta || store.getters.esAdmin" class="bg-blue">
            <li>
              <router-link :to="{ path: '/gestio/assitencia', params: {} }">Controlar assitència</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/gestio/assajos', params: {} }">Gestionar assajos</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/gestio/cursos', params: {} }">Gestionar cursos</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/gestio/actuacions', params: {} }">Gestionar concerts</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/gestio/credits', params: {} }">Credits</router-link>
            </li>

          </div>
          <!-- ====================================== -->
          <li>
            <router-link :to="{ path: '/assistencia', name: 'assistencia', params: {} }">Assistència</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/actuacions', name: 'Actuacions', params: {} }">Actuacions</router-link>
          </li>
          <li>
            <router-link to="">Enquestes</router-link>
          </li>
          <li>
            <router-link to="">Demanar crèdits</router-link>
          </li>
          <li>
            <router-link to="">Pagament cota</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/configuracio', name: 'Configuracio', params: {} }">Preferències</router-link>
          </li>
          <li>
            <router-link to="">Notificacions</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/logout', name: 'logout', params: {} }">Tancar sessió</router-link>
          </li>
        </div>
      </ul>

      <ul class="social">
        <li>
          <a href="https://www.facebook.com/AssociacioCulturalBandaUJI/" target="_blank">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/bandauji/" target="_blank">
            <InstagramIcon  />
          </a>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script>
import { accionsMenuMixin } from '../../mixins/accionsMenuMixin'
import { store } from "../../store.js";
import { XIcon } from 'vue-feather-icons'
import { FacebookIcon } from 'vue-feather-icons'
import { InstagramIcon  } from 'vue-feather-icons'

export default {
  name: 'Navbar',
  components: {
    XIcon,
    FacebookIcon,
    InstagramIcon
  },
  mixins: [accionsMenuMixin],
  data() {
    return {
      store
    }
  }
}
</script>

<style lang="sass" scoped>
  .bg-blue li
    background-color: lightblue
    color: #fff !important
  .sidebar-content
    ul.components
      padding: 20px 0
      border-top: 1px solid #444
      list-style: none
      overflow: hidden
      margin-bottom: 0
      li a
        padding: 10px
        padding-left: 20px
        font-size: 1.1em
        display: block
        color: #444
        &:hover
          background: #fff
      li.active>a,
      a[aria-expanded="true"]
        color: #444
        background: #6d7fcc
      a[data-toggle="collapse"]
        position: relative
    ul.social
      margin-top: 5px
      padding: 0 0 0 20px
      li
        display: inline-block !important
        list-style: none
        margin-right: 15px
        &:last-child
          margin-right: 0
      svg
        stroke: #444
</style>
