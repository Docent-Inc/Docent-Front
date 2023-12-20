// models/auth.vue

/**
 * UserModel
 */
export interface UserModel {
    id: number;
    Oauth_from: string;
    email: string;
    is_sign_up: boolean;

    nickname: string;
    gender: string;
    mbti: string;
    birth: string;

    // 구독 및 푸시 설정 정보
    subscription_status: boolean;
    push_token: string;
    push_report: boolean;
    push_morning: string;
    push_night: string;
}

/**
 * RefreshModel
 */
export interface RefreshModel {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
    token_type: string;
}

/**
 * SocialLoginModel
 */
export interface SocialLoginModel {
    url: string;
}

/**
 * SocialCallbackModel
 */
export interface SocialCallbackModel {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
    token_type: string;
    is_signup: boolean;
    user_name: string;
}
