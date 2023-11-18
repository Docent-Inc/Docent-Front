import { useUserStore } from "~/store/user";
import { useAuthService } from "~/services/auth";

/**
 * 로그인 미들웨어
 * (1) store, cookie에서 토큰 확인
 * (2) 토큰 존재하면 유저 정보 업데이트 & 로그인 상태 활성화
 * (3) 로그인 상태 체크하여 리다이렉트 처리
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const [fullPath] = to.fullPath.split("?") || from.fullPath.split("?");
    console.log(fullPath);

    // 미들웨어를 거쳐가지 않는 페이지
    if (["/", "/signin"].includes(fullPath)) {
        return;
    }

    // 로그인 시 접근 불가 페이지, 미로그인 시 접근 불가 페이지
    const restrictedPathsOnLogin = ["/profile/starter"];
    const restrictedPathsNotLogin = [
        "/home",
        "/chat",
        "/mypage",
        "/report",
        "/calendar",
        "/setting",
        "/mypage",
        "/profile/modify",
    ];

    // console.log("****** MIDDLEWARE ******");

    const { setAccessToken, setRefreshToken, setUser, accessToken } =
        useUserStore();
    const token = useCookie("access_token").value;
    const refreshToken = useCookie("refresh_token").value;

    // console.log("access Token - ", accessToken);
    // console.log("token - ", token);
    // console.log("refrest Token - ", refreshToken);

    if (!accessToken) {
        if (token && refreshToken) {
            // (2) 액세스 토큰 있을 시, store에도 저장
            setAccessToken(token);
            setRefreshToken(refreshToken);

            try {
                await setUser();
            } catch (e) {
                console.error(e);
                useCookie("access_token").value = null;
                useCookie("refresh_token").value = null;
            }
        } else if (refreshToken) {
            // (3) 리프레시 토큰 있을 시, 재발급 받아 store에도 저장
            try {
                const { refresh } = useAuthService();
                const res = await refresh(refreshToken);

                const now = new Date();
                const accessTokenExpires = new Date(
                    now.getTime() + res.data.expires_in * 1000,
                );
                const refreshTokenExpires = new Date(
                    now.getTime() + res.data.refresh_expires_in * 1000,
                );

                useCookie("access_token", {
                    expires: accessTokenExpires,
                }).value = res.data.access_token;
                useCookie("refresh_token", {
                    expires: refreshTokenExpires,
                }).value = res.data.refresh_token;

                setAccessToken(res.data.access_token);
                setRefreshToken(res.data.refresh_token);
                await setUser();
            } catch (e) {
                console.error(e);
                useCookie("access_token").value = null;
                useCookie("refresh_token").value = null;
            }
        }

        // 로그인 여부 확인 - false인 경우, 제한된 페이지에 있다면 /signin으로 리다이렉트
        const { loginStatus } = useUserStore();
        if (!loginStatus) {
            const isNotLoginPath = !!restrictedPathsNotLogin.filter((path) =>
                fullPath.toLowerCase().includes(path),
            ).length;
            if (isNotLoginPath) return navigateTo("/signin");
        }
    }

    // 로그인 여부 확인 - true인 경우, 로그인 시 접근하지 않아도 될 페이지에 있다면 /home으로 리다이렉트
    const { loginStatus } = useUserStore();
    if (loginStatus) {
        const isLoginPath = !!restrictedPathsOnLogin.filter((path) =>
            fullPath.toLowerCase().includes(path),
        ).length;
        if (isLoginPath) return navigateTo("/home");
    }

    // console.log("****** MIDDLEWARE END ******");
});
