<template>
    <div class="item_board_memo">
        <div class="memo_text">
            <div class="memo_date">
                {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
            </div>
            <div class="memo_title">
                {{ memo.title === "" ? "(제목 없음)" : memo.title }}
            </div>

            <div
                class="memo_more"
                @click="this.$router.push(`/memo/${memo.id}`)"
            >
                더 알아보기 &gt;
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BoardMemo",
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
.item_board_memo {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    padding: 1rem;

    .memo_text {
        width: 90%;
        text-align: start;
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

    .memo_more {
        color: #2c9577;
        font-size: 8px; // 0.5rem;

        line-height: 1.3125rem; /* 262.5% */
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0 1.5rem 1rem;
        text-align: right;

        cursor: pointer;
    }
}
</style>
