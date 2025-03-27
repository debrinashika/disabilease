"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResultService = void 0;
const client_1 = require("@prisma/client");
class AssessmentResultService {
    constructor() {
        this.assessmentResultModel = new client_1.PrismaClient().assessmentResult;
    }
    async isUserHasTakenTest(user_id) {
        const assessmentResult = await this.assessmentResultModel.findFirst({
            where: {
                user_id: user_id
            },
        });
        return assessmentResult;
    }
    async createOrUpdateAssessmentResult(user_id, category_id, points) {
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
    async getUserAssessmentResults(user_id) {
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
    async getUserGoalAnswer(user_id) {
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
exports.AssessmentResultService = AssessmentResultService;
//# sourceMappingURL=assessment.result.service.js.map