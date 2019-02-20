<template>
  <div id="app">

    <div class="container-wr">
      <div class="side-bar">
        <div class="date-wrap">
          <date-pick
            v-model="date"
            :months="months"
            :weekdays="weekdays"
            :format="'YYYY.MM.DD'"
          ></date-pick>
          <div>
            <button>add</button>
          </div>
        </div>
        <ul class="products">
          <li
            v-for="item in products[userIndex].product"
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
          </li>
        </ul>
      </div>
      <div class="container">
        <div class="calendar-date">
          <div v-for="item of lengthDay" class="day" :key="item">
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
        <div class="calendar-date-cen">
          <div
            class="day-col"
            v-for="item of lengthDay"
            :key="item"
          >
            <div
              class="day"
              v-for="day of products[userIndex].product"
              :key="day.id"
            >
              <input type="number" value="">
              <input type="number" value="">
              <input type="number" value="">
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
  created() {

    if (this.userId) {
      this.userIndex = this.products.findIndex(i => i.userId==this.userId);
    }



  },
  data () {
    return {
      date: fecha.format(new Date(), 'YYYY.MM.D'),
      msg: 'Welcome to Your Vue.js App',
      month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      lengthDay: 20,
      userId: '123456',
      userIndex: null,
      products: [
        {
          userId: '123456',
          product: [
            {
              id: '1',
              name: 'Cola',
              price: 2000
            },
            {
              id: '2',
              name: 'Fanta',
              price: 4000
            },
            {
              id: '3',
              name: 'Bonaqua',
              price: 6000
            },
            {
              id: '4',
              name: 'Mirinda',
              price: 3000
            },
            {
              id: '5',
              name: 'Sprite',
              price: 4200
            }
          ]
        },
        {
          userId: '345678',
          product: [
            {
              id: '1',
              name: 'Cola 2',
              price: 1000
            },
            {
              id: '2',
              name: 'Fanta 3',
              price: 2500
            },
            {
              id: '3',
              name: 'Bonaqua 4',
              price: 4500
            },
            {
              id: '4',
              name: 'Mirinda 5',
              price: 3600
            },
            {
              id: '5',
              name: 'Sprite 6',
              price: 4800
            }
          ]
        },
        {
          userId: '234567',
          product: [
            {
              id: '1',
              name: 'Cola 11',
              price: 2300
            },
            {
              id: '2',
              name: 'Fanta 22',
              price: 4200
            },
            {
              id: '3',
              name: 'Bonaqua 33',
              price: 6400
            }
          ]
        }
      ],
      dataCalendar: [
        {
          userId: '234567',
          dates: [
            {
              date: '20.02.2019',
              products: [
                {
                  id: '1',
                  coming: 0,
                  leaving: 0,
                  balance: 0
                },
                {
                  id: '2',
                  coming: 0,
                  leaving: 0,
                  balance: 0
                },
                {
                  id: '3',
                  coming: 0,
                  leaving: 0,
                  balance: 0
                },
                {
                  id: '4',
                  coming: 0,
                  leaving: 0,
                  balance: 0
                },
                {
                  id: '5',
                  coming: 0,
                  leaving: 0,
                  balance: 0
                }
              ]
            }
          ]
        }
      ]
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
  * {
    box-sizing: border-box;
  }
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
      .date-wrap {
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
        margin-right: -1px;
        margin-bottom: -1px;
      }
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
    }
    .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    .calendar-date {
      display: flex;
      width: 100%;
      .day {
        flex: 0 0 150px;
        border: 1px solid #ccc;
        margin-right: -1px;
        margin-bottom: -1px;
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
        input[type="number"] {
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
  }
</style>
