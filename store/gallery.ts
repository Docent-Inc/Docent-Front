import { useDiaryService } from "../services/diary";

interface DiaryOrMemo {
    id: number;
    content: string;
    create_date: string;
    title: string;
    image_url?: string;
    diary_name: string;
}

interface Data {
    MorningDiary?: DiaryOrMemo[];
    MorningDiary_count?: Number;

    NightDiary?: DiaryOrMemo[];
    NightDiary_count?: Number;

    Memo?: DiaryOrMemo[];
    Memo_count?: Number;

    total_MorningDiary_count?: Number;
    total_NightDiary_count?: Number;
    total_Memo_count?: Number;
}

export const useGalleryStore = defineStore("gallery", {
    state: () => ({
        pageNo: 1,
        type: 0, // ALL (0), Dream (1), Diary(2), Memo(3)
        totalCounts: 0,
        mode: 0, // List (0), Board(1)
        list: [] as DiaryOrMemo[],
        data: {} as Data,
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

            if (!res.success) {
                const msg = `${res.status_code}  - ${res.message}`;
                console.log("Error! > ", msg, res);
                alert(msg);
                return;
            }

            this.list = res.data.list;
            this.totalCounts = res.data.count;
            this.total_MorningDiary_count = res.data.total_MorningDiary_count;
            this.total_NightDiary_count = res.data.total_NightDiary_count;
            this.total_Memo_count = res.data.total_Memo_count;
            this.pageNo += 1;
        },
        /**
         * Data를 조합하여 List로 변환하는 함수
         * 1) mergedList: 필요한 값만 합치기
         * 2) sortedList: created_date 기준 내림차 정렬
         */
        // dataToList() {
        //     let mergedList = [];
        //     if (this.type === 0) {
        //         mergedList = [
        //             ...this.data.MorningDiary!!.map((item) => ({
        //                 ...item,
        //                 content_type: 1,
        //             })),
        //             ...this.data.NightDiary!!.map((item) => ({
        //                 ...item,
        //                 content_type: 2,
        //             })),
        //             ...this.data.Memo!!.map((item) => ({
        //                 ...item,
        //                 content_type: 3,
        //             })),
        //         ];
        //     } else if (this.type === 1) {
        //         mergedList = [
        //             ...this.data.MorningDiary!!.map((item) => ({
        //                 ...item,
        //                 content_type: 1,
        //             })),
        //         ];
        //     } else if (this.type === 2) {
        //         mergedList = [
        //             ...this.data.NightDiary!!.map((item) => ({
        //                 ...item,
        //                 content_type: 2,
        //             })),
        //         ];
        //     } else {
        //         mergedList = [
        //             ...this.data.Memo!!.map((item) => ({
        //                 ...item,
        //                 content_type: 3,
        //             })),
        //         ];
        //     }
        //     mergedList = [...mergedList, ...this.list];

        //     const sortedList = mergedList.sort((a, b) =>
        //         b.create_date.localeCompare(a.create_date)
        //     );

        //     console.log(">> ", sortedList);
        //     this.list = sortedList;
        // },
        /**
         * TotalCounts 계산해 주는 함수
         * 각 타입에 따라 필요한 값만 저장
         */
        // computeTotalCounts() {
        //     if (this.type === 0)
        //         this.totalCounts =
        //             Number(this.data.Memo_count) +
        //             Number(this.data.MorningDiary_count) +
        //             Number(this.data!!.NightDiary_count);
        //     else if (this.type === 1)
        //         this.totalCounts = Number(this.data.MorningDiary_count);
        //     else if (this.type === 2)
        //         this.totalCounts = Number(this.data.NightDiary_count);
        //     else this.totalCounts = Number(this.data.Memo_count);
        // },
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
            this.data = {};
        },
    },
});
