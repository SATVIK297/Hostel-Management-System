import mongoose, { Schema } from "mongoose";

// Maintenance Schema
const maintenanceSchema = new Schema(
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
    },
    maintenanceType: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

// Maintenance Model
const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;
