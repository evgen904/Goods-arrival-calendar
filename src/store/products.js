import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

class Product {
  constructor (name, price, id = null) {
    this.name = name
    this.price = price
    this.id = id
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    // мутация loadProducts, принятый payload, сохраняет в state массива products
    loadProducts (state, payload) {
      state.products = payload
    },
  },
  actions: {
    // принимаем данные через асинхронный запрос к firebase
    async fetchProducts ({commit}) {
      const resultProducts = []

      // при верном исполнении
      try {
        // получаем промис из firebase
        const fbVal = await fb.database().ref('products/123456/product').once('value')
        const products = fbVal.val()

        // полученные данные из промиса (объект), сохраняем в массив resultProducts, передавая нужные поля и сам ключ
        Object.keys(products).forEach(key => {
          const prod = products[key]
          resultProducts.push(

            // используем конструктор класса Product
            new Product(prod.name, prod.price, key)
          )
        })

        // полученные данные передаем в мутацию loadProducts
        commit('loadProducts', resultProducts)

      }
      // если есть ошибки
      catch (error) {
        console.log(error.message)
        throw error
      }
    }
  },
  getters: {
    // используем getters myProducts, для передачи данных из state.products, в компонент Products.vue
    myProducts (state, getters) {
      return state.products;
    },
  }
}
