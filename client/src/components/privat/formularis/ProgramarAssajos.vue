<template lang="html">
  <b-modal
    id="formulari-programacio"
    title="Programar assajos"
    ref="formulari"
    size="lg"
    @ok="validarFormulari"
    @hidden="resetejar()"
  >
  <b-alert v-model="alertaDiaSetmana" dismissible variant="warning">
    Comprova que els dies seleccionats coincideixin amb el dia de la setmana
  </b-alert>
  <b-alert v-model="alertCrearAjassos" dismissible variant="warning">
    <strong>Primer has de crear els assajos</strong>
  </b-alert>

  <form ref="form" @submit.stop.prevent="" class="label-margin"  v-if="info.assajos" novalidate>
    <label>Dia de la setmana</label>
    <div class="text-center">
      <b-form-group label="" class="special">
        <b-form-radio-group
          v-model="info.assajos.dia"
          :options="options"
          buttons
          button-variant="outline-secondary"
        ></b-form-radio-group>
      </b-form-group>
    </div>

    <label> Hora inci: *</label>
    <b-form-timepicker
      v-model="info.assajos.hora_inici"
      locale="es"
      required>
    </b-form-timepicker>

    <label> Hora fi: *</label>
    <b-form-timepicker
    v-model="info.assajos.hora_fi"
    locale="es"
    required>
    </b-form-timepicker>
    <!-- <div class="relative">
      <div class="invalid-tooltip" v-bind:class="{display: inici_fi_state}">
        Comprova el horari del assajos
      </div>
    </div> -->

    <label>Desde el:</label>
    <b-form-datepicker
    :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
    :start-weekday="1"
    v-model="info.assajos.data_inici"
    required
    >
    </b-form-datepicker>

    <label>Fins al:</label>
    <b-form-datepicker
    :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
    :start-weekday="1"
    v-model="info.assajos.data_fi"
    required
    >
    </b-form-datepicker>

    <label> Lloc: </label>
    <b-form-input id="titol" v-model="info.assajos.lloc" class="form-control"></b-form-input>

    <b-button @click="crearAssajos" class="mb-3 mt-2" v-bind:class="{heartbeat: alertCrearAjassos}" variant="outline-primary">Crear assajos</b-button>

    <div class="container mb-2" v-if="dates.length > 0">
      <label for="">Assajos:</label>
      <b-list-group >
        <b-list-group-item v-for="(data, index) in dates" :key="index" class="d-flex justify-content-between align-items-center">
          {{data | moment("DD MMMM YYYY")}}
          <b-badge href="#" variant="danger">
            <trash-2-icon size="1x" @click="borrarAssaig(data)">
            </trash-2-icon>
          </b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>

    <small class="form-text text-muted mb-2">* Camps obligatoris</small>
  </form>
</b-modal>
</template>

<script>
  import moment from 'moment'

  import { Trash2Icon } from 'vue-feather-icons'

  export default {
    name: 'ProgramarAssajos',
    components: {
      Trash2Icon
    },
    props: {
      info: Object,
      accio: Function
    },
    data() {
      return {
        alertaDiaSetmana: false,
        alertCrearAjassos: false,
        dates: [],
        options: [
          {
            text: 'dilluns',
            value: 1
          },
          {
            text: 'dimarts',
            value: 2
          },
          {
            text: 'dimecres',
            value: 3
          },
          {
            text: 'dijous',
            value: 4
          },
          {
            text: 'divendres',
            value: 5
          },
          {
            text: 'dissabte',
            value: 6
          },
          {
            text: 'diumenge',
            value: 7
          }
        ]
      }
    },
    methods: {
      actualitzarStats() {
        return true
      },
      crearAssajos() {
          let stats = this.actualitzarStats()

          if(stats) {
            const dies = [] // dies moment

            let inici = this.info.assajos.data_inici.replace('-', ''),
                fi = this.info.assajos.data_fi.replace('-', '')

            let start = moment(inici, "YYYYMMDD"),
                end   = moment(fi, "YYYYMMDD"),
                day   = this.info.assajos.dia;

            if(start.day() != this.info.assajos.dia) {
              this.alertaDiaSetmana = true
              return
            } else if(end.day() != this.info.assajos.dia) {
              this.alertaDiaSetmana = true
              return
            } else {
              this.alertaDiaSetmana = false
            }

            var current = start.clone();

            dies.push(start);

            while (current.day(7 + day).isBefore(end)) {
              if(current.day() == this.info.assajos.dia)
                dies.push(current.clone());
            }

            dies.push(end);

            dies.forEach(dia => {
              this.dates.push(moment(dia).format('YYYY-MM-DD'))
            });

          }


      },
      borrarAssaig(data) {
        let index = this.dates.indexOf(data)
        this.dates.splice(index, 1)
      },
      validarFormulari(bvModalEvt) {
        bvModalEvt.preventDefault();

        let stats = this.actualitzarStats();

        if(!stats) {
          return
        } else if (this.dates.length == 0) {
          // this.crearAssajos()
          this.alertCrearAjassos = true
          return
        }

        const assajos = [] // Array dels assajos a ser insertats
        const hora_inici = this.info.assajos.hora_inici
        const hora_fi = this.info.assajos.hora_fi
        const lloc = this.info.assajos.lloc

        this.dates.forEach(data => {
          assajos.push({ data, hora_inici, hora_fi, lloc })
        });

        console.log(typeof hora_fi);
        this.accio(assajos)
        this.$nextTick(() => {
          this.dates = []
          this.$bvModal.hide('formulari-programacio')
        })
      },
      resetejar(bvModalEvt) {
        this.dates = []
        this.alertaDiaSetmana = false
        this.alertCrearAjassos = false
      }
    }
  }
</script>

<style lang="css" scoped>
  .btn-group {
    display: flex
  }

  .btn-group .btn {
    flex: 1
  }

</style>
