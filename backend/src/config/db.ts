import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Povezan sa MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Greška pri povezivanju:", err);
    process.exit(1);
  }
};
