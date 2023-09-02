<template>
    <div class="header">
        <v-icon class="logo_docent" />
    </div>
    <div class="body">
        <div class="title">2023.09.03</div>
        <div class="main-title">안녕하세요 슨트님 <br />오늘의 이벤트예요</div>

        <!-- 오늘의 일정 -->
        <div class="main-calendar main-description">
            <v-icon class="ic_calendar" /> &nbsp;
            <div v-if="!today">일정이 없네요!</div>
            <div v-else>{{ today }} &nbsp;►</div>
        </div>

        <!-- 오늘의 기록 -->
        <div class="main-title">오늘의 기록</div>
        <div class="main-description">오늘 슨트님은 이런 그림을 그리셨네요</div>
        <div class="main-slides">
            <div
                class="main-slide"
                v-for="(slide, idx) in list"
                :key="idx"
                :style="`background-image: url(${slide})`"
            ></div>

            <div class="main-slide empty" v-if="list.length === 0">
                슨트님의 그림을 <br />그려주세요!
            </div>
        </div>

        <!-- 오늘의 운세 -->
        <div class="main-title">오늘의 운세</div>
        <div class="main-description">오늘은 물 근처로 안가는게 좋겠네요</div>

        <!-- TODO: 채팅 지움 -->
        <!-- <div class="chat" @click="router.push(`/chat`)">
            채팅
            <v-icon>mdi-send-circle</v-icon>
        </div> -->
    </div>
</template>

<script setup>
definePageMeta({
    layout: "main",
});

// Dummy
const list = ref([
    "https://storage.googleapis.com/docent/ad6e2d2b-9df8-4333-92c9-12c9b4f82d66.png",
    "https://storage.googleapis.com/docent/514367ac-1dac-40fd-8a59-f8f56929cdc3.png",
    "https://storage.googleapis.com/docent/1f92613c-fc6f-46b9-a68f-117652290c3d.png",
]);
const today = ref("D-day 해커톤 발표!");
// const today = ref(null);
</script>

<style lang="scss" scoped>
.body {
    margin-top: 60px;
    width: 100%;
    height: calc(100% - 60px);
    padding: 2rem 0 4rem 2rem;
    overflow: scroll;
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
