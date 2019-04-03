import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

class ParamsProd {
  constructor (balance = null, add = null, del = null, id = null) {
    this.balance = balance
    this.add = add
    this.del = del
    this.id = id
  }
}

class ParamsDay {
  constructor (dateKey, products) {
    this.date = dateKey
    this.products = products
  }
}

class ParamsDay2 {
  constructor (id, params) {
    this.id = id
    this.params = params
  }
}



/**/

class datePack {
  constructor (key, products) {
    this.key = key
    this.products = products
  }
}
class productsPack {
  constructor (key, params) {
    this.key = key
    this.params = params
  }
}
class paramsPack {
  constructor (key, add, balance, del) {
    this.key = key
    this.add = add
    this.balance = balance
    this.del = del
  }
}



/**/





export default {
  state: {
    calendar: []
  },
  mutations: {
    firstBalance (state, payload) {
      state.calendar.push(payload)
    },
    loadDays (state, payload) {
      state.calendar = payload;
    }
  },
  actions: {
    async fetchDays ({commit}) {
      const resultDays = []

      try {
        const fbVal = await fb.database().ref(`calendar/123456/`).once('value')
        const daysList = fbVal.val()

        /*Object.keys(daysList.date).forEach(key => {
          const item = daysList.date[key]


          let prod1 = [];

          Object.keys(item.products).forEach(key2 => {
            const prod = item.products[key2]

            let prod3 = [];

            Object.keys(prod.params).forEach(key3 => {
              const prod2 = prod.params[key3];

              prod3.push(
                new ParamsProd(prod2.balance, prod2.add, prod2.del, key3)
              )

              prod1.push(
                new ParamsDay2(key2, prod3)
              )

            })

          })

          resultDays.push(
            new ParamsDay(key, prod1)
          )
        })*/

        /*Object.keys(daysList).forEach(key => {
          const item = daysList[key]
          console.log(item)
        })*/

        const dateCl = [];

        Object.keys(daysList).forEach(key => {
          // записали каждый день
          const item = daysList[key]

          // перебираем каждый день
          Object.keys(item).forEach(key2 => {

            // сохраняем каждый день
            const itemDate = item[key2];



            const ar = [];

            // перебираем каждый день
            Object.keys(itemDate).forEach(key3 => {

              // товары каждого дня
              const itemProd = itemDate[key3]


              Object.keys(itemProd).forEach(key4 => {

                const itPr = itemProd[key4];


                const ar2 = [];


                Object.keys(itPr.params).forEach(key5 => {

                  const itParm = itPr.params[key5];

                  ar2.push(
                    new paramsPack(key5, itParm.add, itParm.balance, itParm.del)
                  )





                })





                ar.push(
                  new productsPack(key4, ar2)
                )

              })


            })





            dateCl.push(
              new datePack(key2, ar)
            )
          })


        })




        commit('loadDays', dateCl)

      }
        // если есть ошибки
      catch (error) {
        console.log(error.message)
        throw error
      }
    },
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
    myDays (state, getters) {
      return state.calendar;
    }
  }
}
