<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            Удалить товар {{nameProduct}} ?
          </div>
          <br><br>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Закрыть
              </button>
              <button class="modal-default-button" @click="delProd">
                Удалить
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
    props: ['name','id'],
    data() {
      return {
        nameProduct: this.name
      }
    },
    methods: {
      delProd() {
        this.$store.dispatch('deleteProd', {
          id: this.id
        })
          .then(() => {
            this.$store.dispatch('fetchProducts')
            this.$emit('close')
          })
          .catch(() => {})
      }
    }
  }
</script>
