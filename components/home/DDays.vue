<template>
    <section class="calendar">
        <!-- <div class="title-wrapper"> -->
        <div class="title-box">
            <v-icon class="ic_calendar_color" />
            <h2>다가오는 일정이에요!</h2>
        </div>
        <button class="title-btn" @click="() => this.$router.push(`calendar`)">
            캘린더 보러가기
        </button>
        <!-- </div> -->
        <div class="calendar__empty skeleton" v-if="isCalendarLoading" />
        <div class="calendar__empty" v-else-if="calendarIsEmpty">
            다가오는 일정이 없습니다. 좋은 하루 보내세요!
        </div>
        <div class="calendar__data" v-else>
            <div
                v-for="item in calendar"
                :key="item.id"
                class="subject-box"
                @click="
                    () =>
                        this.$router.push(
                            `calendar/?date=${
                                new Date(item.start_time)
                                    .toISOString()
                                    .split('T')[0]
                            }`,
                        )
                "
            >
                <ContentBoxWithTime :item="item" />
            </div>
        </div>
    </section>
</template>

<script>
import ContentBoxWithTime from "../common/ContentBoxWithTime.vue";

export default {
    name: "DDays",
    components: { ContentBoxWithTime },
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
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.calendar {
    width: 100%;
    margin: 5rem auto;
    display: grid;
    grid-template-columns: 1fr 110px;

    &__empty,
    &__data {
        grid-column: 1 / span 2;
    }

    &__description {
        color: $vc-gray-500;
        font-size: 1.2rem;
        padding-left: 2rem;
    }

    .title-box {
        display: flex;
        align-items: center;
        @media screen and (max-width: 340px) {
            grid-column: 1 / span 2;
        }

        h2 {
            margin-left: 0.5rem;
            font-family: $font-bold;
            font-size: 1.8rem;

            @media screen and (max-width: 380px) {
                font-size: 100%;
            }
        }
    }

    .title-btn {
        font-size: 1.2rem;
        background: $vc-indigo-50;
        color: $vc-indigo-500;
        height: 100%;
        padding: 0.5rem 1rem;
        border-radius: $border-radius-default;
        height: 30px;
        font-family: $font-medium;

        @media screen and (max-width: 340px) {
            margin: 1.5rem 0 0 0;
            grid-row: 3;
            grid-column: 1 / span 2;
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
        border-radius: $border-radius-default;
        @media screen and (max-width: 300px) {
            font-size: 1.1rem;
        }
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
        display: flex;
        align-items: center;
        height: 40px;
        width: 90%;
        margin-top: 0.8rem;
        position: relative;
        font-size: 1.4rem;

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
            border-radius: $border-circle;

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
    width: 100%;
    @include skeleton;
}
</style>
