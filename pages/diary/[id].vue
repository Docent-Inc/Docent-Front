<template>
    <div class="viewport" :style="dynamicBackgrond">
        <v-icon class="ic_close" @click="this.$router.back()" />

        <img class="image" :src="diary.image_url" @click="open" />

        <div class="diary-title-box">
            <div class="diary-title">
                {{ diary.diary_name }}
            </div>
            <div class="diary-date">
                {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
            </div>
            <!-- <div class="diary-tags">
                <div class="tag">tags</div>
                <div class="tag">tags</div>
                <div class="tag">tags</div>
                <div class="tag">tags</div>
            </div> -->
        </div>

        <bottom-sheet ref="myBottomSheet" :overlay="true">
            <div class="diary-bottom">
                <div class="diary-title">{{ diary.diary_name }}</div>
                <div class="diary-date">
                    {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                </div>

                <div class="diary-tags">
                    <!-- <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div> -->
                </div>

                <div class="diary-subtitle">Artist Note</div>
                <div class="diary-content">
                    {{ diary.content }}
                </div>

                <div v-if="type === '1'">
                    <hr />
                    <div class="diary-subtitle">Detail</div>
                    <div class="diary-content">
                        {{ diary.resolution }}
                    </div>
                </div>
            </div>
        </bottom-sheet>
    </div>
</template>
<script>
import { useDiaryService } from "../../services/diary";
import BottomSheet from "../../components/BottonSheet.vue";
import { ref } from "vue";

export default {
    name: "Diary",
    components: {
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
}

.diary-bottom {
    padding-bottom: 20px;
}
.ic_close {
    font-size: 14px;

    margin: 2.5rem;
    position: absolute;
    left: 0;
    top: 0;
}

.image {
    width: 80%;
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 2rem;
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

    .diary-title {
        width: 100%;
        font-size: 16px; // 2rem
        color: #fff;
    }
    .diary-date {
        font-size: 12px; // 1rem;
        color: #fff;
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
}

hr {
    width: 100%;
    height: 1px;
    background: #757575;
    margin: 2rem 0;
}
</style>
