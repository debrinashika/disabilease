import { PrismaClient } from '@prisma/client';
import { IApiBaseRecommendation } from '../interfaces/recommendation.interface';

export class RecommendationService {
  private prisma = new PrismaClient();
  private recommendationModel = this.prisma.recommendation;

  public async getRecommendationByCategoryId(category_id: number, except_id?: number): Promise<IApiBaseRecommendation> {
    let recommendation: IApiBaseRecommendation[];
    if (except_id) {
      recommendation = await this.prisma.$queryRaw`
        SELECT rec_id, category_id, rec_name, rec_duration
        FROM "Recommendation"
        WHERE category_id = ${category_id} AND rec_id != ${except_id}
        ORDER BY RANDOM()
        LIMIT 1
      `;
    } else {
      recommendation = await this.prisma.$queryRaw`
        SELECT rec_id, category_id, rec_name, rec_duration
        FROM "Recommendation"
        WHERE category_id = ${category_id}
        ORDER BY RANDOM()
        LIMIT 1
      `;
    }

    return recommendation[0];
  }
}
