export declare class CategoryService {
    private categoryModel;
    getCategories(): Promise<{
        category_id: number;
        category_name: string;
    }[]>;
    getCategorybyId(category_id: number): Promise<{
        category_name: string;
    }>;
}
