import doctorModel from "../models/doctor.Model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const changeAvilability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        })
        res.json({ success: true, message: "Availablity Changed" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

//api for doctor login

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        else {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, message: "Login successful", token, doctor });

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export { changeAvilability, doctorList, loginDoctor };