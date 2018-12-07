<template>
  <div id="app">
    <test-data-table></test-data-table>
  </div>
</template>

<script>
import TestDataTable from "./TestDataTable.vue";
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    TestDataTable: TestDataTable
  }
}
</script>
