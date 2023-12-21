<template>
    <!-- <div v-if="todos.today_count === undefined" class="skeleton">
        <div class="skeleton__contents" />
    </div> -->
    <div class="calendar-wrapper">
        <client-only>
            <Calendar :viewType="viewType" :updateViewType="updateViewType" />
        </client-only>
    </div>
    <CalendarDetail :date="date" :todosList="todos.list" :viewType="viewType" />
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
    props: ["viewType", "updateViewType"],
    data() {
        return {
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
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.calendar-wrapper {
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    margin: 1rem 0;
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
