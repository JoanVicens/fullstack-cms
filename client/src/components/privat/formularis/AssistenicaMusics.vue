<template lang="html">
  <b-modal
    id="formulari-assistencia-musics"
    title="Assistència"
    ref="assistencia"
    size="lg"
    centered

    @ok="validar"
  >
    <div class="padding-modal-body">
      <b-table
        striped
        hover
        responsive
        selectable
        b-table-select-multi
        sticky-header="500px"
        :items="carregarInfo"
        :fields="fields"
        :busy.sync="isBusy"
        ref="taula"
        ></b-table>
    </div>

  </b-modal>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'AssistenciaMusics',
    data() {
      return {
        isBusy: false,
        fields: [
          {
            key: 'nom',
            sortable: false
          },
          {
            key: 'cognoms',
            sortable: false
          },
          {
            key: 'instrument',
            sortable: false
          }
        ],
        llistatMusics: []
      }
    },
    props: {
      accio: Function,
      formulari: Object
    },
    watch: {
      isBusy: {
        handler() {
          if(!this.isBusy) {
            let llistatAssistents = this.formulari.actuacio.assistents
            let llistaId = llistatAssistents.map(assistent => assistent._id)

            this.llistatMusics.forEach((music, index) => {
              if(llistaId.includes(music._id))
                this.$refs.taula.selectRow(index)
            });
          }
        }
      }
    },
    methods: {
      validar() {
        let assistents = [];

        this.llistatMusics.forEach((music, index) => {
          if(this.$refs.taula.isRowSelected(index)) {
            if(!this.llistatMusics.includes(music._id)) {
              assistents.push(music._id)
            }
          }
        });

        console.log('validar', assistents);
        this.accio(assistents);
      },
      carregarInfo() {
        const promise = axios.get('/info/musics', {withCredentials: true})

        return promise.then(response => {
          this.llistatMusics = Array.from(response.data.musics)

          return this.llistatMusics || [];
        })
        .catch(err => {
          console.log(err);
        })

      }
    }
  }
</script>

<style lang="css" scoped>
  /deep/ .table > tbody > tr.b-table-row-selected,
  /deep/ .table > tbody > tr.b-table-row-selected > td,
  /deep/ .table > tbody > tr.b-table-row-selected > th {
    background-color: pink;
  }
  /deep/ .table > tbody > tr:hover{
    background-color: green;
  }
  .padding-modal-body {
    margin: -16px
  }
</style>
