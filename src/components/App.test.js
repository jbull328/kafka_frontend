import Vue from "vue";
import employees from "./employees.vue";

Vue.config.productionTip = false;

it("does not crash", () => {
  const Ctor = Vue.extend(employees);
  const vm = new Ctor().$mount();
});
