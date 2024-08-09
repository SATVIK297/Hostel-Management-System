import express from 'express'
import { maintenanceRequest, maintenanceStatus, roomcleanrequest, roomCleanStatus } from '../controllers/services.controller.js';


const router  = express.Router();

//post request because we wante to create something

router.post("/roomclean" , roomcleanrequest)
router.post('/maintenance', maintenanceRequest);
router.get('/roomcleanstatus/:id', roomCleanStatus);
router.get('/maintenancestatus/:id', maintenanceStatus);



export default router;