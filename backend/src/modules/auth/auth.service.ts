import { NewUserType, UpdateUserType } from "./auth.types";
import { eq } from "drizzle-orm";
import { CustomError } from "../../errors/customError";
import { usersTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import {
  getUserByClerkId,
  getUserByEmail,
  shouldUpdateUser,
} from "./auth.uitils";

export const createUser = async (data: NewUserType) => {
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    throw new CustomError({ message: "User Already Exists", statusCode: 409 });
  }

  const result = await db.insert(usersTable).values(data).returning();

  if (result.length === 0)
    throw new CustomError({
      message: "Cound Not Create The User",
      statusCode: 500,
    });
};

export const deleteUser = async (clerkId: string) => {
  const existingUser = await getUserByClerkId(clerkId);

  if (!existingUser) {
    throw new CustomError({ message: "User Not Found", statusCode: 404 });
  }

  const deletedUser = await db
    .delete(usersTable)
    .where(eq(usersTable.clerkId, clerkId))
    .returning();

  if (deletedUser.length === 0) {
    throw new CustomError({
      message: "Cound Not Delete The User",
      statusCode: 500,
    });
  }
};

export const updateUser = async (user: UpdateUserType, email: string) => {
  const shouldUpdate = shouldUpdateUser(user, email);

  if (!shouldUpdate) return;

  const updatedUser = await db
    .update(usersTable)
    .set({ name: user.name, imageUrl: user.imageUrl, updatedAt: new Date() })
    .where(eq(usersTable.email, email))
    .returning();

  if (updatedUser.length === 0) {
    throw new CustomError({
      message: "Cound Not Update The User",
      statusCode: 500,
    });
  }
};
