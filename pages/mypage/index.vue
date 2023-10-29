<template>
  <div class="header">
    <div class="header-top">
      <div><span class="mypage-title">마이페이지</span></div>
      <button>
        <v-icon class="ic_setting">
          <img src="~/assets/images/ic_setting.svg" />
        </v-icon>
      </button>
    </div>
  </div>
  <div class="contents">
    <div class="contents-header-1">
      <p>
        <span class="nickname-color">{{ user?.nickname }}</span>님의 기록공간
      </p>
      <v-icon
          :class="mode === 0 ? 'ic_list' : 'ic_board'"
          @click="changeMode()"
      />
    </div>
    <div class="contents-header-2" v-if="highestCountCategory">
      <v-icon :class="displayStatus.iconClass" />
      <p class="status-text">{{ displayStatus.message }}</p>
    </div>
    <div class="contents-header-3">
      <div class="count-area">
        <div :style="getBarStyle('dream', total_MorningDiary_count)" class="bar">
          <div v-if="total_MorningDiary_count > 0">
            <span>꿈 기록</span>
            <span>{{ total_MorningDiary_count }}</span>
          </div>
        </div>
        <div :style="getBarStyle('diary', total_NightDiary_count)" class="bar">
          <div v-if="total_NightDiary_count > 0">
            <span>일기</span>
            <span>{{ total_NightDiary_count }}</span>
          </div>
        </div>
        <div :style="getBarStyle('memo', total_Memo_count)" class="bar">
          <div v-if="total_Memo_count > 0">
            <span>메모</span>
            <span>{{ total_Memo_count }}</span>
          </div>
        </div>
        <div v-if="total_MorningDiary_count + total_NightDiary_count + total_Memo_count === 0" class="no-records-message">
          <span>기록의 종류에 따라 그래프가 채워져요.</span>
        </div>
      </div>
    </div>
    <div class="contents-header-4">
      <Tags
        :tags="['전체', '꿈', '일기', '메모']"
          @select="(idx) => setType(idx)"
          :selected="type"
      />
    </div>
    <div v-if="isLoading"></div>
    <GalleryStarter v-else-if="list.length === 0" />
    <GalleryListItems :list="list" v-else-if="mode === 0" />
    <GalleryBoardItems :list="list" v-else />
    <infinite-loading
        v-if="list?.length"
        :first-load="false"
        :distance="1000"
        :top="true"
        @infinite="loadMore"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGalleryStore } from "~/store/gallery";
import InfiniteLoading from "v3-infinite-loading";
import ListDiary from "../../components/gallery/ListDiary.vue";
import ListMemo from "../../components/gallery/ListMemo.vue";
import Tags from "../../components/gallery/Tags.vue";
import {useUserStore} from "~/store/user";
import Starter from "~/components/gallery/Starter.vue";

