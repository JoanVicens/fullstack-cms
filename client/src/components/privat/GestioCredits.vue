<template lang="html">
  <main>
    <div class="container">
      <Selector
        v-bind:assajos.sync="assajos"
        ref="info"
      />

      <div class="mb-3 accions-taula">
        <button type="button" name="button" class="btn btn-primary float-right mr-1 mt-4" v-b-modal.formulari >Enviar Certificats</button>
        <h5>Filtrar</h5>
        <b-form-group
          label=""
          label-size="sm"
          class="mb-0">
            <b-form-checkbox v-model="filter" value="true">Compleixen el requisit</b-form-checkbox>
        </b-form-group>
      </div>

      <div class="taula-wrapper">
        <b-table
          hover
          small
          fixed
          response
          selectable
          head-variant="dark"
          responsive="sm"
          :items="taula"
          :fields="fields"
          :tbody-tr-class="rowClass"
          :filter="filter"
          ref="taula"
          >
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ width: field.key === 'selected' ? '35px' : '' }"
            >
          </template>

          <template v-slot:cell(generarCertificat)="row">
            <b-form-group>
              <b-form-checkbox
                 v-model="row.item.generarCertificat"
                 :id="'checkbox' + row.index"
               ></b-form-checkbox>
            </b-form-group>
          </template>

          </b-table>
      </div>

    </div>

    <OpcionsEnvioCertificats v-on:cagar="enviarInfoCertificats($event)" />
  </main>
</template>

<script>
  import axios from 'axios'

  import OpcionsEnvioCertificats from './formularis/OpcionsEnvioCertificats.vue'

  import Selector from './Selector.vue'

  export default {
    name: 'GestioCredits',
    components: {
      Selector,
      OpcionsEnvioCertificats
    },
    data() {
      return {
        assajos: [],
        musics: [],
        taula: [],
        filter: null,
        fields: [
          {
            key: "nom",
            sortable: false
          },
          {
            key: "cognoms",
            sortable: false
          },
          {
            key: "corda",
            sortable: false
          },
          {
            key: "numAssajosAssistits",
            label: "Assistits",
            sortable: false
          },
          {
            key: "totalAssajosSemestre",
            label: "Total assajos",
            sortable: false
          },
          {
            key: "percentatgeStr",
            label: "percentatge",
            sortable: false
          },
          {
            key: "generarCertificat",
            label: "Generar certificat",
            sortable: false,
            tdClass: 'sense-marge'
          }
        ],
        opcions: null
      }
    },
    watch: {
      assajos: {
        handler() {
          if(this.musics.length > 0) {
            this.contabilitzarAssistencia();
          }
        }
      },
      musics: {
        handler() {
          if(this.assajos.length > 0) {
            this.contabilitzarAssistencia();
          }
        }
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.generarCertificat) return 'table-success'
      },
      contabilitzarAssistencia() {
        this.taula = []

        let totalAssajosSemestre = this.assajos.length

        this.musics.forEach(music => {
          let numAssajosAssistits = 0;

          this.assajos.forEach(assaig => {
            if(assaig.assistents.includes(music._id))
              numAssajosAssistits++
          });

          let percentatgeNum = (numAssajosAssistits * 100) / totalAssajosSemestre
          let percentatgeStr = isFinite(percentatgeNum) ? percentatgeNum.toFixed(0) + '%' : '~'

          this.taula.push({
            _id: music._id,
            email: music.email,
            nom: music.nom,
            cognoms: music.cognoms,
            corda: music.corda,
            dni: music.dni,
            numAssajosAssistits,
            totalAssajosSemestre,
            percentatgeNum,
            percentatgeStr,
            generarCertificat: percentatgeNum > 80
          })
        });
      },
      enviarInfoCertificats: function(info) {

        const musicsAmbDret = []

        this.taula.forEach(music => {
          if(music.generarCertificat) {
            musicsAmbDret.push(music)
          }
        })

        const body = {
          infoMusics: musicsAmbDret,
          opcions: info
        }
        axios.post('/docs/certificats',  body)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      axios.get('/info/musics', {withCredentials: true})
      .then(response => {
        this.musics = response.data.musics
      })
      .catch(err => {
        console.error(err);
      })
    }
  }
</script>

<style lang="sass" scoped>
  .taula-wrapper
    background-color: #fff
  .sense-marge
    width: 20px

  .sense-marge .form-group
    margin: 0
    padding-left: 5px

  .accions-taula
    min-height: 70px

</style>
