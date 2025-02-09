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
    name: { type: String ,required: true,},
    block: { type: String ,required: true, },
    roomNumber: { type: Number  ,required: true,},
    registrationNumber: { type: String ,required: true,},
    
  },
  { timestamps: true }
);

const User = mongoose.model("User" ,userSchema);

export default User