<template lang="html">
  <div class="informacio-personal targeta">
    <div class="header">
      Informació personal
    </div>
    <div class="contingut">
      <table class="table table-borderless">
        <tbody>
          <tr v-if="music.nom">
            <th scope="row">Nom</th>
            <td>{{music.nom}}</td>
          </tr>
          <tr v-if="music.cognoms">
            <th scope="row">Cognoms</th>
            <td>{{music.cognoms}}</td>
          </tr>
          <tr v-if="music.dni">
            <th scope="row">DNI</th>
            <td>{{music.dni}}</td>
          </tr>
          <tr v-if="music.al">
            <th scope="row">Al</th>
            <td>{{music.al}}</td>
          </tr>
          <tr v-if="music.email">
            <th scope="row">Correu</th>
            <td>{{music.email}}</td>
          </tr>
          <tr v-if="music.telefon">
            <th scope="row">Tel</th>
            <td>{{music.telefon}}</td>
          </tr>
          <tr v-if="music.instrument">
            <th scope="row">Instrument</th>
            <td>{{music.instrument}}</td>
          </tr>
          <tr>
            <th scope="row">Tipus de compte</th>
            <td v-if="music.tipo_compte === 0">Músic</td>
            <td v-if="music.tipo_compte === 1">Director</td>
            <td v-if="music.tipo_compte === 2">M. Junta</td>
            <td v-if="music.tipo_compte === 3">Administrador</td>
          </tr>
          <tr v-if="music.data_registre">
            <th scope="row">Data registre</th>
            <td>{{music.data_registre | moment("DD MMMM YYYY")}} | {{music.data_registre | moment("from")}}</td>
          </tr>
          <tr v-if="music.data_naixement">
            <th scope="row">Data de naixement</th>
            <td>{{music.data_naixement | moment("DD MMMM YYYY")}}</td>
          </tr>
          <tr v-if="music.sexe">
            <th scope="row">Sexe</th>
            <td>{{music.sexe}}</td>
          </tr>
          <tr v-if="music.nacionalitat">
            <th scope="row">Nacionalitat</th>
            <td>{{music.nacionalitat}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'informacioPersonal',
    props: ['music']
  }
</script>

<style lang="scss">
  @import '../../sass/targetes/targeta';
  @import '../../sass/colors';

  .informacio-personal .header {
    border-top: 5px solid $tufts-blue !important;
  }

  .informacio-personal {  
    th {
      text-align: right;
      padding-left: 6px;
      padding-right: 6px;
      background-color: $tufts-blue;
      color: white;
    }
    td {
      padding-left: 10px;
    }
    .contingut {
      .table {
        margin: 0;
      }
    }
  }


</style>
