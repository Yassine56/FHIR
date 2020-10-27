import { BaseError } from 'make-error';

export class DatabaseError extends BaseError {
  constructor() {
    super('DATABASE ERROR');
  }
}

export class InternalServerError extends BaseError {
  constructor() {
    super('INTERNAL SERVER ERROR');
  }
}

export class AppError extends BaseError {
  constructor(message: string) {
    super(`APPLICATION ERROR ${message}`);
  }
}
