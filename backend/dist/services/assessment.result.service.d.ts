import { AssessmentResult } from '@prisma/client';
export declare class AssessmentResultService {
    private assessmentResultModel;
    isUserHasTakenTest(user_id: number): Promise<AssessmentResult>;
    createOrUpdateAssessmentResult(user_id: number, category_id: number, points: number): Promise<void>;
    getUserAssessmentResults(user_id: number): Promise<AssessmentResult[]>;
    getUserGoalAnswer(user_id: number): Promise<AssessmentResult>;
    getAiRecommendation(category: string): Promise<string>;
}
