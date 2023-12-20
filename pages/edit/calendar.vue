<template>
    <Header
        :title="'일정 추가하기'"
        :isBackBtnLeftSide="true"
        :isAddBtnRightSide="true"
        :isSubmit="
            !!content &&
            !dateErrorMsg.startTime &&
            !dateErrorMsg.endTime &&
            !timeErrorMsg.startTime &&
            !timeErrorMsg.endTime
        "
        :func="handleSubmit"
        :isEditMode="isEditMode"
    />
    <form class="contents viewport">
        <div class="add_input-box">
            <h2>일정 제목</h2>
            <textarea
                class="textarea-title"
                placeholder="입력하지 않으면 자동으로 제목을 지어드려요!"
                @input="updateInputContents"
                :value="title"
                data-field="title"
            ></textarea>
        </div>
        <div class="add_input-box">
            <h2>일정 내용 <span class="point">*</span></h2>
            <textarea
                class="textarea-content"
                placeholder="일정에 대한 내용을 입력해주세요"
                @input="updateInputContents"
                :value="content"
                data-field="content"
            ></textarea>
        </div>
        <section class="add_date_input-box">
            <div class="add-date_header">
                <div
                    class="start-date-box"
                    :class="isStartTimeSection && 'select'"
                    @click="() => (isStartTimeSection = true)"
                >
                    <MutateDateHeader
                        :isStartTimeSection="isStartTimeSection"
                        :time="startTime"
                        :header="'from'"
                    />
                </div>
                <div
                    class="end-date-box"
                    :class="!isStartTimeSection && 'select'"
                    @click="() => (isStartTimeSection = false)"
                >
                    <MutateDateHeader
                        :isStartTimeSection="isStartTimeSection"
                        :time="endTime"
                        :header="'to'"
                    />
                </div>
            </div>
            <!--시작하는 날짜-->
            <article v-if="isStartTimeSection">
                <MutateCalendar
                    :isStartTimeSection="true"
                    :time="startTime"
                    :dateErrMsgObj="dateErrMsgObj.startTime"
                    :timeErrMsgObj="timeErrMsgObj.startTime"
                    :dateErrorMsg="dateErrorMsg.startTime"
                    :timeErrorMsg="timeErrorMsg.startTime"
                    @validateYear="validateYear"
                    @validateMonth="validateMonth"
                    @validateDay="validateDay"
                    @validateHours="validateHours"
                    @validateMinutes="validateMinutes"
                    @toggleMeridiem="toggleMeridiem"
                />
            </article>
            <!--끝나는 날짜-->
            <article v-else>
                <MutateCalendar
                    :isStartTimeSection="false"
                    :time="endTime"
                    :dateErrMsgObj="dateErrMsgObj.endTime"
                    :timeErrMsgObj="timeErrMsgObj.endTime"
                    :dateErrorMsg="dateErrorMsg.endTime"
                    :timeErrorMsg="timeErrorMsg.endTime"
                    @validateYear="validateYear"
                    @validateMonth="validateMonth"
                    @validateDay="validateDay"
                    @validateHours="validateHours"
                    @validateMinutes="validateMinutes"
                    @toggleMeridiem="toggleMeridiem"
                />
            </article>
        </section>
    </form>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import { useMypageStore } from "~/store/mypage";

import Header from "~/components/common/Header.vue";
import MutateDateHeader from "~/components/calendar/mutate/MutateDateHeader.vue";
import MutateCalendar from "~/components/calendar/mutate/MutateCalendar.vue";

