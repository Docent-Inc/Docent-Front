<template>
    <div class="item-box">
        <div class="item-box__title">
            <div class="title-box">
                <span
                    class="time"
                    :class="{
                        'd-day': isToday(item.start_time),
                        'd-day-passed': isPassed(item.start_time),
                    }"
                >
                    {{
                        isToday(item.start_time)
                            ? dDayTime(item.start_time)
                            : calculateDDay(item.start_time)
                    }}
                </span>
                <h3 class="subject">
                    {{ item.title }}
                </h3>
            </div>
            <div class="delete-box" v-if="isCalender" @click="onDelete">
                <v-icon class="ic_delete">아이콘</v-icon><span>삭제하기</span>
            </div>
        </div>
        <p class="item-box__content" v-if="isCalender && item.content">
            {{ item.content }}
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import { useCalendarService } from "~/services/calendar";

export default {
    props: {
        item: {
            type: Object,
            required: false,
        },
        isCalender: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        ...mapState(useCalendarStore, ["date", "page"]),
    },
    methods: {
        ...mapActions(useCalendarStore, ["setDate", "setPage", "reset"]),
        isToday(start_time) {
            const today = this.$dayjs();
            const startTime = this.$dayjs(start_time);
            return today.isSame(startTime, "day");
        },
        calculateDDay(start_time) {
            const today = this.$dayjs().startOf("day");
            const startTime = this.$dayjs(start_time).startOf("day");

            const diff = startTime.diff(today, "day");

            let dDay = Math.abs(diff);
            if (diff < 0) {
                dDay = `D+${dDay}`;
            } else {
                dDay = `D-${dDay}`;
            }

            return dDay;
        },
        dDayTime(start_time) {
            const startTime = this.$dayjs(start_time);
            return startTime.format("HH:mm");
        },
        isPassed(start_time) {
            const today = this.$dayjs();
            const startTime = this.$dayjs(start_time);
            return today.isAfter(startTime, "day");
        },
        onDelete() {
            this.$eventBus.$emit("onCustomModal", {
                title: "정말 이 일정을 삭제하시겠어요?",
                desc: "삭제한 일정은 영영 돌아오지 않아요!",
                confirm: "삭제하기",
                cancel: "남겨두기",
                callback: this.deleteTodo,
            });
        },
        async deleteTodo() {
            const { deleteCalendar } = useCalendarService();
            const res = await deleteCalendar(this.item.id);
            if (res.success) {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제되었습니다.",
                    callback: () => {
                        this.setDate(this.date.date);
                    },
                });
            } else {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제에 실패하였습니다.",
                    desc: res.message,
                });
            }
        },
        ...mapActions(useCalendarStore, ["deleteCalendarItem"]),
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.item-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    box-shadow: 0px 9px 34px rgba(204, 205, 227, 0.45);
    padding: 1.2rem;
    border-radius: $border-radius-default;
    position: relative;

    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-box {
            display: flex;
            align-items: center;
        }

        .delete-box {
            color: $vc-gray-400;
            font-size: 1.2rem;
            display: flex;
            align-items: center;

            i {
                margin: 0 0.5rem 0 2rem;
            }
        }
    }

    &__content {
        color: $vc-gray-500;
        font-size: 1.4rem;
        margin-top: 1.4rem;
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
    .d-day-passed {
        color: $vc-gray-600;
        background-color: $vc-gray-100;
    }
    .subject {
        color: $vc-gray-700;
    }
}
</style>