
import express from 'express';
import { doctorList, loginDoctor } from '../controller/doctor.controller.js';


const doctorRouter = express.Router();


// 
// router.post('/change-availability', changeAvailability);
doctorRouter.get('/list', doctorList);
doctorRouter.post('/doctor-login', loginDoctor);

export default doctorRouter;
