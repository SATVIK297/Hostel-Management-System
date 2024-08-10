import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { roomCleanStatus } from '../controllers/user.controller.js';


const router  = express.Router();

router.get("/roomclean" , verifyToken, roomCleanStatus)

export default router;