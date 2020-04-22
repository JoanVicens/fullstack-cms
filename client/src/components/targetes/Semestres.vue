<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Semestres</h2>
    </div>
    <div class="contingut">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col" colspan="1">{{info.curs}}</th>
            <th class="assistits-total">Assistits / total</th>
            <th class="percentatge">%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1r trimestre</th>
            <td class="assistits-total">{{info.semestres[0].assajosAssistits}} de {{info.semestres[0].assajosSemestre}}</td>
            <td class="percentatge">{{isFinite(info.semestres[0].percentatge) ? info.semestres[0].percentatge + '%' : '~'}}</td>
          </tr>
          <tr>
            <th scope="row">2n trimestre</th>
            <td class="assistits-total">{{info.semestres[1].assajosAssistits}} de {{info.semestres[1].assajosSemestre}}</td>
            <td class="percentatge">{{isFinite(info.semestres[1].percentatge) ? info.semestres[1].percentatge + '%' : '~'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
  import axios from 'axios';

  export default {
    name: 'DetallAssistenciaSemestres',
    props: {
      info: Object,
    }
  }
</script>

<style lang="sass" scoped>
  td
    padding: 12 20px
  .percentatge
    text-align: right
  .assistits-total
    text-align: center
</style>
