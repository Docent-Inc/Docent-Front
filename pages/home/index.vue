<template>
    <div class="header">
        <v-icon class="logo_docent" />
    </div>
    <div class="contents">
        <div class="title">{{ $dayjs().format("YYYY.MM.DD") }}</div>
        <div class="main-title">
            안녕하세요 {{ user?.nickname }}님 <br />오늘의 이벤트예요
        </div>
        <!-- 오늘의 일정 -->
        <div class="main-calendar main-description">
            <v-icon class="ic_calendar" /> &nbsp;
            <div v-if="calendar.length > 0">{{ calendar[0].title }}&nbsp;►</div>
            <div v-else>일정이 없네요!</div>
        </div>

        <!-- 오늘의 기록 -->
        <div class="main-title">오늘의 기록</div>
        <div class="main-description">
            오늘 {{ user?.nickname }}님은 이런 그림을 그리셨네요
        </div>
        <div class="main-slides">
            <div
                class="main-slide"
                v-if="record.morning"
                :style="`background-image: url(${record.morning.image_url})`"
            ></div>
            <div
                class="main-slide"
                v-if="record.night"
                :style="`background-image: url(${record.night.image_url})`"
            ></div>

            <div
                class="main-slide empty"
                v-if="!record.morning && !record.night"
                @click="this.$router.push(`/chat`)"
            >
                {{ user?.nickname }}님의 그림을 <br />그려주세요!
            </div>
        </div>

        <!-- 오늘의 운세 -->
        <div class="main-title">오늘의 운세</div>
        <div class="main-description">{{ lucky }}</div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import { useTodayService } from "../../services/today";

export default {
    name: "Home",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    data() {
        return {
            calendar: [],
            record: {},
            lucky: "",
        };
    },
    async mounted() {
        const { getTodayCalendar, getTodayRecord, getTodayLucky } =
            useTodayService();

        await getTodayCalendar()
            .then((res) => {
                this.calendar = res.data;
            })
            .catch(() => {});

        await getTodayRecord()
            .then((res) => {
                this.record = res.data;
            })
            .catch(() => {});

        await getTodayLucky()
            .then((res) => {
                this.lucky = res.data.luck;
            })
            .catch(() => {});
    },
};
</script>

<style lang="scss" scoped>
.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    // margin-top: 60px;
    // margin-top: calc(60px + constant(safe-area-inset-top));
    // margin-top: calc(60px + env(safe-area-inset-top));

    padding: 1.25rem 0 1.75rem 1.75rem;
}

.chat {
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
    border-radius: 40px;
    position: relative;

    text-align: center;
    background: #efefef;

    .v-icon {
        position: absolute;
        right: 0;
        margin-right: 15px;
    }
}

.logo_docent {
    font-size: 42px;
    margin: 0 auto;
}

.title {
    margin-bottom: 1.7rem;
}

.main-title {
    margin: 1rem 0 0.5rem;
}

.main-description {
    margin-right: 2rem;
}

.main-calendar {
    display: flex;
    margin-bottom: 5rem;
}

.main-slides {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2.7rem;
    padding-bottom: 2rem;

    display: flex;
    overflow-x: scroll;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    &::-webkit-scrollbar {
        display: none;
    }

    .main-slide {
        flex: 0 0 60%;
        aspect-ratio: 1/1;
        border-radius: 0.625rem;
        margin-right: 1.5rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        font-size: 1.25rem;
        line-height: 1.875rem; /* 150% */
    }

    .main-slide.empty {
        background-color: rgba(206, 218, 200, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(77, 77, 77, 0.72);
        font-family: "Pretendard";
        text-align: center;
    }
}
</style>
