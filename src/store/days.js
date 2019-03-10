import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

class ParamsProd {
  constructor (balance = null, add = null, del = null) {
    this.balance = balance
    this.add = add
    this.del = del
  }
}

export default {
  state: {
    calendar: []
  },
  mutations: {
    firstBalance (state, payload) {
      state.products.calendar(payload)
    },
  },
  actions: {
    async firstBalance ({commit, getters}, {balance, add, del, prodId, date}) {
      try {
        const newParams = new ParamsProd(
          balance,
          add,
          del
        )
        await fb.database().ref(`calendar/123456/date/${date}/products/${prodId}/params`).push(newParams)
      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
  },
  getters: {

  }
}
