
import { Prisma, PrismaClient } from '@prisma/client';
import { AssessmentResultService } from './assessment.result.service';
import { TaskCategoryService } from './task.category.service';
import { IApiBaseAssessmentTest, IApiBaseQuestion } from '../interfaces/assessment.interface';
import { CategoryService } from './category.service';
import { IApiBaseTaskCategory } from '../interfaces/task.category.interface';
import { HttpException } from '../exceptions/http.exception';
import { HttpStatusCode } from '../constants/http.enum';

export class AssessmentService {
  private prisma = new PrismaClient();
  private assessmentResultModel = this.prisma.assessmentResult;
  private questionModel = this.prisma.question;
  private answerModel = this.prisma.answer;

  public async getAssessmentQuestions(user_id: number): Promise<IApiBaseQuestion[]> {
    let questions: IApiBaseQuestion[] = [];

    const firstTimeLogin = await this.assessmentResultModel.findFirst({
      where: {
        user_id: user_id,
        category_id: { in: [1, 2, 3, 4, 5] }
      }
    });

    if (!firstTimeLogin) {
      const firstQuestion = await this.questionModel.findFirst({
        where: {
          category_id: 1
        },
        select: {
          question_id: true,
          category_id: true,
          question: true,
          answers: {
            select: {
              answer: true,
              answer_id: true
            }
          }
        }
      })

      questions.push(firstQuestion);
    }

    const categoryService = new CategoryService();
    const categories = await categoryService.getCategories();

    for (const category of categories) {
      const questionsForCategory: IApiBaseQuestion[] = await this.prisma.$queryRaw`
        SELECT "Question"."question_id",
              "Question"."category_id",
              "Question"."question",
              jsonb_agg(jsonb_build_object('answer_id', "Answer"."answer_id", 'answer', "Answer"."answer")) as "answers"
        FROM "Question"
        LEFT JOIN "Answer" ON "Question"."question_id" = "Answer"."question_id"
        WHERE "Question"."category_id" = ${Prisma.sql`${category.category_id}`}
        GROUP BY "Question"."question_id"
        ORDER BY random()
        LIMIT 2;
      `;

      questions = questions.concat(questionsForCategory);
    }

    return questions;
  }

  public async submitAssessmentTest(
    user_id: number,
    tests: IApiBaseAssessmentTest[],
    task_categories: IApiBaseTaskCategory[]
  ) {
    if (!this.checkAssessmentTest(tests)) {
      throw new HttpException(HttpStatusCode.BadRequest, "Invalid assessment test");
    }

    const totalPoints = new Map<number, number>();

    for (const test of tests) {
      const ans = await this.answerModel.findFirst({
        where: {
          question_id: test.question_id,
          answer_id: test.answer_id
        },
        select: {
          points: true
        }
      });
      
      const currentPoints = totalPoints.get(test.category_id) || 0;
      totalPoints.set(test.category_id, currentPoints + (ans?.points || 0));
    }

    // Create/ Update assessment results
    const assessmentResultService = new AssessmentResultService();
    for (const [key, value] of totalPoints.entries()) {
      assessmentResultService.createOrUpdateAssessmentResult(
        user_id,
        key,
        value
      );
    }

    // Update task categories priority
    const taskCategoryService = new TaskCategoryService();
    taskCategoryService.createOrUpdateTaskCategoriesByUserId(
      user_id,
      task_categories
    );
  }

  private async checkAssessmentTest(
    tests: IApiBaseAssessmentTest[]
  ) {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    tests.forEach(test => {
      if (test.category_id != 1) {
        switch (test.category_id) {
          case 2:
            count1 ++;
            break;
          case 3:
            count2 ++;
            break;
          case 4:
            count3 ++;
            break;
          case 5:
            count4 ++;
            break;
          default:
            break;
        }
      }
    });

    return count1 == 2 && count2 == 2 && count3 == 2 && count4 == 2;
  }
}
