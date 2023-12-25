import { useTodayService } from "~/services/today";
import { useDiaryService } from "~/services/diary";
import { type Record } from "~/models/chat";

const initialState = () => ({
    record: undefined as Record[] | undefined,
});

export const useRecordStore = defineStore("record", {
    state: initialState,
    actions: {
        async updateRecord() {
            const { getTodayRecord } = useTodayService();
            const res = await getTodayRecord();

            if (res.success)
                this.record = res.data.MorningDiary?.concat(
                    res.data.NightDiary,
                );
        }
    },
});
