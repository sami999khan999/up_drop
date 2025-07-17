export class CustomError extends Error {
  statusCode: number;
  errorDetails?: { message?: string; field?: string }[];

  constructor({
    message = "Something went wrong",
    statusCode = 500,
    errorDetails,
  }: {
    message?: string;
    statusCode?: number;
    errorDetails?: { message?: string; field?: string }[];
  }) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    const baseError = { message: this.message };
    if (this.errorDetails) {
      return { ...baseError, errorDetails: this.errorDetails };
    }
    return [baseError];
  }
}
