"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const assessment_result_service_1 = require("./assessment.result.service");
class UserService {
    constructor() {
        this.userModel = new client_1.PrismaClient().user;
    }
    async getUserById(user_id) {
        const user = await this.userModel.findUnique({
            where: {
                user_id: user_id,
            },
        });
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }
    async getUserByUsername(username) {
        const user = await this.userModel.findUnique({
            where: {
                username: username,
            },
        });
        return user;
    }
    async getUserSelfDataById(user_id) {
        const selfData = await this.userModel.findUnique({
            where: {
                user_id: user_id,
            },
            select: {
                user_id: true,
                username: true,
                email: true
            }
        });
        const assessmentResultService = new assessment_result_service_1.AssessmentResultService();
        return {
            user_id: selfData.user_id,
            username: selfData.username,
            email: selfData.email,
            already_test: await assessmentResultService.isUserHasTakenTest(selfData.user_id) != null
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map