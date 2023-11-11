<template>
    <!-- 오늘의 기록 -->
    <section class="records">
        <div class="title-wrapper">
            <div class="title-box">
                <v-icon class="ic_airplane" />
                <h2>과거로 여행을 떠나볼까요?</h2>
            </div>
            <button
                class="title-btn"
                @click="() => this.$router.push(`mypage`)"
            >
                기록 보러가기
            </button>
        </div>
        <div class="records__description">
            그동안 기록을 통해 이 그림들을 그리셨어요. :)
        </div>
        <div class="main-slides data" v-if="hasDiaryItems">
            <div
                class="main-slide"
                v-for="item in diaryItems"
                :key="item.id"
                :style="`background-image: url(${item.image_url})`"
                @click="() => this.$router.push(`/diary/${item.id}?type=1`)"
            ></div>
        </div>
        <div class="main-slides empty" v-else>
            <div
                class="main-slide empty add"
                @click="() => this.$router.push(`chat`)"
            >
                <div class="filter" />
                <div v-if="isSkeleton" class="skeleton" />
                <div class="ic_add-box"><v-icon class="ic_add" /></div>
                <div class="empty-description">
                    기록을 해주시면 자신만의 그림으로 채워나갈 수 있어요!
                </div>
            </div>
            <div class="main-slide empty" @click="goToChat">
                <div v-if="isSkeleton" class="skeleton" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Records",
    props: {
        record: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        hasDiaryItems() {
            return this.record.MorningDiary && this.record.NightDiary;
        },
        diaryItems() {
            return this.hasDiaryItems
                ? this.record.MorningDiary.concat(this.record.NightDiary)
                : [];
        },
        isSkeleton() {
            if (
                !this.record.MorningDiary?.length &&
                !this.record.NightDiary?.length
            ) {
                return true;
            } else false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.records {
    margin: 5rem auto;
    padding-bottom: 6rem;
    background: $gradient_bg_light;
    margin: 2rem -2rem 0 -2rem;

    &__description {
        color: $vc-gray-500;
        font-size: 1.2rem;
        padding-left: 2rem;

        @media screen and (max-width: 320px) {
            padding-left: 0;
            text-align: center;
        }
    }

    .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 0 2rem;

        @media screen and (max-width: 320px) {
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .title-box {
            display: flex;
            align-items: center;

            h2 {
                margin-left: 0.5rem;
                font-family: $font-bold;
                font-size: 18px;

                @media screen and (max-width: 320px) {
                    font-size: 1.6rem;
                }
            }
        }

        .title-btn {
            font-size: 12px;
            background: $vc-indigo-50;
            color: $vc-indigo-500;
            height: 100%;
            padding: 0.5rem 1rem;
            border-radius: $border-radius-default;
            height: 30px;
            font-weight: 600;

            @media screen and (max-width: 320px) {
                margin: 1rem;
            }
        }
    }
}

.main-slides {
    display: flex;
    overflow-x: scroll;
    margin-top: 2rem;

    &::-webkit-scrollbar {
        display: none;
    }

    .main-slide {
        border-radius: 8px;
        margin-left: 1.5rem;
        width: 184px;
        height: 184px;
        flex-shrink: 0;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .main-slide:last-child {
        margin-right: 1.5rem;
    }

    .main-slide.empty {
        color: white;
        font-size: 1.4rem;
        position: relative;
        overflow: hidden;
        background: url("../../assets/images/onboarding/ic_drawing.svg")
            no-repeat center/cover;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: $font-default;
        text-align: center;

        .filter {
            position: absolute;
            filter: brightness(50%) blur(5px);
            width: 100%;
            height: 100%;
            backdrop-filter: blur(5px);
        }

        .empty-description {
            z-index: 1;
            margin-top: 2rem;
        }
        .ic_add-box {
            z-index: 1;
            width: 35px;
            height: 35px;

            i {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.skeleton {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    @include skeleton;
}
</style>
