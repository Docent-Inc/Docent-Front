import { useAuthService } from "~/services/auth";

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
        userInfo: null,
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
        async setUserInfo() {
            const { getUserInfo } = useAuthService();
            console.log("here");
            if (this.accessToken && !this.userInfo) {
                // TODO: 조회 API 정상화 되면 사용
                // const res = await getUserInfo();
                // console.log(res);
                // if (res.success) {
                //     this.userInfo = res.data;
                //     this.loginStatus = true;
                // }
                this.loginStatus = true;
            }
        },
    },
});
