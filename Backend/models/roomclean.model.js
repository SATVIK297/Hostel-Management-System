import mongoose, { Schema } from "mongoose";

// Room Cleaning Schema
const roomCleanSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rollnum: {  // Ensure this field is named correctly in the schema
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
      type: String,
      required: true, 
    },
    time: {
      type: String,
      //required: true, 
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
