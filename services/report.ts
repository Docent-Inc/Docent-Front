import { useAxios } from "~/composables/useAxios";
import { type ReportDetailModel, type ReportListModel } from "~/models/report";

export const useReportService = () => {
    const { GET, POST, PUT, DELETE } = useAxios();

    return {
        /**
         * 보고서 리스트 조회
         * @param {number} page
         */
        async getReportList(page: number) {
            return await GET<ReportListModel>(`/report/list/${page}`);
        },
        /**
         * 보고서 상세 조회
         * @param {number} id
         */
        async getReportDetail(id: number) {
            return await GET<ReportDetailModel>(`/report/${id}`);
        },
    };
};
