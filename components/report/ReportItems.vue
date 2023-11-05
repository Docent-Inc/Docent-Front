<template>
    <div class="report-items">
        <div class="report-empty" v-if="itemList.length < 1">
            <Icon class="ic_pencil" />
            <div>
                한 주 돌아보기는 이곳에 <br />
                차곡차곡 보관될거에요
            </div>
        </div>
        <div class="report-item-list" v-else>
            <div class="report-item" v-for="item in itemList">
                <img />
                <div class="report-item-content">
                    <div>
                        <div class="report-item-title">세번째 돌아보기</div>
                        <div class="report-item-date">
                            2023년 10월 2일 ~ 2023년 10월 8일
                        </div>
                    </div>
                    <div class="tag-wrap row">
                        <div class="tag primary">스타트업</div>
                        <div class="tag primary">스트레스 관리</div>
                    </div>
                </div>
                <span class="report-dot"></span>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Statistics",
    components: { Icon },
    props: {
        itemList: {
            type: Array,
            required: true,
            default: [],
        },
    },
    data() {
        return {};
    },
    computed: {},
};
</script>
<style lang="scss" scoped>
.report-items {
    margin: 20px 0;
}

.report-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26px;

    border-radius: 8px;
    background: #272234;

    padding: 36px 0 26px;

    .ic_pencil {
        width: 44px;
        height: 44px;
    }

    div {
        color: var(--gray-400, #9ca3af);
        text-align: center;

        /* b2/b2_reg_14 */
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 22.4px */
    }
}

.report-item-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.report-item {
    position: relative;
    display: flex;
    border-radius: 8px;
    background: #231a3d;
    min-height: 128px;

    img {
        min-width: 128px;
        min-height: 128px;

        border-radius: 8px 0px 0px 8px;
        background: #9ca3af;
    }

    .report-item-content {
        width: calc(100% - 128px);
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 0px 8px 8px 0px;
        padding: 12px;
        box-sizing: borderox;

        .report-item-title {
            color: var(--white, #fff);

            /* b2/b2_bold_14 */
            font-family: "Pretendard Bold";
            font-size: 14px;
            line-height: 160%; /* 22.4px */
        }
        .report-item-date {
            color: var(--CTA_accent, #9398ff);

            /* c1/c1_reg_12 */
            font-family: "Pretendard";
            font-size: 12px;
            line-height: 160%; /* 19.2px */
        }

        .report-tags {
            display: flex;
            gap: 10px;

            .report-tag {
                border-radius: 12px;
                background: rgba(167, 139, 250, 0.2);
                color: var(--violet-400, #a78bfa);
                font-family: "Pretendard Bold";
                font-size: 12px;
                line-height: 160%; /* 19.2px */

                padding: 6px 11px;
            }
        }
    }
}

.report-dot {
    width: 8px;
    height: 8px;
    background: var(--red-400, #f87171);
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
}
</style>
