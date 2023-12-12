<template>
    <div class="add-date_info-box">
        <h2>
            {{ isStartTimeSection ? "시작하는 날짜 " : "끝나는 날짜 "
            }}<span class="point">*</span>
        </h2>
        <div class="date-input-box">
            <input
                placeholder="YYYY"
                v-model="time.year"
                @input="validateYear"
                :class="dateErrMsgObj.year && 'error'"
            />
            년
            <input
                placeholder="MM"
                v-model="time.month"
                @input="validateMonth"
                :class="dateErrMsgObj.month && 'error'"
            />
            월
            <input
                placeholder="DD"
                v-model="time.day"
                @input="validateDay"
                :class="dateErrMsgObj.day && 'error'"
            />
            일
        </div>
        <div class="error-msg">
            {{ dateErrorMsg }}
        </div>
    </div>
    <div class="add-date_time-box">
        <h2>{{ isStartTimeSection ? "시작하는 시간 " : "끝나는 시간 " }}</h2>
        <button
            type="button"
            class="no-time"
            :class="!hasTimeData && 'select'"
            @click="toggleTime"
        >
            시간 입력 안 함
        </button>
        <div class="date-input-box" v-if="hasTimeData">
            <div>
                <button
                    type="button"
                    :class="time.isAM && 'select'"
                    @click="
                        toggleMeridiem(
                            isStartTimeSection ? 'startTime' : 'endTime',
                            true,
                        )
                    "
                >
                    오전
                </button>
                <button
                    type="button"
                    :class="!time.isAM && 'select'"
                    @click="
                        toggleMeridiem(
                            isStartTimeSection ? 'startTime' : 'endTime',
                            false,
                        )
                    "
                >
                    오후
                </button>
            </div>
            <input
                placeholder="HH"
                v-model="time.hours"
                @input="validateHours"
                :class="timeErrMsgObj.hours && 'error'"
            />
            시
            <input
                placeholder="MM"
                v-model="time.minutes"
                @input="validateMinutes"
                :class="timeErrMsgObj.minutes && 'error'"
            />
            분
        </div>
        <div class="error-msg" v-if="hasTimeData">
            {{ timeErrorMsg }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        time: Object,
        dateErrMsgObj: Object,
        timeErrMsgObj: Object,
        dateErrorMsg: String,
        timeErrorMsg: String,
        isStartTimeSection: Boolean,
    },
    emits: [
        "validateYear",
        "validateMonth",
        "validateDay",
        "validateHours",
        "validateMinutes",
        "toggleMeridiem",
    ],
    data() {
        return {
            hasTimeData: false,
        };
    },
    methods: {
        emitValidationEvent(fieldName) {
            this.$emit(
                `validate${fieldName}`,
                this.isStartTimeSection ? "startTime" : "endTime",
            );
        },
        validateYear() {
            this.emitValidationEvent("Year");
        },
        validateMonth() {
            this.emitValidationEvent("Month");
        },
        validateDay() {
            this.emitValidationEvent("Day");
        },
        validateHours() {
            this.emitValidationEvent("Hours");
        },
        validateMinutes() {
            this.emitValidationEvent("Minutes");
        },
        toggleTime() {
            this.hasTimeData = !this.hasTimeData;
        },
        toggleMeridiem(fieldName, isAM) {
            this.$emit(`toggleMeridiem`, fieldName, isAM);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.add-date_info-box,
.add-date_time-box {
    padding: 0 2rem;

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
</style>
