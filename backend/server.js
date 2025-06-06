import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.route.js';

//app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

app.use(express.json());
const allowedOrigins = [
    "https://swasthya-sewa-frontend.onrender.com",
    "https://swasthya-sewa-admin.onrender.com"

];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

//api endpoints
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/user', userRouter);

//localhoat:5000/api/v1/admin/add-doctor
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})