export default {
    components: {
        Header,
        MutateDateHeader,
        MutateCalendar,
    },
    data() {
        return {
            dateErrorMsg: { startTime: "", endTime: "" },
            timeErrorMsg: { startTime: "", endTime: "" },
            dateErrMsgObj: { startTime: {}, endTime: {} },
            timeErrMsgObj: { startTime: {}, endTime: {} },
            isStartTimeSection: true,
        };
    },
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    computed: {
        ...mapState(useCalendarStore, [
            "todos",
            "date",
            "startTime",
            "endTime",
            "calendarId",
            "isEditMode",
        ]),
        ...mapState(useMypageStore, ["title", "content"]),
    },
    created() {
        if (!this.isEditMode) {
            this.updateStartTime({
                year: this.date.date.getFullYear(),
                month: this.date.date.getMonth() + 1,
                day: this.date.date.getDate(),
            });
            this.updateEndTime({
                year: this.date.date.getFullYear(),
                month: this.date.date.getMonth() + 1,
                day: this.date.date.getDate(),
            });
        }
    },
    methods: {
        ...mapActions(useCalendarStore, [
            "createCalendarItem",
            "updateCalendarItem",
            "updateStartTime",
            "updateEndTime",
        ]),
        ...mapActions(useMypageStore, ["updateContents"]),
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
        validateHours(placeToCall) {
            const hours = parseInt(this[placeToCall].hours) || 0;
            this[placeToCall].hours = hours;

            if (isNaN(hours) || hours < 0 || hours > 12) {
                this.timeErrMsgObj[placeToCall].hours =
                    "올바른 시간(시)을 입력해주세요.";
            } else {
                this.timeErrMsgObj[placeToCall].hours = "";
            }
            this.getTimeErrMsg(placeToCall);
        },
        validateMinutes(placeToCall) {
            const minutes = parseInt(this[placeToCall].minutes) || 0;
            this[placeToCall].minutes = minutes;

            if (isNaN(minutes) || minutes < 0 || minutes > 59) {
                this.timeErrMsgObj[placeToCall].minutes =
                    "올바른 시간(분)을 입력해주세요.";
            } else {
                this.timeErrMsgObj[placeToCall].minutes = "";
            }
            this.getTimeErrMsg(placeToCall);
        },
        getTimeErrMsg(placeToCall) {
            if (this.timeErrMsgObj[placeToCall].hours) {
                this.timeErrorMsg[placeToCall] =
                    this.timeErrMsgObj[placeToCall].hours;
            } else {
                this.timeErrorMsg[placeToCall] =
                    this.timeErrMsgObj[placeToCall].minutes;
            }
        },
        toggleMeridiem(placeToCall, isAM) {
            if (placeToCall === "startTime") this.startTime.isAM = isAM;
            else this.endTime.isAM = isAM;
        },
        updateInputContents(event) {
            const field = event.target.dataset.field;
            const value = event.target.value || event.target.innerText; // contenteditable일 경우 값이 다름

            // 만약 엔터 키가 눌렸다면 \n을 추가
            if (event.key === "Enter") {
                value += "\n";
            }
            this.updateContents(field, value, null);
        },
        async handleSubmit() {
            const start_time = `${this.startTime.year}-${
                this.startTime.month
            }-${this.startTime.day} ${
                (this.startTime.isAM ? 0 : +12) +
                (this.startTime.isAM && Number(this.startTime.hours) === 12)
                    ? "00"
                    : Number(this.startTime.hours)
            }:${this.startTime.minutes}`;

            const end_time = `${this.endTime.year}-${this.endTime.month}-${
                this.endTime.day
            } ${
                (this.endTime.isAM ? 0 : +12) +
                (this.endTime.isAM && Number(this.endTime.hours) === 12
                    ? 0
                    : Number(this.endTime.hours))
            }:${this.endTime.minutes}`;

            const reqBody = {
                start_time,
                end_time,
                title: this.title,
                content: this.content,
            };

            let res;
            if (this.isEditMode) {
                res = await this.updateCalendarItem(
                    this.date.date,
                    this.calendarId,
                    reqBody,
                );
            } else {
                res = await this.createCalendarItem(this.date.date, reqBody);
            }
            const currentDate = `${this.startTime.year}-${this.startTime.month}-${this.startTime.day}`;

            if (res.success) {
                this.$router.push({
                    path: "/mypage",
                    query: {
                        tab: "calendar",
                        date: currentDate,
                    },
                });
            } else {
                this.$eventBus.$emit("onCustomModal", {
                    title: "오류가 발생했어요!",
                    desc: res.message,
                    cancel: " ",
                    confirm: "확인",
                });
            }
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

    @media screen and (max-width: 330px) {
        font-size: 90%;
    }

    .add_input-box {
        width: 100%;
        padding: 0 2rem;

        h2 {
            color: $vc-gray-700;
            font-family: $font-medium;
            margin-bottom: 0.8rem;
        }

        textarea {
            width: 100%;
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

.add_date_input-box {
    .add-date_header {
        margin: 2.8rem 0 4rem 0;
        width: 100vw;
        max-width: 500px;
        display: flex;

        .start-date-box,
        .end-date-box {
            width: 100%;
            height: 100%;
            height: 82px;

            background: $vc-indigo-50;
            padding: 1.4rem 2rem;
            font-size: 1.8rem;
            font-family: $font-bold;
            color: $vc-gray-400;

            display: flex;
            flex-direction: column;
            justify-content: center;

            &.select {
                background: $vc-indigo-500;
                color: $vc-white;
            }

            @media screen and (max-width: 390px) {
                font-size: 98%;
            }
            @media screen and (max-width: 360px) {
                height: 60px;
                font-size: 85%;
                margin: 0 -0.5rem;
            }
        }
        .start-date-box {
            position: relative;
            flex-basis: 110%;

            &.select {
                &:after {
                    border-color: $vc-indigo-50 transparent $vc-indigo-50
                        $vc-indigo-500 !important;
                }
            }
            &:after {
                content: "";
                position: absolute;
                width: 0px;
                height: 100%;
                top: 0;
                right: 0;
                border-style: solid;
                border-width: 40px 0 40px 23px;
                border-color: $vc-indigo-500 transparent $vc-indigo-500
                    $vc-indigo-50;
                transform: rotate(0deg);

                @media screen and (max-width: 360px) {
                    border-width: 30px 0 30px 20px;
                }
            }
        }
        .end-date-box {
        }
    }
}
.point {
    color: $vc-red-500;
}
</style>
