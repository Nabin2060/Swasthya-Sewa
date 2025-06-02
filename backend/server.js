import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';

//app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/v1/admin', adminRouter)
//localhoat:5000/api/v1/admin/add-doctor
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})