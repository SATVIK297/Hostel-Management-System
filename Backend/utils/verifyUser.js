import jwt from "jsonwebtoken";

import { errorHandler } from "./error.js";

export const  verifyToken =(req,res,next)=>{

  // to get these cookies we need another package called cookie-parser

  const token  = req.cookies.access_token;

  if(!token){
    return next(errorHandler(res,401,"You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    //the data is going to user in request jwt token also has payload of user data
    req.user = user;
    //this next fnction is called to go to update details of user ie updateUser
    // router.put('/update:userId' ,verifyToken, updateUser)

    next();
  });


}