export default {
  name: "Gallery",
  setup() {
    definePageMeta({
      layout: "main",
    });
  },
  components: {Starter, ListDiary, ListMemo, InfiniteLoading, Tags },
  data() {
    return {
      maxWidth: 214,
      isLoading: true,
    };
  },
  watch: {
    type() {
      this.reset();
      this.getGalleryList();
    },
  },
  computed: {
    ...mapState(useGalleryStore, [
      "type",
      "mode",
      "list",
      "totalCounts",
      "data",
      "total_NightDiary_count",
      "total_MorningDiary_count",
      "total_Memo_count",
    ]),
    ...mapState(useUserStore, ["user"]),
    formattedTitle() {
      return this.user?.nickname.length > 6
          ? this.diary.diary_name.slice(0, 8)
          : this.user?.nickname;
    },
    highestCountCategory() {
      const counts = {
        dream: this.total_NightDiary_count,
        diary: this.total_MorningDiary_count,
        memo: this.total_Memo_count,
      };
      const maxCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

      const categoryInfo = {
        dream: {
          iconClass: 'ic_status_dream',
          message: '꿈 기록을 가장 많이 작성하셨어요!',
        },
        diary: {
          iconClass: 'ic_status_diary',
          message: '일기를 가장 많이 작성하셨어요!',
        },
        memo: {
          iconClass: 'ic_status_memo',
          message: '메모를 가장 많이 작성하셨어요!',
        },
        start: {
          iconClass: 'ic_status_start',
          message: '아직 기록을 하지 않았어요!',
        }
      };
      return counts[maxCategory] > 0 ? categoryInfo[maxCategory] : categoryInfo["start"];
    },
    displayStatus(){
      return this.highestCountCategory;
    },
    totalCount() {
      return this.total_NightDiary_count + this.total_MorningDiary_count + this.total_Memo_count;
    },
  },
  async mounted() {
    try{
      this.reset();
      await this.getGalleryList();
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(useGalleryStore, [
      "setType",
      "changeMode",
      "getGalleryList",
      "reset",
    ]),
    loadMore() {
      // 조건 확인 후, pageNo +1 해서 loadMore
      if (this.list.length < this.totalCounts) {
        this.getGalleryList();
      }
    },
    getBarStyle(category, count) {
      const total = this.totalCount;
      const percentage = total ? (count / total) * 100 : 0;
      return {
        width: `${percentage}%`, // 비율에 따라 너비를 설정합니다.
        backgroundColor: this.getCategoryColor(category), // 카테고리에 따른 색상을 가져옵니다.
      };
    },
    getCategoryColor(category) {
      const colors = {
        dream: 'var(--indigo-500, #6366F1)', // 꿈 카테고리의 색상입니다.
        diary: 'var(--CTA_accent, #9398FF)', // 일기 카테고리의 색상입니다.
        memo: 'var(--indigo-300, #A5B4FC)', // 메모 카테고리의 색상입니다.
      };
      return colors[category] || '#000'; // 해당 카테고리의 색상을 반환하거나, 기본값으로 검정색을 사용합니다.
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 2rem 2.5rem;

  .header-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .mypage-title {
    display: flex;
    width: 282px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: var(--gray-800, #1F2937);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
}
.contents {
  width: 100%;
  height: calc(100% - (60px));
  height: calc(100% - (60px + constant(safe-area-inset-top)));
  height: calc(100% - (60px + env(safe-area-inset-top)));

  margin-top: 60px;
  margin-top: calc(60px + constant(safe-area-inset-top));
  margin-top: calc(60px + env(safe-area-inset-top));

  padding: 1.31rem 2.35rem;
  background: #f8f8f8;


  .contents-header-1 {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    color: var(--gray-700, #374151);
    .nickname-color {
      color: var(--indigo-500, #6366F1);
    }
  }

  .contents-header-2 {
    margin-top: 36px;
    width: 100%;
    height: 40px ;
    display: flex;
    color: var(--gray-400, #9CA3AF);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    .status-text {
      margin-left: 12px;
      display: flex;
      width: 206px;
      height: 36px;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
    }
  }
  .contents-header-3 {
    margin-top: 12px;
    .count-area {
      display: flex; // 이를 flexbox 컨테이너로 만듭니다.
      width: 100%; // 필요에 따라 조정할 수 있습니다.
      height: 40px; // 바의 높이입니다. 필요에 따라 조정할 수 있습니다.
      background-color: #E5E7EB; // 바의 배경색입니다. 선호하는 색상으로 변경할 수 있습니다.
      border-radius: 8px; // 바의 모서리를 둥글게 합니다.
      overflow: hidden; // 내부 요소가 바깥으로 나가지 않도록 합니다.
      justify-content: center;
      align-items: center;
    }

    .no-records-message {
      display: flex;
      width: 206px;
      height: 36px;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      color: var(--gray-400, #9CA3AF);
      text-align: center;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
    }

    .bar {
      height: 100%;
      text-align: center;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      > div {
        display: flex;
        align-items: center; // 세로 중앙 정렬
        justify-content: center; // 가로 중앙 정렬
        height: 20px;
        text-align: center;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        // 텍스트(글자) 스타일 지정
        span:first-child {
          color: var(--white, #FFF);
          text-align: center;
          font-family: Pretendard;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: 160%;
          display: inline-block;
          margin-right: 4px; // 텍스트와 숫자 사이의 공간
        }

        // 숫자 스타일 지정
        span:last-child {
          color: var(--white, #FFF);
          text-align: center;
          font-family: Pretendard;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 160%;
          display: inline-block;
        }
      }
    }
  }
  .contents-header-4 {
    margin-top: 24px;
  }
}
.ic_list, .ic_board {
  font-size: 100%;
  width: 6.4rem;
  height: 3.2rem;
}
.ic_status_diary, .ic_status_dream, .ic_status_memo, .ic_status_start {
  font-size: 100%;
  width: 13.2rem;
  height: 3.6rem;
}
</style>
