<template lang="html">
  <main>
    <div class="container">
      <Selector
        v-bind:cursId.sync="cursId"
        v-bind:semestreId.sync="semestreId"
        v-bind:assaigId.sync="assaigId"
        v-bind:assajos.sync="assajos"
        ref="info"

      />

      <div class="card mb-4" v-for="(assaig, index) in assajos" :key="index">
        <h5 class="card-header" v-b-toggle="'collapse-' + index">
          {{assaig}}
        </h5>

      </div>

      <b-button v-b-modal.crearAssaig class="btn btn-danger btn-lg float-right mt-3">CREAR ASSAIG</b-button>

      <b-modal id="crearAssaig" title="Crear Assaig"
        ref="modal"
        @ok="crear"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          Dia *
          <b-form-datepicker
            :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
            :start-weekday="1"
            v-model="dia"
            :state="datepicker_state"
            @input="datepicker_state = true"
            >

          </b-form-datepicker>
          Hora inci
          <b-form-timepicker v-model="hora_inici" locale="en"></b-form-timepicker>

          Hora fi
          <b-form-timepicker v-model="hora_fi" locale="en"></b-form-timepicker>
          Nota:
          <textarea name="name" class="form-control" v-model="anotacio"></textarea>
        </form>
      </b-modal>
    </div>
  </main>

</template>

<script>
  import axios from 'axios';
  export default {
    name: 'GestioAssajos',
    components: {
    },
    data() {
      return {
        cursId: 0,
        semestreId: 0,
        assajos: [],
        formulari: {}
      }
    },
    methods: {
      mostrarFormulari(assaig, titol, modal) {
        this.formulari = {
          assaig: { ...assaig},
          titol: titol
        }
        this.$bvModal.show(modal)
      },
      handleSubmit() {

        // Exit when the form isn't valid
        if (this.dia === '') {
          this.datepicker_state = false;
          return
        }

        const body = {
          cursId: this.curs._id,
          semestreId: this.semestreId,
          dia: this.dia,
          hora_inici: this.hora_inici,
          hora_fi: this.hora_fi,
          anotacio: this.anotacio
        }

        axios.put('/info/assaig', body)
        .then(response => {
          this.carregarInfo()
        })

        this.datepicker_state = null;
        this.dia = null;
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('crearAssaig')
        })
      },
      crear(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit();
      },
      eliminar(id) {
        axios.delete(`/info/curs/${id}`,)
          .then(response => this.carregarInfo())
          .catch(err => console.log(err))
      },
      carregarInfo() {
        axios.get('/info/cursos')
          .then(response => {
            this.cursos = response.data.cursos

            this.curs = response.data.cursos.find(curs => curs.curs_actiu)
            this.cursId = this.curs._id;

            let data = new Date();
            if(data.getMonth() > 0 && data.getMonth() < 7) {
              this.semestre = this.curs.semestres[1];
            } else {
              this.semestre = this.curs.semetres[0];
            }
            this.semestreId = this.semestre.semestreId;

            console.log(this.semestreId);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style lang="sass" scoped>
  ul
    list-style: none
    margin: 0
    padding: 0
    li
      margin: 2px 0 5px 10px
      background-color: #fff
      border-radius: 5px
      padding: 5px
  hr
    margin: 5px
  b-form-datepicker
    width: 100%
  .btn-edicio
    padding: 0 6px
    width: 30px
    height: 30px
    margin-left: 15px

</style>
