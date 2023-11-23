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
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";

export default {
    name: "ModifyBirth",
    data() {
        return {
            currentYear: 2000,
            displayedYears: [],
            currentMonth: 1,
            displayedMonths: [],
            currentDay: 1,
            displayedDays: [],
            startY: 0,
            lastY: 0,
            startX: 0,
            lastX: 0,
            lastTime: Date.now(),
            velocity: 0,
            touchData: {
                startY: 0,
                lastY: 0,
                lastTime: Date.now(),
                velocity: 0,
            },
            scrollingAreas: [
                { startX: 22, endX: 105, handleScroll: this.handleYearScroll },
                {
                    startX: 155,
                    endX: 225,
                    handleScroll: this.handleMonthScroll,
                },
                { startX: 280, endX: 350, handleScroll: this.handleDayScroll },
            ],
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    mounted() {
        if (this.user?.birth) {
            const [year, month, day] = this.user.birth.split("-");
            this.currentYear = parseInt(year);
            this.currentMonth = parseInt(month);
            this.currentDay = parseInt(day);
        }

        this.setDisplayedYears();
        this.setDisplayedMonths();
        this.setDisplayedDays();
        this.$el.addEventListener("touchstart", this.handleTouchStart);
        this.$el.addEventListener("touchmove", this.handleTouchMove);
        this.$el.addEventListener("touchend", this.handleTouchEnd);
    },
    methods: {
        checkYear() {
            if (this.currentYear < 1900) this.currentYear = 1900;
            if (this.currentYear > 2023) this.currentYear = 2023;
        },
        checkMonth() {
            if (this.currentMonth < 1) this.currentMonth = 1;
            if (this.currentMonth > 12) this.currentMonth = 12;
        },
        checkDay() {
            const maxDaysInMonth = new Date(
                this.currentYear,
                this.currentMonth,
                0,
            ).getDate();
            if (this.currentDay < 1) this.currentDay = 1;
            if (this.currentDay > maxDaysInMonth)
                this.currentDay = maxDaysInMonth;
        },
        setDisplayedYears() {
            this.checkYear();
            this.displayedYears = [
                this.currentYear - 1,
                this.currentYear,
                this.currentYear + 1,
            ];
        },
        setDisplayedMonths() {
            this.checkMonth();
            let previousMonth = this.currentMonth - 1;
            let nextMonth = this.currentMonth + 1;
            this.displayedMonths = [
                previousMonth || 12,
                this.currentMonth,
                nextMonth === 13 ? 1 : nextMonth,
            ];
        },
        setDisplayedDays() {
            this.checkDay();
            let previousDay = this.currentDay - 1;
            let nextDay = this.currentDay + 1;
            this.displayedDays = [
                previousDay || 31,
                this.currentDay,
                nextDay === 32 ? 1 : nextDay,
            ];
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
            const deltaY = currentY - this.touchData.lastY;
            const deltaTime = Date.now() - this.touchData.lastTime;

            this.touchData.velocity = deltaY / deltaTime;
            this.touchData.lastY = currentY;
            this.touchData.lastTime = Date.now();

            for (const area of this.scrollingAreas) {
                if (currentX >= area.startX && currentX <= area.endX) {
                    area.handleScroll(deltaY);
                    break;
                }
            }
        },
        handleTouchEnd() {
            const inertiaDuration = 50;
            const distance = this.velocity * inertiaDuration;
            const change = Math.round(distance / 36);

            if (this.lastX >= 22 && this.lastX <= 105) {
                this.currentYear -= change;
                this.setDisplayedYears();
            } else if (this.lastX >= 155 && this.lastX <= 225) {
                this.currentMonth -= change;
                this.setDisplayedMonths();
            } else if (this.lastX >= 280 && this.lastX <= 350) {
                this.currentDay -= change;
                this.setDisplayedDays();
            }
        },
        emitBirthChange() {
            const birth = `${this.currentYear}-${String(
                this.currentMonth,
            ).padStart(2, "0")}-${String(this.currentDay).padStart(2, "0")}`;
            this.$emit("birthSelected", birth);
        },
        handleYearScroll(deltaY) {
            this.currentYear -= deltaY > 0 ? 1 : -1;
            this.setDisplayedYears();
            this.emitBirthChange();
        },
        handleMonthScroll(deltaY) {
            const increment = deltaY > 0 ? -1 : 1;
            this.currentMonth += increment;

            if (this.currentMonth === 0) {
                this.currentMonth = 12;
            } else if (this.currentMonth === 13) {
                this.currentMonth = 1;
            }
            this.setDisplayedMonths();
            this.emitBirthChange();
        },
        handleDayScroll(deltaY) {
            const maxDaysInMonth = new Date(
                this.currentYear,
                this.currentMonth,
                0,
            ).getDate();
            const increment = deltaY > 0 ? -1 : 1;

            this.currentDay += increment;

            if (this.currentDay === 0) {
                this.currentDay = maxDaysInMonth;
            } else if (this.currentDay > maxDaysInMonth) {
                this.currentDay = 1;
            }
            this.setDisplayedDays();
            this.emitBirthChange();
        },
    },
    beforeDestroy() {
        this.$el.removeEventListener("touchstart", this.handleTouchStart);
        this.$el.removeEventListener("touchmove", this.handleTouchMove);
        this.$el.removeEventListener("touchend", this.handleTouchEnd);
    },
};
</script>

<style lang="scss" scoped>
.modify-birth {
    margin-top: 64px;
    width: 100%;
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
.modify-birth-content {
    width: 100%;
    // height: 144px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.year-scroller,
.month-scroller,
.day-scroller {
    // height: 144px;
    // width: 80px;
    flex-direction: column;
    border-radius: 8px;
}

.year,
.month,
.day {
    // height: 30px;
    // width: 80px;
    margin: 6px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray-400, #9ca3af);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    line-height: 150%;
    &.current-year,
    &.current-month,
    &.current-day {
        // width: 80px;
        // height: 60px;
        padding: 1rem;
        flex-shrink: 0;
        margin-left: 0;
        border-radius: 8px;
        background: var(--indigo-50, #eef2ff);
        color: var(--indigo-500, #6366f1);
        text-align: center;
        font-family: "Pretendard Medium";
        font-size: 24px;
        line-height: 150%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.current-month,
    &.current-day {
        // width: 54px;
    }
}
.day,
.month {
    // width: 54px;
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
    color: var(--gray-500, #6b7280);
    text-align: center;
    font-family: "Pretendard Bold";
    margin-left: 8px;
    font-size: 18px;
    line-height: 160%;
}
.year-text,
.month-text {
    margin-right: 2rem;
}
</style>
