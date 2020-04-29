<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h3>Newsletters</h3>
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
        <small>Assumpte</small>
        <h3>{{marcat.assumpte}}</h3>
        <hr>
        <span v-html="marcat.html"></span>

        <div v-if="marcat.adjunts.length > 0">
          <hr>
          <ul style="padding-left: 15px">
            <li v-for="(adjunt, index) in marcat.adjunts" :key="index">
              <a :href="adjunt.uri">{{adjunt.nom}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <small>Assumpte</small>
        <h3>{{ultim.assumpte}}</h3>
        <hr>
        <span v-html="ultim.html"></span>

        <div v-if="ultim.adjunts.length > 0">
          <hr>
          <ul style="padding-left: 15px">
            <li v-for="(adjunt, index) in ultim.adjunts" :key="index">
              <a :href="adjunt.uri">{{adjunt.nom}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Newsletters',
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

<style lang="sass" scoped>
  @import ../../sass/colors.sass

  .assajos
    font-weight: bolder
    margin: 10px 0
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.25)
    font-size: 1.2em
    &.concedir
      color: $verdet
    &.no-concedir
      color: $rojet
  .botons
    margin-top: 5px
    .concedir
      background-color: $verdet
    .no-concedir
      background-color: $rojet
  .btn
    color: #fff
    font-weight: bold
    font-size: 1.6em

  a
    color: #444
</style>
