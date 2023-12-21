import { useTodayService } from "~/services/today";
import { useDiaryService } from "~/services/diary";
import { type Record } from "~/models/chat";

const initialState = () => ({
    record: undefined as Record[] | undefined,
    isDiaryAdded: false,
    isDiaryDeleted: false,
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
    },
});
