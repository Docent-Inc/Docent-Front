// models/report.vue

/**
 * ReportListModel
 */
export interface ReportListModel {
    generated_total_count: number;
    list_count: number;
    reports: ReportList[];
}

interface ReportList {
    id: number;
    title: string;
    period: Period;
    main_keyword: string[];
    image_url: string;
    create_date: string;
    is_read: boolean;
}

interface Period {
    start_date: string;
    end_date: string;
}

/**
 * ReportDetailModel
 */
export interface ReportDetailModel {
    id: number;
    content: ReportDetailContent;
    image_url: string;
    create_date: string;
    period: Period;
}

interface ReportDetailContent {
    mental_state: string;
    positives: ReportPosOrNeg;
    negatives: ReportPosOrNeg;
    extroverted_activities: string[];
    introverted_activities: string[];
    recommendations: string[];
    keywords: string[];
}
interface ReportPosOrNeg {
    comment: string;
    main_keyword: string;
}
