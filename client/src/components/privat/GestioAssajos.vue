<template lang="html">
  <main>
    <div class="container">
      Curs
      <select name="curs" @change="canviCurs($event)" class="form-control" v-model="cursId">
        <option v-for="curs in cursos" :key="curs._id" :value="curs._id">{{curs.curs}}</option>
      </select>
      Semestre
      <select name="semestres" @change="canviSemestre($event)" class="form-control" v-model="semestreId">
        <option v-for="(semestre, index) in curs.semestres" v-bind:key="semestre.data" :value="semestre.semestreId">{{index + 1}}</option>
      </select>
      Assajos
      <ul>
        <li v-for="(assaig, index) in semestre.assajos" v-bind:key="index" :value="assaig.assaigId">
          Dia: {{assaig.data | moment("DD, MMMM, YYYY")}}
          <div class="float-right">
            <button type="button" name="button" class="btn btn-edicio btn-link">
              <router-link :to="{ path: '/control_assitencia/', name:'control_assitència', query: {cursId: cursId, semestreId: semestreId, assaigId: assaig.assaigId} }">
                <edit-3-icon size="1x" class="custom-class"></edit-3-icon>
              </router-link>
            </button>
            <button type="button" name="button" class="btn btn-edicio btn-danger" @click="eliminar(assaig.assaigId)">
              <trash-2-icon size="1x" class="custom-class"></trash-2-icon>
            </button>
          </div>
          <hr>
          Assistencia: {{assaig.assistencia}}

        </li>
      </ul>

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
  import { Trash2Icon } from 'vue-feather-icons'
  import { Edit3Icon  } from 'vue-feather-icons'



  import axios from 'axios';
  export default {
    components: {
      Trash2Icon,
      Edit3Icon
    },
    data() {
      return {
        hora_inici: "",
        hora_fi: "",
        dia: "",
        anotacio: "",
        cursos: [],
        curs: {},
        semestre: {},
        assaig: {},
        cursId: -1,
        semestreId: -1,
        datepicker_state: null
      }
    },
    methods: {
      canviCurs(event) {
        let data = new Date();

        this.curs = this.cursos.find(curs => curs._id == this.cursId);

        if(data.getMonth() < 7) {
          this.semestreId = this.curs.semestres[1].semestreId;
        } else {
          this.semestreId = this.curs.semestres[0].semestreId;
        }

        this.semestre = this.curs.semestres.find(semestre => semestre.semestreId == this.semestreId);

      },
      canviSemestre(event) {
        this.semestre = this.curs.semestres.find(semestre => semestre.semestreId == this.semestreId);
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        return valid
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
      },
      reCarregarInfo() {
        axios.get('/info/cursos')
          .then(response => {
            this.cursos = response.data.cursos
            this.curs = this.cursos.find(curs => curs._id == this.cursId)
            this.semestre = this.curs.semestres.find(semestre => semestre.semestreId == this.semestreId)
          })
          .catch(err => {
            console.log(err);
          })
      },
    },
    created() {
      this.carregarInfo();
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
