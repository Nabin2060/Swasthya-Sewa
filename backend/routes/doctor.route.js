import express from 'express';
import { doctorList, loginDoctor, appointmentDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controller/doctor.controller.js';
import authDoctor from '../middlewares/authDoctor.js';


const doctorRouter = express.Router();


// 
// router.post('/change-availability', changeAvailability);
doctorRouter.get('/list', doctorList);
doctorRouter.post('/doctor-login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);


export default doctorRouter;
