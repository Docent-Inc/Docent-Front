import { useTodayService } from "~/services/today";
import { useDiaryService } from "~/services/diary";
import { type Record } from "~/models/chat";

const initialState = () => ({
    record: undefined as Record[] | undefined,
    isDiaryAdded: false,
    isDiaryDeleted: false,
    // type: -1,
    recordRes: {},
    resSuccessCount: -1,
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
        async createRecords(type: number, data: any) {
            try {
                const { postMorningDiary, postNightDiary, postMemo } =
                    useDiaryService();

                if (type === 1) this.recordRes = await postMorningDiary(data);
                if (type === 2) this.recordRes = await postNightDiary(data);
                this.recordRes = await postMemo(data);

                this.resSuccessCount++;
                console.log(this.recordRes);
                console.log(this.resSuccessCount);
            } catch (error) {
                console.error(error);
            }
        },
    },
});
