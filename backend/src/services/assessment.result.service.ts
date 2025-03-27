import { AssessmentResult, PrismaClient } from '@prisma/client';

export class AssessmentResultService {
  private assessmentResultModel = new PrismaClient().assessmentResult;

  public async isUserHasTakenTest(user_id: number): Promise<AssessmentResult> {
    const assessmentResult = await this.assessmentResultModel.findFirst({
      where: {
        user_id: user_id
      },
    });

    return assessmentResult;
  }

  public async createOrUpdateAssessmentResult(user_id: number, category_id: number, points: number): Promise<void> {
    await this.assessmentResultModel.upsert({
      where: {
        user_id_category_id: {
          user_id,
          category_id,
        },
      },
      create: {
        user_id,
        category_id,
        total_points: points,
      },
      update: {
        total_points: points,
      },
    });
  }

  public async getUserAssessmentResults(user_id: number): Promise<AssessmentResult[]> {
    const assessmentResult = await this.assessmentResultModel.findMany({
      where: {
        user_id: user_id,
        NOT: {
          category_id: 1
        }
      },
      orderBy: {
        total_points: 'asc'
      }
    });

    return assessmentResult;
  }

  public async getUserGoalAnswer(user_id: number): Promise<AssessmentResult> {
    // 0: depression
    // 1: anxiety
    // 2: burnout
    // 3: stress
    // 4: no goal
    const assessmentResult = await this.assessmentResultModel.findFirst({
      where: {
        user_id: user_id,
        category_id: 1 // General
      }
    });

    return assessmentResult;
  }
}
