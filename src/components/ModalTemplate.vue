<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div>
            <div>Название товара</div>
            <div>
              <input type="text" v-model="nameProduct">
            </div>
          </div>
          <br>
          <div>
            <div>Цена товара</div>
            <div>
              <input type="text" v-model.number="priceProduct">
            </div>
          </div>

          <br><br>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Закрыть
              </button>
              <button class="modal-default-button" @click="createProduct">
                Добавить
              </button>
            </slot>
          </div>
          <br>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import fb from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/database'
  import 'firebase/firestore'
  import 'firebase/messaging'
  import 'firebase/functions'

  export default {
    data() {
      return {
        nameProduct: '',
        priceProduct: null
      }
    },
    methods: {
      createProduct() {
        const product = {
          name: this.nameProduct,
          price: this.priceProduct
        }
        this.$store.dispatch('createProd', product)
          .then(() => {
            this.$store.dispatch('fetchProducts')
            this.$emit('close')
          })
          .catch(() => {})
      }
    }
  }
</script>
