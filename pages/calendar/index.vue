<template>
    <div class="contents">
        <client-only>
            <VCalendar
                style="width: 90%"
                trim-weeks
                :attributes="attributes"
                @dayclick="onDayClick"
            />
        </client-only>
        <div class="bottom-sheet" v-if="day.date">
            <div class="indicator"></div>
            <div class="calendar-title">{{ day.date }}</div>
            <div class="calendar-contents">
                <div
                    class="calendar-content"
                    v-for="todo in day.todos"
                    :key="todo"
                >
                    <div class="circle"></div>
                    {{ todo }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDiaryService } from "~/services/diary";

export default {
    name: "Calendar",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            day: {},
            attributes: [
                {
                    key: "today",
                    dot: "green",
                    dates: [
                        new Date(2023, 8, 12),
                        new Date(2023, 8, 24),
                        new Date(2023, 8, 23),
                    ],
                    // popover: {
                    //     label: "today!",
                    // },
                },
                {
                    key: "tomorrow",
                    dot: "blud",
                    dates: [new Date(2023, 8, 1), new Date(2023, 8, 23)],
                },
            ],
        };
    },
    async mounted() {
        const { getGalleryList } = useDiaryService();
        const res = await getGalleryList(4, 1);
        console.log(res);
    },
    methods: {
        onDayClick(day) {
            this.day.date = this.$dayjs(day.id).format("D. dd");
            this.day.todos = [
                "해커톤 발표!",
                "해커톤 발표!",
                "해커톤 발표!",
                "해커톤 발표!",
            ];
            console.log(this.$dayjs(day.id).format("YYYY/MM/DD"));
        },
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
    max-height: 45%;
    overflow: scroll;
    border-top: 0.0625rem solid #cbd5e1;

    padding: 1rem 1.5rem;
    margin-top: 2rem;

    .indicator {
        width: 2.375rem;
        height: 0.33888rem;
        border-radius: 6.25rem;
        background: #bcbcbc;
        margin: 1rem auto 1.5rem;
    }

    .calendar-title {
        color: #010101;
        font-family: "Pretendard Bold";
        font-size: 1.25rem;
        line-height: 1.3125rem; /* 105% */
    }

    .calendar-contents {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.5rem;

        color: #5c5c5c;
        font-family: Pretendard;
        font-size: 0.75rem;
        line-height: 1.3125rem; /* 175% */

        margin-top: 1.2rem;

        .calendar-content {
            display: flex;
            align-items: center;
        }
        .circle {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: #b2bbda;
            margin-right: 1rem;
        }
    }
}
</style>
