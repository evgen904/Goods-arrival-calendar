<template>
  <div id="app">

    <div class="head">
      <date-pick
        v-model="date"
        :months="months"
        :weekdays="weekdays"
        :format="'YYYY.MM.DD'"
      ></date-pick>
    </div>

    <div class="container-wr">
      <div class="side-bar">
        side-bar
      </div>
      <div class="container">
        <div class="calendar-date">

          <div v-for="item of this.lengthDay" class="day">
            <div class="month">
              {{ dateHeadM(item) }}
            </div>
            <div class="day-number">
              {{ dateHeadD(item) }}
            </div>
            <div class="day-week">
              {{ dateHeadN(item) }}
            </div>
          </div>

        </div>
      </div>
    </div>










  </div>
</template>

<script>

import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import fecha from 'fecha';

export default {
  name: 'app',
  components: {
    DatePick
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
      msg: 'Welcome to Your Vue.js App',
      month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      lengthDay: 30
    }
  },
  watch: {
    date(val) {

      let D = new Date(val);
      D.setDate(D.getDate() + 1);



      console.log(D);
    }
  },
  methods: {
    dateHeadM(el) {
      let nowDate = new Date(this.date);
      nowDate.setDate(nowDate.getDate()+el-1);
      return this.month[nowDate.getMonth()].slice(0,3);
    },
    dateHeadD(el) {
      let nowDate = new Date(this.date);
      nowDate.setDate(nowDate.getDate()+el-1);
      return nowDate.getDate();
    },
    dateHeadN(el) {
      let nowDate = new Date(this.date);
      nowDate.setDate(nowDate.getDate()+el-1);
      return this.days[nowDate.getDay()];
    }
  }
}
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    font-family: Arial;
  }
  .container-wr {
    display: flex;
    width: 100%;
    .side-bar {
      flex: 0 0 300px;
    }
    .container {
      width: 100%;
    }
    .calendar-date {
      display: flex;
      width: 100%;
      overflow: auto;
      .day {
        flex: 0 0 90px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        .month {
          font-size: 13px;
        }
        .day-number {
          font-size: 14px;
        }
        .day-week {
          font-size: 12px;
        }
      }
    }
  }
</style>
