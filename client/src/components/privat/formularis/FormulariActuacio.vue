<template lang="html">
  <b-modal
    id="formulari"
    :title="info.titol"
    ref="formulari"
    @ok="validarFormulari"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit" class="separacio-interna" v-if="info.actuacio" novalidate>
      <label for="titol">Titol:</label>
      <input type="text" name="titol" id="titol" v-model="info.actuacio.titol" class="form-control" required>

      <label for="">Dia</label>
      <b-form-datepicker
        :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
        :start-weekday="1"
        v-model="info.actuacio.data"
        >

      </b-form-datepicker>

      <label for="">Hora inci</label>
      <b-form-timepicker v-model="info.actuacio.hora_inici" locale="en"></b-form-timepicker>

      <label for="">Hora fi</label>
      <b-form-timepicker v-model="info.actuacio.hora_fi" locale="en"></b-form-timepicker>

      <label for="">Repertori:</label>
      <small id="emailHelp" class="form-text text-muted mb-2">Escriure les obres separades per comes</small>
      <textarea name="name" class="form-control" v-model="info.actuacio.repertori_str"></textarea>

      <label for="localitzacio">Localització:</label>
      <small id="emailHelp" class="form-text text-muted mb-2">Pegar el codi plus </small>
      <input type="text" name="localitzacio" id="localitzacio" v-model="info.actuacio.lloc" class="form-control">

      <label for="">Descripció:</label>
      <textarea name="name" class="form-control" v-model="info.actuacio.descripcio"></textarea>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: 'ActuacioForm',
  props: { info: Object , accio: Function},
  watch: {
    actuacio: {
      handler() {
        if(this.info.actuacio.repertori && this.info.actuacio.repertori.length > 0) {
          this.info.actuacio.repertori_str = this.info.actuacio.repertori.join(', ')
        }

        if(this.info.actuacio.data) {
          this.info.actuacio.data = this.info.actuacio.data.split('T')[0]
        }
      }
    }
  },
  methods: {
    validarFormulari(form) {
      if(this.info.actuacio.titol && this.info.actuacio.titol != '') {
        if(this.info.actuacio.repertori_str) {
          this.info.actuacio.repertori = this.info.actuacio.repertori_str.split(/,|, /);
        }
        this.accio(this.info.actuacio)
        this.$refs['formulari'].hide()
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
