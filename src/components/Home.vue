<template>
  <div>
    <div class="container-wr">
      <div class="side-bar">
        <div class="date-wrap">
          <date-pick
            v-model="date"
            :months="months"
            :weekdays="weekdays"
            :format="'YYYY.MM.DD'"
          ></date-pick>
          <button @click="showModal = true">add</button>
        </div>
        <products></products>
      </div>
      <div class="container-in">
        <headline-days :date="date"></headline-days>
        <grid-days :date="date"></grid-days>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import fecha from 'fecha';
import ModalTemplate from './../components/ModalTemplate';
import products from './../components/Products';
import headlineDays from './../components/HeadlineDays';
import gridDays from './../components/GridDays';

export default {
  components: {
    DatePick,
    modal: ModalTemplate,
    products,
    headlineDays,
    gridDays
  },
  props: {
    weekdays: {
      type: Array,
      default: () => ([
        'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
      ])
    },
    months: {
      type: Array,
      default: () => ([
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ])
    }
  },
  data () {
    return {
      date: fecha.format(new Date(), 'YYYY.MM.D'),
      dialog: false,
      showModal: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container-wr {
  display: flex;
  width: 100%;
  .side-bar {
    flex: 0 0 300px;
    .date-wrap {
      height: 47px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
      margin-right: -1px;
      margin-bottom: -1px;
    }
  }
  .container-in {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>
