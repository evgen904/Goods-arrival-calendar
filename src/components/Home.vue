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
        <div class="calendar-date">
          <div v-for="item of lengthDay" class="day" :key="item">
            <div>
              <div class="month">
                {{ dateHead(item, 'M') }}
              </div>
              <div class="day-number">
                {{ dateHead(item, 'D') }}
              </div>
              <div class="day-week">
                {{ dateHead(item, 'N') }}
              </div>
            </div>
            <div class="name-val">
              <div>
                Остаток
              </div>
              <div>
                Приход
              </div>
              <div>
                Уход
              </div>
            </div>
          </div>
        </div>
        <!--<div class="calendar-date-cen">-->
          <!--<div-->
            <!--class="day-col"-->
            <!--v-for="item of lengthDay"-->
            <!--:key="item"-->
          <!--&gt;-->
            <!--<div-->
              <!--class="day"-->
              <!--v-for="prod of products"-->
            <!--&gt;-->
              <!--<span>-->
                <!--{{ valDate(dateNext(item), prod.id, 'balance') }}-->
              <!--</span>-->
              <!--<input type="number" :value="valDate(dateNext(item), prod.id, 'add')">-->
              <!--<input type="number" :value="valDate(dateNext(item), prod.id, 'del')">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
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

export default {
  created() {
    this.load(this.userId);
  },
  components: {
    DatePick,
    modal: ModalTemplate,
    products
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
      lengthDay: 20,
      userId: '123456',
      dataCalendar: [],
      dialog: false,
      showModal: false
    }
  },
  methods: {
    dateHead(el, type) {
      let nowDate = new Date(this.date);
      nowDate.setDate(nowDate.getDate()+el-1);
      if (type=='M') {
        return this.month[nowDate.getMonth()].slice(0,3);
      }
      else if (type=='D') {
        return nowDate.getDate();
      }
      else if (type=='N') {
        return this.days[nowDate.getDay()];
      }
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
    },
    load(index) {
      this.$http.get('http://localhost:3000/calendar')
        .then(response => {
          return response.json()
        })
        .then(userId => {
          let dateUser = userId.find(i => i.userId==index);
          return this.dataCalendar = dateUser.date;
        })
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
  .calendar-date {
    display: flex;
    width: 100%;
    .day {
      display: flex;
      flex-direction: column;
      flex: 0 0 150px;
      border: 1px solid #ccc;
      margin-right: -1px;
      margin-bottom: -1px;
      position: relative;
      .month {
        font-size: 13px;
      }
      .day-number {
        font-size: 14px;
      }
      .day-week {
        font-size: 12px;
      }
      .name-val {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        > div {
          transform: rotate(-90deg);
        }
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
}
</style>
