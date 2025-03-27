import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface PrismaErrorUniqueConstraint extends PrismaClientKnownRequestError {
  meta: {
    target: string[];
  };
}

export interface PrismaErrorForeignKeyConstraint extends PrismaClientKnownRequestError {
  meta: {
    field_name: string;
  };
}
