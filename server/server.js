import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


connectDB()
connectCloudinary();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Webhook route — RAW body
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Normal JSON middleware for other APIs
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter );
app.use("/api/hotels", hotelRouter );
app.use("/api/rooms", roomRouter );
app.use("/api/booking", bookingRouter );

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
