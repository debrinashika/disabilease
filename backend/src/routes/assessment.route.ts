import { AssessmentController } from '../controllers/assessment.controller';
import { submitAssessmentTestSchema } from '../dtos/assessment.dto';
import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '../middlewares';
import { AssessmentService } from '../services/assessment.service';

export class AssessmentRoute implements Routes {
  public router = Router();
  private assessmentService = new AssessmentService();
  private assessmentController = new AssessmentController(this.assessmentService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/questions', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.assessmentController.getQuestions)
    );

    this.router.post(
      '/submit',
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.validate(submitAssessmentTestSchema),
      ValidationMiddleware.exceptionGuard(this.assessmentController.submitAssessmentTest)
    );
  }
}
