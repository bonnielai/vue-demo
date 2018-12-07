import vueDataTable from './DataTable.vue' 
const dataTable = {
    install (Vue, options) {
        Vue.component(vueDataTable.name, vueDataTable)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(dataTable);
}

export default dataTable
