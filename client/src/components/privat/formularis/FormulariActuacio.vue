<template lang="html">
  <b-modal
    id="formulari"
    :title="info.titol"
    ref="formulari"
    size="lg"
    @ok="validarFormulari"
  >
    <form ref="form" @submit.stop.prevent="validarFormulari" class="label-margin" v-if="info.actuacio" novalidate>
      <label for="titol">Titol:</label>
      <b-form-input id="titol" v-model="info.actuacio.titol" class="form-control" :state="estat" required>
      </b-form-input>
      <label for="">Dia:
        <span id="tooltip-target-1">
          <info-icon size="1x" ></info-icon>
        </span>
      </label>
      <b-form-datepicker
        :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
        :start-weekday="1"
        v-model="info.actuacio.data"
        >

      </b-form-datepicker>

      <b-tooltip target="tooltip-target-1" triggers="hover">
        Fins que la actuació no tingui data <strong>NO ES CREARÀ</strong> el event a Google Calendar
      </b-tooltip>

      <label for="">Hora inci:</label>
      <b-form-timepicker v-model="info.actuacio.hora_inici" locale="en"></b-form-timepicker>

      <label for="">Hora fi:</label>
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
  import { InfoIcon } from 'vue-feather-icons'

  export default {
  name: 'ActuacioForm',
  components: {
    InfoIcon
  },
  props: { info: Object , accio: Function},
  data() {
    return {
      estat: null
    }
  },
  watch: {
    info: {
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
    validarFormulari(bvModalEvt) {
      bvModalEvt.preventDefault()

      this.estat = this.$refs.form.checkValidity()

      if(this.info.actuacio.titol && this.info.actuacio.titol != '') {
        if(this.info.actuacio.repertori_str) {
          this.info.actuacio.repertori = this.info.actuacio.repertori_str.split(/,|, /);
        }
        this.accio(this.info.actuacio)
        this.$nextTick(() => {
          this.estat = null
          this.$bvModal.hide('formulari')
        })
      }
    }
  }
}
</script>
