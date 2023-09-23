<template>
    <div class="header">
        <v-icon class="ic_back" />
    </div>
    <div class="contents">
        <div class="memo-title">오늘의 영단어</div>
        <div class="memo-date">2023.08.20</div>
        <div class="memo-contents">
            1. Refrain from <br />
            2. Speculative <br />
            3. Initiative <br />
            4. Delegation <br />
            5. Desert <br />
            6. Flair <br />
            7. Competent <br />
            8. Invest <br />
            9.Ration <br />
            <br />
            능히 할 수 있다! 아자!
        </div>
    </div>
</template>
<script>
export default {
    name: "Memo",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            diary: {},
            type: "1",
        };
    },
    async mounted() {},
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

    padding: 2rem;

    border: 1px solid red;
}

.memo-title {
    color: #000;
    font-family: "Pretendard Bold";
    // font-size: 2rem;
    font-size: 30px;
    line-height: 1.3125rem; /* 70% */
}

.memo-date {
    color: #5c5c5c;
    font-family: Pretendard;
    // font-size: 0.75rem;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.3125rem; /* 175% */
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
