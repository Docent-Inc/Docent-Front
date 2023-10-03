import { useUserStore } from "~/store/user";

/**
 * 로그인 미들웨어
 * (0) /signin, /signup 제외하고 전역에서 사용 -> TODO: 필요한 곳에서만 사용
 * (1) store, cookie에서 토큰 확인
 * (2) 토큰 존재하면 유저 정보 업데이트 & 로그인 상태 활성화
 * (3) 존재하지 않으면 /signin으로 리다이렉트
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const [fullPath] = to.fullPath.split("?") || from.fullPath.split("?");
    if (
        fullPath.toLowerCase().includes("/signin") ||
        fullPath.toLowerCase().includes("/signup")
    )
        return;

    // 미로그인 시 접근 불가 페이지
    const restrictedPathsNotLogin = [
        "/home",
        "/chat",
        "/gallery",
        "/report",
        "/calendar",
    ];

    console.log("****** MIDDLEWARE ******");

    const { setAccessToken, setRefreshToken, setUser, accessToken } =
        useUserStore();
    const token = useCookie("access_token").value;
    const refreshToken = useCookie("refresh_token").value;
    // console.log(">> (1)", `accessToken: ${accessToken} \nrefresh: ${refreshToken} \ntoken: ${token}`);
    if (!accessToken) {
        console.log(">> ", token);

        if (token && refreshToken) {
            setAccessToken(token);
            setRefreshToken(refreshToken);
            // console.log(
            //     ">> (2)",
            //     `accessToken: ${accessToken} \nrefresh: ${refreshToken} \ntoken: ${token}`
            // );

            try {
                await setUser();
            } catch (e) {
                console.error(e);
                useCookie("access_token").value = null;
                useCookie("refresh_token").value = null;
            }
        } else {
            // 로그인 필요
            console.log("here");
            return navigateTo({
                path: "/signin",
            });
        }
    }

    const { loginStatus } = useUserStore();
    if (!loginStatus) {
        const isNotLoginPath = !!restrictedPathsNotLogin.filter((path) =>
            fullPath.toLowerCase().includes(path)
        ).length;
        if (isNotLoginPath)
            return navigateTo({
                path: "/signin",
            });
    }
    console.log("****** MIDDLEWARE END ******");
});
