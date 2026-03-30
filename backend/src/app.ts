import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import checkInRoutes from "./routes/checkInRoutes"; // ✅ fixed

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/checkins", checkInRoutes);

export default app;