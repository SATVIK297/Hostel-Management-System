import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.admin_token;
  
  if(!token){
    return next(errorHandler(res,401,"You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    console.log("admin",admin)
    req.admin = admin;
    next();
  });  
};


