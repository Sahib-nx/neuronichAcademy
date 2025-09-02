// models/Video.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  duration: String,
  category: String,
  videoUrl: String,
  views: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
