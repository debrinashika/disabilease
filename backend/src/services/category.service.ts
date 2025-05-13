import { PrismaClient } from '@prisma/client';

export class CategoryService {
  private categoryModel = new PrismaClient().category;

  public async getCategories() {
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

   public async getCategorybyId(category_id: number) {
    const category = await this.categoryModel.findFirst({
      where: {
        category_id:category_id
      },
      select: {
        category_name: true
      }
    });

    return category;
  }

 
}
