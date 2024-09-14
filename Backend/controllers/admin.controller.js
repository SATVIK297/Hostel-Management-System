import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import RoomClean from '../models/roomclean.model.js';
import Maintenance from '../models/maintenance.model.js';
import Notice from '../models/noticeboard.model.js';


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
      .json(admin);
  } catch (err) {
    next(err);
  }
};

export const adminLogout = (req, res, next) => {
  try {
    res.json('Admin logged out successfully');
  } catch (err) {
    next(err);
  }
};



export const viewRequests = async (req, res, next) => {
  try {
    const Id = req.params.id;
    console.log(Id)
    const admin = await Admin.findById(Id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const requests = await RoomClean.find({ block: admin.block }).sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);  // Log the full error
    res.status(500).json({ message: 'Internal Server Error' });  // Send only a simple message
  }
};


export const viewmaintenanceRequests = async (req, res, next) => {
  try {
    const Id = req.params.id;
    console.log(Id)
    const admin = await Admin.findById(Id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const requests = await Maintenance.find({ block: admin.block }).sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);  // Log the full error
    res.status(500).json({ message: 'Internal Server Error' });  // Send only a simple message
  }
};


export const changeRoomStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await RoomClean.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export const changeMaintenanceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;  
    

    const updatedRequest = await Maintenance.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const madenotice = async (req, res, next) => {
  try {
    const { headline, content } = req.body;
    const { id } = req.params;

    // Check if the admin exists
    const currentadmin = await Admin.findById(id);
    if (!currentadmin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Create new notice
    const newnotice = new Notice({
      AdminId: id,  // The ID of the current admin
      headline,
      content,
    });

    // Save the notice to the database
    await newnotice.save();

    return res.status(201).json({
      message: "Notice created successfully",
      data: newnotice,
    });

  } catch (error) {
    console.error("Error while creating notice:", error);
    return res.status(500).json({
      message: "An error occurred while creating the notice",
      error: error.message,
    });
  }
};

