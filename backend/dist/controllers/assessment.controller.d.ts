import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { AssessmentService } from '../services/assessment.service';
export declare class AssessmentController {
    private assessmentService;
    constructor(assessmentService: AssessmentService);
    getQuestions(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    submitAssessmentTest(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
