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
      @mouseover="accio='Descarar llista com a CVS'"
      @mouseleave="accio=''">
      </download-icon>


      <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
      style="height: 25px"
      @mouseover="accio='Descarar llista com a PFD'"
      @mouseleave="accio=''" >

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
            key: 'corda',
            sortable: true
          }
        ],
        accio: ''
      }
    },
    methods: {
      descargarPDF() {

        var doc = new jsPDF('p', 'pt');
        let marginTop = 20

        let llistatPDF = []

        this.llistat.forEach(element => {
          llistatPDF.push([element.cognoms, element.nom, element.corda, '                                             '])
        });

        doc.autoTable({
          styles: {theme: 'plain'},
          margin: { top:  marginTop},
          head: [['Cognoms', 'Nom', 'corda', ' ~ ']],
          body: llistatPDF,
        })


        doc.save(`Assistència ${this.nom}.pdf`);


      },
      descargar() {
        console.log(this.nom);
        let csvContent = 'data:text/csv;charset=utf-8,' + 'Nom, Cognoms, Intrument, Anotació \n'
        + this.llistat.map(music => {
          return `${music.nom}, ${music.cognoms}, ${music.corda}, `
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
