import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(VueResource)
Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
