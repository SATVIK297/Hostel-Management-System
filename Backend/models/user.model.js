import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    otp: {
      type: Number,
      required: true,
  },
    
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }, // false for students, true for wardens
    name: { type: String },
    rollNumber: { type: String },
    roomNumber: { type: String },
    hostelBlock: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User" ,userSchema);

export default User