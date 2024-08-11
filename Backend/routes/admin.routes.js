import express from 'express';
import { adminLogin, adminLogout,registerAdmin , viewmaintenanceRequests, viewRequests } from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.post('/register', registerAdmin);
router.get('/roomclean/requests/:id', viewRequests);
router.get('/maintenance/requests/:id', viewmaintenanceRequests);


export default router;
