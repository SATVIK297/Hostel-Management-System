import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer'; // Add this line

import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// import { json } from "body-parser";

export const signup = async (req, res, next) => {
  const { email, password,registrationNumber} = req.body;
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('reg:', registrationNumber);

  if (!email || !password  || !registrationNumber) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(errorHandler(400, "User already exists"));
  }

  // Generate OTP
  const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, password:hashedPassword, otp: randomOtp ,registrationNumber });
  await newUser.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    port: 465,
    auth: {
      user: 'biggamer1923@gmail.com',
      pass: 'paysnaxegkbxdjhb'
    }
});

  const mailData = {
    from: 'hostel@gmail.com',
    to: email,
    subject: "Hostel Management (Verify your identity)",
    text: `Hello, Your 6 digit OTP to continue on HMS is: ${randomOtp}`,
  };

  try {
    await transporter.sendMail(mailData);
    console.log("OTP sent successfully");
    res.status(200).json({
      status: 200,
      message: "Check your mail account for OTP.",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Failed to send OTP"));
  }
 
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp, password } = req.body;

  // Validate input fields
  if (!email || !otp || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    // Check if the OTP matches
    if (String(user.otp) !== String(otp)) {
      return next(errorHandler(400, "OTP does not match"));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Update user details: set as verified, update password, clear OTP
    user.isVerified = true;
    user.password = hashedPassword;
    user.otp = null;

    // Save the updated user object, disabling validation to avoid unnecessary checks
    await user.save({ validateBeforeSave: false });

    console.log("User verified and saved successfully");

    // Exclude sensitive fields (like password) from the response
    const { password: pass, ...rest } = user._doc;

    // Respond with the user data and JWT token
    res.status(200).json({
      status: 200,
      message: "Successfully registered and verified",
      user: rest,
      token
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    next(errorHandler(500, "Failed to verify OTP or save user"));
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (
    !password ||
    !email ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "All fileds are required"));
  }
  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if the password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Generate JWT token if authentication is successful
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Optional: Set token expiry time
    );

    const { password: pass, ...rest } = validUser._doc;

    // Respond with the user data and set the cookie
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
