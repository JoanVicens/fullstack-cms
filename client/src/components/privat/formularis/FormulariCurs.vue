<template lang="html">
  <b-modal id="formulari" :title="info.titol" ref="formulari" @ok="validarFormulari" size="lg" >
    <form ref="form" @submit.stop.prevent="handleSubmit" novalidate>
      <div class="form-group">

        <label for="curs">Curs acadèmic</label>
        <input type="text" name="curs" id="curs" v-model="info.curs.curs" class="form-control" required>
        <small id="emailHelp" class="form-text text-muted mb-2">El format ha de ser <strong>&lt;curs inici&gt;/&lt;curs fi&gt;</strong> </small>

        <label for="director">Director titular</label>
        <input type="text" name="director" id="director" v-model="info.curs.director" class="form-control">

        <b-form-checkbox id="cursActiu" v-model="info.curs.curs_actiu" name="cursActiu" class="mt-2" switch>Crear com al curs actiu</b-form-checkbox>

        <label for="anotacio">Anotació</label>
        <textarea name="anotacio" class="form-control" v-model="info.curs.anotacio"></textarea>

      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: 'CursForm',
    props: {
      info: Object,
      accio: Function
    },
    methods: {
      validarFormulari() {
        if(this.info.curs.curs && this.info.curs.curs.length > 0) {
          // falta comprovar el format
          this.accio(this.info.curs)
          this.$refs['formulari'].hide()
        }

      }
    }
  }
</script>

<style lang="css" scoped>
</style>
