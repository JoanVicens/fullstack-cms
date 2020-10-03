<template lang="html">
  <main>
    <div class="container">
      <Selector
        v-bind:semestreId.sync="semestreId"
        v-bind:assaigId.sync="assaigId"
        v-bind:assajos.sync="assajos"
        ref="info"

      />

      <span style="font-size: 1.5rem">Assajos</span>
      <div class="mt-1 mb-3">
        <select v-model="assaigId"  class="custom-select">
          <option v-for="assaig in assajos" :key="assaig._id" :value="assaig._id">{{assaig.data | moment("DD MMMM YYYY")}}</option>
        </select>
      </div>

      <div>
        <TaulaAssistenciaAssaig v-if="musiciansList && assaig" :llistaMusics.sync="llistaAssaig" >
          <b-button variant="info" @click="actualizarAssistencia(llistaAssaig)">Actualitzar</b-button>
        </TaulaAssistenciaAssaig>
      </div>

    </div>
  </main>
</template>

<script>
  import Axios from 'axios';

  import Selector from './Selector.vue'
  import TaulaAssistenciaAssaig from './tables/TaulaAssistenciaAssaig';
import LogoutVue from '../Logout.vue';


  export default {
    name: 'ControlAssistencia',
    components: {
      Selector,
      TaulaAssistenciaAssaig
    },
    data() {
      return {
        semestreId: 0,
        assaigId: 0,
        assajos: [],
        assaig: {},
        musiciansList: null
      }
    },
    watch: {
      assaigId: {
        handler() {
          this.assaig = this.assajos.find(assaig => assaig._id == this.assaigId)
        }
      },
      assajos: function(assajos) {
        if(!assajos) return

        const avui = new Date();

        const beforeRehersals = assajos.filter(function(assaig) {
            return new Date(assaig.data) - avui < 0;
        })

        if(beforeRehersals.length > 0) {

          const sortedBeforeRehersalsassajos = beforeRehersals.sort(function(a, b) {
              var distancea = Math.abs(diffdate - a);
              var distanceb = Math.abs(diffdate - b);
              return distancea - distanceb; // sort a before b when the distance is smaller
          });
  
          this.assaigId = sortedBeforeRehersalsassajos[0]._id;
        } else {
          console.log("No hi ha assajos passats");
        }

      }
    },
    computed: {
      llistaAssaig() {
        const llista = [...this.musiciansList]

        if(this.assaig.assistents) {
          llista.forEach(music => {
              music['has_attended'] = this.assaig.assistents.includes(music._id)
          })
        }
        
        return llista
      }
    },
    methods: {
      loadMusicins() {
        Axios.get('/info/music/llistat')
        .then(response => {
          this.musiciansList =  response.data.list
        })
      },
      actualizarAssistencia(llista) {
        const llistaIds = llista.filter(el => { return el.has_attended }).map(el => {return el._id})

        Axios.put(`/info/assaig/${this.assaig._id}/assistencia`, { assistents: llistaIds })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.loadMusicins()

    }
  }
</script>

<style lang="scss" scoped>
</style>
