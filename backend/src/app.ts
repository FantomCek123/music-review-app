import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import albumRoutes from "./routes/albumRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/albums", albumRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (_req, res) => res.send("🎵 Music Reviews API radi"));

export default app;
