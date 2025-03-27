export declare class CategoryService {
    private categoryModel;
    getCategories(): Promise<{
        category_id: number;
        category_name: string;
    }[]>;
}
