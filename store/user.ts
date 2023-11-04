import { useAuthService } from "~/services/auth";

interface User {
    nickname?: String;
    age?: String;
    gender?: String;
    mbti?: String;
}

const initialState = () => ({
    user: null,
    nickname: "",
    accessToken: "",
    refreshToken: "",
    loginStatus: false,
});

export const useUserStore = defineStore("user", {
    state: initialState,
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
            if (this.accessToken && !this.user) {
                const res = await getUserInfo();
                if (res.success) {
                    this.user = res.data;
                    this.loginStatus = true;
                }
            }
        },
        async updateUser() {
            const { getUserInfo } = useAuthService();
            if (this.accessToken) {
                const res = await getUserInfo();
                if (res.success) {
                    this.user = res.data;
                    this.loginStatus = true;
                }
            }
        },
        reset() {
            Object.assign(this.$state, initialState());
        },
    },
});
