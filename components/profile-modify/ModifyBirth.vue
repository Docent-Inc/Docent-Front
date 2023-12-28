<template>
    <div class="modify-birth">
        <div class="modify-birth-title-div">
              <span class="modify-birth-title">생년월일 (선택)</span>
        </div>
        <div class="modify-birth-content">
            <MutateCalendar
                :time="currentBirth"
                :dateErrMsgObj="dateErrMsgObj.currentBirth"
                :dateErrorMsg="dateErrorMsg.currentBirth"
                @validateYear="validateYear"
                @validateMonth="validateMonth"
                @validateDay="validateDay"
                :isBirthComponent="true"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import MutateCalendar from "~/components/calendar/mutate/MutateCalendar.vue";

export default {
    name: "ModifyBirth",
    components: {
        MutateCalendar,
    },
    data() {
        return {
            currentBirth: {
                year: null,
                month: null,
                day: null,
            },
            dateErrMsgObj: { currentBirth: {} },
            dateErrorMsg: { currentBirth: "" },
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    created() {
        if (this.user?.birth) {
            const [year, month, day] = this.user.birth.split("-");
            this.currentBirth.year = parseInt(year);
            this.currentBirth.month = parseInt(month);
            this.currentBirth.day = parseInt(day);
        }
    },
    methods: {
        validateYear(placeToCall) {
            const year = parseInt(this[placeToCall].year) || 0;
            this[placeToCall].year = year;

            if (isNaN(year) || year < 1000 || year > 9999) {
                this.dateErrMsgObj[placeToCall].year =
                    "올바른 년도를 입력해주세요.";
                this.emitStopSubmit();
            } else {
                this.dateErrMsgObj[placeToCall].year = "";

                if (this.isEditMode) {
                    this.updateIsRemodified(true);
                }
            }
            this.getDateErrMsg(placeToCall);
        },
        validateMonth(placeToCall) {
            const month = parseInt(this[placeToCall].month) || 0;
            this[placeToCall].month = month;

            if (isNaN(month) || month < 1 || month > 12) {
                this.dateErrMsgObj[placeToCall].month =
                    "올바른 월을 입력해주세요.";
                this.emitStopSubmit();
            } else {
                this.dateErrMsgObj[placeToCall].month = "";

                if (this.isEditMode) {
                    this.updateIsRemodified(true);
                }
            }
            this.getDateErrMsg(placeToCall);
        },
        validateDay(placeToCall) {
            const day = parseInt(this[placeToCall].day) || 0;
            this[placeToCall].day = day;

            if (isNaN(day) || day < 1 || day > 31) {
                this.dateErrMsgObj[placeToCall].day =
                    "올바른 일을 입력해주세요.";
                this.emitStopSubmit();
            } else {
                this.dateErrMsgObj[placeToCall].day = "";

                if (this.isEditMode) {
                    this.updateIsRemodified(true);
                }
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

            if (!this.dateErrorMsg[placeToCall]) {
                this.emitBirthChange(placeToCall);
            }
        },
        emitBirthChange() {
            if (
                this.currentBirth.year &&
                this.currentBirth.month &&
                this.currentBirth.day
            ) {
                this.$emit("onStopSubmit", true);
            }
            const birth = `${this.currentBirth.year}-${String(
                this.currentBirth.month,
            ).padStart(2, "0")}-${String(this.currentBirth.day).padStart(
                2,
                "0",
            )}`;
            this.$emit("birthSelected", birth);
        },
        emitStopSubmit() {
            this.$emit("onStopSubmit", false);
        },
    },
};
</script>

<style lang="scss" scoped>
.modify-birth {
    margin-top: 64px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.modify-birth-title-div {
    display: flex;
    margin-bottom: 16px;
}
.modify-birth-title {
    color: var(--gray-700, #374151);
    font-family: "Pretendard Medium";
    font-size: 16px;
    /* line-height: 160%; */
}
.modify-birth-content {
    width: 100%;
    // height: 144px;
    display: flex;
    justify-content: space-around;
}
</style>
