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

      <div class="taula-wrapper">
        <b-table
          hover
          small
          fixed
          response
          selectable
          head-variant="dark"
          responsive="sm"
          :items="llistatComplet"
          :fields="fields"
          ref="taula"
          v-show="Object.keys(assaig).length !== 0"
          @row-clicked="filaSeleccionada"
          >
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ width: field.key === 'selected' ? '35px' : '' }"
            >
          </template>

          <template v-slot:cell(selected)="row">
            <b-form-group>
              <b-form-checkbox
                 v-model="row.rowSelected"
                 :id="'checkbox' + row.item._id"
               ></b-form-checkbox>
            </b-form-group>
          </template>

          </b-table>
      </div>

      <b-button variant="info" @click="actualizarAssistencia(assaig)">Actualitzar</b-button>

    </div>
  </main>
</template>

<script>
  import axios from 'axios';

  import Selector from './Selector.vue'

  export default {
    name: 'ControlAssistencia',
    components: {
      Selector
    },
    data() {
      return {
        semestreId: 0,
        assaigId: 0,
        assajos: [],
        assaig: {},
        formulari: {},
        fields: [
          {
            key: "selected",
            label: "",
            tdClass: 'sense-marge'
          },
          {
            key: 'nom',
            sortable: false
          },
          {
            key: 'cognoms',
            sortable: false
          },
          {
            key: 'corda',
            sortable: false
          }
        ],
        llistatComplet: []
      }
    },
    watch: {
      assaigId: {
        handler() {
          this.assaig = this.assajos.find(assaig => assaig._id == this.assaigId)
        }
      },
      assaig: {
        handler() {
          console.log('assaig actu');
          this.llistatComplet.forEach((music, index) => {
            console.log(this.assaig.assistents.includes(music._id));
            if(this.assaig.assistents.includes(music._id)) {
              this.$refs.taula.selectRow(index)
            } else {
              this.$refs.taula.unselectRow(index)
            }
          })
        }
      }
    },
    methods: {
      carregarInfo() {
        const promise = axios.get('/info/musics', {withCredentials: true})

        return promise.then(response => {
          let llistat = Array.from(response.data.musics)

          llistat.map(element => element.selected = false)

          return llistat || [];
        })
        .catch(err => {
          console.log(err);
        })

      },
      filaSeleccionada(music, index) {

        if(!this.assaig.assistents.includes(music._id)) {
          this.assaig.assistents.push(music._id)
          this.llistatComplet[index].selected = true
        } else {
          console.log('unselect', index);
          this.assaig.assistents.splice(index, 1);
          this.llistatComplet[index].selected = false
        }
      },
      actualizarAssistencia(assaig) {
        axios.put('/info/assaig/assistencia',  {assaig})
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.carregarInfo()
      .then(llistat => {
        console.log(llistat);
        this.llistatComplet = llistat
      })
      .catch(err => {
        console.log(err);
      })

    }
  }
</script>

<style lang="css" scoped>
  .padding-modal-body {
    margin: -16px
  }
  .taula-wrapper {
    background-color: #fff
  }
  .sense-marge {
    width: 20px
  }
  .sense-marge .form-group {
    margin: 0;
    padding-left: 5px;
  }
</style>
