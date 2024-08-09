import express from 'express'
import { maintenanceRequest, roomcleanrequest } from '../controllers/services.controller.js';


const router  = express.Router();

//post request because we wante to create something

router.post("/roomclean" , roomcleanrequest)
router.post('/maintenance', maintenanceRequest);

export default router;