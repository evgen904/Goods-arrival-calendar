<template>
  <div class="calendar-date-cen">
    <div
      class="day-col"
      v-for="item of 20"
      :key="item"
    >
      <div
        class="day"
        v-for="prod in myProducts"
        :key="prod.id"
      >
        <span>
          {{test(item, prod.id, 'balance')}}
          <!--{{ valDate(dateNext(item), prod.id, 'balance') }}-->
        </span>
        <input type="number">
        <input type="number">
        <!--<input type="number" :value="valDate(dateNext(item), prod.id, 'add')">-->
        <!--<input type="number" :value="valDate(dateNext(item), prod.id, 'del')">-->
      </div>
    </div>
  </div>
</template>

<script>
  import fecha from 'fecha';
  export default {
    props: ['date'],
    data() {
      return {

      }
    },
    computed: {
      // принимаем полученные данные из vuex (getters), и данные выводим через v-for
      myProducts () {
        return this.$store.getters.myProducts
      },
      myDays () {
        return this.$store.getters.myDays
      }
    },
    methods: {
      test (el, idProd, type) {
        /*let nowDate = new Date(this.date);
        nowDate.setDate(nowDate.getDate()+el-1);
        nowDate = fecha.format(nowDate, 'YYYY-MM-D');
        */


        //return console.log(this.myDays);
      },
      dateNext(el) {
        let nowDate = new Date(this.date);
        nowDate.setDate(nowDate.getDate()+el-1);
        return fecha.format(nowDate, 'YYYY.MM.D');
      },
      valDate(date, idProd, balance) {
        let tt = this.dataCalendar.find(i => i.id==date);
        if (tt!==undefined) {
          let yy = tt.products.find(i => i.prodId==idProd);
          return yy.params[balance];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .calendar-date-cen {
    display: flex;
    width: 100%;
    .day-col {
      flex: 0 0 150px;
      margin-right: -1px;
    }
    .day {
      display: flex;
      width: 100%;
      height: 90px;
      border: 1px solid #ccc;
      margin: 0 -3px -1px 0;
      input[type="number"], span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        border: none;
        text-align: center;
        padding: 0;
        margin: 0;
        outline-style: none;
        font-weight: bold;
        font-size: 16px;
        &:nth-child(1) {
          background-color: #f9f9f9;
        }
        &:nth-child(2) {
          background-color: #f5f5f5;
        }
        &:nth-child(3) {
          background-color: #efefef;
        }
      }
    }
  }
</style>
