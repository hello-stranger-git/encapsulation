<template>
  <div class="calendar">
    <div class="currentCalender">
      <img :src="lt" @click="preMonth" />
      <span>{{ currentYear + '-' + currentMonth }}</span>
      <img :src="gt" @click="nextMonth" />
    </div>
    <div class="weekHeader">
      <span v-for="(week, index) in weeks" class="week" :key="index">
        <span
          :class="[week == '星期六' || week == '星期日' ? 'vacation' : '']"
          >{{ week }}</span
        >
      </span>
    </div>
    <div class="calendarDate">
      <div v-for="(day, index) in days" :key="index" class="rowDays">
        <span v-for="(item, i) in days[index]" class="day" :key="i">
          <span
            v-if="item.day"
            :class="[
              i == 5 || i == 6 ? 'vacation' : '',
              item.day === now ? 'active' : ''
            ]"
            @click="changeDay(item.day)"
            >{{ item.day > 9 ? item.day : '0' + item.day }}</span
          >
          <!-- 显示每一天总共访问的人数 -->
          <template v-for="(people, pid) in peopleCount">
            <template v-if="people.day == item.day">
              <p class="peopelCount" :key="pid">
                {{ people.status }}
              </p>
            </template>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 每一天的访问总人数
    peopleCount: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      lt: require('@/assets/icon/lt.png'),
      gt: require('@/assets/icon/gt.png'),
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      currentYear: new Date().getFullYear(), // 当前年
      currentMonth: new Date().getMonth() + 1, // 当前月
      currentMonthWeek: new Date(new Date().setDate(1)).getDay(), // 当前月的一号是星期几
      currentDay: new Date(), // 当前日期
      currentMonthDays: 0, // 当前月的天数
      nowMonth: new Date().getMonth() + 1,
      now: new Date().getDate(),
      days: [
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ], // 一共七行,每行显示的号数
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ],
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ],
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ],
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ],
        [
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 },
          { day: 0, month: 0 }
        ]
      ]
    }
  },
  mounted() {
    this.formatDays(new Date(), false)
  },
  methods: {
    changeDay(day) {
      this.$emit('getDay', {
        year: this.currentYear,
        month: this.currentMonth,
        day: day
      })
      this.now = day
    },
    preMonth() {
      this.currentDay = new Date(
        this.currentDay.setMonth(this.currentDay.getMonth() - 1)
      )
      this.currentYear = this.currentDay.getFullYear() // 改变年
      this.currentYear = this.currentDay.getMonth() + 1 // 改变月
      this.formatDays(this.currentDay, true)
    },
    nextMonth() {
      this.currentDay = new Date(
        this.currentDay.setMonth(this.currentDay.getMonth() + 1)
      )
      this.currentYear = this.currentDay.getFullYear() // 改变年
      this.currentYear = this.currentDay.getMonth() + 1 // 改变月
      this.formatDays(this.currentDay, true)
    },
    is_leap(year) {
      // 判断是否是闰年(true为闰年，false不为闰年)
      // 闰年的条件是符合下面二者之一：
      // (1)年份能被4整除，但不能被100整除；
      // (2)年份能被400整除。
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29
      }
      return 28
    },
    formatDays(date, preOrnext) {
      // 对日历数据的处理，传入一个日期
      if (preOrnext) {
        this.now = false
      } else {
        this.now = date.getDate()
      }
      let day = 1 // 记录号数
      this.currentMonth = date.getMonth() + 1 // 获取月份
      this.currentYear = date.getFullYear() // 获取年份
      this.nowMonth = date.getMonth() + 1
      if (this.currentMonth === 2) {
        // 获取天数
        this.currentMonthDays = this.is_leap(date.getFullYear())
      } else {
        this.currentMonthDays = new Date(
          this.currentYear,
          this.currentMonth,
          0
        ).getDate()
      }
      this.currentMonthWeek = new Date(date.setDate(1)).getDay() // 当前月的第一号是星期几,0代表星期日
      if (!this.currentMonthWeek) {
        this.currentMonthWeek = 7
      }
      this.days[0][this.currentMonthWeek - 1].day = day
      day += 1
      for (let i = 0; i < this.currentMonthWeek - 1; i++) {
        // 给days第一行数据前面几条赋值
        this.days[0][i].day = 0
        this.days[0][i].month = this.nowMonth
      }
      for (let i = this.currentMonthWeek; i < this.days[0].length; i++) {
        // 给days第一行数据后面几条赋值
        this.days[0][i].day = day
        this.days[0][i].month = this.nowMonth
        day += 1
      }
      for (let i = 1; i < this.days.length; i++) {
        // 遍历除去days的第一条数据,从后面的开始遍历赋值
        for (let j = 0; j < this.days[i].length; j++) {
          if (day <= this.currentMonthDays) {
            this.days[i][j].day = day
            this.days[0][i].month = this.nowMonth
            day += 1
          } else {
            this.days[i][j].day = 0
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.calendar {
  font-size: 16px;
  width: 100%;
  background-color: blanchedalmond;
  .currentCalender {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
  }
  .weekHeader {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .week {
      font-size: 12px;
      color: #000;
      flex: 1;
      text-align: center;
    }
  }
  .rowDays {
    font-size: 14px;
    color: #141414;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .day {
    flex: 1;
    text-align: center;
  }
  .vacation {
    color: #e60012;
  }
  .active {
    width: 24px;
    height: 24px;
    padding: 5px;
    background-color: #4a92ff;
    border-radius: 50%;
    color: #ffffff;
  }
  .peopelCount {
    margin: 6px;
    margin-top: 7px;
    margin-bottom: 18px;
    font-size: 10px;
    background-color: #56be9b;
    border-radius: 3px;
    color: #fff;
    padding: 3px 3px;
  }
}
</style>
