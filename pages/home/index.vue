<template>
    <div class="viewport">
        <div class="layout">
            <Header :isLogoLeftSide="true" :isSettingRightSide="true" />
            <main class="contents">
                <!-- 상단 날짜 & 날씨 영역 -->
                <Weather :location="location" />
                <Report />

                <div class="contents-wrapper">
                    <!-- 운세 -->
                    <section class="luck">
                        <button
                            type="button"
                            class="luck__btn"
                            @click="this.isModalOpen = true"
                        >
                            <v-icon class="ic_fortune" />
                            운세 보러가기

                            <div
                                v-if="
                                    !isCheckedToday && !optimisticIsCheckedToday
                                "
                                class="red-dot"
                            ></div>
                        </button>
                    </section>

                    <!-- 디데이 -->
                    <DDays
                        :calendar="calendar"
                        :isCalendarLoading="isCalendarLoading"
                    />

                    <!-- 오늘의 기록 -->
                    <Records :record="record" />
                </div>
            </main>
        </div>
<!--        <Navigation />-->
    </div>

    <SimpleModal :isModalOpen="isModalOpen" @close="closeModal">
        <article class="modal" @click.stop>
            <div class="ic_fortune-modal">
                <div class="ic_fortune-modal-box">
                    <v-icon class="ic_fortune" />
                </div>
            </div>

            <div
                v-if="!luckData.keyword && !luckData.description"
                class="modal__skeleton"
            />
            <div v-else class="modal__contents">
                <h1 class="modal__title">
                    오늘의 운세는 <br />
                    <span class="point">"{{ luckData.keyword }}"</span>
                    입니다.
                </h1>
                <p class="modal__description">
                    {{ luckData.description }}
                </p>
            </div>
        </article>
    </SimpleModal>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "~/store/user";
import { useWeatherStore } from "~/store/weather";
import { useRecordStore } from "~/store/record";
import { useTodayService } from "../../services/today";
import Header from "~/components/common/Header.vue";
import Weather from "~/components/home/Weather.vue";
import DDays from "../../components/home/DDays.vue";
import Records from "../../components/home/Records.vue";
import Report from "../../components/home/Report.vue";
import SimpleModal from "~/components/modal/SimpleModal.vue";
import Navigation from "~/components/Navigation.vue";

