import express from 'express';
import { addDoctor, adminDashboard, allAppointmentAdmin, allDoctors, cancelAppointment, loginAdmin } from '../controller/admin.controller.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvilability } from '../controller/doctor.controller.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login-admin', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvilability);
adminRouter.get('/all-appointments-admin', authAdmin, allAppointmentAdmin);
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/admin-dashboard', authAdmin, adminDashboard);

export default adminRouter;