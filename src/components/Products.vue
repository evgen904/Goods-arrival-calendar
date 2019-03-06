<template>
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
        <button>edit</button>
        <button>del</button>
      </div>
      <div>
        <input type="text" value="">
        <button>Add</button>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    computed: {
      // принимаем полученные данные из vuex (getters), и данные выводим через v-for
      myProducts () {
        return this.$store.getters.myProducts
      }
    }
  }
</script>

<style type="scss" scoped>
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
