import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensure email is lowercase
    trim: true, // Trim whitespace
  },
  password: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true, // Ensure the admin is assigned to a block
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// AdminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

export default mongoose.model('Admin', AdminSchema);
