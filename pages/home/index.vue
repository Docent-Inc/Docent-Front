<template>
    <div class="header">
        <v-icon class="logo_docent" />
    </div>
    <div class="body">
        <div class="title">2023.09.03</div>
        <div class="main-title">
            안녕하세요 {{ name }}님 <br />오늘의 이벤트예요
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
            오늘 {{ name }}님은 이런 그림을 그리셨네요
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
                v-if="!record.morning || !record.night"
                @click="router.push(`/chat`)"
            >
                {{ name }}님의 그림을 <br />그려주세요!
            </div>
        </div>

        <!-- 오늘의 운세 -->
        <div class="main-title">오늘의 운세</div>
        <div class="main-description">{{ lucky }}</div>
    </div>
</template>

<script setup>
import { useTodayService } from "../../services/today";

const router = useRouter();
definePageMeta({
    layout: "main",
});

const calendar = ref([]);
const record = ref({});
const lucky = ref("");
const name = ref("");
const { getTodayCalendar, getTodayRecord, getTodayLucky } = useTodayService();
onMounted(async () => {
    name.value = window.localStorage.getItem("name")
        ? window.localStorage.getItem("name")
        : "";

    await getTodayCalendar().then((res) => {
        calendar.value = res.data;
    });

    await getTodayRecord().then((res) => {
        record.value = res.data;
    });

    await getTodayLucky().then((res) => {
        lucky.value = res.data.luck;
    });
});
</script>

<style lang="scss" scoped>
.body {
    width: 100%;
    height: calc(100% - (60px));
    // height: calc(
    //     100% -
    //         (
    //             60px + constant(safe-area-inset-top) +
    //                 constant(safe-area-inset-bottom)
    //         )
    // );
    // height: calc(
    //     100% - (60px + env(safe-area-inset-top) + env(safe-area-inset-bottom))
    // );
    padding: 2rem 0 4rem 2rem;
    overflow: scroll;
    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
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
    margin: 1rem 0;
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
    overflow-x: auto;

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
