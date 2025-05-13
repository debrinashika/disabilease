"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
class CategoryService {
    constructor() {
        this.categoryModel = new client_1.PrismaClient().category;
    }
    async getCategories() {
        const category = await this.categoryModel.findMany({
            where: {
                category_id: {
                    not: 1 // except general question
                }
            },
            select: {
                category_id: true,
                category_name: true
            },
            orderBy: {
                category_id: "asc"
            }
        });
        return category;
    }
    async getCategorybyId(category_id) {
        const category = await this.categoryModel.findFirst({
            where: {
                category_id: category_id
            },
            select: {
                category_name: true
            }
        });
        return category;
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map