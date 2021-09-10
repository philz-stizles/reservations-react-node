/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from './custom.error';

class BadRequestError extends CustomError {
  statusCode: number;

  error: any;

  constructor(message: string, error?: any) {
    super(message);

    this.statusCode = 400;
    this.error = error;

    // Because we are extending a built-in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): [{ message: string }] {
    return [{ message: this.message }];
  }
}

export default BadRequestError;
