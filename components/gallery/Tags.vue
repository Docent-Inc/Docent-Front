<template>
  <div class="tags">
    <!-- 현재 선택된 태그에 따라 달라지는 배경 이미지 -->
    <v-icon :class="getIconClass(currentTag)" class="tag-icon" />

    <!-- 투명한 버튼들 -->
    <div class="tag-buttons">
      <div
          v-for="(tag, idx) in tags"
          :key="idx"
          class="tag-area"
          @click="onClick(idx)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      currentTag: 'total', // 초기 배경 이미지 설정
    };
  },
  methods: {
    onClick(idx) {
      this.$emit("select", idx); // 부모 컴포넌트로 이벤트 전달
      this.currentTag = this.tags[idx].toLowerCase(); // 현재 태그 업데이트
    },
    getIconClass(tag) {
      // 선택된 태그에 따라 아이콘 클래스 반환
      const icons = {
        '전체': 'ic_tag_total',
        '꿈': 'ic_tag_dream',
        '일기': 'ic_tag_diary',
        '메모': 'ic_tag_memo',
      };
      return icons[tag] || 'ic_tag_total'; // 태그가 없을 경우 기본 아이콘 사용
    },
  },
  watch: {
    selected(newIdx) {
      // 'selected' prop이 변경되면 현재 태그도 업데이트합니다.
      this.currentTag = this.tags[newIdx].toLowerCase();
    },
  },
};
</script>

<style scoped>
.tags {
  position: relative;
  width: 100%;
  height: 43px;
  margin-bottom: 20px;
}

.tag-icon {
  width: 100%;
  height: 100%;
  background-position: center;
  position: relative;
  top: 0;
  left: 0;
}

.tag-buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.tag-area {
  flex: 1;
  height: 100%;
  cursor: pointer;
}
</style>
