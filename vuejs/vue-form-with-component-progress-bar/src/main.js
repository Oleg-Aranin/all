import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Input from "./components/Input";

Vue.component('app-input', Input)

Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
