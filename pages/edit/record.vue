<template>
    <Header
        :title="'기록 추가하기'"
        :isBackBtnLeftSide="true"
        :isAddBtnRightSide="true"
        :isSubmit="!!content && !dateErrorMsg.startTime"
        :func="handleSubmit"
    />
    <form class="contents viewport">
        <div class="add_choice-container">
            <div class="add_choice-title">
                어떤 종류의 기록을 입력하실건가요?
            </div>
            <div class="add_choice-box">
                <button
                    type="button"
                    class="add_icon-box"
                    @click="setType(1, 'edit')"
                    :class="{ select: type === 1 }"
                >
                    <v-icon class="ic_moon" />
                    <div>꿈</div>
                </button>
                <button
                    type="button"
                    class="add_icon-box"
                    @click="setType(2, 'edit')"
                    :class="{ select: type === 2 }"
                >
                    <v-icon class="ic_note" />
                    <div>일기</div>
                </button>
                <button
                    type="button"
                    class="add_icon-box"
                    @click="setType(3, 'edit')"
                    :class="{ select: type === 3 }"
                >
                    <v-icon class="ic_pencil" />
                    <div>메모</div>
                </button>
            </div>
        </div>
        <div class="add-date_info-box" v-if="type !== 3">
            <h2>날짜 <span class="point">*</span></h2>
            <div class="date-input-box">
                <input
                    placeholder="YYYY"
                    v-model="startTime.year"
                    @input="validateYear('startTime')"
                    :class="dateErrMsgObj.year && 'error'"
                />
                년
                <input
                    placeholder="MM"
                    v-model="startTime.month"
                    @input="validateMonth('startTime')"
                    :class="dateErrMsgObj.month && 'error'"
                />
                월
                <input
                    placeholder="DD"
                    v-model="startTime.day"
                    @input="validateDay('startTime')"
                    :class="dateErrMsgObj.day && 'error'"
                />
                일
                <div class="week">{{ startTime.week }}요일</div>
            </div>
            <div class="error-msg">
                {{ dateErrorMsg.startTime }}
            </div>
        </div>
        <div class="add_input-box">
            <h2>제목</h2>
            <textarea
                class="textarea-title"
                placeholder="입력하지 않으면 자동으로 제목을 지어드려요!"
                @input="updateInputContents"
                :value="title"
                data-field="title"
            ></textarea>
        </div>
        <div class="add_input-box content">
            <h2>내용 <span class="point">*</span></h2>
            <textarea
                class="textarea-content"
                placeholder="무슨 일이 있었는지, 무슨 생각을 했는지 적어주세요."
                @input="updateInputContents"
                :value="content"
                data-field="content"
            ></textarea>
            <div
                class="character-count"
                :class="{ warn: content.length === limitedContentLength }"
            >
                {{ characterCount }} / {{ limitedContentLength }} 자
            </div>
        </div>
    </form>
<!--    <Toast-->
<!--        v-if="isMakingProcess"-->
<!--        @click="isMakingProcess = false"-->
<!--        text="기록을 토대로 그림을 생성하고 있어요!"-->
<!--        subText="약 15초 정도 기다려주시면 그림과 기록이 저장돼요."-->
<!--        :top="60"-->
<!--        :align="'center'"-->
<!--    />-->
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import { useMypageStore } from "~/store/mypage";
import Header from "~/components/common/Header.vue";
import Toast from "~/components/common/Toast.vue";


