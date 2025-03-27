import { HttpStatusCode } from '../constants/http.enum';
import { Response } from 'express';
export declare class ResponseHelper {
    static responseSuccess(res: Response, statusCode: HttpStatusCode, message: string, data?: object[] | object | null | undefined): Response<any, Record<string, any>>;
    static responseError(res: Response, statusCode: HttpStatusCode, message: string, errors?: object | null | undefined): Response<any, Record<string, any>>;
}
