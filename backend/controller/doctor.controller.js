import doctorModel from "../models/doctor.Model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointment.Model.js";


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

//API to get doctor  appointments for doctor panel
const appointmentDoctor = async (req, res) => {
    try {
        const docId = req.docId; // ✅ FIX: Get from middleware, not req.body
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            appointmentData.isCompleted = true;
            await appointmentData.save();

            return res.json({ success: false, message: "Mark Failed" });

            // return res.status(200).json({ success: true, message: "Appointment Completed" });
        } else {
            // return res.json({ success: false, message: "Mark Failed" });
            return res.status(200).json({ success: true, message: "Appointment Completed" });

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

// api to cancel appointment completed for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findByIdAndDelete(appointmentId);

        if (appointmentData && appointmentData === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentComplete, { cancelled: true });

            // return res.json({ success: false, message: "Cancellation Failled" })

            return res.status(200).json({ success: true, message: "Appointment Cancelled" })
        } else {
            // return res.json({ success: false, message: "Cancellation Failled" })
            return res.status(200).json({ success: true, message: "Appointment Cancelled" })

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });

    }
}
//api to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

// api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId; // ✅ अब यो req बाट आउँछ middleware बाट
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
// api to update doctoe profile data from doctor panel
// const updateDoctorProfile = async (req, res) => {
//     try {
//         const { docId, fees, address, available } = req.body;

//         await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
//         res.status(200).json({ success: true, message: "Profile Updated" });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ success: false, message: error.message });
//     }
// }
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, name, about, experience, fees, address, available } = req.body;

        await doctorModel.findByIdAndUpdate(
            docId,
            { name, about, experience, fees, address, available },
            { new: true } // यो ले updated document return गर्छ
        );

        res.status(200).json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export {
    changeAvilability,
    doctorList, loginDoctor,
    appointmentDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};