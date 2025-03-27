"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const client_1 = require("@prisma/client");
class RecommendationService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.recommendationModel = this.prisma.recommendation;
    }
    async getRecommendationByCategoryId(category_id, except_id) {
        let recommendation;
        if (except_id) {
            recommendation = await this.prisma.$queryRaw `
        SELECT rec_id, category_id, rec_name, rec_duration
        FROM "Recommendation"
        WHERE category_id = ${category_id} AND rec_id != ${except_id}
        ORDER BY RANDOM()
        LIMIT 1
      `;
        }
        else {
            recommendation = await this.prisma.$queryRaw `
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
exports.RecommendationService = RecommendationService;
//# sourceMappingURL=recommendation.service.js.map