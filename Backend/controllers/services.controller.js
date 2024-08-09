import RoomClean from "../models/roomclean.model.js";
import Maintenance from "../models/maintenance.model.js";
import User from "../models/user.model.js"; // Ensure you have a User model imported
import { errorHandler } from "../utils/error.js"; // Assume you have a custom error handler utility

export const roomcleanrequest = async (req, res, next) => {
  try {
    const { rollnum, room, block, description, date, time, status } = req.body;
    if (!room || !block || !rollnum || !date || !time) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Find the user by roll number (assuming roll number is unique)
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Create a new RoomClean document
    const roomClean = new RoomClean({
      userId: existedUser._id, // Reference to the user
      description,
      room,
      block,
      date,
      time,
      status: status || "pending", // Default to "pending" if not provided
    });

    // Save the document to the database
    await roomClean.save();

    // Send success response
    return res.status(201).json({
      message: "Room cleaning request submitted successfully",
      data: roomClean,
    });
  } catch (error) {
    // Handle any errors
    return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};

// export const roomcleanstatus = async(req,res,next) => {

//     try{
//         const id = req.param.id;
//         const user = User.findOne({id});
//         const services = RoomClean.findOne({user:id});


//     }
// }



export const maintenanceRequest = async (req, res, next) => {
    try {
      const { rollnum, room, block, description, date, time, status, maintenanceType } = req.body;
  
      // Validate required fields
      if (!room || !block || !rollnum || !date || !time || !maintenanceType) {
        return next(errorHandler(400, "All fields are required"));
      }
  
      // Find the user by roll number (assuming roll number is unique)
      const existedUser = await User.findOne({ rollnum });
  
      if (!existedUser) {
        return next(errorHandler(404, "User not found"));
      }
  
      // Create a new Maintenance document
      const maintenance = new Maintenance({
        userId: existedUser._id, // Reference to the user
        description,
        room,
        block,
        date,
        time,
        status: status || "pending", // Default to "pending" if not provided
        maintenanceType, 
      });
  
      // Save the document to the database
      await maintenance.save();
  
      // Send success response
      return res.status(201).json({
        message: "Maintenance request submitted successfully",
        data: maintenance,
      });
    } catch (error) {
      // Handle any errors
      return next(errorHandler(500, "Something went wrong. Please try again."));
    }
  };