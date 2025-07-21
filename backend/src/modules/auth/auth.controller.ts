import { asyncHandler } from "../../utils/asyncHandler";
import { verifyWebhook } from "@clerk/express/webhooks";

export const webhookController = asyncHandler(async (req, res) => {
  const evt = await verifyWebhook(req);

  if (evt.type === "user.created") {
  }
});
