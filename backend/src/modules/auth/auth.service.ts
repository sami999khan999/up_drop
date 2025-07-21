import { NewUserType } from "./auth.types";
import { eq } from "drizzle-orm";
import { CustomError } from "../../errors/customError";
import { usersTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";

export const createUser = async (data: NewUserType) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, data.clerkId))
    .limit(1);

  if (existingUser.length > 0) {
    throw new CustomError({ message: "User Already Exists", statusCode: 409 });
  }

  const result = await db.insert(usersTable).values(data).returning();

  if (result.length === 0)
    throw new CustomError({
      message: "Cound Not Create The User",
      statusCode: 500,
    });
};
