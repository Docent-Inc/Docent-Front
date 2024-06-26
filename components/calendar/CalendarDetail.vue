<template>
    <article class="calendar-detail" v-if="viewType === 'weekly'">
        <div class="calendar-header">
            <h2 class="calendar-date">
                {{ $dayjs(date.date).format("YYYY년 MM월 DD일") }}
                <span>{{ $dayjs(date.date).format("dddd") }}</span>
            </h2>
            <div class="calendar-add" v-if="todosList?.length > 0">
                <button @click="handleAddBtn">+</button>
            </div>
        </div>
        <div class="calendar-contents" v-if="todosList?.length > 0">
            <div class="calendar-content" v-for="todo in todosList" :key="todo">
                <ContentBoxWithOnlyTime :item="todo" :isCalender="true" />
            </div>
        </div>

        <div class="calendar-none" v-else>
            <div>아직 일정이 없어요!</div>
            <div>이 날 등록할 일정이 있으신가요?</div>
            <div class="add_btn-box" @click="handleAddBtn">
                <AddBtn :title="'기록 추가하기'" />
            </div>
        </div>
    </article>
</template>

<script>
import { mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import { useMypageStore } from "~/store/mypage";

import ContentBoxWithOnlyTime from "../common/ContentBoxWithOnlyTime.vue";
import AddBtn from "../common/buttons/AddBtn.vue";

export default {
    name: "CalendarDetail",
    components: { ContentBoxWithOnlyTime, AddBtn },
    props: {
        date: Object,
        todosList: Array,
        viewType: String,
    },
    methods: {
        ...mapActions(useCalendarStore, [
            "updateStartTime",
            "updateEndTime",
            "updateCalendarId",
        ]),
        ...mapActions(useMypageStore, ["updateContents"]),
        handleAddBtn() {
            this.updateContents("title", "", null);
            this.updateContents("content", "", null);
            this.updateStartTime(null);
            this.updateEndTime(null);
            this.updateCalendarId(-1);
            this.$router.push("edit/calendar");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.calendar-detail {
    width: 100%;
    height: 47%;
    position: absolute;
    overflow: scroll;
    border-radius: 12px 12px 0 0;
    padding: 2rem;
    bottom: 90px;
    font-size: 12px;
    z-index: 10;

    &::-webkit-scrollbar {
        display: none;
    }

    background: $vc-white;
    color: $vc-gray-800;
    display: flex;
    flex-direction: column;

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .calendar-date {
        color: $vc-gray-700;
        font-family: $font-bold;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        padding-top: 1rem;

        > span {
            color: $vc-gray-400;
            font-family: $font-default;
            font-size: 1.4rem;
            margin-left: 0.9rem;
        }
    }

    .calendar-add {
        height: 28px;
        width: 28px;
        background: $vc-accent;

        color: $vc-white;
        font-size: 3rem;
        border-radius: $border-radius-default;

        button {
            border-radius: $border-radius-default;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 3px;
            box-shadow: 0px 5px 20px rgba(70, 96, 250, 0.3);
        }
    }

    .calendar-none {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        font-family: $font-medium;

        .add_btn-box {
            width: 236px;
            height: 54px;
            margin-top: 2.4rem;
        }
    }

    .calendar-contents {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;

        margin-top: 1.6rem;
        font-family: $font-medium;
        font-size: 1.6rem;

        .calendar-content {
            display: flex;
            align-items: center;
            width: 100%;
        }
    }
}
</style>
