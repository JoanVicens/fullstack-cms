<template lang="html">
  <nav id="sidebar">
    <div class="sidebar-header" v-on:click="$emit('close-clicked')">
      TANCAR
    </div>

    <section class="sidebar-content">

      <ul class="components">

        <div v-if="!store.getters.isLogged" class="sessionOpts">
          <li v-on:click="$emit('close-clicked')" >
            <router-link :to="{ path: '/comptes/entrar', name:'login', params: {} }">
              <LogInIcon size="1x" />
              <span>Entrar</span>
            </router-link>
          </li>
          <li v-on:click="$emit('close-clicked')">
            <router-link :to="{ path: '/comptes/crear', name:'crearCompte', params: {} }">
              <PlusSquareIcon size="1x" />
              <span>Crear compte</span>
            </router-link>
          </li>
        </div>

        <div v-else class="navOpts">
          <div v-if="store.getters.esJunta || store.getters.esAdmin">
            <li class="gestio" :class="g_visible ? '' : 'collapsed'">
              <div v-b-toggle.llistaGestio class="menuDesplegable">
                <span>Gestió</span>
                <ChevronDownIcon  size="1x" :class="g_visible ? 'girar' : ''"/> 
                <!-- <triangle-icon size="1x" :class="g_visible ? 'girar' : ''"></triangle-icon> -->
              </div>
              <b-collapse id="llistaGestio" v-model="g_visible">
                <ul v-on:click="$emit('close-clicked')">
                  <li>
                    <router-link :to="{ path: '/gestio/dashboard', params: {} }">
                      <ActivityIcon size="1x" />
                      <span>Dashboard</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/assitencia', params: {} }">
                      <FileTextIcon size="1x" />
                      <span>Assitència</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/assajos', params: {} }">
                      <WindIcon size="1x" />
                      <span>Assajos</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/cursos', params: {} }">
                      <BoxIcon size="1x" />
                      <span>Cursos</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/actuacions', params: {} }">
                      <MusicIcon size="1x" />
                      <span>Actuacions</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/credits', params: {} }">
                      <TrelloIcon  size="1x" />
                      <span>Crèdits</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/newsletter', params: {} }">
                      <MailIcon size="1x" />
                      <span>Newsletter</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/gestio/musics', params: {} }">
                      <UsersIcon size="1x" />
                      <span>Músics</span>
                    </router-link>
                  </li>
                </ul>
              </b-collapse>
            </li>
          </div>
          <div v-on:click="$emit('close-clicked')">
            <li>
              <router-link :to="{ path: '/compte/principal', params: {} }">
                <HomeIcon size="1x" />
                <span>Principal</span>
              </router-link>
            </li>
            <!-- <li>
              <router-link :to="{ path: '/compte/assistencia', name: 'assistencia', params: {} }">Assistència</router-link>
            </li> -->
            <li>
              <router-link :to="{ path: '/compte/actuacions', name: 'Actuacions', params: {} }">
                <CompassIcon size="1x" />
                <span>Actuacions</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/compte/preferencies', name: 'Preferències', params: {} }">
                <SlidersIcon size="1x" />
                <span>Preferències</span>
              </router-link>
            </li>
          </div>
        </div>
      </ul>

      <ul class="social">
        <li>
          <a href="https://www.facebook.com/AssociacioCulturalBandaUJI/" target="_blank" class="facebook">
            <FacebookIcon size="1.3x" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/bandauji/" target="_blank" class="instagram">
            <InstagramIcon size="1.3x" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCe8CsHaWOy4_eUID3A3ACew" target="_blank">
            <YoutubeIcon size="1.3x" />
          </a>
        </li>
        <li>
          <a href="mailto:bandauji@uji.es" target="_blank">
            <MailIcon size="1.3x" />
          </a>
        </li>
      </ul>
    </section>

    <router-link :to="{ path: '/compte/logout', name: 'logout', params: {} }" class="logout" v-if="store.getters.isLogged">
      <LogOutIcon size="1x" />
      <span>Tancar sessió</span>
    </router-link>
  </nav>
</template>

<script>
  import store from "../../store.js";
  // User options
  import { LogInIcon, PlusSquareIcon } from 'vue-feather-icons'

  // Main optionss
  import { HomeIcon, CompassIcon, SlidersIcon, LogOutIcon } from 'vue-feather-icons'
  
  // Social icons
  import { InstagramIcon, FacebookIcon, MailIcon, YoutubeIcon } from 'vue-feather-icons'

  // Collapse icon + 'gestio' icons
  import { ChevronDownIcon, ActivityIcon, FileTextIcon, WindIcon, BoxIcon, 
           MusicIcon, TrelloIcon, UsersIcon} from 'vue-feather-icons'

  export default {
    name: 'Navbar',
    components: {
      ChevronDownIcon,
      // =================
      FacebookIcon,
      InstagramIcon,
      MailIcon,
      YoutubeIcon,
      // =================
      HomeIcon,
      CompassIcon,
      SlidersIcon,
      // =================
      LogOutIcon,
      ActivityIcon,
      FileTextIcon,
      WindIcon,
      BoxIcon,
      MusicIcon,
      TrelloIcon,
      MailIcon,
      UsersIcon,
      // =================
      LogInIcon,
      PlusSquareIcon
    },
    data() {
      return {
        store,
        g_visible: false
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import ../../sass/colors

  #sidebar
    display: flex
    flex-wrap: wrap
    flex-direction: column
    overflow: hidden
  
  .navOpts, .sessionOpts
    width: 100%

  ul.components
    width: 100%
    margin: 0
    padding: 0
    position: relative
    margin-bottom: 15px
    &::after
      content: ''
      position: absolute
      bottom: -15px
      height: 3px
      width: 70%
      border-radius: 3px
      margin-left: 15%
      background-color: #444
    li
      list-style: none
      display: block
      margin: 0
      padding: 0
      width: 100% !important
      border-bottom: none
      &.gestio
        background-color: $atomic-orange
        margin-bottom: 10px
        padding-bottom: 10px
        &.collapsed
          margin-bottom: 0
          padding-bottom: 0
    
  a
    padding: 13px 20px 13px 20px
    display: block
    color: #444
    font-size: 1.1em
    line-height: 1.1em
    span
      margin-left: 15px
    &:hover
      background-color: #fff
    &.logout
      margin-top: auto
      margin-bottom: 30px
      &:hover
        background-color: $brick-red

  .menuDesplegable
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 20px 10px 20px
    cursor: pointer
    &:hover
      background-color: #333
    svg
      // fill: #eee
      transform: rotate(-90deg)
      transition: all .3s linear
    svg.girar
      transform: rotate(0deg)

  .social
    margin-top: 5px
    margin-left: 20px
    display: flex
    align-items: center
    a
      padding: 10px 10px
    a:hover
      background-color: transparent !important
      justify-content: space-around
    svg
      stroke: #444

</style>
