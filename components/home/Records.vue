<template>
    <!-- 오늘의 기록 -->
    <section class="records">
        <!-- <div class="title-wrapper"> -->
        <div class="title-box">
            <v-icon class="ic_airplane" />
            <h2>과거로 여행을 떠나볼까요?</h2>
        </div>
        <button class="title-btn" @click="() => this.$router.push(`mypage`)">
            기록 보러가기
        </button>
        <!-- </div> -->
        <div class="records__description">
            그동안 기록을 통해 이 그림들을 그리셨어요. :)
        </div>
        <div class="main-slides" v-if="isLoading">
            <div class="main-slide empty">
                <div class="skeleton" />
            </div>
            <div class="main-slide empty">
                <div class="skeleton" />
            </div>
        </div>
        <div class="main-slides data" v-else>
            <div
                class="main-slide empty add"
                @click="() => this.$router.push(`chat`)"
                v-if="!hasUserOwnDiaries && !isLoading"
            >
                <div v-if="isLoading" class="skeleton" />
                <div v-if="!isLoading && !hasUserOwnDiaries" class="empty-box">
                    <div class="filter" />
                    <div class="ic_add-box"><v-icon class="ic_add" /></div>
                    <div class="empty-description">
                        기록을 해주시면 자신만의 <br />그림으로 채워나갈 수
                        있어요!
                    </div>
                </div>
            </div>
            <div
                class="main-slide"
                v-for="item in record"
                :key="item.id"
                :style="`background-image: url(${item.image_url})`"
                @click="
                    () =>
                        this.$router.push(
                            `/diary/${item.id}?type=${item.diary_type}`,
                        )
                "
            ></div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Records",
    props: {
        record: {
            required: true,
            default: () => undefined,
        },
    },
    computed: {
        hasUserOwnDiaries() {
            const hasNoDiaryItem = !this.record.length;

            const hasOnlyDefaultDiary =
                this.record.length === 1 &&
                this.record.some(
                    (item) =>
                        item.diary_name ===
                        "나만의 기록 친구 Look-i와의 특별한 첫 만남",
                );

            return !(hasNoDiaryItem || hasOnlyDefaultDiary);
        },
        isLoading() {
            return !this.record;
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
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 110px;
    grid-auto-rows: max-content;

    &__description,
    .main-slides {
        grid-column: 1 / span 2;
    }

    &__description {
        color: $vc-gray-500;
        font-size: 1.2rem;
        padding-left: 2rem;
        margin-top: 0.5rem;
    }

    .title-box {
        display: flex;
        align-items: center;
        margin: 2rem 0 0 2rem;
        @media screen and (max-width: 340px) {
            grid-column: 1 / span 2;
        }

        h2 {
            margin-left: 0.5rem;
            font-family: $font-bold;
            font-size: 1.8rem;

            @media screen and (max-width: 380px) {
                font-size: 100%;
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
        font-family: $font-medium;
        margin: 2rem 2rem 0 0;

        @media screen and (max-width: 340px) {
            margin: 1rem;
            grid-row: 4;
            grid-column: 1 / span 2;
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
    /* @media screen and (min-height: 920px) {
        flex-direction: column;
        width: 100%;
        align-items: center;
    } */

    .main-slide {
        border-radius: $border-radius-default;
        margin-left: 2rem;
        width: 184px;
        height: 184px;
        flex-shrink: 0;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        @media screen and (min-height: 920px) {
            /* margin: 0 0 1rem 0; */
            width: 280px;
            height: 280px;
        }
    }

    .main-slide:last-child {
        margin-right: 2rem;
        /* @media screen and (min-height: 920px) {
            margin: 0;
        } */
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
            border-radius: $border-radius-default;
            position: absolute;
            /* filter: brightness(50%) blur(5px); */
            width: 100%;
            height: 100%;
            /* backdrop-filter: blur(5px); */

            @supports (backdrop-filter: blur()) or
                (-webkit-backdrop-filter: blur()) {
                background: rgba(56, 56, 56, 0.6);
                backdrop-filter: blur(5px);
            }
            /* @supports (-webkit-backdrop-filter: blur(5px)) {
                -webkit-border-radius: 20px;

                /* background-color: rgba(105, 105, 105, 0.601); */
        }

        .empty-box {
            z-index: 5;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .empty-description {
            z-index: 5;
            margin-top: 2rem;
            @media screen and (min-height: 920px) {
                font-size: 1.7rem;
            }
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
    position: absolute !important;
    @include skeleton;
}
</style>
