import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, ...err.serializeErrors() });
  }

  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
};
