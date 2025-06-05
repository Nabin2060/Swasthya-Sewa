//api for adding doctor
import doctorModel from "../models/doctor.Model.js";
// import { upload } from "../middleware/upload.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.Model.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, available, fees, address, date } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        // validated email
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(12);
        const hashedPasswoerd = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPasswoerd,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address: JSON.parse(address), // Ensure address is stored as an object
            date: Date.now()
        }

        const newDoctor = await doctorModel.create(doctorData)
        await newDoctor.save();
        return res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });

    } catch (error) {
        console.error("Error in addDoctor:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // return res.status(400).json({ message: "Invalid email or password" });
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({
                success: true,
                token: token
            });

        } else {
            // return res.status(200).json({ message: "Login successful" });
            return res.status(400).json({ message: "Invalid email or password" });

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

// all the doctors get api
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        // if (doctors.length === 0) {
        //     return res.status(404).json({ message: "No doctors found" });
        // }
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// api to get all appointments of a doctor list
const allAppointmentAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }
        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

//admin can cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        if (!appointmentId) {
            return res.status(400).json({ message: "Appointment ID is required" });
        }

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.cancelled = true;
        await appointment.save();

        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.error("Error in cancelAppointment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// api to get dashboard data for admin

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointment: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

export {
    addDoctor,
    loginAdmin,
    allDoctors,
    allAppointmentAdmin,
    cancelAppointment,
    adminDashboard
};