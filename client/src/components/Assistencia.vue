<template lang="html">
  <main>
    <vue-markdown> **test**</vue-markdown>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </main>
</template>

<script>

  import VueMarkdown  from 'vue-markdown'

  export default {
    name: 'Assistència',
    components: {
      VueMarkdown
    },
    data() {
      return {
        source: '#test'
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
