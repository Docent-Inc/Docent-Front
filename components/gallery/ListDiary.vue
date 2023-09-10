<template>
    <div class="item_diary">
        <img :src="diary.image_url" />
        <div class="diary_text">
            <div class="diary_title">{{ diary.diary_name }}</div>
            <div class="diary_date">
                {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
            </div>
        </div>

        <div class="dot" v-if="diary.content_type === 1"></div>
        <div class="dot green" v-else></div>
    </div>
</template>
<script>
export default {
    name: "ListDiary",
    props: {
        diary: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
};
</script>
<style lang="scss" scoped>
.item_diary {
    width: 100%;
    padding: 0.75rem 0;
    border-bottom: 1px solid #000;
    position: relative;
    display: flex;

    .dot {
        background: var(--B2BBDA, #b2bbda);
        border-radius: 50%;
        width: 0.625rem;
        height: 0.625rem;

        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;

        &.green {
            background: var(--2C9577, #2c9577);
        }
    }

    img {
        width: 25%;
        height: 25%;
        border-radius: 0.9375rem;
    }
}

.diary_text {
    margin-left: 10px;
    width: calc(100% - (30% + 50px));

    .diary_title {
        color: #010101;
        font-family: "Pretendard SemiBold";
        font-size: 16px;
    }

    .diary_date {
        color: #5c5c5c;
        font-family: "Pretendard";
        font-size: 12px;
    }
}
</style>
