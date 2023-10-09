<template>
    <div class="contents">
        <client-only>
            <VCalendar
                ref="vcalendar"
                style="width: 90%"
                trim-weeks
                :initial-page="page"
                :attributes="attributes"
                @dayclick="(day) => setDate(day.date)"
                @did-move="(pages) => setPage(new Date(pages[0].id))"
            />
        </client-only>
        <div class="bottom-sheet">
            <div class="calendar-title">
                {{ $dayjs(date.date).format("D. dd") }}
            </div>
            <div class="calendar-contents" v-if="todos && todos.length > 0">
                <div class="calendar-content" v-for="todo in todos" :key="todo">
                    <div class="circle"></div>
                    {{ todo.diary_name }}
                </div>
            </div>

            <div class="calendar-none" v-else>일정이 없습니다</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
export default {
    name: "Calendar",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    computed: {
        ...mapState(useCalendarStore, ["page", "date", "attributes", "todos"]),
    },
    async mounted() {
        this.reset();

        let date = new Date(this.$route.query.date);
        if (!date || isNaN(date)) date = new Date();
        this.setDate(date);
    },
    methods: {
        ...mapActions(useCalendarStore, ["setDate", "setPage", "reset"]),
    },
};
</script>

<style lang="scss" scoped>
.contents {
    width: 100%;
    height: 100%;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.bottom-sheet {
    width: 100%;
    height: 45%;
    position: relative;
    overflow: scroll;
    // border-top: 0.0625rem solid #cbd5e1;
    border-top: 0.96px solid #cbd5e1;

    // padding: 2rem 1.5rem 1rem;
    // margin-top: 2rem;
    padding: 32px 24px 16px;
    margin-top: 32px;

    color: #5c5c5c;
    font-family: Pretendard;
    // font-size: 0.75rem;
    // line-height: 1.3125rem; /* 175% */
    font-size: 12px;
    line-height: 21px; /* 175% */

    .calendar-title {
        color: #010101;
        font-family: "Pretendard Bold";
        // font-size: 1.25rem;
        // line-height: 1.3125rem; /* 105% */
        font-size: 20px;
        line-height: 21px; /* 105% */
    }

    .calendar-none {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .calendar-contents {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        // gap: 0.5rem;
        gap: 8px;

        // margin-top: 1.2rem;
        margin-top: 19.2px;

        .calendar-content {
            display: flex;
            align-items: center;
        }
        .circle {
            // width: 0.5rem;
            // height: 0.5rem;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #b2bbda;
            // margin-right: 1rem;
            margin-right: 16px;
        }
    }
}
</style>
