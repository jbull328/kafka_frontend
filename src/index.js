import Vue from "vue";
import employees from "./components/employees.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: h => h(employees)
});
