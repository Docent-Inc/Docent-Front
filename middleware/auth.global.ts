import { useUserStore } from "~/store/user";
import { useAuthService } from "~/services/auth";
import { isExpiredIn } from "~/utils/utils";

/**
 * 로그인 미들웨어
 * (1) store, cookie에서 토큰 확인
 * (2) 토큰 존재하면 유저 정보 업데이트 & 로그인 상태 활성화
 * (3) 로그인 상태 체크하여 리다이렉트 처리
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const [fullPath] = to.fullPath.split("?") || from.fullPath.split("?");
    console.log(fullPath);

    // // 미들웨어를 거쳐가지 않는 페이지
    // if (["/", "/signin"].includes(fullPath)) {
    //     return;
    // }

    // 로그인 시 접근 불가 페이지, 미로그인 시 접근 불가 페이지
    const restrictedPathsOnLogin = ["/signin", "/profile/starter"];
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
    const { refresh } = useAuthService();
    const token = useCookie("access_token").value;
    const refreshToken = useCookie("refresh_token").value;
    const expiresIn = useCookie("expires_in").value;

    // console.log("access Token - ", accessToken);
    // console.log("token - ", token);
    // console.log("refresh Token - ", refreshToken);
    // console.log("expiresIn - ", expiresIn);

    if (!accessToken) {
        if (token && refreshToken) {
            // (2)-1. 액세스 토큰 있을 시, 만료 15분 전이면 갱신
            // (2)-2. 액세스 토큰 있을 시, 넘으면 자동 로그인
            if (expiresIn && isExpiredIn(expiresIn, 15)) {
                console.log("🔒 Expired in 15m...", isExpiredIn(expiresIn, 15));
                try {
                    const res = await refresh(refreshToken);

                    const now = new Date();
                    const newAccessTokenExpires = new Date(
                        now.getTime() + res.data.expires_in * 1000,
                    );
                    const newRefreshTokenExpires = new Date(
                        now.getTime() + res.data.refresh_expires_in * 1000,
                    );

                    useCookie("access_token", {
                        expires: newAccessTokenExpires,
                    }).value = res.data.access_token;
                    useCookie("expires_in", {
                        expires: newAccessTokenExpires,
                    }).value = String(newAccessTokenExpires);
                    useCookie("refresh_token", {
                        expires: newRefreshTokenExpires,
                    }).value = res.data.refresh_token;

                    setAccessToken(res.data.access_token);
                    setRefreshToken(res.data.refresh_token);
                    await setUser();
                } catch (e) {
                    console.error(e);
                    useCookie("access_token").value = null;
                    useCookie("refresh_token").value = null;
                }
            } else {
                console.log("🔒 AutoLogin!");
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                try {
                    await setUser();
                } catch (e) {
                    console.error(e);
                    useCookie("access_token").value = null;
                    useCookie("refresh_token").value = null;
                }
            }
        } else if (refreshToken) {
            // (4) 리프레시 토큰 있을 시, 재발급 받아 store에도 저장
            console.log("🔒 Refresh!");
            try {
                const res = await refresh(refreshToken);

                const now = new Date();
                const newAccessTokenExpires = new Date(
                    now.getTime() + res.data.expires_in * 1000,
                );
                const newRefreshTokenExpires = new Date(
                    now.getTime() + res.data.refresh_expires_in * 1000,
                );

                useCookie("access_token", {
                    expires: newAccessTokenExpires,
                }).value = res.data.access_token;
                useCookie("expires_in", {
                    expires: newAccessTokenExpires,
                }).value = String(newAccessTokenExpires);
                useCookie("refresh_token", {
                    expires: newRefreshTokenExpires,
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

/////// [TODO] 함수화 실패 - composables은 nuxt context 내부에서만 사용 가능 ///////
// /* 토큰 갱신 */
// async function refreshTokens(refreshToken: string) {
//     const { setAccessToken, setRefreshToken, setUser } = useUserStore();
//     try {
//         const { refresh } = useAuthService();
//         const res = await refresh(refreshToken);

//         const now = new Date();
//         const newAccessTokenExpires = new Date(
//             now.getTime() + res.data.expires_in * 1000,
//         );
//         const newRefreshTokenExpires = new Date(
//             now.getTime() + res.data.refresh_expires_in * 1000,
//         );

//         useCookie("access_token", {
//             expires: newAccessTokenExpires,
//         }).value = res.data.access_token;
//         useCookie("expires_in", {
//             expires: newAccessTokenExpires,
//         }).value = String(newAccessTokenExpires);
//         useCookie("refresh_token", {
//             expires: newRefreshTokenExpires,
//         }).value = res.data.refresh_token;

//         setAccessToken(res.data.access_token);
//         setRefreshToken(res.data.refresh_token);
//         await setUser();
//     } catch (e) {
//         console.error(e);
//         useCookie("access_token").value = null;
//         useCookie("refresh_token").value = null;
//     }
// }
//
// /* 자동 로그인 */
// async function autoLogin(accessToken: string, refreshToken: string) {
//     const { setAccessToken, setRefreshToken, setUser } = useUserStore();
//
//     setAccessToken(accessToken);
//     setRefreshToken(refreshToken);
//     try {
//         await setUser();
//     } catch (e) {
//         console.error(e);
//         useCookie("access_token").value = null;
//         useCookie("refresh_token").value = null;
//     }
// }
/////// [TODO] 함수화 실패 - END ///////
