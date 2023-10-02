import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const [fullPath] = to.fullPath.split("?") || from.fullPath.split("?");
    // 미로그인 시 접근 불가 페이지
    const restrictedPathsNotLogin = [
        "/home",
        "/chat",
        "/gallery",
        "/report",
        "/calendar",
    ];

    console.log("****** MIDDLEWARE ******");

    const { setAccessToken, setUserInfo, accessToken } = useUserStore();
    const token = useCookie("access_token").value;
    // console.log(">> (1)", `accessToken: ${accessToken} \ntoken: ${token}`);
    if (!accessToken) {
        console.log(">> ", token);

        if (token) {
            setAccessToken(token);
            // console.log(
            //     ">> (2)",
            //     `accessToken: ${accessToken} \ntoken: ${token}`
            // );

            try {
                await setUserInfo();
            } catch (e) {
                console.error(e);
                // useCookie("access_token").value = null;
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
