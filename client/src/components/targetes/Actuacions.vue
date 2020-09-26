<template lang="html">
  <div class="targeta">
    <LoadingBar v-if="loading"/>
    <div class="header">
      Actuacions
    </div>
    <div class="contingut padding-targeta" ref="llistat">
      <div v-if="actuacions.length > 0">
        <div v-for="(actuacio, index) in actuacions" v-bind:key="index" class="actuacio">
          <div class="titol-actuacio">
            {{ actuacio.titol }}
          </div>
          {{ attendanceOf(index) }}
          <ToggleButton :value="attendanceOf(index)"
            @change="attendanceChanged"
            :color="{
              checked: '#c0caad',
              unchecked: '#C33C54',
              disabled: '#CCCCCC'
            }"
            :tag="actuacio._id"
            :width="100"
            :height="30"
            :labels="{checked: 'Assistiré', unchecked: 'No assistiré'}"/>
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
  import LoadingBar from '../LoadingBar.vue'
  import { ToggleButton } from 'vue-js-toggle-button'

  export default {
    name: 'Actuacions',
    components: {
      LoadingBar,
      ToggleButton
    },
    props: {
      semestres: Array,
      id: String
    },
    data() {
      return {
        actuacions: [],
        loading: false
      }
    },
    methods: {
      attendanceChanged(event) {

        if(event.value != undefined && event.tag) {
          this.loading = true

          const action = event.value ? 'afegir' : 'llevar';
          Axios.put(`/info/actuacio/${action}/assistent/${event.tag}`)
          .then(() => { this.loading = false})
        }
      },
      attendanceOf(index) {
        let assistents = this.actuacions[index].assistents
        assistents.forEach(assistent => {
          if(assistent._id === this.id)
            return true
        });

        return false
      },
    },
    mounted() {
      let avui = new Date();

      this.semestres.forEach(semestre => {
        semestre.actuacions.forEach(actuacio => {
          let data = Date.parse( actuacio.data)
          if(data > avui) {
            this.actuacions.push(actuacio)
          }
        });
      });
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
    .titol-actuacio {
      font-family: 'Roboto';
      text-transform: capitalize;
    }
  }

</style>
