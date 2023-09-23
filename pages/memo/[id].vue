<template>
    <div class="header">
        <v-icon class="ic_back_primary" @click="this.$router.back()" />
        <span class="memo">Memo</span>
    </div>
    <div class="contents">
        <div class="memo-title">{{ memo.title }}</div>
        <div class="memo-date">
            {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
        </div>
        <div class="memo-contents">
            {{ memo.content }}
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
.memo {
    color: var(--2C9577, #2c9577);
    font-family: Pretendard;
    font-size: 0.875rem;
    line-height: 1.3125rem; /* 150% */
    margin-left: 0.8rem;
}
.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    padding: 2rem;
}

.memo-title {
    color: #000;
    font-family: "Pretendard Bold";
    font-size: 1.8rem;
    line-height: 1.3125rem; /* 70% */
}

.memo-date {
    color: #5c5c5c;
    font-family: Pretendard;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.3125rem; /* 175% */
    margin-top: 17px;
}

.memo-contents {
    color: rgba(0, 0, 0, 0.95);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: calc(16px * 1.3); /* 130% */
    text-transform: capitalize;
    margin-top: 29px;
}
</style>
