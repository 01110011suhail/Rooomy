// controllers/clerkWebhooks.js
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verify raw body
    whook.verify(req.body.toString(), headers);

    const { data, type } = JSON.parse(req.body.toString());

    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      role: "user",
      recentSearchCities: [],
    };

    if (type === "user.created") {
      await User.create(userData);
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate({ clerkId: data.id }, userData, { upsert: true, new: true });
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false });
  }
};

export default clerkWebhooks;