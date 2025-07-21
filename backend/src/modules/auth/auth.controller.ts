import { verifyWebhook } from "@clerk/express/webhooks";
import { asyncHandler } from "../../utils/asyncHandler";
import { createUser } from "./auth.service";

export const webhookController = asyncHandler(async (req, res) => {
  const evt = await verifyWebhook(req);

  console.log("Webhook type:", evt.type);

  if (evt.type === "user.created") {
    const user = evt.data;

    await createUser({
      clerkId: user.id,
      name: user.username ?? user.email_addresses[0].email_address,
      email: user.email_addresses[0].email_address,
      imageUrl: user.image_url,
    });
  }

  res.status(200).json({ success: true });
});
