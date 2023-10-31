import API from "../utils/axios";

export const useSettingService = () => {
    return {
        /**
         * 푸시 알림 상태 업데이트
         */
        async updatePushSetting(type: string, push_status: boolean) {
            return await API.post(`/auth/update/push`, {
                type: type,
                value: push_status,
            });
        },
        /**
         * 탈퇴 하기
         */
        async deleteAccount() {
            return await API.delete(`/auth/delete`);
        },
        /**
         * 회원 정보 수정
         */
        async updateAccount(data: any) {
            return await API.post(`/auth/update`, data);
        }
    }
}