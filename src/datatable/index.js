
/*import dataTable from "./DataTable.vue"

const components = [
    dataTable
  ];

const install = function(Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component));
  };


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install 
}*/

import vueDataTable from './DataTable.vue' // 导入组件
const dataTable = {
    install (Vue, options) {
        Vue.component(vueDataTable.name, vueDataTable)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(dataTable);
}

export default dataTable
