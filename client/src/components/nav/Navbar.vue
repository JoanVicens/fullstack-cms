<template lang="html">
  <nav id="sidebar">
    <div class="sidebar-header" v-on:click="tancarMenu">
      TANCAR
      <!-- <div id="dismiss" v-on:click="tancarMenu">
        <x-icon size="2x"></x-icon>
      </div> -->
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

        <div v-else>
          <div v-if="store.getters.esJunta || store.getters.esAdmin" class="bg-blue">
            <li class="gestio">
              <div v-b-toggle.llistaGestio class="menuDesplegable">
                <span>Gestió</span>
                <triangle-icon size="1x" :class="g_visible ? 'girar' : ''"></triangle-icon>
              </div>
              <b-collapse id="llistaGestio" v-model="g_visible">
                <ul v-on:click="tancarMenu">
                  <li>
                    <router-link :to="{ path: '/gestio/assitencia', params: {} }">Assitència</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/assajos', params: {} }">Assajos</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/cursos', params: {} }">Cursos</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/actuacions', params: {} }">Actuacions</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/credits', params: {} }">Crèdits</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/newsletter', params: {} }">Newsletter</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/musics', params: {} }">Músics</router-link>
                  </li>
                </ul>
              </b-collapse>
            </li>
          </div>
          <div v-on:click="tancarMenu">
            <li>
              <router-link :to="{ path: '/compte/principal', params: {} }">Principal</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/compte/assistencia', name: 'assistencia', params: {} }">Assistència</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/compte/actuacions', name: 'Actuacions', params: {} }">Actuacions</router-link>
            </li>
            <li>
              <router-link to="">Enquestes</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/compte/preferencies', name: 'Preferències', params: {} }">Preferències</router-link>
            </li>
            <li>
              <router-link to="">Notificacions</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/compte/logout', name: 'logout', params: {} }">Tancar sessió</router-link>
            </li>
          </div>
        </div>
      </ul>

      <ul class="social">
        <li>
          <a href="https://www.facebook.com/AssociacioCulturalBandaUJI/" target="_blank" class="facebook">
            <FacebookIcon size="1.5x" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/bandauji/" target="_blank" class="instagram">
            <InstagramIcon size="1.5x" />
          </a>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script>
import { accionsMenuMixin } from '../../mixins/accionsMenuMixin'
import store from "../../store.js";
import { TriangleIcon } from 'vue-feather-icons'
import { InstagramIcon, FacebookIcon  } from 'vue-feather-icons'

export default {
  name: 'Navbar',
  components: {
    TriangleIcon,
    FacebookIcon,
    InstagramIcon
  },
  mixins: [accionsMenuMixin],
  data() {
    return {
      store,
      g_visible: false
    }
  }
}
</script>

<style lang="sass" scoped>
  ul
    padding: 0
    li
      list-style: none
      a
        padding: 13px 20px 13px 20px
        display: block
        color: #444
        font-size: 1.1em
        &:hover
          background-color: #fff

  .menuDesplegable
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 20px 10px 20px
    cursor: pointer
    &:hover
      background-color: #333
    svg
      fill: #eee
      transform: rotate(0deg)
      transition: all .4s linear
    svg.girar
      transform: rotate(180deg)

  .bg-blue li
    background-color: lightblue
    color: #fff !important

  .social
    margin-top: 5px
    margin-left: 20px
    display: flex
    align-items: center
    a:hover
      background-color: transparent !important
      justify-content: space-around
    a.facebook:hover
      svg
        fill: #3a589e
    a.instagram:hover
      svg
        fill: #f86757

    svg
      stroke: #444

</style>
