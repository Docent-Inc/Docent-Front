import { useAuthService } from "~/services/auth";

interface User {
    nickname?: String;
    age?: String;
    gender?: String;
    mbti?: String;
}

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {} as User,
        userInfo: null,
        nickname: "",
        accessToken: "",
        refreshToken: "",
        loginStatus: false,
    }),
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
        },
        setRefreshToken(token: string) {
            this.refreshToken = token;
        },
        setNickname(nickname: string) {
            this.nickname = nickname;
        },
        async setUser() {
            const { getUserInfo } = useAuthService();
            if (this.accessToken && !this.userInfo) {
                const res = await getUserInfo();
                console.log(res);
                if (res.success) {
                    this.user = res.data;
                    this.loginStatus = true;
                }
                this.loginStatus = true;
            }
        },
        async setUserInfo() {
            const { getUserInfo } = useAuthService();
            if (this.accessToken && !this.userInfo) {
                const res = await getUserInfo();
                console.log(res);
                if (res.success) {
                    this.userInfo = res.data;
                    this.loginStatus = true;
                }
                this.loginStatus = true;
            }
        },
    },
});
