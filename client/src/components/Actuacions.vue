<template lang="html">
  <main class="pt-4">
    <div class="container-sm">
      <LoadingBar v-if="loading"/>
      <div class="p-4 text-center" v-if="actuacionsActives.length === 0">
        <h2> Encara no hi ha actuacions programades</h2>
      </div>
      <!-- ACTUACIONS ACTIVES -->
      <article class="actuacio" v-for="(actuacio, index) in actuacionsActives" :key="index">
        <ToggleButton :value="attendanceOf(actuacionsActives, index)"
          class="float-right toggle-button"
          @change="attendanceChanged"
          :color="{
            checked: '#c0caad',
            unchecked: '#C33C54',
            disabled: '#CCCCCC'
          }"
          :tag="actuacio._id"
          :width="100"
          :height="30"
          :labels="{checked: 'Assistiré', unchecked: 'No assistiré'}"
          :disabled="loading"
        />
        <div class="titol">{{ actuacio.titol }}</div>
        <div class="data" v-if="actuacio.data">{{ actuacio.data | moment("DD MMMM YYYY") }}</div>
        <div class="lloc" v-if="actuacio.lloc">
          <map-pin-icon size="1x" class="mr-1" />
          <a v-if="actuacio.lloc_plus" :href="plusSearch(actuacio.lloc_plus)" target="_blank">{{ actuacio.lloc }}</a>
          <span v-else>
            {{ actuacio.lloc }}
          </span >
        </div>
        <div class="descripcio" v-if="actuacio.descripcio">
          <strong class="mr-1">Descripcio </strong>
          {{ actuacio.descripcio }}
        </div>
        <div class="mt-2" v-if=" actuacio.repertori.length > 0">
          <strong>Repertori</strong>
          <ul class="repertori" >
            <li v-for=" (obra, index) in actuacio.repertori" :key="index">{{ obra }}</li>
          </ul>
        </div>
      </article>

      <!-- ACTUACIONS PASSDES -->
      <article class="actuacio" v-for="(actuacio, index) in actuacionsPassades" :key="index">
        <div class="titol">{{ actuacio.titol }}</div>
        <div class="data" v-if="actuacio.data">{{ actuacio.data | moment("DD MMMM YYYY") }}</div>
        <div class="lloc" v-if="actuacio.lloc">
          <map-pin-icon size="1x" class="mr-1" />
          <a v-if="actuacio.lloc_plus" :href="plusSearch(actuacio.lloc_plus)" target="_blank">{{ actuacio.lloc }}</a>
          <span v-else>
            {{ actuacio.lloc }}
          </span >
        </div>
        <div class="descripcio" v-if="actuacio.descripcio">
          <strong class="mr-1">Descripcio </strong>
          {{ actuacio.descripcio }}
        </div>
        <div class="mt-2" v-if=" actuacio.repertori.length > 0">
          <strong>Repertori</strong>
          <ul class="repertori" >
            <li v-for=" (obra, index) in actuacio.repertori" :key="index">{{ obra }}</li>
          </ul>
        </div>
      </article>
    </div>
  </main>

</template>

<script>
  import Axios from 'axios';
  import { MapPinIcon } from 'vue-feather-icons';
  import { ToggleButton } from 'vue-js-toggle-button'
  import LoadingBar from './ui/LoadingBar.vue'

  export default {
    name: 'Actuacions',
    components: { MapPinIcon, ToggleButton, LoadingBar },
    data() {
      return {
        actuacionsActives: [],
        actuacionsPassades: [],
        loading: false,
        id: null
      }
    },
    methods: {
      getCurrentSemester() {
        let data = new Date();
        return (data.getMonth() > 0 && data.getMonth() < 7) ? 1 : 0;
      },
      plusSearch(plusCode) {
        return `https://www.google.es/maps/place/${plusCode.replace('+', '%2B')}`
      },
      attendanceChanged(event) {

        if(event.value != undefined && event.tag) {
          this.loading = true

          const action = event.value ? 'afegir' : 'llevar';
          Axios.put(`/info/actuacio/${action}/assistent/${event.tag}`)
          .then(() => { this.loading = false })
          .catch(() => { this.loading = false })
        }
      },
      attendanceOf(llistat, index) {
        let assistents = llistat[index].assistents
        return assistents.includes(this.id)
      },
    },
    mounted() {
      let avui = new Date();
      let currentSemester = this.getCurrentSemester();

      this.id = localStorage.getItem('id')

      Axios.get('/info/actuacio/actiu')
      .then(response => {
        let semestres = response.data.curs.semestres;

        semestres.forEach(semestre => {
          semestre.actuacions.forEach(actuacio => {
            let data = Date.parse(actuacio.data)
            if(data > avui) {
              this.actuacionsActives.push(actuacio)
            } else {
              this.actuacionsPassades.push(actuacio)
            }
          });
        });
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap';
  @import '../sass/colors';
  @import '../sass/botons';

  .actuacio {
    padding: .5rem 1rem;
    background-color: white;
    margin-bottom: .5rem;
    strong {
      font-family: 'Roboto';
    }
    .titol {
      font-size: 1.5rem;
      font-weight: bold;
      font-family: 'Roboto';
    }
    .toggle-button {
      margin-top: 3px;
    }
    .data {
      font-style: italic;
    }
    .repertori {
      list-style: none;
      width: 100%;
      padding: 2px;
      margin: 5px 0px;
      background-color: $gris-clar;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-content: flex-start;
      flex-wrap: wrap;
      li {
        padding: 0;
      }
    }
    .descripcio {
      margin: 5px 0;
    }
  }

  .assistencia {
    align-self: stretch;
    padding: 6px 8px;
    font-size: 1.25rem;
    min-width: 100px;
    line-height: 38px;
    span {
      border-radius: 100%;
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-right: 5px;
      span.no { background-color: $brick-red }
      span.si { background-color: $verdet }
    }
  }
</style>
