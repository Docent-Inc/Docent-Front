import type { DiaryRatio } from "~/models/diary";
import { useDiaryService } from "../services/diary";
import { type RecordGeneralResModel } from "~/models/diary";
import { getTypeNameKO, getTypeNameEN } from "~/utils/utils";

export const useMypageStore = defineStore("mypage", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        typeName: "", // ["일정", "꿈", "일기", "메모"],
        typeNameEN: "",
        mode: 1, // List (0), Board(1)
        ratio: {} as DiaryRatio,
        // isLoading: true,
        currentURL: "calendar",
        recordRes: {} as RecordGeneralResModel,
        resSuccessCount: -1,
        loadingTab: -1, // 0 dream, 1 diary, 2 memo
        title: "",
        content: "",
        isCreating: false, // createRecord 성공 시, 새로고침
    }),
    actions: {
        async getRatio() {
            const { getRatio } = useDiaryService();
            const res = await getRatio();

            this.ratio = res.data.ratio;
        },
        /**
         * Setter
         */
        setType(type: number, placeToCall?: string) {
            this.type = type;
            this.typeName = getTypeNameKO(type);
            this.typeNameEN = getTypeNameEN(type);

            if (placeToCall === "edit") return;

            const router = useRouter();
            switch (type) {
                case 0:
                    router.push({
                        path: "/mypage",
                        query: { tab: "calendar" },
                    });
                    break;
                case 1:
                    router.push({
                        path: "/mypage",
                        query: { tab: "dream" },
                    });
                    break;
                case 2:
                    router.push({
                        path: "/mypage",
                        query: { tab: "diary" },
                    });
                    break;
                case 3:
                    router.push({
                        path: "/mypage",
                        query: { tab: "memo" },
                    });
                    break;
                default:
                    router.push({
                        path: "/mypage",
                        query: { tab: "calendar" },
                    });
                    break;
            }
        },
        changeMode() {
            this.mode = (this.mode + 1) % 2;
        },
        async createRecords(type: number, data: any) {
            try {
                this.loadingTab = type;
                this.isCreating = true;
                const { postMorningDiary, postNightDiary, postMemo } =
                    useDiaryService();

                if (type === 1) this.recordRes = await postMorningDiary(data);
                else if (type === 2)
                    this.recordRes = await postNightDiary(data);
                else if (type === 3) this.recordRes = await postMemo(data);

                if (this.recordRes.success && type === 3) {
                    // 메모
                    // this.list.unshift(this.recordRes.data.memo);
                    this.title = "";
                    this.content = "";
                    this.isCreating = false;
                    // console.log(this.recordRes.data.memo);

                    return true;
                } else if (this.recordRes.success) {
                    // this.list.unshift(this.recordRes.data.diary);
                    this.title = "";
                    this.content = "";
                    this.isCreating = false;

                    return true;
                } else {
                    window.alert(
                        "기록을 생성하지 못했어요. 다시 시도해보시겠어요?",
                    );
                }
                this.loadingTab = -1;

                return false;
            } catch (error) {
                console.error(error);
            }
        },
        updateContents(
            updateProp: string,
            value: string,
            callback?: (limitedContent: number) => void,
        ) {
            if (updateProp === "title") this.title = value;
            else if (updateProp === "content") {
                this.content = value;

                if (!callback) return;
                callback(1000);
            }
        },
    },
});
