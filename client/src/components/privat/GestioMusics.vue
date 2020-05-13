<template lang="html">
  <main >
    <h3 class="ml-3">Llistat complet dels músics</h3>

    <b-form inline class="m-4">
      <b-button variant="info" @click="descargarPDF" class="mr-4">Baixar llista com a PDF</b-button>
      <b-button variant="info" @click="descargar" class="mr-4">Baixar llista com a CVS</b-button>
      <b-button variant="info" @click="demanarDia">Baixar llista assaig</b-button>
    </b-form>

    <div style="background-color: #fff">
      <b-table striped hover borderless responsive :items="llistat" :fields="fields">
        <template v-slot:cell(tipo_compte)="data">
          <span class="badge badge-primary" v-if="data.value === 0">normal</span>
          <span class="badge badge-info" v-if="data.value === 1">junta</span>
          <span class="badge badge-danger" v-if="data.value === 2">president</span>
          <span class="badge badge-dark" v-if="data.value === 3">admin</span>
         </template>
        <template v-slot:cell(compte_actiu)="data">
          <span class="badge badge-success" v-if="data.value">actiu</span>
          <span class="badge badge-warning" v-else>no actiu</span>
         </template>

        <template v-slot:cell(llista_correu)="data">
          <span class="badge badge-success" v-if="data.value">si</span>
          <span class="badge badge-warning" v-else>no</span>
         </template>

        <template v-slot:cell(accions)="row">
          <b-dropdown text="accions"  class="m-md-2">
            <b-dropdown-item v-if="!row.item.compte_verificat">Reenviar correu verificació</b-dropdown-item>
            <b-dropdown-item v-if="row.item.compte_actiu" @click="desactivar(row.item._id)">Desactivar compte</b-dropdown-item>
            <b-dropdown-item v-else @click="activar(row.item._id)">Activar compte</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group header="Canviar tipus">
              <b-dropdown-item @click="canviTipus(row.item._id, row.item.tipo_compte, 0)">normal</b-dropdown-item>
              <b-dropdown-item @click="canviTipus(row.item._id, row.item.tipo_compte, 1)">junta</b-dropdown-item>
              <b-dropdown-item @click="canviTipus(row.item._id, row.item.tipo_compte, 2)">president</b-dropdown-item>
              <b-dropdown-item @click="canviTipus(row.item._id, row.item.tipo_compte, 3)">admin</b-dropdown-item>
            </b-dropdown-group>
          </b-dropdown>
         </template>

      </b-table>



    </div>

    <DiaLlistatAssaig @diaSeleccionat="descargarPDF($event)"/>
  </main>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import moment from 'moment'

  import DiaLlistatAssaig from './formularis/DiaLlistatAssaig'

  export default {
    name: 'GestioMusics',
    components: { DiaLlistatAssaig },
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
          },
          {
            label: 'Tipus de compte',
            key: 'tipo_compte',
            sortable: true
          },
          {
            label: 'Compte actiu',
            key: 'compte_actiu',
            sortable: true
          },
          {
            label: 'Subscrit al newsletter',
            key: 'llista_correu',
            sortable: true
          },
          {
            label: 'accions',
            key: 'accions',
            sortable: false
          }
        ],
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
        if(data.length > 0) {
          let d = data.split('-')
          var data = `${d[2]}/${d[1]}/${d[0]}`
          csvContent += data + '\n'
        }
        csvContent += 'Cognom, Nom, \n'

        let llistaOrdenada = [...this.llistat]
        llistaOrdenada = llistaOrdenada.sort( ( a, b ) => {
          if ( a.cognoms < b.cognoms ){
            return -1;
          }
          if ( a.cognoms > b.cognoms ){
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
        if(data.length > 0) {
          link.setAttribute("download", `Assistència assaig ${data}.csv`);
        } else {
          link.setAttribute("download", `Llista músics.csv`);
        }
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file
      },
      carregarInfo() {
        axios.get('/info/musics')
        .then(response => {
          console.log(response);
          this.llistat = response.data.musics
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
      },
      canviTipus(id, tipusAnterior, tipus) {
        axios.put('/info/music/tipo', {tipus, tipusAnterior, id})
        .then(response => {
          this.carregarInfo()
        })
        .catch(console.error)
      }
    },
    mounted() {
      this.carregarInfo()
    }
  }
</script>

<style lang="css" scoped>
</style>
