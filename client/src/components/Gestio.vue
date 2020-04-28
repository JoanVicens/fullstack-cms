<template lang="html">
  <div id="gestio">
    <aside>
      <ul>
        <li><router-link :to="{ path: '/gestio/assitencia', params: {} }">Assitència</router-link></li>
        <li><router-link :to="{ path: '/gestio/assajos', params: {} }">Assajos</router-link></li>
        <li><router-link :to="{ path: '/gestio/cursos', params: {} }">Cursos</router-link></li>
        <li><router-link :to="{ path: '/gestio/actuacions', params: {} }">Actuacions</router-link></li>
        <li><router-link :to="{ path: '/gestio/credits', params: {} }">Crèdits</router-link></li>
        <li><router-link :to="{ path: '/gestio/newsletter', params: {} }">Newsletter</router-link></li>
        <li><router-link :to="{ path: '/compte/principal', params: {} }">Tornar</router-link></li>
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
    ul
      list-style: none
      padding: 10px 0
      margin: 0
      display: block
      li
        display: inline
        margin: 0 10px
        padding: 6px
        flex: auto
        &:hover
        a
          color: #444
          text-transform: uppercase

  @media (max-width: 1000px)
    aside
      display: none
    #gestio
      padding-top: 25px
</style>
