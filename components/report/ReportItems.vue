<template>
    <div class="report-items">
        <div class="report-empty" v-if="reports.length < 1">
            <Icon class="ic_pencil" />
            <div>
                한 주 돌아보기는 이곳에 <br />
                차곡차곡 보관될 거예요
            </div>
        </div>
        <div class="report-item-list" v-else>
            <div
                class="report-item"
                v-for="report in reports"
                @click="goReportDetail(report.id)"
            >
                <img :src="report.image_url" />
                <div class="report-item-content">
                    <div>
                        <div class="report-item-title">
                            {{ report.title }}
                        </div>
                        <div class="report-item-date">
                            {{ report.create_date }}
                        </div>
                    </div>
                    <div class="tag-wrap row report-tags">
                        <div
                            class="tag primary"
                            v-for="tag in report.main_keyword"
                        >
                            {{ tag }}
                        </div>
                    </div>
                </div>
                <span class="red-dot" v-if="!report.is_read"></span>
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
        reports: {
            type: Array,
            required: true,
            default: [],
        },
    },
    methods: {
        goReportDetail(id) {
            this.$router.push(`/report/${id}`);
        },
    },
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
        width: 128px;
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
            width: 100%;
            overflow-y: scroll;
            flex-wrap: nowrap;
        }
    }
}
</style>
