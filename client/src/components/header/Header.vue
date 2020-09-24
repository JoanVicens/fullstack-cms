<template>
    <header class="navegacio">
      <div class="navbar navbar-dark bg-transparent" id="header">
        <div class="container">
          <div class="">
            <router-link :to="{ path: '/', params: {} }">
              <img src="../../assets/logo.png" id="logo" alt="logo banda uji">
            </router-link>
          </div>
          <TextHeader />
          
          <BotonsHeader v-on:hamburger-clicked="$emit('hamburger-clicked')" />
        </div>

      </div>

    </header>
</template>

<script>
    import TextHeader from './TextHeader.vue';
    import BotonsHeader from './BotonsHeader.vue';

    export default {
        name: 'Header',
        components: { TextHeader, BotonsHeader },

    }
</script>

<style lang="scss">
  .titols {
    display: block !important;
  }
</style>