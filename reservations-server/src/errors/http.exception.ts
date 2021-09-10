class HttpException extends Error {
  statusCode?: number;

  status?: number | boolean;

  message: string;

  error: string | null;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}

export default HttpException;
