<template>
    <div class="viewport" :style="dynamicBackgrond">
        <Button class="btn_x" @click="this.$router.back()" />

        <div class="diary-title-box">
            <div class="diary-date">
                {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
            </div>
            <div class="diary-title">
                {{ diary.diary_name }}
            </div>
        </div>
        <Image
            class="diary-image"
            :url="diary.image_url"
            width="80%"
            @click="open"
        />
        <div class="diary-delete"><Icon class="ic_delete_white" />삭제하기</div>
        <BottomSheet>
            <div class="bottom-diary">
                <div class="bottom-diary-title-box">
                    <div class="diary-date">
                        {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <div class="diary-title">{{ diary.diary_name }}</div>
                </div>

                <div class="bottom-diary-content">
                    <div class="bottom-diary-content-title">
                        <Icon class="ic_x" /> 일기 내용
                    </div>
                    <div class="bottom-diary-content-desc">
                        {{ diary.content }}
                    </div>
                </div>

                <div v-if="type == 1" class="bottom-diary-content">
                    <div class="bottom-diary-content-title">
                        <Icon class="ic_x" />꿈을 통해 본 서준님의 마음
                    </div>

                    <div class="bottom-diary-content-desc">
                        <div class="tag-wrap">
                            <div class="tag accent">높은 목표와 이상</div>
                            <div class="tag accent">높은 목표와 이상</div>
                            <div class="tag accent">높은 목표와 이상</div>
                        </div>
                        {{ diary.content }}
                    </div>
                </div>
            </div>
        </BottomSheet>
    </div>
</template>
<script>
import { useDiaryService } from "../../services/diary";
import { ref } from "vue";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import Image from "~/components/common/Image.vue";
import BottomSheet from "~/components/common/BottomSheet.vue";

export default {
    name: "Diary",
    components: {
        Button,
        Icon,
        Image,
        BottomSheet,
    },
    setup() {
        const myBottomSheet = ref(null);
        return {
            myBottomSheet,
        };
    },
    data() {
        return {
            diary: {},
            type: "1",
        };
    },
    async mounted() {
        const { getMorningdiary, getNightdiary } = useDiaryService();

        const id = this.$route.params.id;
        const type = this.$route.query.type;
        this.type = type;
        console.log("id", id);
        console.log("type", type);
        console.log("type2", this.type);

        // Call API
        const res =
            type === "1" ? await getMorningdiary(id) : await getNightdiary(id);
        console.log(res);
        this.diary = res.data.diary;
    },
    computed: {
        dynamicBackgrond() {
            let background_color = `rgb(0, 0, 0)`;

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);
                console.log(colorList);

                if (colorList.length > 1) {
                    background_color = `linear-gradient(rgb${colorList[0]}, rgb${colorList[1]})`;
                } else {
                    background_color = `rgb${colorList[0]}`;
                }
            }

            console.log(">>> ", background_color);
            return {
                background: background_color,
            };
        },
    },
    methods: {
        open() {
            this.$refs.myBottomSheet.open();
        },
        close() {
            this.$refs.myBottomSheet.close();
        },
    },
};
</script>
<style lang="scss" scoped>
.viewport {
    // "(138, 137, 140)"
    position: relative;
    align-items: center;
    justify-content: center;

    gap: 22px;
    padding-bottom: 50px;
}

.diary-bottom {
    padding-bottom: 20px;
}

.btn_x {
    font-size: 14px;

    margin: 2.5rem;
    position: absolute;
    left: 0;
    top: 0;
}

.diary-image {
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.diary-tags {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    margin: 1.61rem 0 2.97rem 0;

    .tag {
        border-radius: 20px;
        border: 1px solid #000;

        color: #000;
        font-family: Pretendard;
        font-size: 14px;

        line-height: 21px; /* 150% */
        padding: 0.3rem 0.8rem;
        margin-right: 0.5rem;
    }
}

.diary-title-box {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.diary-title {
    width: 100%;
    color: var(--white, #fff);

    /* h1/h1_bold_24 */
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 36px */
}
.diary-date {
    color: var(--white, #fff);

    /* b2/b2_med_14 */
    font-family: "Pretendard Medium";
    font-size: 14px;
    line-height: 160%; /* 22.4px */
}
.diary-tags {
    margin-top: 0.5rem;
    .tag {
        font-size: 14px; // 1.2rem;;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border: none;
    }
}

.diary-delete {
    color: var(--white, #fff);

    /* c1/c1_reg_12 */
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%; /* 19.2px */

    display: flex;
    gap: 4px;
    align-items: center;

    align-self: flex-start;
    margin: 0 10%;
}

.bottom-diary {
    margin-bottom: 60px;
    .bottom-diary-title-box {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .bottom-diary-content {
        margin-top: 36px;

        .bottom-diary-content-title {
            color: var(--white, #fff);

            /* b1/b1_bold_16 */
            font-family: "Pretendard Bold";
            font-size: 16px;
            line-height: 160%; /* 25.6px */

            display: flex;
            gap: 12px;
        }

        .bottom-diary-content-desc {
            color: var(--white, #fff);

            /* b2/b2_reg_14 */
            font-family: "Pretendard";
            font-size: 14px;
            line-height: 160%; /* 22.4px */

            margin-top: 8px;

            .tag-wrap {
                margin: 0 0 12px;
            }
        }
    }
}
</style>
