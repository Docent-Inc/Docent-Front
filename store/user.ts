interface User {
    nickname?: String;
    age?: String;
    gender?: String;
    mbti?: String;
}

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            nickname: "",
            age: "",
            gender: "",
            mbti: "",
        } as User,
        nickname: "",
        accessToken: "",
        loginStatus: false,
    }),
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
        },
        setNickname(nickname: string) {
            this.nickname = nickname;
        },
        setUser(user: User) {
            this.user = user;
        },
        // async setUserInfo() {
        //     const { getMemberInfo } = useMemberAPI();
        //     if (this.accessToken && !this.userInfo) {
        //         const { body: userInfo, success } = await getMemberInfo();
        //         if (success) {
        //             this.user = userInfo;
        //             this.loginStatus = true;
        //         }
        //     }
        // },
    },
});
