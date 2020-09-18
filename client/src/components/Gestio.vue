<template lang="html">
  <div id="gestio">
    <aside class="subheader-nav">
      <ul>
        <li><router-link :to="{ path: '/gestio/dashboard', params: {} }">Dashboard</router-link></li>
        <li><router-link :to="{ path: '/gestio/musics', params: {} }">Músics</router-link></li>
        <li><router-link :to="{ path: '/gestio/assitencia', params: {} }">Assitència</router-link></li>
        <li><router-link :to="{ path: '/gestio/assajos', params: {} }">Assajos</router-link></li>
        <li><router-link :to="{ path: '/gestio/cursos', params: {} }">Cursos</router-link></li>
        <li><router-link :to="{ path: '/gestio/actuacions', params: {} }">Actuacions</router-link></li>
        <li><router-link :to="{ path: '/gestio/credits', params: {} }">Crèdits</router-link></li>
        <li><router-link :to="{ path: '/gestio/newsletter', params: {} }">Newsletter</router-link></li>
        <li style="color: #fff"><router-link :to="{ path: '/compte/principal', params: {} }">Tornar</router-link></li>
      </ul>
    </aside>
    <NotifiacioFixa />
    <router-view class="mt-3"></router-view>
  </div>
</template>

<script>
  import NotifiacioFixa from './notificacions/NotificacioFixa'

  export default {
    name: 'Gestio',
    components: { NotifiacioFixa }
  }
</script>

<style lang="sass" scoped>
  @import ../sass/colors
  @import ../sass/subheader-nav

  .subheader-nav
    background-color: $atomic-orange
    a
      color: white
      &:hover
        color: #444
</style>
