<template lang="html">
  <div class="informacio-personal targeta">
    <div class="header-targeta">
      <!-- <info-icon size="1x"></info-icon> -->
      <h2>Informació personal</h2>
    </div>
    <div class="contingut">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th scope="row">Nom</th>
            <td>{{music.nom}}</td>
          </tr>
          <tr>
            <th scope="row">Cognoms</th>
            <td>{{music.cognoms}}</td>
          </tr>
          <tr>
            <th scope="row">DNI</th>
            <td>{{music.dni}}</td>
          </tr>
          <tr>
            <th scope="row">Al</th>
            <td>{{music.al}}</td>
          </tr>
          <tr>
            <th scope="row">Correu</th>
            <td>{{music.email}}</td>
          </tr>
          <tr v-if="music.telefon">
            <th scope="row">Tel</th>
            <td>{{music.telefon}}</td>
          </tr>
          <tr>
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
          <tr>
            <th scope="row">Data registre</th>
            <td>{{music.data_registre | moment("DD, MMMM, YYYY")}} | {{music.data_registre | moment("from")}}</td>
          </tr>
          <tr>
            <th scope="row">Data de naixement</th>
            <td>{{music.data_naixement | moment("DD, MMMM, YYYY")}}</td>
          </tr>
          <tr>
            <th scope="row">Sexe</th>
            <td>{{music.sexe}}</td>
          </tr>
          <tr>
            <th scope="row">Nacionalitat</th>
            <td>{{music.nacionalitat}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  // import { InfoIcon } from 'vue-feather-icons'
  export default {
    name: 'informacioPersonal',
    props: ['music'],
    components: {
      // InfoIcon
    },
    mounted() {
      //console.log('music', this.music)
    }
  }
</script>
