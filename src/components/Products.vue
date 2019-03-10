<template>
  <div>
    <ul class="products">
      <li
        v-for="item in myProducts"
        :key="item.id"
      >
        <div>
          {{item.name}}
        </div>
        <div>
          {{item.price}}
        </div>
        <div>
          <button @click="openModal(item.name,item.price,item.id)">edit</button>
          <button @click="delProduct(item.name,item.id)">del</button>
        </div>
        <div>
          <input type="text" value="">
          <button>Add</button>
        </div>
      </li>
    </ul>
    <modal v-if="showModal" @close="showModal = false" :name="name" :price="price" :id="id">
      <h3 slot="header">custom header</h3>
    </modal>
    <modal-del v-if="showModalDel" @close="showModalDel = false" :name="name" :price="price" :id="id">
      <h3 slot="header">custom header</h3>
    </modal-del>
  </div>
</template>

<script>
  import EditModal from './EditModal'
  import DeleteModal from './DeleteModal'
  export default {
    data() {
      return {
        showModal: false,
        showModalDel: false,
        name: '',
        price: null,
        id: null
      }
    },
    components: {
      modal: EditModal,
      modalDel: DeleteModal
    },
    computed: {
      // принимаем полученные данные из vuex (getters), и данные выводим через v-for
      myProducts () {
        return this.$store.getters.myProducts
      }
    },
    methods: {
      openModal(name, price, id) {
        this.showModal = true
        this.name = name
        this.price = price
        this.id = id
      },
      delProduct (name, id) {
        this.showModalDel = true
        this.name = name
        this.id = id
      }
    }
  }
</script>

<style lang="scss" scoped>
  .products {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      height: 90px;
      border: 1px solid #ccc;
      margin: 0 -1px -1px 0;
    }
  }
</style>
