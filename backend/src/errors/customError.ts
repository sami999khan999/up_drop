import { statusCodeMap } from "./errorConstants";
import { ErrorCodeType } from "./errorTypes";

export class CustomError extends Error {
  statusCode: number;
  errorDetails?: { message?: string; field?: string }[];
  errorCode?: ErrorCodeType;

  constructor({
    message = "Something went wrong",
    statusCode = 500,
    errorDetails,
    errorCode,
  }: {
    message?: string;
    statusCode?: number;
    errorDetails?: { message?: string; field?: string }[];
    errorCode?: ErrorCodeType;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  private getErrorCode(status: number): ErrorCodeType | "UNKNOWN_ERROR" {
    const errorCode =
      statusCodeMap[status.toString() as keyof typeof statusCodeMap];

    console.log(errorCode);

    if (errorCode) return errorCode;

    return "UNKNOWN_ERROR";
  }

  public serializeErrors() {
    const errorCode = this.errorCode || this.getErrorCode(this.statusCode);
    const baseError = { message: this.message, errorCode: errorCode };
    if (this.errorDetails) {
      console.log("Inside if");
      return { ...baseError, errorDetails: this.errorDetails };
    }
    console.log("Outside if");
    return { ...baseError };
  }
}
