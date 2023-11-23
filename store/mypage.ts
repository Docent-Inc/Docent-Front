import type { DiaryList, DiaryRatio } from "~/models/diary";
import { useDiaryService } from "../services/diary";

interface DiaryOrMemo {
    id: number;
    content: string;
    create_date: string;
    title: string;
    image_url?: string;
    diary_name: string;
}

export const useMypageStore = defineStore("mypage", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        mode: 0, // List (0), Board(1)
        list: [] as DiaryList[],
        totalCounts: 0,
        ratio: {} as DiaryRatio,
    }),
    actions: {
        async getGalleryList() {
            const { getGalleryList } = useDiaryService();

            const res = await getGalleryList(this.type, this.pageNo);

            if (this.pageNo === 1) this.list = res.data.list;
            else this.list = [...this.list, ...res.data.list];
            this.totalCounts = res.data.total_count;
        },
        async getRatio() {
            const { getRatio } = useDiaryService();
            const res = await getRatio();

            this.ratio = res.data.ratio;
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
