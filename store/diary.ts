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
    }),
    actions: {
        async getGalleryList() {
            const { getGalleryList } = useDiaryService();
            console.log(`getGalleryList(${this.pageNo}/${this.type})`);

            const res = await getGalleryList(this.type, this.pageNo);
            console.log(res);

            this.list = [...this.list, ...res.data.list];
            this.pageNo += 1;

            // Counts
            this.total_MorningDiary_count = res.data.total_MorningDiary_count;
            this.total_NightDiary_count = res.data.total_NightDiary_count;
            this.total_Memo_count = res.data.total_Memo_count;
            this.computeTotalCounts();
        },
        /**
         * TotalCounts 계산해 주는 함수
         * 각 타입에 따라 필요한 값만 저장
         */
        computeTotalCounts() {
            if (this.type === 0)
                this.totalCounts =
                    Number(this.total_MorningDiary_count) +
                    Number(this.total_NightDiary_count) +
                    Number(this.total_Memo_count);
            else if (this.type === 2)
                this.totalCounts = Number(this.total_NightDiary_count);
            else this.totalCounts = Number(this.total_Memo_count);
        },
        setType(type: number) {
            this.type = type;
        },
        changeMode() {
            this.mode = (this.mode + 1) % 2;
        },
        reset() {
            this.pageNo = 1;
            this.totalCounts = 0;
            this.list = [];
        },
    },
});
