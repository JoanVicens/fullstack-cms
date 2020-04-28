<template lang="html">
  <b-modal id="formulari" title="Opcions certificat" ref="formulari" @ok="validarFormulari" size="xl" >
    <form ref="form" @submit.stop.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <h4>Informació per al certificat</h4>
        <label for="curs">Periode de l'assistència</label>
        <input type="text" v-model="info.periode" class="form-control" required>
        <small class="form-text text-muted mb-2">El periode en mesos durant els quals han assistit a l'activitat</small>

        <hr>

        <h4>Informació per al correu</h4>
        <label for="director">Cos del correu</label>
        <textarea class="form-control" v-model="info.correu.markdown" required></textarea>
        <small class="text-muted float-right mt-2">
          Accepta estils markdown
          <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">
            <external-link-icon size="1.2x" class="custom-class"></external-link-icon>
          </a>
        </small>

        <h5 class="mt-4">Previsualització</h5>
        <vue-markdown :source="info.correu.markdown" ref="sortidaHtml" class="previsualitzacio"></vue-markdown>

      </div>
    </form>
  </b-modal>
</template>

<script>
  import VueMarkdown  from 'vue-markdown'

  import { ExternalLinkIcon } from 'vue-feather-icons'

  export default {
    name: 'OpcionsEnvioCertificats',
    components: {
      VueMarkdown,
      ExternalLinkIcon
    },
    data() {
      return {
        info: {
          periode: '',
          correu: {
            cos: '',
            markdown: ''
          }
        }
      }
    },
    methods: {
      validarFormulari(bvModalEvt) {
        bvModalEvt.preventDefault()

        this.info.cos = this.$refs.sortidaHtml.$el.innerHTML

        if(this.info.periode !== '' && this.info.correu.cos !== '') {
          this.$nextTick(() => {
            this.$emit('cagar', this.info)
            this.$bvModal.hide('formulari')
          })
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .previsualitzacio
    background-color: #eee
    padding: 15px
    border: 1px solid #ced4da
  textarea
    min-height: 350px
    border-radius: 0

</style>
