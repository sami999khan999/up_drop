import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import authRoutes from "./modules/auth/auth.routes";
import webhookRoutes from "./modules/auth/auth.routes";
import bodyParser from "body-parser";

const app = express();
const port = process.env.POST || 8000;

app.use("/auth", webhookRoutes);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(clerkMiddleware());

app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
