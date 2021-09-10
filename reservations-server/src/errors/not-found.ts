/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from './custom.error';

class NotFoundError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 404;
    this.message = message;

    // Because we are extending a built-in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
