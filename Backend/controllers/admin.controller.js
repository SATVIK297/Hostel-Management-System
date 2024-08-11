import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import RoomClean from '../models/roomclean.model.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';


export const registerAdmin = async (req, res, next) => {
  try {
    const { username, password, email,block } = req.body;

    // Validate input (you can add more validation as needed)
    if (!username || !password || !email ||!block) {
      return res.status(400).json('All fields are required');
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json('Admin with this username or email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
      block
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json('Admin registered successfully');
  } catch (err) {
    next(err);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return res.status(400).json('Admin not found');

    const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
    if (!isPasswordCorrect) return res.status(400).json('Incorrect password');

    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res
      .cookie('admin_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'Admin logged in successfully' });
  } catch (err) {
    next(err);
  }
};

export const adminLogout = (req, res, next) => {
  try {
    res.clearCookie('admin_token').status(200).json('Admin logged out successfully');
  } catch (err) {
    next(err);
  }
};

export const viewRequests = async (req, res, next) => {
  try {
    const adminId = req.admin.id; // Get admin ID from the verified token
    console.log('Admin ID:', adminId); // Debugging line
    const admin = await Admin.findById(adminId); // Find admin by ID

    if (!admin) {
      console.log('Admin not found:', adminId); // Debugging line
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Fetch room cleaning requests for the block assigned to the admin
    const requests = await RoomClean.find({ block: admin.block })
      .sort({ createdAt: -1 }); // Optionally sort by date

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
