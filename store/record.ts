import { useTodayService } from "~/services/today";
import { useDiaryService } from "~/services/diary";
import { type Record } from "~/models/chat";
import { type RecordResModel } from "~/models/diary";

const initialState = () => ({
    record: undefined as Record[] | undefined,
    isDiaryAdded: false,
    isDiaryDeleted: false,
    recordRes: {} as RecordResModel,
    resSuccessCount: -1,
    loadingTab: -1, // 0 dream, 1 diary, 2 memo
});

export const useRecordStore = defineStore("record", {
    state: initialState,
    actions: {
        async updateRecord() {
            if (this.isDiaryAdded || this.isDiaryDeleted) return;

            const { getTodayRecord } = useTodayService();
            const res = await getTodayRecord();

            if (res.success)
                this.record = res.data.MorningDiary?.concat(
                    res.data.NightDiary,
                );
        },
        addOptimisticRecord(recordItem: Record, recordType: number) {
            if (!this.record) {
                this.record = [];
            }

            recordItem.diary_type = recordType;
            this.record.unshift(recordItem);
            this.isDiaryAdded = true;
        },
        deleteOptimisticRecord(recordItem: Record) {
            this.record = this.record?.filter(
                (item: Record) => item.id !== recordItem.id,
            );
            this.isDiaryDeleted = true;
        },
        async createRecords(
            type: number,
            data: any,
            // typeName: string,
            // typeNameEn: string,
        ) {
            try {
                this.loadingTab = type;
                const { postMorningDiary, postNightDiary, postMemo } =
                    useDiaryService();

                if (type === 1) this.recordRes = await postMorningDiary(data);
                else if (type === 2)
                    this.recordRes = await postNightDiary(data);
                else if (type === 3) this.recordRes = await postMemo(data);

                // this.resSuccessCount++;
                // console.log(this.recordRes);
                // console.log(this.resSuccessCount);

                if (this.recordRes.success) {
                    // window.location.href = "/mypage?tab=" + typeNameEn;
                    // window.alert(`새로운 ${typeName}이(가) 생성되었습니다!`);
                    this.loadingTab = -1;
                } else {
                    window.alert(this.recordRes.message);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
});
