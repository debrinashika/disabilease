import { HttpStatusCode } from "../constants/http.enum";
export declare class HttpException extends Error {
    statusCode: HttpStatusCode;
    errors: object | null | undefined;
    constructor(statusCode: HttpStatusCode, message: string, errors?: object | null | undefined);
}
