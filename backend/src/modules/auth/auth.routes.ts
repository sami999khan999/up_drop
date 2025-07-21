import { Router } from "express";
import { webhookController } from "./auth.controller";

const route = Router();

route.post("/webhook", webhookController);

export default route;
