<template lang="html">
  <b-modal id="formulari" title="Introdeix la teva contrasenya per a confirmar l'acció" ref="formulari" @ok="validarFormulari" size="lg" >

    <form ref="form" @submit.stop.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <input class="form-control" type="password" name="password" v-model="credencials.password" required>
      </div>
    </form>
  </b-modal>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Confirmacio',
    props: {
      email: String
    },
    data() {
      return {
        credencials: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      validarFormulari() {
        this.credencials.email = this.email
        axios.post('/auth/autenticacio',  this.credencials)
        .then(response => { // Responsa del
          if (response.status === 200) {
            this.$emit('autenticat')
          }
        })
        .catch(console.error)
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
