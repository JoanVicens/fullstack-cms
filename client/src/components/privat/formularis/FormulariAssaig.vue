<template lang="html">
  <b-modal
    id="formulari"
    :title="info.titol"
    ref="formulari"
    size="lg"
    @ok="validarFormulari"
  >
    <form ref="form" @submit.stop.prevent="" class="label-margin"  v-if="info.assaig" novalidate>
      <label>Dia: *</label>
      <b-form-datepicker
        :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
        :start-weekday="1"
        v-model="info.assaig.data"
        :state="datepicker_state"
        required
        @input="datepicker_state = true"
        >
      </b-form-datepicker>

      <label> Hora inci: *</label>
      <b-form-timepicker
        v-model="info.assaig.hora_inici"
        locale="es"
        :state="hora_inici_state"
        @input="hora_inici_state = true"
        required>
      </b-form-timepicker>

      <label> Hora fi: *</label>
      <b-form-timepicker
      v-model="info.assaig.hora_fi"
      locale="es"
      :state="hora_fi_state"
      @input="hora_fi_state = true"
      required></b-form-timepicker>
      <div class="relative">
        <div class="invalid-tooltip" v-bind:class="{display: inici_fi_state}">
          Comprova el horari del assaig
        </div>
      </div>

      <label> Lloc: </label>
      <b-form-input id="titol" v-model="info.assaig.lloc" class="form-control"></b-form-input>

      <label> Nota: </label>
      <textarea name="name" class="form-control" v-model="info.assaig.anotacio"></textarea>

      <small class="form-text text-muted mb-2">* Camps obligatoris</small>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: 'AssaigForm',
    props: {
      info: Object,
      accio: Function
    },
    data() {
      return {
        datepicker_state: null,
        hora_inici_state: null,
        hora_fi_state: null,
        inici_fi_state: null,
      }
    },
    watch: {
      info: {
        handler() {
          if(this.info.assaig.data) {
            this.info.assaig.data = this.info.assaig.data.split('T')[0]
          }

          this.datepicker_state = null
          this.hora_inici_state = null
          this.hora_fi_state = null
          this.inici_fi_state = false
        }
      }
    },
    methods: {
      validarFormulari(bvModalEvt) {
        bvModalEvt.preventDefault()

        if(this.info.assaig.hora_inici == undefined) {
          this.hora_inici_state = false
        }

        if(this.info.assaig.hora_fi == undefined) {
          this.hora_fi_state = false
        }

        if(this.info.assaig.data == undefined) {
          this.datepicker_state = false
        } else {
          const inici = Date.parse(this.info.assaig.data + 'T' + this.info.assaig.hora_inici)
          const fi = Date.parse(this.info.assaig.data + 'T' + this.info.assaig.hora_fi)

          if(fi < inici) {
            this.inici_fi_state = true
          } else {
            this.inici_fi_state = false
          }
        }

        if(this.hora_inici_state != false && this.info.assaig.hora_fi != false &&
           this.datepicker_state != false && this.inici_fi_state == false) {
          // El formulari és correcte

          this.accio(this.info.assaig)
          this.$nextTick(() => {
            this.$bvModal.hide('formulari')
          })

        } else {
          console.log('formulari incorrecte');
        }

      }
    }
  }
</script>

<style lang="sass" scoped>
  .relative
    position: relative
  .display
    display: block
</style>
