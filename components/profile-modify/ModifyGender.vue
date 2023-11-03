<template>
  <div class="modify-gender">
    <div class="modify-gender-title-div">
      <span class="modify-gender-title">성별</span>
    </div>
    <div class="modify-gender-content">
      <v-icon :class="{ 'ic_male_on': male, 'ic_male_off': !male }" @click="selectGender('남')" />
      <v-icon :class="{ 'ic_female_on': female, 'ic_female_off': !female }" @click="selectGender('여')" />
      <v-icon :class="{ 'ic_unspecified_on': unspecified, 'ic_unspecified_off': !unspecified }" @click="selectGender('0')" />
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "~/store/user";

export default {
  name: "ModifyGender",
  data() {
    return {
      male: false,
      female: false,
      unspecified: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  mounted() {
    this.male = this.user.gender === '남';
    this.female = this.user.gender === '여';
    this.unspecified = this.user.gender === '0';
  },
  methods: {
    selectGender(gender) {
      if (gender === '남') {
        this.male = true;
        this.female = false;
        this.unspecified = false;
      } else if (gender === '여') {
        this.male = false;
        this.female = true;
        this.unspecified = false;
      } else {
        this.male = false;
        this.female = false;
        this.unspecified = true;
      }
      this.$nextTick(() => {
        this.$emit('genderSelected', gender);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.modify-gender {
  margin-top: 44px;
}
.modify-gender-title {
  color: var(--gray-700, #374151);
  font-family: "Pretendard Medium";
  font-size: 16px;
  line-height: 160%;
}
.modify-gender-content {
  width: 100%;
  display: flex;
  height: 48px;
  justify-content: space-between;
}
.ic_male_on,
.ic_male_off,
.ic_female_on,
.ic_female_off,
.ic_unspecified_on,
.ic_unspecified_off {
  height: 48px;
  width: 108px;
}
</style>