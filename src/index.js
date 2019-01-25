import Vue from "vue";
import Employees from "./components/employees.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faExclamationTriangle)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(Employees),
  data () {
    return {
      info: null
    }
  }
})