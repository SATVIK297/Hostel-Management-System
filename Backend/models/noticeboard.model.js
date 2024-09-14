import mongoose, { Schema } from "mongoose";


// Define the Notice schema
const NoticeSchema = new Schema({
  AdminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  headline: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of a string
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the field to the current date and time
  },
});

// Create the Notice model
const Notice = mongoose.model('Notice', NoticeSchema);

export default Notice;