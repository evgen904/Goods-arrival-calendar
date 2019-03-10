import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'
import user from './user'
import days from './days'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    user,
    days
  }
})
