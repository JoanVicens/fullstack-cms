<template lang="html">
  <section class="mt-2">
    <b-table striped hover borderless outlined small responsive sticky-header="500px" :items="llistat" :fields="fields"></b-table>
    <div class="accions">
      <download-icon size="1.5x" class="boto" @click="descargar">
      </download-icon>
    </div>
    <!-- <div class="table-warpper">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th>Nom</th>
            <th>Cognoms</th>
            <th>Instrument</th>
            <th class="assistit">Assistència</th>
          </tr>
          <tr v-for="music in infoMusics" v-bind:key="music._id">
            <td>{{music.nom}}</td>
            <td>{{music.cognoms}}</td>
            <td>{{music.instrument}}</td>
            <td class="assistit">
              <b-form-checkbox :value="music._id" v-model="assistents"> </b-form-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </section>
</template>

<script>

  import axios from 'axios'

  import  {DownloadIcon} from 'vue-feather-icons'

  export default {
    name: 'LlistaMusics',
    props: {
      llistat: Array,
      nom: String
    },
    components: {
      DownloadIcon
    },
    data() {
      return {
        fields: [
          {
            key: 'nom',
            sortable: true
          },
          {
            key: 'cognoms',
            sortable: true
          },
          {
            key: 'instrument',
            sortable: true
          }
        ]
      }
    },
    methods: {
      descargar() {
        console.log(this.nom);
        let csvContent = 'data:text/csv;charset=utf-8,' + 'Nom, Cognoms, Intrument, Anotació \n'
        + this.llistat.map(music => {
          return `${music.nom}, ${music.cognoms}, ${music.instrument}, `
        }).join('\n');

        console.log(csvContent);
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Assistència ${this.nom}.csv`);
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file
      }
    }
  }
</script>

<style lang="sass" scoped>
 // .accio .boto a helper.sass
</style>
