import express from 'express';
import { create, getProfile, login, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controller/user.controller.js';
import authUser from '../middlewares/authUser.js';

import upload from '../middlewares/multer.js';



const userRouter = express.Router();

userRouter.post('/register', create);
userRouter.post('/login', login);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/all-appointments', authUser, listAppointment); // yade userId frontend bata send nagarda authUser bata lincha.
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verify-razorpay', authUser, verifyRazorpay);


export default userRouter;  // 11.46