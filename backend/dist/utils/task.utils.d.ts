export declare class TaskUtils {
    static isWithin3Days(deadline: Date, date: Date): Promise<0 | 1 | -1>;
    static isWithin1Days(deadline: Date, date: Date): Promise<boolean>;
}