export default {
    name: "Home",
    components: {
        Header,
        Weather,
        DDays,
        Records,
        Report,
        SimpleModal,
        Navigation,
    },
    data() {
        return {
            calendar: [],
            isCalendarLoading: true,
            luck: "",
            isCheckedToday: true,
            isModalOpen: false,
            optimisticIsCheckedToday: false,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        ...mapState(useRecordStore, ["record"]),
        ...mapState(useWeatherStore, ["location"]),
        luckData() {
            if (this.luck) {
                const parts = this.luck.split(".");
                const keyword = parts[0].split('"')[1];

                const [, ...rest] = parts;
                const description = rest.join(". ");

                return {
                    keyword,
                    description,
                };
            }
            return {
                keyword: "",
                description: "",
            };
        },
    },
    methods: {
        ...mapActions(useRecordStore, ["updateRecord"]),
        ...mapActions(useWeatherStore, ["updateLocation"]),
        closeModal() {
            this.isModalOpen = false;
            this.optimisticIsCheckedToday = true;
        },
    },
    async mounted() {
        this.updateLocation();

        const { getTodayLucky, getTodayCalendar } = useTodayService();

        getTodayLucky().then((res) => {
            if (res.success) {
                const { luck, isCheckedToday } = res.data;
                this.luck = luck;
                this.isCheckedToday = isCheckedToday;
            }
        });

        getTodayCalendar().then((res) => {
            if (res.success) {
                this.calendar = res.data;
                this.isCalendarLoading = false;
            }
        });

        this.updateRecord();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.contents {
    height: calc(100% - (6rem));
    height: calc(100% - (6rem + constant(safe-area-inset-top)));
    height: calc(100% - (6rem + env(safe-area-inset-top)));

    margin-top: 6rem;
    margin-top: calc(6rem + constant(safe-area-inset-top));
    margin-top: calc(6rem + env(safe-area-inset-top));
    padding: 0;

    //margin-bottom: 9rem;
    //margin-bottom: calc(9rem + constant(safe-area-inset-bottom));
    //margin-bottom: calc(9rem + env(safe-area-inset-bottom));

    overflow-x: none;
    overflow-y: scroll;
    scrollbar-width: none;

    background: $vc-gray-50;

    /* border: 1px solid red; */

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }

    .contents-wrapper {
        padding: 2rem 2rem 0 2rem;
        background-color: var(--vc-white);
        // margin-top: -2rem;
        // border-radius: 20px 20px 0 0;
        width: 100%;

        @media screen and (min-height: 920px) {
            height: calc(100% - 195px + 2rem);
            display: flex;
            flex-direction: column;
        }
    }
}

//// 231216 - v2 홈디자인 변경으로 미사용 START
// .chat {
//     width: 100%;
//     margin-top: 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     &__btn {
//         width: 100%;
//         height: 48px;
//         background: $vc-accent;
//         color: white;
//         border-radius: 12px;
//         font-weight: 600;
//         font-size: var(--vc-text-base);
//         box-shadow: 0px 8px 30px rgba(70, 96, 250, 0.46);
//         font-family: "Pretendard Bold";

//         span {
//             margin-right: 0.2rem;
//         }
//     }
// }
//// 231216 - v2 홈디자인 변경으로 미사용 END

.luck {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &__btn {
        position: relative;
        text-align: left;
        width: 100%;
        padding: 1.3rem;
        background: $vc-indigo-100;
        color: $vc-indigo-400;
        border-radius: 0.8rem;
        font-size: 16px;
        font-family: $font-medium;

        display: flex;
        gap: 12px;
    }
}

.home-skeleton {
    height: 100%;
    width: 100%;
    background: transparent;
    position: absolute;
}

.modal {
    width: 100%;
    max-height: calc(100% - (36px + 4rem + 20px));

    background: $vc-white;
    color: $vc-gray-800;
    padding: $padding-default;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* margin-top: 3rem; */
    @media screen and (max-height: 650px) {
        border-radius: 0;
        min-height: 100vh;
        margin-top: 0;
    }

    &__skeleton {
        @include skeleton;
        margin-top: 2rem;
        border-radius: $border-radius-default;
        width: 100%;
        height: 150px;
    }

    &__contents {
        margin: 2rem;
        width: 100%;

        overflow-y: auto;
        padding-right: 0.5rem;
        &::-webkit-scrollbar {
            width: 1vw;
            padding-left: 1rem;
        }
        &::-webkit-scrollbar-thumb {
            background: $vc-indigo-300;
            border-radius: 30px;
        }
    }

    &__title {
        text-align: center;
        font-size: 2.4rem;
        margin-bottom: 1.6rem;
        font-family: $font-bold;
        @media screen and (max-width: 360px) {
            font-size: 130%;
        }
        .point {
            color: $vc-indigo-500;
        }
    }

    &__description {
        color: $vc-gray-500;
        font-size: 14px;
        line-height: 2rem;
        text-indent: 10px;
        text-align: justify;
        word-break: break-all;
        /*
        overflow-y: auto;
        max-height: 220px;
        padding-right: 1rem;

        &::-webkit-scrollbar {
            width: 1vw;
            padding-left: 1rem;
        }
        &::-webkit-scrollbar-thumb {
            background: $vc-indigo-300;
            border-radius: 30px;
        } */
        @media screen and (max-width: 360px) {
            font-size: 88%;
        }
    }
}

.ic_fortune-modal {
    width: 172px;
    height: 172px;
    border-radius: $border-circle;
    background: $gradient_bg_light;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    @media screen and (max-width: 360px), (max-height: 500px) {
        width: 140px;
        height: 140px;
    }
    .ic_fortune-modal-box {
        width: 96px;
        height: 96px;
        flex-shrink: 0;

        @media screen and (max-width: 360px), (max-height: 500px) {
            width: 85px;
            height: 85px;
        }
        i {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
