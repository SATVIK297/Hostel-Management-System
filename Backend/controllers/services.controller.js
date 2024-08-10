import RoomClean from "../models/roomclean.model.js";
import Maintenance from "../models/maintenance.model.js";
import User from "../models/user.model.js"; // Ensure you have a User model imported
import { errorHandler } from "../utils/error.js"; // Assume you have a custom error handler utility

export const roomcleanrequest = async (req, res, next) => {
  try {
    console.log("enteret try")
    const { rollnum, room, block, description, date, time, status } = req.body;
    if (!room || !block || !rollnum || !date || !time) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Find the user by roll number
    const existedUser = await User.findOne({ registrationNumber: rollnum });
    if (!existedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Create a new RoomClean document
    const roomClean = new RoomClean({
      userId: existedUser._id, // Reference to the user
      rollnum, // Make sure this field is included
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
    // Log detailed error information
    console.error("Error saving room clean request:", error);
    return next(errorHandler(500, "Something went wrong. Please try again."));
  }
};

export const roomCleanStatus = async (req, res, next) => {
  try {
      const id = req.params.id; // Corrected to 'params' to access the parameter
      const user = await User.findOne({_id: id }); // Find the user by ID

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      console.log(user)

      const services = await RoomClean.find({ userId: id }); // Find all room cleaning services for the user
      console.log(services)

      return res.status(200).json(services); // Return the services
  } catch (error) {
      return res.status(500).json({ message: error.message }); // Handle errors
  }
};



export const maintenanceRequest = async (req, res, next) => {
    try {
      const { rollnum, room, block, description, date, time, status, maintenanceType } = req.body;
  
      // Validate required fields
      if (!room || !block || !rollnum || !date || !time || !maintenanceType) {
        return next(errorHandler(400, "All fields are required"));
      }
  
      // Find the user by roll number (assuming roll number is unique)
      const existedUser = await User.findOne({ registrationNumber: rollnum });
  
      if (!existedUser) {
        return next(errorHandler(404, "User not found"));
      }
  
      // Create a new Maintenance document
      const maintenance = new Maintenance({
        userId: existedUser._id, // Reference to the user
        rollnum,
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
      console.log(error);
      return next(errorHandler(500, "Something went wrong. Please try again."));

    }
  };

  export const maintenanceStatus = async (req, res, next) => {
    try {
        const id = req.params.id; // Corrected to 'params' to access the parameter
        const user = await User.findOne({_id: id }); // Find the user by ID
  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
  
        const services = await Maintenance.find({ userId: id }); // Find all room cleaning services for the user
        console.log(services)
  
        return res.status(200).json(services); // Return the services
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Handle errors
    }
  };
  