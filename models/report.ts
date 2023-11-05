// models/report.vue

/**
 * ReportListModel
 */
export interface ReportListModel {
    total_count: number;
    list: ReportList[];
}

interface ReportList {
    id: number;
    main_keyword: string[];
    image_url: string;
    create_date: string;
    is_read: boolean;
}

/**
 * ReportDetailModel
 */
export interface ReportDetailModel {
    mental_state: string;
    positives: ReportPosOrNeg;
    negatives: ReportPosOrNeg;
    extroverted_activities: string[];
    introverted_activities: string[];
    recommendations: string[];
    statistics: string;
}

interface ReportPosOrNeg {
    comment: string;
    main_keyword: string;
}
