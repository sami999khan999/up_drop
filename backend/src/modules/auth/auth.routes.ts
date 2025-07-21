import { Router } from "express";
import bodyParser from "body-parser";
import { webhookController } from "./auth.controller";

const router = Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookController
);

export default router;
