import type { DiaryList, DiaryRatio } from "~/models/diary";
import { useDiaryService } from "../services/diary";

export const useMypageStore = defineStore("mypage", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        mode: 1, // List (0), Board(1)
        list: [] as DiaryList[],
        totalCounts: 0,
        ratio: {} as DiaryRatio,
        isLoading: true,
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
        setType(type: number) {
            this.type = type;
        },
        setPageNo(pageNo: number) {
            this.pageNo = pageNo;
        },
        changeMode() {
            this.mode = (this.mode + 1) % 2;
        },
    },
});
