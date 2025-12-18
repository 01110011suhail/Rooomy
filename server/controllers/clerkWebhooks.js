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

    // 🔥 RAW BODY verification
    whook.verify(req.body.toString(), headers);

    const { data, type } = JSON.parse(req.body.toString());

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
      role: "user",
      recentSearchedCities: [],
    };

    if (type === "user.created") {
      await User.create(userData);
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData, {
        new: true,
        upsert: true,
      });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false });
  }
};

export default clerkWebhooks;
