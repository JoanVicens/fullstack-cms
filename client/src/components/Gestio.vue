<template lang="html">
  <div>
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
    <div id="gestio" class="container">
      <NotifiacioFixa />
      <router-view></router-view>
    </div>

    <Copyright class="pt-4" />
  </div>
</template>

<script>
  import NotifiacioFixa from './notificacions/NotificacioFixa'
  import Copyright from './Copyright';

  export default {
    name: 'Gestio',
    components: { NotifiacioFixa, Copyright }
  }
</script>

<style lang="scss" scoped>
  @import '../sass/colors';
  @import '../sass/subheader-nav';

  .subheader-nav {
    background-color: $atomic-orange;
    a {
      color: white;
      &:hover {
        color: #444;
      }
    } 
  }

  #gestio {
    // padding-bottom: 64px;
    background-color: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
    main {
      position: relative;
      z-index: 99;
    }  
  }
</style>
