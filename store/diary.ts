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
        total_MorningDiary_count: 0,
        total_NightDiary_count: 0,
        total_Memo_count: 0,
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

            // Counts
            // this.total_MorningDiary_count = res.data.total_MorningDiary_count;
            // this.total_NightDiary_count = res.data.total_NightDiary_count;
            // this.total_Memo_count = res.data.total_Memo_count;
            // this.computeTotalCounts();
            this.totalCounts = res.data.total_count;
        },
        async getRatio() {
            const { getRatio } = useDiaryService();
            const res = await getRatio();
            console.log("getRatio", res);

            this.ratio = res.data.ratio;
        },
        /**
         * Getter
         */
        computeTotalCounts() {
            if (this.type === 0)
                this.totalCounts =
                    Number(this.total_MorningDiary_count) +
                    Number(this.total_NightDiary_count) +
                    Number(this.total_Memo_count);
            else if (this.type === 1)
                this.totalCounts = Number(this.total_MorningDiary_count);
            else if (this.type === 2)
                this.totalCounts = Number(this.total_NightDiary_count);
            else this.totalCounts = Number(this.total_Memo_count);
        },
        computeEachCategory() {
            // TODO: 이쪽으로 옮기기 or api로 분리
            // 1. MaxCategory 계산 후, icon & 문구 세팅
            // 2. 각 카테고리 퍼센트 계산
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
