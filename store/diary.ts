import { DiaryRatio } from "models/diary";
import { useDiaryService } from "../services/diary";

interface DiaryOrMemo {
    id: number;
    content: string;
    create_date: string;
    title: string;
    image_url?: string;
    diary_name: string;
}

export const useDiaryStore = defineStore("diary", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        mode: 0, // List (0), Board(1)
        list: [] as DiaryOrMemo[],
        totalCounts: 0,
        ratio: {} as DiaryRatio,
    }),
    actions: {
        async getGalleryList() {
            const { getGalleryList } = useDiaryService();
            console.log(
                `getGalleryList(page: ${this.pageNo}, type: ${this.type})`
            );

            const res = await getGalleryList(this.type, this.pageNo);
            console.log(res);

            if (this.pageNo === 1) this.list = res.data.list;
            else this.list = [...this.list, ...res.data.list];
            this.pageNo += 1;
            this.totalCounts = res.data.total_count;
        },
        async getRatio() {
            const { getRatio } = useDiaryService();
            const res = await getRatio();
            console.log("getRatio", res);

            this.ratio = res.data.ratio;
            // this.ratio = {
            //     max_category: 1,
            //     morning_diary_count: 22,
            //     night_diary_count: 7,
            //     memo_count: 37,
            //     morning_diary_ratio: 33.33333333333333,
            //     night_diary_ratio: 10.606060606060606,
            //     memo_ratio: 56.060606060606055,
            // };
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
