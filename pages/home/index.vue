<template>
    <Header :isLogoLeftSide="true" :isSettingRightSide="true" />
    <main class="contents">
        <!-- 홈 문구 -->
        <Greeting
            :user="user"
            :luck="luck"
            :isCheckedToday="isCheckedToday"
            :weather="weather"
        />

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
import { mapState, mapActions } from "pinia";
import { useUserStore } from "~/store/user";
import { useRecordStore } from "~/store/record";
import { useWeatherStore } from "~/store/weather";
import { useTodayService } from "../../services/today";
import Header from "~/components/common/Header.vue";
import Greeting from "../../components/home/Greeting.vue";
import DDays from "../../components/home/DDays.vue";
import Records from "../../components/home/Records.vue";

export default {
    name: "Home",
    components: { Header, Greeting, DDays, Records },
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            calendar: [],
            isCalendarLoading: true,
            luck: "",
            isCheckedToday: false,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        ...mapState(useRecordStore, ["record"]),
        ...mapState(useWeatherStore, ["weather"]),
    },
    methods: {
        ...mapActions(useRecordStore, ["updateRecord"]),
        ...mapActions(useWeatherStore, ["updateWeather"]),
    },
    async mounted() {
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

        this.updateWeather();
        this.updateRecord();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

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

        @media screen and (min-height: 920px) {
            min-height: 84%;
            display: flex;
            flex-direction: column;
        }
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
