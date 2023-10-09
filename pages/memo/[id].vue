<template>
    <div class="viewport">
        <div class="header">
            <v-icon class="ic_back_primary" @click="this.$router.back()" />
            <span class="memo">Memo</span>
        </div>
        <div class="contents">
            <div class="memo-title">
                {{ memo.title === "" ? "(제목 없음)" : memo.title }}
            </div>
            <div class="memo-date">
                {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
            </div>
            <div class="memo-contents">
                {{ memo.content }}
            </div>
        </div>
    </div>
</template>
<script>
import { useDiaryService } from "~/services/diary";

export default {
    name: "Memo",
    data() {
        return {
            memo: {},
        };
    },
    async mounted() {
        const memo_id = this.$route.params.id;
        const { getMemo } = useDiaryService();
        const res = await getMemo(memo_id);
        this.memo = res.data.memo;
    },
    computed: {},
    methods: {},
};
</script>
<style lang="scss" scoped>
.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    // padding: 2rem;
    padding: 32px;
}

.memo {
    color: var(--2C9577, #2c9577);
    font-family: Pretendard;
    // font-size: 0.875rem;
    font-size: 14px;
    // line-height: 1.3125rem; /* 150% */
    line-height: calc(14px * 1.5); /* 150% */
    // margin-left: 0.8rem;
    margin-left: calc(16px * 0.8);
}

.memo-title {
    color: #000;
    font-family: "Pretendard Bold";
    // font-size: 2rem;
    font-size: 30px;
    // line-height: 1.3125rem; /* 70% */
}

.memo-date {
    color: #5c5c5c;
    font-family: Pretendard;
    // font-size: 0.75rem;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    // line-height: 1.3125rem; /* 175% */
    line-height: calc(12px * 1.75); /* 175% */
    margin-top: 17px;
}

.memo-contents {
    color: rgba(0, 0, 0, 0.95);
    font-family: Pretendard;
    // font-size: 1rem;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: calc(16px * 1.3); /* 130% */
    text-transform: capitalize;
    margin-top: 29px;
}
</style>
