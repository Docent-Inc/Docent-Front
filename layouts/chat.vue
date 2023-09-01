<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" />
            <v-icon class="logo_docent" />
        </div>

        <!-- <div class="chat-container" id="chat-scrollable" ref="chatContainer"> -->
        <slot />
        <!-- </div> -->

        <chat-input />
    </div>
</template>

<script>
export default {
    mounted() {
        // const container = document.querySelector(".chat-container");
        // container.target.scrollTop = container.target.scrollHeight;
        // const scrollable = document.getElementsByClassName("chat-container");
        // scrollable.scrollTop = scrollable.scrollHeight;
        // // var previousScrollHeight = scrollable.scrollHeight;
        // // scrollable.scrollTop = scrollable.scrollHeight - previousScrollHeight;
        // document.querySelector(".chat-container").addEventListener(
        //     "scroll",
        //     function (event) {
        //         // 스크롤을 원하는 위치로 조절하고자 할 때 이곳에 추가 로직을 작성
        //         // 예: 스크롤 위치를 맨 아래로 유지
        //         console.log("event", event);
        //         // event.target.scrollTop = event.target.scrollHeight;
        //     },
        //     false
        // );
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding-top: 60px;
}

.ic_home {
    font-size: 18px;
    position: absolute;
    left: 0;
    margin-left: 30px;
}

.logo_docent {
    font-size: 42px;
    margin: 0 auto;
}

// .chat-container {
//     width: 100%;
//     height: calc(100% - (60px + 7rem)); // top + bottom
//     overflow-y: auto;
//     margin-top: 60px;
//     padding: 2rem;
//     overscroll-behavior: none;
// }
</style>
