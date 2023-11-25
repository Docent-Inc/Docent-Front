<template>
    <section
        class="landing"
        :class="{ daytime: timeType === 2, night: timeType === 4 }"
    >
        <div class="landing__weather">
            <div class="date-box">
                <div class="date">
                    {{ $dayjs().format("YYYY.MM.DD.ddd") }}
                </div>
                <div class="date-icon">
                    <div v-if="!weather.icon" class="skeleton" />
                    <img
                        v-else-if="
                            weather.icon && !(weather.icon === 'not supported')
                        "
                        :src="`/weathers/ic_${weather.icon}.svg`"
                        :alt="weather.icon"
                    />
                </div>
            </div>
            <div class="degree-box">
                <div v-if="!weather.tmx" class="skeleton" />
                <div
                    v-else-if="
                        weather.tmx && !(weather.icon === 'not supported')
                    "
                >
                    <span>최고기온</span>
                    <span class="degree">{{ weather.tmx }}°C</span>
                    <span>최저기온</span>
                    <span class="degree">{{ weather.tmn }}°C</span>
                </div>
            </div>
        </div>
        <div class="landing__greeting">
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
        </div>
    </section>
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
import SimpleModal from "../modal/SimpleModal.vue";
import { getHourType } from "@/utils/utils";

export default {
    name: "Greeting",
    components: { SimpleModal },
    props: {
        user: Object,
        luck: String,
        isCheckedToday: Boolean,
        weather: Object,
    },
    data() {
        return {
            isModalOpen: false,
            optimisticIsCheckedToday: false,
        };
    },
    computed: {
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
        timeType() {
            return getHourType(new Date().getHours());
        },
        greetingPrefix() {
            switch (this.timeType) {
                case 1:
                    return "좋은 아침!";
                case 4:
                    return "고생했어요";
                default:
                    return "안녕하세요";
            }
        },
        dynamicMessage() {
            switch (this.timeType) {
                case 1:
                    return "오늘의 생각을 말해보세요!";
                case 4:
                    return "오늘 하루는 어땠어요?";
                default:
                    return "새로운 일정과 메모가 있나요?";
            }
        },
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.optimisticIsCheckedToday = true;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.landing {
    padding: 2rem 2rem 4rem 2rem;
    width: 100%;
    margin-top: 0;
    color: $vc-gray-100;
    background: $gradient_dawn_dusk;

    @media screen and (max-width: 360px) {
        padding-bottom: 2.5rem;
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

        @media screen and (max-width: 360px) {
            flex-direction: column;
            margin-bottom: 4rem;
        }
    }

    &__greeting {
        color: $vc-white;
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
        @media screen and (max-width: 360px) {
            font-size: 110%;
        }
    }
}

.date-box {
    color: $vc-gray-100;
    font-size: var(--vc-text-base);
    display: flex;
    align-items: center;

    @media screen and (max-width: 360px) {
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
    color: $vc-gray-100;
    font-size: var(--vc-text-xs);
    font-weight: 400;
    display: flex;
    justify-content: right;
    align-items: center;
    width: 200px;

    @media screen and (max-width: 360px) {
        justify-content: left;
    }

    .degree {
        margin: 0 1.7rem 0 1rem;
        font-family: $font-bold;
    }

    .degree:last-child {
        margin-right: 0;
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
        width: 40px;
        height: 40px;
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
            width: 23px;
            height: 23px;
        }
        i {
            width: 100%;
            height: 100%;
            font-size: 1rem;
            display: block;
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

    .ic_fortune-modal-box {
        width: 96px;
        height: 96px;

        i {
            width: 100%;
            height: 100%;
        }
    }
}

.modal {
    width: 100%;
    max-height: calc(100% - (36px + 4rem + 20px));
    margin-top: calc(2rem + 36px);

    background: $vc-white;
    color: $vc-gray-800;
    padding: $padding-default;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // margin-top: 2rem;
    // @media screen and (max-height: 700px) {
    //     border-radius: 0;
    //     width: 100%;
    //     height: 100%;
    // }

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
        overflow-y: scroll;
    }

    &__title {
        text-align: center;
        font-size: 2.4rem;
        margin-bottom: 1.6rem;
        font-family: $font-bold;

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
    }
}

.skeleton {
    position: absolute;
    width: 90%;
    height: 15px;
    background-color: transparent;
    border-radius: $border-radius-default;

    @include skeleton;
    @media screen and (max-width: 360px) {
        margin-top: 0.3rem;
    }

    &.fortune {
        width: 50px;
        height: 50px;
    }
}
</style>
