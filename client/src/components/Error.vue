<template lang="html">
  <main class="text-center">
    <h1 class="display-2">;(</h1>
    <h1 class="display-5 mt-5">Aluna cosa ha anat malament</h1>

    <router-link :to="{ path: '/logout', name:'logout', params: {} }">
      <button class="btn btn-dark bnt-lg w-50 mt-5">
        INICI
      </button>
    </router-link>
  </main>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
  a
    color: #fff
</style>
