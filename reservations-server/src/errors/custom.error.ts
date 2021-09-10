class CustomError extends Error {
  constructor(message: string) {
    super(message);

    // Because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
