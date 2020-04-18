<template lang="html">
  <div class="targeta">
    <div class="header-targeta">
      <h2>Concerts</h2>
    </div>
    <div class="contingut">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th class="check" scope="row">Concert de benvinguda</th>
            <td><check-icon size="1x" class="check"></check-icon></td>
          </tr>
          <tr>
            <th class="check" scope="row">Concert de Nadal</th>
            <td><check-icon size="1x" class="check"></check-icon></td>
          </tr>
          <tr>
            <th class="check" scope="row">Concert de Magdalena</th>
            <td><check-icon size="1x" class="check"></check-icon></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { CheckIcon } from 'vue-feather-icons'
export default {
  name: 'concerts',
  components: {
    CheckIcon
  }
}
</script>

<style lang="sass" scoped>
  td
    padding: 12 20px
  .check
    stroke: #C5F694
    stroke-width: 6

</style>
