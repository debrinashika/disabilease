"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentService = void 0;
const client_1 = require("@prisma/client");
const assessment_result_service_1 = require("./assessment.result.service");
const task_category_service_1 = require("./task.category.service");
const category_service_1 = require("./category.service");
const http_exception_1 = require("../exceptions/http.exception");
const http_enum_1 = require("../constants/http.enum");
class AssessmentService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.assessmentResultModel = this.prisma.assessmentResult;
        this.questionModel = this.prisma.question;
        this.answerModel = this.prisma.answer;
    }
    async getAssessmentQuestions(user_id) {
        let questions = [];
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
            });
            questions.push(firstQuestion);
        }
        const categoryService = new category_service_1.CategoryService();
        const categories = await categoryService.getCategories();
        for (const category of categories) {
            const questionsForCategory = await this.prisma.$queryRaw `
        SELECT "Question"."question_id",
              "Question"."category_id",
              "Question"."question",
              jsonb_agg(jsonb_build_object('answer_id', "Answer"."answer_id", 'answer', "Answer"."answer")) as "answers"
        FROM "Question"
        LEFT JOIN "Answer" ON "Question"."question_id" = "Answer"."question_id"
        WHERE "Question"."category_id" = ${client_1.Prisma.sql `${category.category_id}`}
        GROUP BY "Question"."question_id"
        ORDER BY random()
        LIMIT 2;
      `;
            questions = questions.concat(questionsForCategory);
        }
        return questions;
    }
    async submitAssessmentTest(user_id, tests, task_categories) {
        if (!this.checkAssessmentTest(tests)) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.BadRequest, "Invalid assessment test");
        }
        const totalPoints = new Map();
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
            totalPoints.set(test.category_id, currentPoints + ((ans === null || ans === void 0 ? void 0 : ans.points) || 0));
        }
        // Create/ Update assessment results
        const assessmentResultService = new assessment_result_service_1.AssessmentResultService();
        for (const [key, value] of totalPoints.entries()) {
            assessmentResultService.createOrUpdateAssessmentResult(user_id, key, value);
        }
        // Update task categories priority
        const taskCategoryService = new task_category_service_1.TaskCategoryService();
        taskCategoryService.createOrUpdateTaskCategoriesByUserId(user_id, task_categories);
    }
    async checkAssessmentTest(tests) {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        tests.forEach(test => {
            if (test.category_id != 1) {
                switch (test.category_id) {
                    case 2:
                        count1++;
                        break;
                    case 3:
                        count2++;
                        break;
                    case 4:
                        count3++;
                        break;
                    case 5:
                        count4++;
                        break;
                    default:
                        break;
                }
            }
        });
        return count1 == 2 && count2 == 2 && count3 == 2 && count4 == 2;
    }
}
exports.AssessmentService = AssessmentService;
//# sourceMappingURL=assessment.service.js.map