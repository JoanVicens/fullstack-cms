<template>
  <p>dñlfkajdsñlk</p>
</template>

<script>
  import { Line, mixins } from "vue-chartjs";

  export default {
    extends: Line,
    props: {
      chartData: Object,
      options: Object
    },
    mixins: [mixins.reactiveProp],
    mounted() {
      const chartData = this.chartData
      const options = this.options
      this.renderChart( chartData, options );
    }
  };
</script>
