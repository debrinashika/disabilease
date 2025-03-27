import { Response } from 'express';
import { ResponseHelper } from '../helpers';
import { RequestWithUser } from '../interfaces/auth.interface';
import { AssessmentService } from '../services/assessment.service';
import { HttpStatusCode } from '../constants/http.enum';

export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {
    this.getQuestions = this.getQuestions.bind(this);
    this.submitAssessmentTest = this.submitAssessmentTest.bind(this);
  }

  public async getQuestions(req: RequestWithUser, res: Response) {
    const questions = await this.assessmentService.getAssessmentQuestions(req.user.user_id);

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      questions
    );
  }

  public async submitAssessmentTest(req: RequestWithUser, res: Response) {
    const { tests, task_categories } = req.body;

    await this.assessmentService.submitAssessmentTest(
      req.user.user_id,
      tests,
      task_categories
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Assessment test submitted', 
    );
  }
}
