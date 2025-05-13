"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResultService = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const axios_1 = tslib_1.__importDefault(require("axios"));
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config(); // Load environment variables from .env file
class AssessmentResultService {
    constructor() {
        this.assessmentResultModel = new client_1.PrismaClient().assessmentResult;
    }
    async isUserHasTakenTest(user_id) {
        const assessmentResult = await this.assessmentResultModel.findFirst({
            where: {
                user_id: user_id,
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
                    category_id: 1,
                },
            },
            orderBy: {
                total_points: 'desc',
            },
        });
        return assessmentResult;
    }
    async getUserGoalAnswer(user_id) {
        const assessmentResult = await this.assessmentResultModel.findFirst({
            where: {
                user_id: user_id,
                category_id: 1, // General
            },
        });
        return assessmentResult;
    }
    async getAiRecommendation(category) {
        var _a;
        console.log("Requesting AI recommendation for category:", category);
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) {
            throw new Error("Hugging Face API key is missing in .env file");
        }
        // Using a confirmed working model
        const url = `https://api-inference.huggingface.co/models/distilgpt2`;
        try {
            const response = await axios_1.default.post(url, {
                inputs: `Provide 3 concise health recommendations for someone struggling with ${category}:`,
                parameters: {
                    max_length: 150,
                    temperature: 0.7,
                    do_sample: true
                }
            }, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000 // 10 second timeout
            });
            if (!response.data || !((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.generated_text)) {
                throw new Error("Empty response from AI model");
            }
            console.log("AI Response:", response.data);
            return response.data[0].generated_text;
        }
        catch (error) {
            console.error("Error fetching AI recommendation:", error);
            // Fallback recommendations if API fails
            const fallbackRecommendations = {
                'Emotion': `1. Practice mindfulness meditation daily\n2. Keep a gratitude journal\n3. Seek social support from friends/family`,
                'Physical': `1. Engage in regular physical activity\n2. Maintain a balanced diet\n3. Get adequate sleep`,
                'Mental': `1. Practice stress-reduction techniques\n2. Challenge negative thoughts\n3. Take regular breaks`
            };
            return fallbackRecommendations[category] || "Unable to get recommendations at this time. Please try again later.";
        }
    }
}
exports.AssessmentResultService = AssessmentResultService;
//# sourceMappingURL=assessment.result.service.js.map