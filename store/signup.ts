interface User {
    nickname?: String;
    age?: String;
    gender?: String;
    mbti?: String;
}

export const useSignupStore = defineStore("signup", {
    state: () => ({
        user: {
            nickname: "",
            age: "",
            gender: "남",
            mbti: "",
        } as User,
        step: 0,
    }),
    actions: {
        setNickname(nickname: String) {
            this.user.nickname = nickname;
        },
        setAge(age: String) {
            this.user.age = age;
        },
        setGender(gender: String) {
            this.user.gender = gender;
        },
        setMbti(mbti: String) {
            this.user.mbti = mbti;
        },
        setStep(step: number) {
            this.step = step > 0 ? step : 0;
        },
    },
});
