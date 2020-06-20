import Vue from 'vue'
import App from './App.vue'
import directiv from "./directiv";

Vue.directive('focus', directiv)

new Vue({
  render: h => h(App),
}).$mount('#app')
