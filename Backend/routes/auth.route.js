import express from 'express'
import {signin, signup, verifyOtp} from '../controllers/auth.controller.js';


const router  = express.Router();

//post request because we wante to create something

router.post("/signup" , signup)
router.post('/verify-otp', verifyOtp);
router.post("/signin" , signin)

export default router;