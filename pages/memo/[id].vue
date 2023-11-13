<template>
    <div class="viewport">
        <div class="header">
            <Icon class="ic_back" @click="this.$router.back()" />
            <span class="memo">메모</span>
        </div>
        <div class="contents">
            <div class="memo-contents memo-contents-1">
                <div class="memo-date-n-button">
                    <div class="memo-date__skeleton" v-if="isLoading"></div>
                    <div class="memo-date" v-else>
                        {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <!-- <div class="memo-delete">
                        <Icon class="ic_delete" />삭제하기
                    </div> -->
                </div>

                <div class="memo-title__skeleton" v-if="isLoading"></div>
                <div class="memo-title" v-else>
                    {{ memo.title === "" ? "(제목 없음)" : memo.title }}
                </div>
            </div>
            <div class="memo-contents memo-contents-2">
                <div class="tag-wrap">
                    <div class="tag primary" v-for="keyword in memo.keyword">
                        {{ keyword }}
                    </div>
                </div>
                <div class="memo-content">
                    {{ memo.content }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";
import { useDiaryService } from "~/services/diary";

export default {
    name: "Memo",
    data() {
        return {
            memo: {},
            isLoading: true,
        };
    },
    async mounted() {
        const memo_id = this.$route.params.id;
        const { getMemo } = useDiaryService();
        const res = await getMemo(memo_id);
        this.memo = res.data.memo;
        this.memo.keyword = JSON.parse(this.memo.tags);
        this.isLoading = false;
    },
    computed: {},
    methods: {},
    components: { Icon },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
}

.memo {
    color: var(--gray-800, #1f2937);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%; /* 24px */
    margin-left: 10px;
}

.memo-contents {
    padding: 20px;
}
.memo-contents-1 {
    width: 100%;
    background: linear-gradient(
        27deg,
        #ded2ff -75.98%,
        #d2daff -58.29%,
        #dee4ff -27.42%,
        #fff 114.43%
    );

    .memo-date-n-button {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .memo-date {
            color: var(--gray-500, #6b7280);

            /* b2/b2_med_14 */
            font-family: "Pretendard Medium";
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 160%; /* 22.4px */

            &__skeleton {
                @include skeleton;
                width: 20%;
                height: calc(14px * 1.6);
            }
        }

        .memo-delete {
            color: var(--gray-400, #9ca3af);

            /* c1/c1_reg_12 */
            font-family: "Pretendard";
            font-size: 12px;
            line-height: 160%; /* 19.2px */

            display: flex;
            gap: 4px;
            align-items: center;
        }
    }

    .memo-title {
        color: var(--gray-700, #374151);

        /* h1/h1_bold_24 */
        font-family: "Pretendard Bold";
        font-size: 24px;
        line-height: 150%; /* 36px */

        margin-bottom: 30px;

        &__skeleton {
            @include skeleton;
            width: 80%;
            height: calc(24px * 1.5);
            margin: 5px 0 30px;
        }
    }
}

.memo-contents-2 {
    .tag-wrap {
        margin: 0 0 20px;
    }

    .memo-content {
        color: var(--gray-500, #6b7280);

        /* b1/b1_reg_16 */
        font-family: "Pretendard";
        font-size: 16px;
        line-height: 160%; /* 25.6px */
        text-transform: capitalize;
    }
}
</style>
