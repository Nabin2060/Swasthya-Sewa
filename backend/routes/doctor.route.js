
import express from 'express';
import { doctorList } from '../controller/doctor.controller.js';


const doctorRouter = express.Router();


// 
// router.post('/change-availability', changeAvailability);
doctorRouter.get('/list', doctorList);

export default doctorRouter;
