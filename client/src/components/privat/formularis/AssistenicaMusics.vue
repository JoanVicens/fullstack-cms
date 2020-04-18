<template lang="html">
  <b-modal
    id="formulari-assistencia-musics"
    title="Assistència"
    ref="assistencia"
    @ok="validar"
  >
    <b-table
      striped
      hover
      borderless
      outlined
      small
      responsive
      selectable="'multi'"
      sticky-header="500px"
      :items="llistatMusics"
      :fields="fields"
      ref="taula"
      ></b-table>

  </b-modal>
</template>

<script>
  import axios from 'axios'

  // import CheckSquareIcon from 'vue-feather-icons'

  export default {
    name: 'AssistenciaMusics',
    components: {
      // CheckSquareIcon
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
        llistatMusics: []
      }
    },
    props: {
      accio: Function
    },
    methods: {
      validar() {
        let assistents = [];

        this.llistatMusics.forEach((music, index) => {
          if(this.$refs.taula.isRowSelected(index)) {
            assistents.push(music._id)
          }
        });

        this.accio(assistents);
      },
      carregarInfo() {
        axios.get('/info/musics')
        .then(response => {
          this.llistatMusics = Array.from(response.data.musics)
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {

      this.carregarInfo();
    }
  }
</script>

<style lang="css" scoped>
</style>
