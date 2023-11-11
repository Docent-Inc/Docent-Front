<template>
    <section
        class="landing"
        :class="{ daytime: timeType === 2, night: timeType === 4 }"
    >
        <!-- <div v-if="isSkeleton" class="skeleton">
            <div class="spinner"></div>
        </div> -->

        <div class="landing__weather">
            <div class="date-box">
                <div class="date">
                    {{ $dayjs().format("YYYY.MM.DD.") }}
                </div>
                <!-- <div class="date-icon">
                    <v-icon class="ic_cloud" />
                </div> -->
            </div>
            <!-- <div class="degree-box">
                <span>최고기온</span>
                <span class="degree">21°C</span>
                <span>최고기온</span>
                <span class="degree">21°C</span>
            </div> -->
        </div>
        <div class="landing__greeting">
            <div class="greeting">
                <h1>{{ greetingPrefix }} {{ user?.nickname }}님,</h1>
                <h2>{{ dynamicMessage }}</h2>
            </div>
            <div class="fortune-box" @click="openModal">
                <div class="red-dot" :class="{ checked: isModalOpenedToday }" />
                <div class="ic_fortune-box" @click="openModal">
                    <v-icon class="ic_fortune" />
                </div>
            </div>
        </div>
    </section>
    <SimpleModal :show="modalOpen" @close="closeModal">
        <article class="modal">
            <div class="ic_fortune-modal">
                <div class="ic_fortune-modal-box">
                    <v-icon class="ic_fortune" />
                </div>
            </div>
            <div
                v-if="!luckData.keyword && !luckData.description"
                class="modal__loading"
            >
                <div class="spinner" />
            </div>
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
    },
    data() {
        return {
            modalOpen: false,
            isModalOpenedToday: false,
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
        // isSkeleton() {
        // return !this.user || !this.user.nickname;
        // },
    },
    mounted() {
        this.checkLastModalUpDate();
    },
    methods: {
        openModal() {
            this.modalOpen = true;
            this.isModalOpenedToday = true;
            this.checkLastModalUpDate();
        },
        closeModal() {
            this.modalOpen = false;
        },
        checkLastModalUpDate() {
            const lastModalDate = localStorage.getItem("lastModalDate");
            const today = new Date().toDateString();
            localStorage.setItem("lastModalDate", today);

            if (lastModalDate !== today) {
                this.isModalOpenedToday = false;
            } else {
                this.isModalOpenedToday = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.landing {
    padding: $padding-default;
    height: 188px;
    width: 100%;
    margin-top: 0;
    color: $vc-gray-100;
    background: $gradient_dawn_dusk;

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

        @media screen and (max-width: 320px) {
            flex-direction: column;
            align-items: center;
            margin-bottom: 4rem;
        }
    }

    &__greeting {
        color: $vc-white;
        margin: 2.3rem 0 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 3.6rem;
        font-size: 2.4rem;
        font-family: $font-bold;

        @media screen and (max-width: 320px) {
            font-size: 2rem;
        }
    }
}

.date-box {
    color: $vc-gray-100;
    font-size: var(--vc-text-base);
    display: flex;
    align-items: center;

    @media screen and (max-width: 320px) {
        margin-bottom: 0.5rem;
    }

    .date {
        margin-right: 2rem;
    }

    .date-icon {
        width: 20px;
        height: 20px;

        i {
            width: 100%;
            height: 100%;
            font-size: 1rem;
            display: block;
        }
    }
}

.degree-box {
    color: $vc-gray-100;
    font-size: var(--vc-text-xs);
    font-weight: 400;
    display: flex;
    align-items: center;

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
    background: $vc-white;
    color: $vc-gray-800;
    padding: $padding-default;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    &__loading {
        @include loading;
        width: 200px;
        height: 150px;
    }

    &__contents {
        margin: 2rem;
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
    height: 15%;
    background-color: transparent;
    border-radius: 10px;

    @include loading;

    /* &__date {
    @include skeleton;
    width: 100%;
    height: 20px;
    border-radius: 10px;
  }

  &__greeting {
    @include skeleton;
    width: 50%;
    height: 20px;
    border-radius: 10px;
    top: 20%;

    &::after {
      @include skeleton;
      content: "";
      width: 150%;
      height: 20px;
      border-radius: 10px;
      top: 170%;
    }
  } */
}
</style>
