import express from 'express';
import { addDoctor, loginAdmin } from '../controller/admin.controller.js';
import { upload } from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login-admin', loginAdmin);

export default adminRouter;