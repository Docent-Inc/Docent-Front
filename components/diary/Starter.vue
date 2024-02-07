<template>
    <div class="wrapper">
        <p class="top">아직 기록이 없어요!<br />첫 기록을 시작해볼까요?</p>
        <button class="button-container">
            <AddBtn />
        </button>
    </div>
</template>

<script>
import AddBtn from "../common/buttons/AddBtn.vue";

export default {
    name: "Starter",
    components: { AddBtn },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.top {
    display: flex;
    width: 256px;
    height: 52px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #6b7280;
    text-align: center;

    font-family: "Pretendard Medium";
    font-size: 16px;
    line-height: 160%;
    /* margin-top: 84px; */
    margin-left: auto;
    margin-right: auto;
}
.button-container {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    width: 255px;
}
.ic_new_chat {
    width: 242px;
    height: 48px;
}
.wrapper {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // background: $gradient_bg_light;
}
</style>
