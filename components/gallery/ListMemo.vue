<template>
    <div class="item_memo">
        <div class="memo_text">
            <div class="memo_title">{{ memo.title }}</div>
            <div class="memo_date">
                {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ListDiary",
    props: {
        memo: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
};
</script>
<style lang="scss" scoped>
.item_memo {
    width: 100%;
    // border: 1px solid red;
    padding: 0.75rem 0;
    border-bottom: 1px solid #000;
    position: relative;
    display: flex;

    .memo_text {
        width: 90%;
    }

    .memo_title {
        color: #010101;
        font-family: "Pretendard SemiBold";
        font-size: 16px;
        line-height: 20px;
        max-height: 40px;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .memo_date {
        color: #5c5c5c;
        font-family: "Pretendard";
        font-size: 12px;
    }
}
</style>
