import type { DiaryList, DiaryRatio } from "~/models/diary";
import { useDiaryService } from "../services/diary";

export const useMypageStore = defineStore("mypage", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        typeName: "", // ["일정", "꿈", "일기", "메모"],
        typeNameEN: "",
        mode: 1, // List (0), Board(1)
        list: [] as DiaryList[],
        totalCounts: 0,
        ratio: {} as DiaryRatio,
        isLoading: true,
        currentURL: "calendar",
    }),
    actions: {
        async getGalleryList() {
            this.isLoading = true;
            const { getGalleryList } = useDiaryService();

            const res = await getGalleryList(this.type, this.pageNo);
            if (this.pageNo === 1) this.list = res.data.list;
            else this.list = [...this.list, ...res.data.list];
            this.totalCounts = res.data.total_count;
            this.isLoading = false;
        },
        async getRatio() {
            this.isLoading = true;
            const { getRatio } = useDiaryService();
            const res = await getRatio();

            this.ratio = res.data.ratio;
            this.isLoading = false;
        },
        /**
         * Setter
         */
        setType(type: number, placeToCall?: string) {
            const typeNameArray = ["일정", "꿈", "일기", "메모"];
            const typeNameArrayEN = ["calendar", "dream", "diary", "memo"];

            this.type = type;
            this.typeName = typeNameArray[type];
            this.typeNameEN = typeNameArrayEN[type];

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
                        query: { type: "calendar" },
                    });
                    break;
            }
        },
        setPageNo(pageNo: number) {
            this.pageNo = pageNo;
        },
        changeMode() {
            this.mode = (this.mode + 1) % 2;
        },
    },
});
