<template lang="html">
  <div class="targeta">
    <div class="header">
      Newsletters
    </div>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">&#x1f4cc;</a>
      </li>
      <li class="nav-item" v-if="marcat._id !== ultim._id">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Últim correu</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <Email :email="marcat" />
      </div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <Email :email="ultim" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Email from './Email.vue';

  export default {
    name: 'Newsletters',
    components: { Email },
    data() {
      return {
        marcat: '',
        ultim: ''
      }
    },
    methods: {
      carregarCorreus() {
        axios.get('/docs/newsletters')
        .then(response => {
          const correus = response.data

          this.ultim = correus.ultim
          this.marcat = correus.marcat

        })
        .catch(console.error)
      }
    },
    mounted() {
      this.carregarCorreus()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/colors.scss';
  
  .header {
    border-top: 5px solid $accent-yellow !important;
  }

  .nav-item {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 0 0 -4px 0 !important;
  }

</style>
