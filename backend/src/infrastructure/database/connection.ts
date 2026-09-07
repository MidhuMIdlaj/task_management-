import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/task_management";
  try {
    await mongoose.connect(uri);
    console.log("[database] MongoDB connected");
  } catch (error) {
    console.error("[database] MongoDB connection error:", error);
    process.exit(1);
  }
}
