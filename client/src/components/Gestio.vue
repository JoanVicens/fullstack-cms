<template lang="html">
  <div id="gestio">
    <aside>
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
        <li>
          <router-link :to="{ path: '/compte/logout', name: 'logout', params: {} }">Tancar sessió</router-link>
        </li>
      </ul>
    </aside>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="sass" scoped>
  aside
    margin: 0 auto
    display: flex
    flex-wrap: wrap
    width: 100%
    align-items: center
    justify-content: center
    background-color: lightblue
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
        flex: auto
        border-bottom: 3px solid transparent
        &:hover
          border-bottom: 3px solid #444
        a
          color: #444
          text-transform: uppercase
          white-space: nowrap

  @media (max-width: 1175px)
    aside
      display: none
    #gestio
      padding-top: 25px
</style>
