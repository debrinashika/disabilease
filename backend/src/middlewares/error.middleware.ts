import { Response } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { HttpException } from '../exceptions/http.exception';
import { ResponseHelper } from '../helpers';
import { HttpStatusCode } from '../constants/http.enum';
import { PrismaErrorForeignKeyConstraint, PrismaErrorUniqueConstraint } from '../interfaces/error.interface';

abstract class ErrorMiddleware {
  protected nextHandler?: ErrorMiddleware;

  setNextHandler(nextHandler: ErrorMiddleware): ErrorMiddleware {
    this.nextHandler = nextHandler;
    return this;
  }

  handle(res: Response, error: unknown): Response {
    if (this.canHandle(error)) {
      return this.getResponse(res, error);
    } else if (this.nextHandler) {
      return this.nextHandler.handle(res, error);
    } else {
      return ResponseHelper.responseError(res, HttpStatusCode.InternalServerError, 'Internal server error', error as object);
    }
  }

  protected abstract canHandle(error: unknown): boolean;
  protected abstract getResponse(jsonResponse: Response, error: unknown): Response;
}

class HttpErrorMiddleware extends ErrorMiddleware {
  protected canHandle(error: unknown): boolean {
    return error instanceof HttpException;
  }

  protected getResponse(jsonResponse: Response, error: HttpException): Response {
    return ResponseHelper.responseError(jsonResponse, error.statusCode, error.message, error.errors);
  }
}

class ZodErrorMiddleware extends ErrorMiddleware {
  protected canHandle(error: unknown): boolean {
    return error instanceof ZodError;
  }

  protected getResponse(jsonResponse: Response, error: ZodError): Response {
    const errors: Record<string, string[]> = {};

    error.issues.forEach(issue => {
      const fieldName = issue.path[issue.path.length - 1];
      const errorMessage = issue.message;

      if (errors[fieldName] === undefined) {
        errors[fieldName] = [];
      }

      errors[fieldName].push(errorMessage);
    });

    return ResponseHelper.responseError(
      jsonResponse,
      HttpStatusCode.UnprocessableEntity,
      'Invalid request',
      errors,
    );
  }
}

class PrismaClientKnownRequestErrorMiddleware extends ErrorMiddleware {
  // THINGS TO NOTICE: cuman bisa nge catch 1 exception

  protected canHandle(error: unknown): boolean {
    return error instanceof PrismaClientKnownRequestError;
  }

  protected capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  protected formatConstraintName(name: string): string {
    const words = name.split('_');
    const formattedWords = words.map(word => this.capitalizeFirstLetter(word));
    return formattedWords.join(' ');
  }

  protected getResponse(jsonResponse: Response, error: PrismaClientKnownRequestError): Response {
    let message = 'Internal server error';
    let code = HttpStatusCode.InternalServerError;
    let errors: Record<string, string[]> | null = {};
    
    switch (error.code) {
      case 'P2001': {
        // Not exist constraint

        break;
      }

      case 'P2002': {
        // Unique constraint
        if (error.meta && error.meta.target) {
          const constraintName = (error as PrismaErrorUniqueConstraint).meta.target[0];

          if (!errors[constraintName]) {
            errors[constraintName] = [];
          }

          errors[constraintName].push(`${this.formatConstraintName(constraintName)} already exists`);

          code = HttpStatusCode.Conflict;
          message = 'Invalid request';
        }
        break;
      }

      case 'P2003': {
        // Foreign key constraint
        if (error.meta) {
          const fieldName = (error as PrismaErrorForeignKeyConstraint).meta.field_name.match(/_(.+)_fkey/);

          if (fieldName) {
            const constraintName = fieldName[1];

            if (!errors[constraintName]) {
              errors[constraintName] = [];
            }

            errors[constraintName].push(`${this.formatConstraintName(constraintName)} is not exists`);
          }

          code = HttpStatusCode.Conflict;
          message = 'Invalid request';
        }
        break;
      }

      case 'P2025': {
        code = HttpStatusCode.NotFound;
        message = error.message;
        break;
      }

      default:
        message = error.message;
        break;
    }

    if (Object.keys(errors).length === 0) {
      errors = null;
    }

    return ResponseHelper.responseError(jsonResponse, code, message, errors);
  }
}

class PrismaClientUnknownRequestErrorMiddleware extends ErrorMiddleware {
  // THINGS TO NOTICE: cuman bisa nge catch 1 exception

  protected canHandle(error: unknown): boolean {
    return error instanceof PrismaClientUnknownRequestError;
  }

  protected getResponse(jsonResponse: Response, error: PrismaClientUnknownRequestError): Response {
    return ResponseHelper.responseError(jsonResponse, HttpStatusCode.InternalServerError, error.message, error);
  }
}

export default new HttpErrorMiddleware().setNextHandler(
  new ZodErrorMiddleware().setNextHandler(
    new PrismaClientKnownRequestErrorMiddleware().setNextHandler(new PrismaClientUnknownRequestErrorMiddleware()),
  ),
);
