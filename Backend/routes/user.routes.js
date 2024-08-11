import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import {  roomCleanStatus ,signOut } from '../controllers/user.controller.js';


const router  = express.Router();

router.get("/roomclean" , verifyToken, roomCleanStatus)
router.post("/signout" , signOut)
// router.delete('/delete/:id' ,verifyToken, deleteUser)


export default router;