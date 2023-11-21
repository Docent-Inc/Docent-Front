<template>
    <section class="calendar-box" @click="toggleViewType">
        <v-calendar
            :attributes="attributes"
            ref="vcalendar"
            transparent
            trim-weeks
            :view="viewType"
            @did-move="(pages) => handlePageMove(new Date(pages[0].id))"
        >
            <template v-slot:day-content="{ day, attributes }">
                <article
                    class="calendar-in-date-box"
                    @click="handleDateClick(day.date, $event)"
                >
                    <div class="calendar-in-date">
                        {{ day.date.getDate() }}
                    </div>
                    <div class="todo-title-box">
                        <p
                            v-for="attr in attributes"
                            :key="attr.start_time"
                            class="calendar-mark"
                            :class="getCustomClass(attr, attributes)"
                        >
                            {{ attr.customData?.title }}
                        </p>
                    </div>
                </article>
            </template>
        </v-calendar>
    </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
let prevAttrDates = [];
// let overlappingEvents = [];

export default {
    name: "Calendar",
    data() {
        return {
            isModalOpen: false,
        };
    },
    props: {
        viewType: String,
    },

    computed: {
        ...mapState(useCalendarStore, ["page", "date", "attributes"]),
    },
    created() {
        const dateParam = this.$route.query.date;

        if (dateParam) {
            const date = new Date(dateParam);

            if (!isNaN(date.getTime())) {
                this.handleDateClick(date, "mount");
            }
            return;
        }
    },
    methods: {
        ...mapActions(useCalendarStore, ["setDate", "setPage", "reset"]),

        toggleViewType(event) {
            prevAttrDates = [];
            if (
                event.target?.classList.contains("calendar-in-date-box") ||
                event.target?.classList.contains("calendar-in-date") ||
                event.target?.classList.contains("calendar-mark") ||
                event === "mount"
            ) {
                this.$emit("update-view-type", "weekly");
            } else {
                this.$emit("update-view-type", "monthly");
            }
        },
        async handleDateClick(day, event) {
            if (event) {
                this.toggleViewType(event);
            } else {
                this.toggleViewType("mount");
            }

            prevAttrDates = [];
            this.setDate(day);
            await this.$nextTick();
            this.$refs.vcalendar.move(new Date(day));

            const params = new URLSearchParams();
            const date = `${day.getFullYear()}-${
                day.getMonth() + 1
            }-${day.getDate()}`;
            params.set("date", date);

            const currentPath = this.$route.path;
            const queryString = params.toString();
            const newUrl = queryString
                ? `${currentPath}?${queryString}`
                : currentPath;
            this.$router.push(newUrl);
        },
        getCustomClass(attr) {
            let customClass = attr.customData?.class;
            const isContinuedDate = prevAttrDates.includes(attr.dates.start);

            if (!isContinuedDate) {
                prevAttrDates = [...prevAttrDates, attr.dates.start];
                return customClass;
            }

            customClass += " is-continue ";

            return customClass;
        },
        handlePageMove(pageInfo) {
            prevAttrDates = [];
            this.setPage(pageInfo);
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

.calendar-box {
    width: 100%;
    height: calc(100% - (56px));
    display: flex;
    justify-content: center;
    background: $gradient_bg_light;
}
.calendar-in-date-box {
    width: 100%;
    height: 100%;

    .calendar-in-date {
        width: 100%;
        text-align: center;
        margin-top: 0.3rem;
    }
}

.todo-title-box {
    font-size: 1rem;

    .todo-title {
        position: relative;
        width: 95%;
        padding: 0 1rem 0 0.7rem;
        background: $vc-indigo-100;
        height: 12px;
        line-height: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 2px;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 7%;
            height: 12px;
            background: $vc-indigo-300;
            z-index: 3;
        }

        &.one-more-days {
            width: 100%;
        }

        &.one-more-days:not(.is-continue) {
            z-index: 99;
            padding-right: 0;
        }

        &.is-continue {
            color: $vc-indigo-100;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 7%;
                height: 12px;
                background: transparent;
                z-index: -3;
            }
        }
    }
}
.overlap-0 {
    top: 27px;
    position: absolute !important;
}
.overlap-1 {
    top: 41px;
    position: absolute !important;
}
.overlap-2 {
    top: 55px;
    position: absolute !important;
}

.overlap-3 {
    top: 69px;
    position: absolute !important;
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
        width: 70%;
        height: 7%;
        border-radius: $border-radius-default;
    }

    &__contents {
        content: "";
        @include skeleton;
        position: absolute;
        top: 20%;
        left: 2rem;
        right: 2rem;
        width: 90%;
        height: 70%;
        margin: auto;
        border-radius: $border-radius-default;
    }
}
</style>
