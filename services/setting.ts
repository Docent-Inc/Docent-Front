import { DELETE, POST } from "~/services";

/**
 * 회원 정보 수정
 */
interface updateAccountData {
    birth: string;
    gender: string;
    mbti: string;
    nickname: string;
}

export const useSettingService = () => {
    return {
        /**
         * 푸시 알림 상태 업데이트
         */
        async updatePushSetting(type: string, push_status: boolean) {
            return await POST(`/auth/update/push`, {
                type: type,
                value: push_status,
            });
        },
        /**
         * 탈퇴 하기
         */
        async deleteAccount() {
            return await DELETE(`/auth/delete`);
        },
        /**
         * 회원 정보 수정
         */
        async updateAccount(data: updateAccountData) {
            return await POST(`/auth/update`, data);
        },
    };
};
