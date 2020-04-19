<template lang="html">
  <section class="mt-2">
    <b-table striped hover borderless responsive sticky-header="500px" :items="llistat" :fields="fields"></b-table>
    <div class="accions">
      <span>{{accio}}</span>
      <user-plus-icon
      size="1.5x"
      class="boto"
      @click="demanarActualitzacio"
      @mouseover="accio='Modificar assistents'"
      @mouseleave="accio=''">
      </user-plus-icon>
      <download-icon
      size="1.5x"
      class="boto"
      @click="descargar"
      @mouseover="accio='Descarar llista'"
      @mouseleave="accio=''">
      </download-icon>
    </div>
  </section>
</template>

<script>

  import axios from 'axios'

  import  {DownloadIcon} from 'vue-feather-icons'
  import  {UserPlusIcon} from 'vue-feather-icons'

  export default {
    name: 'LlistaMusics',
    props: {
      llistat: Array,
      nom: String
    },
    components: {
      DownloadIcon,
      UserPlusIcon
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
        ],
        accio: ''
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
      },
      demanarActualitzacio() {
        this.$emit('actualitzar')
      }
    }
  }
</script>

<style lang="sass" scoped>
 // .accio .boto a helper.sass
</style>
