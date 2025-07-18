import express from "express";
import cors from "cors";
import { db } from "./drizzle/db";
import { usersTable } from "./drizzle/schema";
import "dotenv/config";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { CustomError } from "./errors/customError";

const app = express();
const port = process.env.POST || 8000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", async (req, res, next) => {
  console.log("============");
  throw new CustomError({
    message: "Hello World!",
    statusCode: 400,
    errorDetails: [],
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
