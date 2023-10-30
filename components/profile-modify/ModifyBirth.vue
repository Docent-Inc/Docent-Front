<template>
  <div class="modify-birth">
    <div class="modify-birth-title-div">
      <span class="modify-birth-title">생년월일</span>
    </div>
    <div class="modify-birth-content">
      <div class="year-scroller">
        <div
            class="year"
            v-for="year in displayedYears"
            :key="'year-' + year"
            :class="{ 'current-year': year === currentYear }"
        >
          {{ year }}
        </div>
      </div>
      <div class="year-text-div">
        <span class="year-text">년</span>
      </div>
      <div class="month-scroller">
        <div
            class="month"
            v-for="month in displayedMonths"
            :key="'month-' + month"
            :class="{ 'current-month': month === currentMonth }"
        >
          {{ month }}
        </div>
      </div>
      <div class="month-text-div">
        <span class="month-text">월</span>
      </div>
      <div class="day-scroller">
        <div
            class="day"
            v-for="day in displayedDays"
            :key="'day-' + day"
            :class="{ 'current-day': day === currentDay }"
        >
          {{ day }}
        </div>
      </div>
      <div class="day-text-div">
        <span class="day-text">일</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ModifyBirth",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      displayedYears: [],
      currentMonth: new Date().getMonth(),
      displayedMonths: [],
      currentDay: new Date().getDate(),
      displayedDays: [],
      startY: 0,
      lastY: 0,
      startX: 0,
      lastX: 0,
      lastTime: Date.now(),
      velocity: 0
    };
  },
  mounted() {
    this.setDisplayedYears();
    this.setDisplayedMonths();
    this.setDisplayedDays();
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    this.$el.addEventListener('touchmove', this.handleTouchMove);
    this.$el.addEventListener('touchend', this.handleTouchEnd);
  },
  methods: {
    checkYear(){
      if (this.currentYear < 1900) this.currentYear = 1900;
      if (this.currentYear > 2023) this.currentYear = 2023;
    },
    checkMonth(){
      if (this.currentMonth < 1) this.currentMonth = 1;
      if (this.currentMonth > 12) this.currentMonth = 12;
    },
    checkDay(){
      const maxDaysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
      if (this.currentDay < 1) this.currentDay = 1;
      if (this.currentDay > maxDaysInMonth) this.currentDay = maxDaysInMonth;
    },
    setDisplayedYears() {
      this.checkYear();
      this.displayedYears = [this.currentYear - 1, this.currentYear, this.currentYear + 1];
    },
    setDisplayedMonths() {
      this.checkMonth();
      let previousMonth = this.currentMonth - 1;
      let nextMonth = this.currentMonth + 1;
      this.displayedMonths = [previousMonth || 12, this.currentMonth, nextMonth === 13 ? 1 : nextMonth];
    },
    setDisplayedDays() {
      this.checkDay();
      let previousDay = this.currentDay - 1;
      let nextDay = this.currentDay + 1;
      this.displayedDays = [previousDay || 31, this.currentDay, nextDay === 32 ? 1 : nextDay];
    },
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startX = event.touches[0].clientX;
      this.lastY = this.startY;
      this.lastTime = Date.now();
    },
    handleTouchMove(event) {
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const deltaY = currentY - this.lastY;
      const deltaTime = Date.now() - this.lastTime;

      this.velocity = deltaY / deltaTime;
      this.lastY = currentY;
      this.lastTime = Date.now();

      if (currentX >= 34 && currentX <= 94) {
        this.handleYearScroll(deltaY);
      } else if (currentX >= 151 && currentX <= 207) {
        this.handleMonthScroll(deltaY);
      } else if (currentX >= 248 && currentX <= 311) {
        this.handleDayScroll(deltaY);
      }
    },
    handleTouchEnd() {
      const inertiaDuration = 50;
      const distance = this.velocity * inertiaDuration;
      const change = Math.round(distance / 36);

      if (this.lastX >= 34 && this.lastX <= 94) {
        this.currentYear -= change;
        this.setDisplayedYears();
      } else if (this.lastX >= 151 && this.lastX <= 207) {
        this.currentMonth -= change;
        this.setDisplayedMonths();
      } else if (this.lastX >= 248 && this.lastX <= 311) {
        this.currentDay -= change;
        this.setDisplayedDays();
      }
    },
    handleYearScroll(deltaY) {
      this.currentYear -= deltaY > 0 ? 1 : -1;
      this.setDisplayedYears();
    },
    handleMonthScroll(deltaY) {
      this.currentMonth -= deltaY > 0 ? 1 : -1;
      this.setDisplayedMonths();
    },
    handleDayScroll(deltaY) {
      this.currentDay -= deltaY > 0 ? 1 : -1;
      this.setDisplayedDays();
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);
  }
};
</script>

<style lang="scss" scoped>
.modify-birth {
  margin-top: 64px;
  height: 186px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.modify-birth-title-div {
  display: flex;
  margin-bottom: 16px;
}
.modify-birth-title {
  color: var(--gray-700, #374151);
  font-family: "Pretendard Medium";
  font-size: 16px;
  line-height: 160%;
}
.modify-birth-content, {
  height: 144px;
  display: flex;
}
.year-scroller,
.month-scroller,
.day-scroller {
  height: 144px;
  width: 80px;
  flex-direction: column;
  border-radius: 8px;
}

.year, .month, .day {
  height: 30px;
  width: 80px;
  margin: 6px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray-400, #9CA3AF);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  line-height: 150%;
  &.current-year, &.current-month, &.current-day {
    width: 80px;
    height: 60px;
    flex-shrink: 0;
    margin-left: 0;
    border-radius: 8px;
    background: var(--indigo-50, #EEF2FF);
    color: var(--indigo-500, #6366F1);
    text-align: center;
    font-family: "Pretendard Medium";
    font-size: 24px;
    line-height: 150%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.current-month, &.current-day {
    width: 54px;
  }
}
.day, .month {
  width: 54px;
}
.year-text-div,
.month-text-div,
.day-text-div {
  height: 100%;
  display: flex;
  align-items: center;
}
.year-text,
.month-text,
.day-text {
  color: var(--gray-500, #6B7280);
  text-align: center;
  font-family: "Pretendard Bold";
  margin-left: 8px;
  font-size: 18px;
  line-height: 160%;
}
.year-text,
.month-text {
  margin-right: 40px;
}
</style>