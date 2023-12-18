<template>
    <!-- <section class="landing" :class="dynamicBackground"> -->
    <section class="landing">
        <div class="landing__weather">
            <div class="date-box">
                <div class="date">
                    {{ $dayjs().format("YYYY.MM.DD") }}
                </div>
                <div class="date-icon" v-if="!isLocationDenied">
                    <!-- <div v-if="!weather.icon" class="skeleton" /> -->
                    <img
                        v-if="
                            weather.icon && !(weather.icon === 'not supported')
                        "
                        :src="`/weathers/ic_${weather.icon}.svg`"
                        :alt="weather.icon"
                    />
                </div>
            </div>
            <div class="degree-box" v-if="!isLocationDenied">
                <!-- <div v-if="!weather.tmx" class="skeleton" /> -->
                <div
                    class="degree-wrapper"
                    v-if="weather.tmx && !(weather.icon === 'not supported')"
                >
                    <div>
                        <span>최고기온</span>
                        <span class="degree"
                            >{{ parseInt(parseFloat(weather.tmx)) }}°C</span
                        >
                    </div>
                    <div>
                        <span>최저기온</span>
                        <span class="degree minimum"
                            >{{ parseInt(parseFloat(weather.tmn)) }}°C</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <!-- 231216 - v2 홈 디자인 변경으로 미사용 START -->
        <!-- <div class="landing__greeting">
            <div class="greeting">
                <h1>{{ greetingPrefix }} {{ user?.nickname }}님,</h1>
                <h2>{{ dynamicMessage }}</h2>
            </div>
            <div v-if="!luck" class="skeleton fortune" />
            <div v-else class="fortune-box" @click="openModal">
                <div
                    class="red-dot"
                    :class="{
                        checked: isCheckedToday || optimisticIsCheckedToday,
                    }"
                />
                <div class="ic_fortune-box" @click="openModal">
                    <v-icon class="ic_fortune" />
                </div>
            </div>
        </div> -->
        <!-- 231216 - v2 홈 디자인 변경으로 미사용 END -->
    </section>
</template>

<script>
import { getHourType } from "@/utils/utils";

export default {
    name: "Greeting",
    props: {
        user: Object,
        luck: String,
        isCheckedToday: Boolean,
        optimisticIsCheckedToday: Boolean,
        weather: Object,
    },
    data() {
        return {
            isLocationDenied: false,
        };
    },
    //// 231216 - v2 홈 디자인 변경으로 미사용 START
    // computed: {
    // luckData() {
    //     if (this.luck) {
    //         const parts = this.luck.split(".");
    //         const keyword = parts[0].split('"')[1];
    //         const [, ...rest] = parts;
    //         const description = rest.join(". ");
    //         return {
    //             keyword,
    //             description,
    //         };
    //     }
    //     return {
    //         keyword: "",
    //         description: "",
    //     };
    // },
    // timeType() {
    //     return getHourType(new Date().getHours());
    // },
    // greetingPrefix() {
    //     switch (this.timeType) {
    //         case 1:
    //             return "좋은 아침!";
    //         case 4:
    //             return "고생했어요";
    //         default:
    //             return "안녕하세요";
    //     }
    // },
    // dynamicMessage() {
    //     switch (this.timeType) {
    //         case 1:
    //             return "오늘의 생각을 말해보세요!";
    //         case 4:
    //             return "오늘 하루는 어땠어요?";
    //         default:
    //             return "새로운 일정과 메모가 있나요?";
    //     }
    // },
    // dynamicBackground() {
    //     switch (this.timeType) {
    //         case 1:
    //             return "daytime";
    //         case 4:
    //             return "night";
    //         default:
    //             return "dawn";
    //     }
    // },
    // },
    // methods: {
    //     openModal() {
    //         // this.isModalOpen = true;
    //         this.$emit("open");
    //     },
    // },
    //// 231216 - v2 홈 디자인 변경으로 미사용 END

    mounted() {
        const isPermissionDenied = localStorage.getItem(
            "locationPermissionDenied",
        );
        this.isLocationDenied = !!isPermissionDenied;
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.landing {
    padding: 2rem;
    width: 100%;
    margin-top: 0;
    color: $vc-gray-500;

    // background: $gradient_dawn_dusk;
    // @media screen and (max-width: 360px) {
    //     // padding-bottom: 2.5rem;
    // }

    &.dawn {
        background: $gradient_dawn_dusk;
    }

    &.daytime {
        background: $gradient_day;
    }

    &.night {
        background: $gradient_night;
    }

    &__weather {
        display: flex;
        justify-content: space-between;
        height: 20px;

        // @media screen and (max-width: 340px) {
        //     margin-bottom: 2rem;
        // }
    }

    &__greeting {
        // color: $vc-white;
        margin: 2.3rem 0 2rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 3.6rem;
        font-size: 2.4rem;
        font-family: $font-bold;

        @media screen and (max-width: 380px) {
            font-size: 120%;
        }
        @media screen and (max-width: 340px) {
            font-size: 110%;
        }
    }
}

.date-box {
    // color: $vc-gray-100;
    font-size: var(--vc-text-base);
    display: flex;
    align-items: center;

    @media screen and (max-width: 340px) {
        margin-bottom: 0.5rem;
    }

    .date {
        margin-right: 1.5rem;
        @media screen and (max-width: 380px) {
            font-size: 90%;
        }
    }

    .date-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.degree-box {
    // color: $vc-gray-100;
    font-size: var(--vc-text-xs);
    font-weight: 400;
    display: flex;
    justify-content: right;
    align-items: center;
    /* width: 200px; */

    @media screen and (max-width: 340px) {
        width: 100px;
    }

    .degree-wrapper {
        width: 100%;
        display: flex;
        justify-content: right;

        @media screen and (max-width: 340px) {
            flex-direction: column;
            align-items: flex-end;
            width: 100px;
        }
    }

    .degree {
        margin: 0 0.75rem 0 0.25rem;
        font-family: $font-bold;

        &.minimum {
            margin-right: 0;
        }

        @media screen and (max-width: 340px) {
            margin-right: 0;
        }
    }
}

.fortune-box {
    border-radius: $border-radius-default;
    background-color: rgba(255, 255, 255, 0.39);
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    @media screen and (max-width: 380px) {
        width: 43px;
        height: 43px;
        margin-left: 1.2rem;
        flex-shrink: 0;
    }

    .red-dot {
        background-color: $vc-red-400;
        border-radius: $border-circle;
        position: absolute;
        width: 8px;
        height: 8px;
        top: 4px;
        right: 4px;

        &.checked {
            display: none;
        }
    }

    .ic_fortune-box {
        width: 28px;
        height: 28px;
        @media screen and (max-width: 380px) {
            width: 25px;
            height: 25px;
        }
        i {
            width: 100%;
            height: 100%;
            font-size: 1rem;
            display: block;
        }
    }
}

.skeleton {
    position: absolute;
    width: 90%;
    height: 15px;
    background-color: transparent;
    border-radius: $border-radius-default;

    @include skeleton;
    @media screen and (max-width: 340px) {
        margin-top: 0.3rem;
    }

    &.fortune {
        width: 50px;
        height: 50px;
    }
}
</style>
