<template>
    <Header :title="'캘린더'" />
    <main class="contents viewport">
        <div v-if="todos.today_count === undefined" class="skeleton">
            <div class="skeleton__title" />
            <div class="skeleton__contents" />
        </div>
        <div class="calendar-wrapper" v-else>
            <h2 class="today-todos">
                오늘은 일정이 <span>{{ todos.today_count }}개</span> 있어요!
            </h2>
            <client-only>
                <Calendar
                    :viewType="viewType"
                    @update-view-type="updateViewType"
                />
            </client-only>
        </div>
        <CalendarDetail
            :date="date"
            :todosList="todos.list"
            :viewType="viewType"
        />
    </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import Header from "~/components/common/Header.vue";
import Calendar from "~/components/calendar/Calendar.vue";
import ContentBoxWithTime from "~/components/common/ContentBoxWithTime.vue";
import SimpleModal from "~/components/modal/SimpleModal.vue";
import CalendarDetail from "~/components/calendar/CalendarDetail.vue";

export default {
    name: "CalendarMain",
    components: {
        Header,
        Calendar,
        ContentBoxWithTime,
        SimpleModal,
        CalendarDetail,
    },
    setup() {
        definePageMeta({
            layout: "main",
        });
        useHead({
            title: "일정",
            meta: [
                {
                    hid: "description",
                    property: "description",
                    content: `일정을 세우고 관리할 수 있어요`,
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: `일정`,
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: `일정을 세우고 관리할 수 있어요`,
                },
                {
                    hid: "twitter:description",
                    property: "twitter:description",
                    content: `일정을 세우고 관리할 수 있어요`,
                },
            ],
        });
    },
    data() {
        return {
            viewType: "monthly",
            isModalOpen: false,
        };
    },
    computed: {
        ...mapState(useCalendarStore, ["todos", "date"]),
    },
    async mounted() {
        this.reset();
        let date = new Date(this.$route.query.date);
        if (!date || isNaN(date)) date = new Date();
        this.setDate(date);
    },
    methods: {
        ...mapActions(useCalendarStore, ["setDate", "reset"]),
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        updateViewType(newViewType) {
            this.viewType = newViewType;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
    padding: 0;

    overflow-x: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }

    display: flex;
    flex-direction: column;
    position: relative;

    transition: transform 0.3s ease-in-out;

    .calendar-wrapper {
        width: 100%;
        height: 100%;
    }
}

.today-todos {
    color: $vc-gray-700;
    font-family: $font-bold;
    font-size: 2.4rem;
    padding-left: $padding-default;
    margin: 0.4rem 0 1.6rem 0;

    span {
        color: $vc-indigo-500;
    }
}

.skeleton {
    width: 100%;
    height: 100%;
    position: relative;

    &__title {
        content: "";
        @include skeleton;
        position: absolute;
        top: 0;
        left: 2rem;
        width: 60%;
        height: 7%;
        border-radius: $border-radius-default;
    }

    &__contents {
        content: "";
        @include skeleton;
        position: absolute;
        top: 20%;
        left: 1rem;
        right: 1rem;
        width: 80%;
        height: 70%;
        margin: auto;
        border-radius: $border-radius-default;
    }
}
</style>
