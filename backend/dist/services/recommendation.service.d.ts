import { IApiBaseRecommendation } from '../interfaces/recommendation.interface';
export declare class RecommendationService {
    private prisma;
    private recommendationModel;
    getRecommendationByCategoryId(category_id: number, except_id?: number): Promise<IApiBaseRecommendation>;
}