export default {
    components: {
        Header,
        Toast,
    },
    data() {
        return {
            dateErrorMsg: { startTime: "" },
            dateErrMsgObj: { startTime: {} },
            limitedContentLength: 1000,
            characterCount: 0,
            isMakingProcess: false,
        };
    },
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    computed: {
        ...mapState(useCalendarStore, ["date", "startTime"]),
        ...mapState(useMypageStore, [
            "type",
            "typeName",
            "typeNameEN",
            "recordRes",
            "resSuccessCount",
            "title",
            "content",
        ]),
    },
    created() {
        this.updateStartTime({
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            week: new Date().getDay(),
        });

        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = this.startTime.week;
        this.startTime.week = days[dayIndex];
    },
    methods: {
        ...mapActions(useCalendarStore, ["updateStartTime"]),
        ...mapActions(useMypageStore, [
            "setType",
            "updateContents",
            "createRecords",
        ]),
        validateYear(placeToCall) {
            const year = parseInt(this[placeToCall].year) || 0;
            this[placeToCall].year = year;

            if (isNaN(year) || year < 1000 || year > 9999) {
                this.dateErrMsgObj[placeToCall].year =
                    "올바른 년도를 입력해주세요.";
            } else {
                this.dateErrMsgObj[placeToCall].year = "";
            }
            this.getDateErrMsg(placeToCall);
            this.updateDayOfWeek(placeToCall);
        },
        validateMonth(placeToCall) {
            const month = parseInt(this[placeToCall].month) || 0;
            this[placeToCall].month = month;

            if (isNaN(month) || month < 1 || month > 12) {
                this.dateErrMsgObj[placeToCall].month =
                    "올바른 월을 입력해주세요.";
            } else {
                this.dateErrMsgObj[placeToCall].month = "";
            }
            this.getDateErrMsg(placeToCall);
            this.updateDayOfWeek(placeToCall);
        },
        validateDay(placeToCall) {
            const day = parseInt(this[placeToCall].day) || 0;
            this[placeToCall].day = day;

            if (isNaN(day) || day < 1 || day > 31) {
                this.dateErrMsgObj[placeToCall].day =
                    "올바른 일을 입력해주세요.";
            } else {
                this.dateErrMsgObj[placeToCall].day = "";
            }
            this.getDateErrMsg(placeToCall);
            this.updateDayOfWeek(placeToCall);
        },
        getDateErrMsg(placeToCall) {
            if (this.dateErrMsgObj[placeToCall].year) {
                this.dateErrorMsg[placeToCall] =
                    this.dateErrMsgObj[placeToCall].year;
            } else if (this.dateErrMsgObj[placeToCall].month) {
                this.dateErrorMsg[placeToCall] =
                    this.dateErrMsgObj[placeToCall].month;
            } else {
                this.dateErrorMsg[placeToCall] =
                    this.dateErrMsgObj[placeToCall].day;
            }
        },
        updateDayOfWeek(placeToCall) {
            const year = parseInt(this[placeToCall].year);
            const month = parseInt(this[placeToCall].month) - 1;
            const day = parseInt(this[placeToCall].day);

            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                const days = ["일", "월", "화", "수", "목", "금", "토"];
                const dayIndex = new Date(year, month, day).getDay();
                this[placeToCall].week = days[dayIndex];
            }
        },
        updateInputContents(event) {
            const field = event.target.dataset.field;
            const value = event.target.value || event.target.innerText; // contenteditable일 경우 값이 다름

            // 만약 엔터 키가 눌렸다면 \n을 추가
            if (event.key === "Enter") {
                value += "\n";
            }
            this.updateContents(field, value, this.updateCharacterCount);
        },
        updateCharacterCount() {
            if (this.content.length > this.limitedContentLength) {
                this.content = this.content.substring(
                    0,
                    this.limitedContentLength,
                ); // 500자로 자르기
            }
            this.characterCount = this.content.length;
        },
        async handleSubmit(event) {
            event.preventDefault;

            const date = `${this.startTime.year}-${this.startTime.month}-${
                this.startTime.day
            } ${
                (this.startTime.isAM ? 0 : +12) +
                (this.startTime.isAM && Number(this.startTime.hours) === 12)
                    ? 0
                    : Number(this.startTime.hours)
            }:${this.startTime.minutes}`;

            const reqBody = {
                date,
                title: this.title,
                content: this.content,
            };
            // console.log(reqBody);
            this.createRecords(this.type, reqBody, this.typeName);
            setTimeout(() => {
                this.$router.push({
                    path: "/mypage",
                    query: {
                        tab: this.typeNameEN,
                    },
                });
            }, 1000);
            if (this.type === 3) return;
            // 꿈, 일기, 메모
            this.isMakingProcess = true;
            // this.$eventBus.$emit("onCustomModal", {
            //     title: `${this.typeName}${
            //         this.type === 1 ? "이" : "가"
            //     } 생성되기까지는 시간이 걸려요. 조금만 기다려주세요!`,
            //     cancel: " ",
            //     confirm: `확인`,
            //     callback: () => {},
            // });
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.contents {
    width: 100%;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    padding-bottom: 3rem;

    @media screen and (max-width: 330px) {
        font-size: 90%;
    }
    .add_choice-container {
        width: 100%;
        padding: 2.4rem 0 4rem 2rem;
        background: get-gradient-bg-light(180);

        .add_choice-title {
            font-family: $font-bold;
        }

        .add_choice-box {
            display: flex;
            margin-top: 0.8rem;

            .add_icon-box {
                display: flex;
                border-radius: $border-radius-default;
                color: $vc-gray-500;
                font-family: $font-medium;
                font-size: 1.4rem;
                padding: 0.8rem;
                margin-right: 1.2rem;
                background: rgba(255, 255, 255, 0.6);

                i {
                    width: 24px;
                    height: 24px;
                    margin-right: 0.8rem;
                }

                &.select {
                    background: $vc-violet-200;
                    color: $vc-violet-500;
                    font-family: $font-semi-bold;
                }
            }
        }
    }

    .add_input-box {
        width: 100%;
        padding: 2rem 2rem 1.5rem 2rem;

        &.content {
            height: 50%;
            margin-bottom: 2rem;
        }

        h2 {
            color: $vc-gray-700;
            font-family: $font-medium;
            margin-bottom: 0.8rem;
        }

        textarea {
            width: 100%;
            height: 90%;
            background: $vc-indigo-50;
            border-radius: $border-radius-default;
            padding: 0.8rem 1.2rem;
            overflow: hidden;

            &::placeholder {
                color: $vc-gray-400;
            }

            @media screen and (max-width: 350px) {
                font-size: 84%;
                padding: 1rem 1.2rem;
            }

            &.error {
                border: 1.5px solid $vc-red-500;
            }
        }

        .textarea-title {
            height: 4rem;
            margin-bottom: 1.2rem;
        }
    }
}

.add-date_info-box {
    width: 100%;
    padding: 2rem 2rem 0rem 2rem;

    h2 {
        font-family: $font-medium;
        margin-bottom: 0.8rem;
    }

    .no-time {
        width: 132px;
        background: $vc-indigo-50;
        border-radius: $border-radius-default;
        padding: 0.8rem 1.2rem;
        font-size: 1.4rem;
        color: $vc-indigo-500;
        margin-bottom: 1.2rem;
        text-align: left;

        &.select {
            background: $vc-indigo-500;
            color: $vc-white;
            font-family: $font-bold;
            display: flex;
            align-items: center;

            &:after {
                content: "\2713";
                display: block;
                color: $vc-white;
                line-height: 22px;
                font-size: 2rem;
                margin-left: 0.8rem;
                font-family: $font-medium;
            }
        }
    }

    .date-input-box {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 1.2rem;

        button {
            background: $vc-indigo-50;
            padding: 0.8rem 1.2rem;
            font-size: 1.4rem;
            color: $vc-gray-400;

            &:first-child {
                border-radius: 8px 0 0 8px;
            }

            &:last-child {
                border-radius: 0 8px 8px 0;
            }

            &.select {
                font-family: $font-bold;
                background: $vc-indigo-500;
                color: $vc-white;
            }
        }

        input {
            flex: 1;
            width: 1rem;
            height: 4.2rem;
            background: $vc-indigo-50;
            border-radius: $border-radius-default;
            margin: 0 0.8rem 0 2rem;
            padding: 0 1.2rem;
            text-align: center;

            &::placeholder {
                color: $vc-gray-400;
            }

            &:first-child {
                margin-left: 0;
                flex-basis: 15%;
            }

            &.error {
                border: 1.5px solid $vc-red-500;
            }

            @media screen and (max-width: 330px) {
                margin: 0 0.5rem 0 1.3rem;
            }
        }

        .week {
            background: $vc-indigo-100;
            color: $vc-indigo-500;
            font-family: $font-bold;
            font-size: 1.4rem;
            border-radius: $border-radius-default;
            margin-left: 1.5rem;
            padding: 0.2rem 0.4rem;
        }
    }
}

.error-msg {
    font-size: 1.4rem;
    color: $vc-red-500;
    margin-bottom: 3.2rem;
}
.point {
    color: $vc-red-500;
}

.character-count {
    width: 100%;
    text-align: right;
    color: $vc-gray-500;
    font-size: 0.8em;

    &.warn {
        color: $vc-red-500;
    }
}
</style>
