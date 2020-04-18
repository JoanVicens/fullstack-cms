<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Semestres</h2>
    </div>
    <div class="contingut">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col" colspan="3">2019/2020</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1r trimestre</th>
            <td>{{primerSemestre.assistencia}} de {{primerSemestre.n_assajos}}</td>
            <td v-if="!isNaN(primerSemestre.percentatge)">{{(primerSemestre.assistencia * 100) / primerSemestre.n_assajos}}</td>
            <td v-else>~</td>
          </tr>
          <tr>
            <th scope="row">2n trimestre</th>
            <td>{{segonSemestre.assistencia}} de {{segonSemestre.n_assajos}}</td>
            <td v-if="!isNaN(segonSemestre.percentatge)">{{(segonSemestre.assistencia * 100) / segonSemestre.n_assajos}}</td>
            <td v-else>~</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
  import axios from 'axios';

  export default {
    name: '',
    props: {
      semestres: Array,
      id: String
    },
    data() {
      return {
        primerSemestre: {},
        segonSemestre: {},
      }
    },
    methods: {

    },
    watch: {
      semestres: {
         handler() {
           let semestre = this.semestres.find(semetre => semetre.numero == 1)

           this.primerSemestre = {
             n_assajos: semestre.assajos.length,
             assistencia: semestre.assajos.filter(assaig => assaig.assistents.includes(this.id)).length
           }
           this.primerSemestre.percentatge = (this.primerSemestre.assistencia * 100) / this.primerSemestre.n_assajos;

           semestre = this.semestres.find(semestre => semestre.numero == 2);

           this.segonSemestre = {
             n_assajos: semestre.assajos.length,
             assistencia: semestre.assajos.filter(assaig => assaig.assistents.includes(this.id)).length
           }
           this.segonSemestre.percentatge = (this.segonSemestre.assistencia * 100) / this.segonSemestre.n_assajos;
        }
      }


    }
  }
</script>

<style lang="sass" scoped>
  td
    padding: 12 20px
</style>
