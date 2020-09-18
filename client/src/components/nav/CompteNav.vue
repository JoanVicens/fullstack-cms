<template>
    <ul>
        <li >
          <router-link :to="{ path: '/compte/principal', params: {} }">Principal</router-link>
        </li>
        <li >
          <router-link :to="{ path: '/compte/actuacions', name: 'Actuacions', params: {} }">Actuacions</router-link>
        </li>
        <li >
          <router-link :to="{ path: '/compte/preferencies', name: 'Preferències', params: {} }">Preferències</router-link>
        </li>
    </ul>
</template>

<script>
    export default { name: "CompteNav" }
</script>

<style lang="sass">
  ul
    list-style: none
    padding: 0
    margin: 0 auto
    display: inline-flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: safe
    li
      display: inline
      margin: 0 10px
      padding: 16px 6px
      padding-bottom: 14px
      border-bottom: 3px solid transparent
</style>