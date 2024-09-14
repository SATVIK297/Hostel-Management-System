import express from 'express';
import { adminLogin, adminLogout,registerAdmin , viewRequests,changeRoomStatus, viewmaintenanceRequests ,changeMaintenanceStatus, madenotice} from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.post('/register', registerAdmin);

router.get('/roomclean/requests/:id', viewRequests);
router.get('/maintenance/requests/:id', viewmaintenanceRequests);

router.put('/roomclean/requests/:id/status', changeRoomStatus);
router.put('/maintenance/requests/:id/status', changeMaintenanceStatus);
router.post('/notice/:id',madenotice );


export default router;
