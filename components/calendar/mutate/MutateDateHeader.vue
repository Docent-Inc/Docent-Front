<template>
    <div>{{ time.year }}년 {{ time.month }}월 {{ time.day }}일</div>
    <div class="time-box">
        <div class="ic_clock-box">
            <v-icon
                :class="[
                    (header === 'from' && isStartTimeSection) ||
                    (header === 'to' && !isStartTimeSection)
                        ? 'ic_clock'
                        : 'ic_clock_gray',
                ]"
            />
        </div>
        <div class="time">
            {{ time.isAM ? "오전" : "오후" }}
            {{ time.hours }}시 {{ time.minutes }}분
        </div>
    </div>
</template>
<script>
export default {
    props: {
        time: Object,
        isStartTimeSection: Boolean,
        header: String,
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.time-box {
    display: flex;
    align-items: center;

    .time {
        font-family: $font-medium;
    }

    .ic_clock-box {
        margin-right: 0.8rem;
        width: 16px;
        height: 16px;
    }
}
</style>
