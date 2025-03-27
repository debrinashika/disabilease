import { IApiBaseAssessmentTest, IApiBaseQuestion } from '../interfaces/assessment.interface';
import { IApiBaseTaskCategory } from '../interfaces/task.category.interface';
export declare class AssessmentService {
    private prisma;
    private assessmentResultModel;
    private questionModel;
    private answerModel;
    getAssessmentQuestions(user_id: number): Promise<IApiBaseQuestion[]>;
    submitAssessmentTest(user_id: number, tests: IApiBaseAssessmentTest[], task_categories: IApiBaseTaskCategory[]): Promise<void>;
    private checkAssessmentTest;
}
