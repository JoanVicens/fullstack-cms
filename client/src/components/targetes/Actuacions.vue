<template lang="html">
  <div class="targeta">
    <LoadingBar v-if="loading"/>
    <div class="header">
      Actuacions
    </div>
    <div class="contingut padding-targeta" ref="llistat">
      <div v-if="actuacions.length > 0">
        <div v-for="(actuacio, index) in actuacions" v-bind:key="index" class="actuacio">
          <div v-bind:class="{disabled: loading}">
            <div class="titol-actuacio">
              {{ actuacio.titol }}
            </div>
            <div class="data-concert">
              {{ actuacio.data | moment("DD MMMM YYYY") }}
            </div>
          </div>
          <ToggleButton :value="attendanceOf(actuacio, index)"
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
        </div>
      </div>
      <div class="padding-targeta mb-2" v-else>
        Encara no hi han actuacions programades &#128531;
      </div>
    </div>
  </div>

</template>

<script>
  import Axios from 'axios'
  import LoadingBar from '../ui/LoadingBar.vue'
  import { ToggleButton } from 'vue-js-toggle-button'

  export default {
    name: 'Actuacions',
    components: {
      LoadingBar,
      ToggleButton
    },
    data() {
      return {
        actuacions: [],
        loading: false
      }
    },
    methods: {
      getCurrentSemester() {
        let data = new Date();
        return (data.getMonth() > 0 && data.getMonth() < 7) ? 1 : 0;
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
      attendanceOf(actuacio, index) {
        let assistents = actuacio.assistents
        console.log(assistents);
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
            let data = Date.parse( actuacio.data)
            if(data > avui) {
              this.actuacions.push(actuacio)
            }
          });
        });
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/targetes/targeta';

  .padding-targeta {
    font-size: 1.25rem;
  }
  .actuacio {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    &:nth(2n+3) {
      border-top: 1px solid lightgray;
      border-radius: 25%;
    }
    .titol-actuacio {
      font-family: 'Roboto';
      text-transform: capitalize;
      &.disabled {
        color: lightgray;
      }
    }
    .data-concert {
      font-size: .8rem;
      line-height: .8rem;      
    }
    label {
      margin-bottom: 0;
    }
  }

</style>
