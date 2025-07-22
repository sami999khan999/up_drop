import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { usersTable } from "../../drizzle/schema";
import { UpdateUserType } from "./auth.types";
import { CustomError } from "../../errors/customError";

export const shouldUpdateUser = async (user: UpdateUserType, email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new CustomError({ message: "User Not Found", statusCode: 404 });
  }

  if (
    user.name === existingUser.name &&
    user.imageUrl === existingUser.imageUrl
  ) {
    return false;
  }

  return true;
};

export const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user[0];
};

export const getUserByClerkId = async (clerkId: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, clerkId))
    .limit(1);

  return user[0];
};
