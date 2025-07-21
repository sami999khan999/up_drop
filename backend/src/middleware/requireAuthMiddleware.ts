import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler";
import { CustomError } from "../errors/customError";

export const requireAuthMiddleware = asyncHandler(async (req, res, next) => {
  const { userId } = await getAuth(req);

  if (!userId)
    throw new CustomError({
      message: "Unauthorized, Login and try again",
      statusCode: 401,
    });

  next();
});
