import { verifyWebhook } from "@clerk/express/webhooks";
import { asyncHandler } from "../../utils/asyncHandler";
import { createUser, deleteUser, updateUser } from "./auth.service";
import { CustomError } from "../../errors/customError";

export const webhookController = asyncHandler(async (req, res) => {
  let evt;

  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    throw new CustomError({
      message: "Invalid Webhook Signature",
      statusCode: 400,
    });
  }

  console.log("Webhook type:", evt.type);

  if (evt.type === "user.created") {
    const user = evt.data;

    if (!user.id || !user.email_addresses[0].email_address) {
      throw new CustomError({
        message: "User ID or Email Not Found",
        statusCode: 400,
      });
    }

    await createUser({
      clerkId: user.id,
      name: user.username ?? user.email_addresses[0].email_address,
      email: user.email_addresses[0].email_address,
      imageUrl: user.image_url,
    });
  }

  if (evt.type === "user.deleted") {
    const user = evt.data;

    if (!user.id)
      throw new CustomError({ message: "User ID Not Found", statusCode: 400 });

    await deleteUser(user.id);
  }

  if (evt.type === "user.updated") {
    const user = evt.data;

    if (
      !user.image_url ||
      !user.email_addresses[0].email_address ||
      !user.username
    )
      throw new CustomError({
        message: "User ID or Email Not Found",
        statusCode: 400,
      });

    await updateUser(
      { name: user.username, imageUrl: user.image_url },
      user.email_addresses[0].email_address
    );
  }

  res.status(200).json({ success: true });
});
