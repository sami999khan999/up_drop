import express from "express";
import cors from "cors";
import { db } from "./drizzle/db";
import { usersTable } from "./drizzle/schema";
import "dotenv/config";

const app = express();
const port = process.env.POST || 8000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", async (req, res) => {
  await db.insert(usersTable).values({
    name: "John Doe",
    age: 28,
    email: "johnwick13@example.com",
  });

  res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
