import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import App from './App.vue'

// создаем store для vuex
import store from './store'

import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'
//import Vuetify from 'vuetify'
//import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(VueResource)
//Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyC-EVj6IGepD3F6pEuECX6Gkgbx9ikBloU',
      authDomain: 'its-ads-4c326.firebaseapp.com',
      databaseURL: 'https://its-ads-4c326.firebaseio.com',
      projectId: 'its-ads-4c326',
      storageBucket: 'its-ads-4c326.appspot.com',
      messagingSenderId: '242674476104'
    })

    // при вызове created, вызываем асинхронный метод fetchProducts, для получения данных из firebase
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchDays')


    console.log(this.$store)



  }
})
