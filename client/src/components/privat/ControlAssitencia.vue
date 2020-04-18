<template lang="html">
  <main>
    <div class="container">
      <div v-if="!this.$route.query.cursId && !this.$route.query.semestreId && !this.$route.query.assaigId">
        Curs
        <select name="curs" @change="canviCurs($event)" class="form-control" v-model="cursId">
          <option v-for="curs in cursos" :key="curs._id" :value="curs._id">{{curs.curs}}</option>
        </select>
        Semestre
        <select name="semestres" @change="canviSemestre($event)" class="form-control" v-model="semestreId">
          <option v-for="(semestre, index) in curs.semestres" v-bind:key="semestre.data" :value="semestre.semestreId">{{index + 1}}</option>
        </select>
        Assaig
        <select name="assaig" @change="canviAssaig($event)" class="form-control" v-model="assaigId">
          <option v-for="assaig in semestre.assajos" v-bind:key="assaig.data" :value="assaig.assaigId">{{assaig.data | moment("DD, MMMM, YYYY")}}</option>
        </select>
      </div>
      <div v-else>
        <h3 class="uppercase">{{this.assaig.data | moment("DD MMMM YYYY")}}</h3>
        <h5>Total assitència: {{this.assaig.assistencia}}</h5>
      </div>
      <hr>
      <div class="table-warpper">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th>Nom</th>
              <th>Cognoms</th>
              <th>Instrument</th>
              <th class="assistit">Assistència</th>
            </tr>
            <tr v-for="music in musics" v-bind:key="music._id">
              <td>{{music.nom}}</td>
              <td>{{music.cognoms}}</td>
              <td>{{music.instrument}}</td>
              <td class="assistit">
                <b-form-checkbox :value="music._id" v-model="assistents"> </b-form-checkbox>
                <!-- <input type="checkbox" :value="music._id" v-model="assistents"> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" name="button" class="btn btn-primary btn-lg float-right mt-3" @click="actualitzar">GUARDAR</button>
      <router-link :to="{path: '/gestio_assajos'}" v-if="this.$route.query.cursId && this.$route.query.semestreId && this.$route.query.assaigId" role="button" class="btn btn-secondary btn-lg float-right mt-3">TORNAR</router-link>
    </div>
  </main>
</template>

<script>
  import axios from 'axios';
  import { helpers } from '../../mixins/helpers'

  export default {
    data() {
      return {
        cursos: {},
        curs: {},
        semestre: {},
        musics: {},
        assaig: {},
        cursId: -1,
        semestreId: -1,
        assaigId: 0,
        assistents: []
      }
    },
    mixins: [helpers],
    methods: {
      canviCurs(event) {
      },
      canviSemestre(event) {
        this.semestreId = event.target.value;
        this.semestre = this.curs.semestres.find(semetre => semetre.semestreId === this.semestreId);
      },
      canviAssaig(event) {
        this.assaigId = event.target.value;
        this.semestre.assajos.find(assaig => assaig.assaigId === this.assaigId)
        this.assaig = this.semestre.assajos.find(assaig => assaig.assaigId === this.assaigId)
        this.assistents = this.assaig.assistents
      },
      actualitzar() {

          const body = {
            cursId: this.cursId,
            semestreId: this.semestreId,
            assaigId: this.assaigId,
            assistents: this.assistents
          }

          axios.post('info/assaig', body)
          .then(response => {
            // todo pop up noticificaió
          })
          .catch(err => console.log(err))

      },
      actualitzarPerDefecte(response) {
        this.curs = response.data.cursos[0]
        this.semestre = this.curs.semestres[0]

        this.cursId = this.cursos[0]._id
        this.semestreId = this.curs.semestres[this.curs.semestres.length -1].semestreId
        this.semestre.assajos = this.semestre.assajos.sort(this.ordernarPerData)
        this.assaigId = this.semestre.assajos[this.semestre.assajos.length - 1].assaigId
        this.assistents = this.semestre.assajos[this.semestre.assajos.length - 1].assistents
      }
    },
    mounted() {
      if(!this.$route.query.cursId && !this.$route.query.semestreId && !this.$route.query.assaigId) {
        axios.get('/info/cursos')
          .then(response => {
            this.cursos = response.data.cursos
            this.actualitzarPerDefecte(response);
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        this.cursId = this.$route.query.cursId;
        this.semestreId = this.$route.query.semestreId;
        this.assaigId = this.$route.query.assaigId;

        axios.get(`/info/curs/${this.cursId}`)
          .then(response => {
            this.curs = response.data.cursos
            this.semestre = this.curs.semestres.find(semestre => semestre.semestreId === this.semestreId);
            this.assaig = this.semestre.assajos.find(assaig => assaig.assaigId === this.assaigId);

            this.assistents = this.assaig.assistents;
          })
          .catch(err => {
            console.log(err);
          })
      }


      axios.get('/info/musics')
        .then(response => {
          this.musics = response.data.musics
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>

<style lang="sass" scoped>
  .table-warpper
    background-color: #fff
    border-radius: 5px
    padding: 5px 0px
    tr:nth-child(2n + 1)
      background-color: lightblue
    tr:first-child
      background-color: #fff
      border-bottom: 1px solid gray
      &:hover
       background-color: #fff
    .assistit
      text-align: center
    tr:hover
      background-color: #FFD700
  .btn
    margin-top: 10px !important
    margin-right: 10px !important
</style>
