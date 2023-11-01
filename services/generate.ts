import API from "../utils/axios";

export const useGenerateService = () => {
    return {
        /**
         * 마음 보고서 생성
         */
        async getReport() {
            return await API.get(`/generate/report`);
        },
        // async getReport() {
        //     return await API.get(`/today/report`);
        // },
    };
};
