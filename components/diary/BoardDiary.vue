<template>
    <div class="item-board-diary" @click="showDetail">
        <SkeletonImage v-if="diary.image_url !== ''" :url="diary.image_url" />
        <div v-else class="diary-contents">
            <div v-if="diary.diary_name === ''">
                <div class="diary-text-only">
                    {{ diary.content }}
                </div>
            </div>
            <div v-else>
                <div class="diary-title">
                    {{ diary.diary_name }}
                </div>
                <div class="diary-text">
                    {{ diary.content === "" ? "" : diary.content }}
                </div>
            </div>
        </div>
        <div class="diary-date">
            {{ this.$dayjs(this.diary.create_date).format("YYYY.MM.DD") }}
        </div>
    </div>
</template>
<script>
import SkeletonImage from "~/components/common/SkeletonImage.vue";
export default {
    name: "BoardDiary",
    components: { SkeletonImage },
    props: {
        diary: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        iconClass() {
            switch (this.diary.diary_type) {
                case 1:
                    return "ic_tag2_dream";
                case 2:
                    return "ic_tag2_diary";
                case 3:
                    return "ic_tag2_memo";
            }
        },
    },
    methods: {
        showDetail() {
            this.$router.push(
                `/diary/${this.diary.id}?type=${this.diary.diary_type}`,
            );
        },
    },
};
</script>
<style lang="scss" scoped>
.item-board-diary {
    width: 100%;
    height: 100%;
    position: relative;

    .diary-date {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: 12px;
        margin-bottom: 12px;
        display: flex;
        height: 32px;
        padding: 7px 11px;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        color: var(--gray-50, #f9fafb);
        text-align: center;
        font-family: "Pretendard Medium";
        font-size: 12px;
        line-height: 160%;
    }
    .diary-contents {
        height: 100%;
        width: 100%;
        padding-top: 100%;
        position: relative;
        background: var(--white, #fff);
        overflow: hidden;

        .diary-title {
            position: absolute;
            top: 12px;
            left: 20px;
            right: 20px;
            color: var(--gray-700, #374151);
            font-family: "Pretendard Bold";
            font-size: 20px;
            white-space: nowrap;
            overflow: hidden;
            max-height: 30px;
            text-overflow: ellipsis;
        }
        .diary-text {
            position: absolute;
            max-height: 76px;
            top: 54px;
            left: 20px;
            right: 20px;
            color: var(--gray-400, #9ca3af);
            font-family: "Pretendard";
            font-size: 12px;
            overflow: hidden;
            line-height: 160%;
            text-overflow: ellipsis;
        }
        .diary-text-only {
            position: absolute;
            max-height: 110px;
            top: 12px;
            left: 20px;
            right: 20px;
            color: var(--gray-400, #9ca3af);
            font-family: "Pretendard";
            line-height: 160%;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .diary_icon {
        position: absolute;
        right: 0;
        bottom: 0;
        margin-right: 12px;
        margin-bottom: 12px;
    }
    .ic_tag2_diary {
        width: 45px;
        height: 32px;
    }
    .ic_tag2_dream {
        width: 35px;
        height: 32px;
    }
}
</style>
