<template>
    <div class="header">
      <div class="header-title">
        <span class="header-title-text">캘린더</span>
        <v-icon class="ic_setting" />
      </div>
    </div>
    <div class="contents">
        <div class="contents-title">
          <div class="contents-title-div">
            <span class="contents-title-text">오늘은 일정이 </span>
            <span class="highlight-text">{{ todayCount }}개 </span>
            <span class="contents-title-text">있어요!</span>
          </div>
            <v-icon class="ic_runner_man" />
        </div>
      <client-only>
        <VCalendar
            ref="vcalendar"
            style="width: 92.3%"
            locale="ko"
            trim-weeks
            :initial-page="page"
            :attributes="attributes"
            @dayclick="(day) => setDate(day.date)"
            @did-move="handleCalendarMove"
        >
          <template v-slot:header-title="{ title }">
            {{ title.split(' ').reverse().join('년 ') }}
          </template>
        </VCalendar>
      </client-only>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCalendarStore } from "~/store/calendar";

export default {
    name: "Calendar",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    computed: {
        ...mapState(useCalendarStore, ["page", "date", "attributes", "todos", "todayCount"]),
    },
    async mounted() {
        this.reset();

        let date = new Date(this.$route.query.date);
        if (!date || isNaN(date)) date = new Date();
        this.setDate(date);
    },
  methods: {
        ...mapActions(useCalendarStore, ["setDate", "setPage", "reset"]),
      handleCalendarMove(pages) {
        this.setPage(new Date(pages[0].id));
      },
    },
};
</script>

<style lang="scss" scoped>
.header {
  padding-left: 2rem;
  padding-right: 2rem;
  height: 48px;
}
.contents {
    width: 100%;
    height: 100%;
    padding-top: 48px;

    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(0deg, #DED2FF -20.81%, #D2DAFF -8.19%, #DEE4FF 13.84%, #FFF 117.04%);
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.contents-title-div {
  margin-top: 16px;
  margin-bottom: 16px;
}
.contents-title {
  background: #FFFFFF;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
}
.ic_setting {
  width: 3.2rem;
  height: 3.2rem;
}
.ic_runner_man {
  width: 3.6rem;
  height: 3.6rem;
}
.header-title-text {
  color: var(--gray-800, #1F2937);
  font-family: "Pretendard SemiBold";
  font-size: 16px;
  line-height: 150%;
}
.highlight-text,
.contents-title-text {
  color: var(--gray-700, #374151);
  font-family: "Pretendard Bold";
  font-size: 24px;
  line-height: 150%;
}
.highlight-text {
  color: var(--indigo-500, #6366F1);
}
</style>
