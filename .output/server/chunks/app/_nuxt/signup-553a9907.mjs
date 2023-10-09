import { d as defineStore } from '../server.mjs';

const useSignupStore = defineStore("signup", {
  state: () => ({
    user: {
      nickname: "",
      age: "",
      gender: "\uB0A8",
      mbti: ""
    },
    step: 0
  }),
  actions: {
    setNickname(nickname) {
      this.user.nickname = nickname;
    },
    setAge(age) {
      this.user.age = age;
    },
    setGender(gender) {
      this.user.gender = gender;
    },
    setMbti(mbti) {
      this.user.mbti = mbti;
    },
    setStep(step) {
      this.step = step > 0 ? step : 0;
    }
  }
});

export { useSignupStore as u };
//# sourceMappingURL=signup-553a9907.mjs.map
