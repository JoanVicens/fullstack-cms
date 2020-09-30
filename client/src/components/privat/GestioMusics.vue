<template lang="html">
  <main>
    <h3 class="ml-3">Llistat complet dels músics</h3>

    <b-form inline class="m-4">
      <b-button variant="info" @click="descargarPDF" class="mr-4">Baixar llista com a PDF</b-button>
      <b-button variant="info" @click="descargar" class="mr-4">Baixar llista com a CVS</b-button>
      <b-button variant="info" @click="demanarDia">Baixar llista assaig</b-button>
    </b-form>

    <TaulaMusics :llistat="llistat" @require-reload="reloadMusicList" />

    <DiaLlistatAssaig @diaSeleccionat="descargarPDF($event)"/>
  </main>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import moment from 'moment'

  import DiaLlistatAssaig from './formularis/DiaLlistatAssaig'
  import TaulaMusics from './TaulaMusics'

  export default {
    name: 'GestioMusics',
    components: { DiaLlistatAssaig, TaulaMusics },
    data() {
      return {
        llistat: []
      }
    },
    methods: {
      demanarDia() {
        this.$bvModal.show('formulari-dia')
      },
      descargarPDF(data) {

        var doc = new jsPDF('p', 'pt');
        let marginTop = 20

        if(data.length > 0) {
          doc.setFontSize(16);

          let d = data.split('-')
          var data = `${d[2]}/${d[1]}/${d[0]}`
          doc.text(`Assaig dia: ${data}`, 40, 40);
          marginTop = 60
        }

        let llistatPDF = []

        this.llistat.forEach(element => {
          llistatPDF.push([element.cognoms, element.nom, '                                                         '])
        });

        doc.autoTable({
          styles: {theme: 'plain'},
          margin: { top:  marginTop},
          head: [['Cognoms', 'Nom', ' ~ ']],
          body: llistatPDF,
        })

        if(data.length > 0) {
          doc.save(`Assistència assaig ${data}.pdf`);
        } else {
          doc.save(`lista músics.pdf`);
        }


      },
      descargar() {
        let csvContent = 'data:text/csv;charset=utf-8,'
        // if(data.length > 0) {
        //   let d = data.split('-')
        //   var data = `${d[2]}/${d[1]}/${d[0]}`
        //   csvContent += data + '\n'
        // }
        csvContent += 'Cognom, Nom, \n'

        let llista = [...this.llistat]
        let llistaOrdenada = llista.sort( ( a, b ) => {
          if ( a.cognoms < b.cognoms ) {
            return -1;
          }
          if ( a.cognoms > b.cognoms ) {
            return 1;
          }
            return 0;
        });

        var columns = [
          {title: "Cognoms", dataKey: "cognoms"},
          {title: "Nom", dataKey: "nom"}
        ];

        csvContent += llistaOrdenada.map(music => {
          return `${music.cognoms}, ${music.nom}, `
        }).join('\n');

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Llista músics.csv`);

        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file
      },
      reloadMusicList() {
        axios({
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' },
          url: '/info/music/llistat'
        })
        .then(response => {
          this.llistat = response.data.list
        })
        .catch(console.error)
      },
      activar(id) {
        axios.put(`/info/music/activar/${id}`)
        .then(response => {
          this.carregarInfo()
        })
        .catch(console.error)
      },
      desactivar(id) {
        axios.put(`/info/music/desactivar/${id}`)
        .then(response => {
          this.carregarInfo()
        })
        .catch(console.error)
      }
    },
    mounted() {
      this.reloadMusicList()
    }
  }
</script>

<style lang="scss" scoped>
</style>
