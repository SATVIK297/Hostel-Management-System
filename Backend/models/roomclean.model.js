import mongoose, { Schema } from "mongoose";

// Room Cleaning Schema
const roomCleanSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    rollnum:{
        type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, 
    },
    room: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true, 
    },
    date: {
      type: Date,
      required: true, 
    },
    time: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], 
      default: "pending", 
    }
  },
  { timestamps: true }
);

// Room Cleaning Model
const RoomClean = mongoose.model("RoomClean", roomCleanSchema);

export default RoomClean;