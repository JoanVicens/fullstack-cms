<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Actuacions</h2>
    </div>
    <div class="contingut">
      <table class="table table-borderless" v-if="actuacions.length > 0">
        <tbody>
          <tr v-for="(actuacio, index) in actuacions" v-bind:key="index">
            <th class="check" scope="row">{{actuacio.titol}}</th>
            <td :class="{rojet: !estara(index), verdet: estara(index)}">
              <span class="boto-actuacio transition">
                <span class="icono icono-rojet">
                  <x-icon size="1x" class=""></x-icon>
                </span>
                <span class="accio accio-rojet"></span>
                <span class="accio accio-verdet"></span>
                <span class="icono icono-verdet">
                  <check-icon size="1x" class="icono icono-verdet"></check-icon>
                </span>
              </span>
            </td>
          </tr>

        </tbody>
      </table>

      <div v-else>
        <h5>Encara no hi han actuacions programades &#128531;</h5>
      </div>
    </div>
  </div>

</template>

<script>
  import { CheckIcon, XIcon } from 'vue-feather-icons'

  export default {
    name: 'concerts',
    components: {
      CheckIcon,
      XIcon
    },
    props: {
      info: Array,
      id: String
    },
    data() {
      return {
        actuacions: []
      }
    },
    methods: {
      estara(index) {
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

      this.info.forEach(semestre => {
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

<style lang="sass" scoped>
  td
    padding: 12 20px

  .boto-actuacio
    height: 30px
    display: flex
    align-items: center
    border-radius: .25rem
    min-width: 140px

  .transition
    .accio
      will-change: width, padding
      transition: max-width 1s linear 0s, padding .5s linear 0s, border
      &::after
        opacity: 1
        transition: opacity .2s linear .5s

  .icono
    align-items: center
    flex: 1
    text-align: center
    max-width: 30px
    height: 30px
    svg
      stroke: #fff
      stroke-width: 6

  .accio
    border: 1px solid
    height: 30px
    flex: 3
    text-align: center
    &:hover
      background-color: #efefef

  .verdet
    .icono-verdet
      background-color: #C5F694
      border-top-right-radius: .25rem
      border-bottom-right-radius: .25rem
    .accio-verdet
      max-width: 140px
      padding: 0 15px
      border: 1px solid
      border-top-left-radius: .25rem
      border-bottom-left-radius: .25rem
      border-color: #C5F694
      &::after
        content: 'estaré'
    .icono-rojet
      opacity: 0
      width: 0 !important
      height: 0
      overflow: hidden
    .accio-rojet
      max-width: 0px !important
      padding: 0 !important
      border: none
      &::after
        content: ''
        opacity: 0

  .rojet
    .icono-rojet
      background-color: #FE6E6E
      border-top-left-radius: .25rem
      border-bottom-left-radius: .25rem
    .icono-verdet
      opacity: .3
    .accio-verdet
      max-width: 0px !important
      padding: 0 !important
      border: none
      &::after
        content: ''
        opacity: 0
    .accio-rojet
      max-width: 140px
      padding: 0 15px
      border: 1px solid
      border-top-right-radius: .25rem
      border-bottom-right-radius: .25rem
      border-color: #FE6E6E
      &::after
        content: 'no estaré'

</style>
