<template lang="html">
  <b-modal id="formulari" title="Opcions certificat" ref="formulari" @ok="validarFormulari" size="lg" >
    <form ref="form" @submit.stop.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <h4>Informació per al certificat</h4>
        <label for="curs">Periode de l'assistència</label>
        <input type="text" v-model="info.periode" class="form-control" required>
        <small class="form-text text-muted mb-2">El periode en mesos durant els quals han assistit a l'activitat</small>

        <h4>Informació per al correu</h4>
        <label for="director">Cos del correu</label>
        <textarea name="anotacio" class="form-control" v-model="info.correu.cos" required></textarea>

      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: 'OpcionsEnvioCertificats',
    data() {
      return {
        info: {
          periode: '',
          correu: {
            cos: ''
          }
        }
      }
    },
    methods: {
      validarFormulari(bvModalEvt) {
        bvModalEvt.preventDefault()

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
</style>
