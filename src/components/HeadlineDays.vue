<template>
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
</template>

<script>
  export default {
    props: ['date'],
    data() {
      return {
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        lengthDay: 20
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
    }
  }
</script>

<style lang="scss" scoped>
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
</style>
