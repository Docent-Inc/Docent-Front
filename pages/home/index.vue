<template>
    <header class="header">
        <div class="ic_logo_box" @click="() => this.$router.push('/home')">
            <v-icon class="ic_home_logo" />
        </div>
        <div
            class="ic_setting_box"
            @click="() => this.$router.push('/setting')"
        >
            <v-icon class="ic_setting" />
        </div>
    </header>
    <main class="contents">
        <!-- 홈 문구 -->
        <Greeting :user="user" :luck="luck" />

        <div class="contents-wrapper">
            <section class="chat">
                <button
                    type="button"
                    class="chat__btn"
                    @click="() => this.$router.push('/chat')"
                >
                    <span>Look-i</span>와 대화하러 가기
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
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import { useTodayService } from "../../services/today";
import Greeting from "../../components/home/Greeting.vue";
import DDays from "../../components/home/DDays.vue";
import Records from "../../components/home/Records.vue";

export default {
    name: "Home",
    components: { Greeting, DDays, Records },
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            calendar: [],
            isCalendarLoading: true,
            record: {},
            luck: "",
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    mounted() {
        const { getTodayLucky, getTodayCalendar, getTodayRecord } =
            useTodayService();

        getTodayLucky().then((res) => {
            if (res.success) this.luck = res.data.luck;
        });

        getTodayCalendar().then((res) => {
            if (res.success) {
                this.calendar = res.data;
                this.isCalendarLoading = false;
            }
        });

        getTodayRecord().then((res) => {
            if (res.success) this.record = res.data;
        });
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    .ic_logo_box {
        height: 29px;
        width: 62px;
        cursor: pointer;

        > i {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .ic_setting_box {
        width: 32px;
        height: 32px;
        cursor: pointer;

        > i {
            width: 100%;
            height: 100%;
        }
    }
}

.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
    padding: 0;

    overflow-x: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }

    .contents-wrapper {
        padding: 2rem 2rem 0 2rem;
        background-color: var(--vc-white);
        margin-top: -2rem;
        border-radius: 20px;
        width: 100%;
    }
}

.chat {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &__btn {
        width: 100%;
        height: 48px;
        background: $vc-accent;
        color: white;
        border-radius: 12px;
        font-weight: 600;
        font-size: var(--vc-text-base);
        box-shadow: 0px 8px 30px rgba(70, 96, 250, 0.46);
        font-family: "Pretendard Bold";

        span {
            margin-right: 0.2rem;
        }
    }
}

.home-skeleton {
    height: 100%;
    width: 100%;
    background: transparent;
    position: absolute;
}
</style>
