<template>
    <div class="viewport">
        <v-icon class="ic_close" @click="close" />

        <img class="image" :src="diary.image_url" @click="open" />

        <div class="diary-title-box">
            <div class="diary-title">{{ diary.diary_name }}</div>
            <div class="diary-date">
                {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
            </div>
            <div class="diary-tags">
                <div class="tag">tags</div>
                <div class="tag">tags</div>
                <div class="tag">tags</div>
                <div class="tag">tags</div>
            </div>
        </div>

        <bottom-sheet ref="myBottomSheet" :overlay="false">
            <div>
                <div class="diary-title">{{ diary.diary_name }}</div>
                <div class="diary-date">
                    {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                </div>

                <div class="diary-tags">
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                </div>

                <div class="diary-subtitle">Artist Note</div>
                <div class="diary-content">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tellus eu
                    at praesent risus velit lectus ut risus. Eget cras dui proin
                    fames at amet. Viverra sed etiam donec at nibh amet vel
                    morbi iaculis. Convallis mauris integer proin eget pretium
                    at. Sit venenatis risus lorem sit non. Aliquam semper ut eu
                    amet amet eget phasellus fringilla quisque. Bibendum
                    molestie dui ac lacus massa. Commodo blandit nam praesent
                    vitae ut aenean magna justo nibh. Consectetur nisl lacus sed
                    rhoncus nunc.
                </div>

                <hr />
                <div class="diary-subtitle">Detail</div>
                <div class="diary-content">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tellus eu
                    at praesent risus velit lectus ut risus. Eget cras dui proin
                    fames at amet. Viverra sed etiam donec at nibh amet vel
                    morbi iaculis. Convallis mauris integer proin eget pretium
                    at. Sit venenatis risus lorem sit non. Aliquam semper ut eu
                    amet amet eget phasellus fringilla quisque. Bibendum
                    molestie dui ac lacus massa. Commodo blandit nam praesent
                    vitae ut aenean magna justo nibh. Consectetur nisl lacus sed
                    rhoncus nunc.
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
        };
    },
    async mounted() {
        const { getMorningdiary, getNightdiary } = useDiaryService();
        const route = useRoute();
        console.log("id", route.params.id);
        console.log("type", route.query.type);

        const id = route.params.id;
        const type = route.query.type;

        // Call API
        const res =
            type === 1 ? await getMorningdiary(id) : await getNightdiary(id);
        console.log(res);
        this.diary = res.data.diary;
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
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;
    align-items: center;
    justify-content: center;
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
    margin-bottom: 5rem;
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
    width: 100%;
    margin-left: 20%;

    .diary-title {
        font-size: 2rem;
        color: #fff;
    }
    .diary-date {
        font-size: 1rem;
        color: #fff;
    }
    .diary-tags {
        margin-top: 0.5rem;
        .tag {
            font-size: 1.2rem;
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
