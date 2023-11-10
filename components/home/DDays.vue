<template>
    <section class="calendar">
        <div class="title-wrapper">
            <div class="title-box">
                <v-icon class="ic_calendar_color" />
                <h2>다가오는 일정이에요!</h2>
            </div>
            <button
                class="title-btn"
                @click="() => this.$router.push(`calendar`)"
            >
                캘린더 보러가기
            </button>
        </div>
        <div class="calendar__empty skeleton" v-if="isCalendarLoading" />
        <div class="calendar__empty" v-if="calendarIsEmpty">
            다가오는 일정이 없습니다. 좋은 하루 보내세요!
        </div>
        <div class="calendar__data" v-else>
            <div
                v-for="item in calendar"
                :key="item.id"
                class="subject-box"
                @click="
                    () => this.$router.push(`calendar/?date=${item.start_time}`)
                "
            >
                <span
                    class="time"
                    :class="{ 'd-day': isToday(item.start_time) }"
                >
                    {{
                        isToday(item.start_time)
                            ? dDayTime(item.start_time)
                            : calculateDDay(item.start_time)
                    }}
                </span>
                <span class="subject">{{ item.title }}</span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "DDays",
    props: {
        calendar: {
            type: Array,
            required: true,
            default: () => [],
        },
        isCalendarLoading: {
            type: Boolean,
            required: true,
            default: () => Boolean,
        },
    },
    computed: {
        calendarIsEmpty() {
            return this.calendar.length === 0;
        },
    },
    methods: {
        isToday(start_time) {
            const today = this.$dayjs();
            const startTime = this.$dayjs(start_time);
            return today.isSame(startTime, "day");
        },
        calculateDDay(start_time) {
            const today = this.$dayjs();
            const startTime = this.$dayjs(start_time);
            const diff = startTime.diff(today, "day");
            return `D-${Math.abs(diff)}`;
        },
        dDayTime(start_time) {
            const startTime = this.$dayjs(start_time);
            return startTime.format("HH:mm");
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/mixins.scss";

.calendar {
    margin: 5rem auto;

    &__description {
        color: $vc-gray-500;
        font-size: 1.2rem;
        padding-left: 2rem;
    }

    .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 320px) {
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }
        .title-box {
            display: flex;
            align-items: center;

            h2 {
                margin-left: 0.5rem;
                font-family: $font-bold;
                font-size: 1.8rem;

                @media screen and (max-width: 320px) {
                    font-size: 1.6rem;
                }
            }
        }

        .title-btn {
            font-size: 1.2rem;
            background: $vc-indigo-50;
            color: $vc-indigo-500;
            height: 100%;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            height: 30px;
            font-weight: 600;

            @media screen and (max-width: 320px) {
                margin-top: 1.5rem;
            }
        }
    }

    &__empty {
        color: $vc-gray-400;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        height: 44px;
        box-shadow: 0px 9px 34px rgba(204, 205, 227, 0.45);
        padding: 1.2rem;
        margin-top: 1.6rem;
        border-radius: 8px;
    }

    &__data {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        margin: 2rem 0 0 1rem;
        border-left: 2px solid $vc-accent;

        @media screen and (max-width: 320px) {
            border-left: none;
            margin: 2rem 0 0 0rem;
        }
    }

    .subject-box {
        color: $vc-gray-400;
        display: flex;
        align-items: center;
        height: 40px;
        width: 90%;
        box-shadow: 0px 9px 34px rgba(204, 205, 227, 0.45);
        padding: 1.2rem;
        margin-top: 0.8rem;
        border-radius: 8px;
        position: relative;

        @media screen and (max-width: 320px) {
            width: 100%;
        }

        &:first-child {
            margin-top: 0;
        }

        &:before {
            content: "";
            position: absolute;
            top: 50%;
            left: -11.5%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background-color: $vc-accent;
            border-radius: 50%;

            @media screen and (max-width: 320px) {
                display: none;
            }
        }

        .time {
            font-family: $font-bold;
            color: $vc-indigo-500;
            background-color: $vc-indigo-200;
            width: 48px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            margin-right: 2rem;
            font-size: 12px;
        }

        .d-day {
            color: $vc-red-500;
            background-color: #ffd2d2;
        }
        .subject {
            font-size: 14px;
            color: $vc-gray-600;
        }
    }
}

.skeleton {
    z-index: 2;
    width: 90%;
    @include skeleton;
}
</style>
