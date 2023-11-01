<template>
    <div class="item_memo" @click="this.$router.push(`/memo/${memo.id}`)">
        <div class="memo_content">
            <div class="memo_title">
                {{ memo.diary_name === "" ? "(제목 없음)" : memo.diary_name }}
            </div>
            <div class="memo_date">
                {{ this.$dayjs(this.memo.create_date).format("YYYY.MM.DD") }}
            </div>
        </div>
        <div class="memo_icon">
            <!-- 메모 타입에 따라 다른 아이콘을 보여줄 수 있습니다. -->
            <v-icon class="ic_tag2_memo" />
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
    computed: {},
};
</script>
<style lang="scss" scoped>
.item_memo {
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--white, #fff);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 8px;
    padding: 0 1rem;

    .memo_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: calc(100% - 73px);
    }

    .memo_title {
        color: var(--gray-700, #374151);
        font-family: "Pretendard Medium";
        font-size: 16px;
        line-height: 160%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .memo_date {
        color: var(--gray-400, #9ca3af);
        margin-top: 8px;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
        text-align: left;
    }
    .ic_tag2_memo {
        width: 45px;
        height: 32px;
        margin-bottom: 36px;
    }
}
</style>
