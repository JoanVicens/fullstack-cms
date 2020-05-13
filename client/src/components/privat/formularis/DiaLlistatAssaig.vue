<template lang="html">
  <b-modal
    id="formulari-dia"
    title="Dia del assaig"
    size="lg"
    centered
    @ok="handleOk"
  >

      <b-form-group
        label=""
        label-for="input-x"
        class="mr-3 ml-2"
      >
        <b-form-input
          id="input-x"
          v-model="data"
          type="date"
          class="ml-2"
        ></b-form-input>
      </b-form-group>
  </b-modal>
</template>

<script>
export default {
  name: 'diaAssaig',
  data() {
    return {
      data: ''
    }
  },
  methods: {
    handleOk() {
      this.$emit('diaSeleccionat', this.data)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
