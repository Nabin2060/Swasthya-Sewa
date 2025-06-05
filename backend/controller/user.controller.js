import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctor.Model.js';
import appointmentModel from '../models/appointment.Model.js';
import { v2 as cloudinary } from 'cloudinary';
import razorpay from 'razorpay';

//register user

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await userModel.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        // hashing passsword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();


        // jwt token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "User created successfully", user: savedUser, token });
        // res.json({success:true,token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // jwt token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

}
// api to get user profile
// const getProfile = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId).select('-password');
//         if (!userData) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ user: userData });
//     }
//     catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// }
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id; // middleware बाट आएको user

        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// update user profile
// const updateProfile = async (req, res) => {
//     try {
//         const { userID, name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file;
//         if (!name || !phone || !address || !dob || !gender) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         await userModel.findByIdAndUpdate(userID, { name, phone, address: JSON.parse(address), dob, gender })
//         if (imageFile) {
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: image });
//             const imageURL = imageUpload.secure_url;

//             await userModel.findByIdAndUpdate(userID, { image: imageURL });

//         }
//         return res.status(200).json({ message: "Profile updated successfully" });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// }
// const updateProfile = async (req, res) => {
//     try {
//         const { name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file;

//         const userID = req.user._id; // 💡 अब यता बाट लिइन्छ

//         if (!name || !phone || !address || !dob || !gender) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         let parsedAddress;
//         try {
//             parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
//         } catch (e) {
//             return res.status(400).json({ message: "Invalid address format" });
//         }

//         const updateData = { name, phone, address: parsedAddress, dob, gender };

//         if (imageFile) {
//             const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
//                 resource_type: 'image'
//             });
//             updateData.image = uploadResult.secure_url;
//         }

//         const updatedUser = await userModel.findByIdAndUpdate(userID, updateData, { new: true });

//         return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


const updateProfile = async (req, res) => {
    try {
        const userID = req.user._id;  // यो middleware बाट आएको user ID हो
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),  // Assuming address is sent as JSON string
            dob,
            gender,
        };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        // Update user document in MongoDB
        const updatedUser = await userModel.findByIdAndUpdate(userID, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ message: error.message });
    }
};

//api to book appointment
const bookAppointment = async (req, res) => {
    try {
        console.log("Booking request body:", req.body);
        console.log("User from auth:", req.user);

        const { docId, slotDate, slotTime } = req.body;
        const userId = req.user._id;

        if (!docId || !slotDate || !slotTime) {
            console.log("Missing required fields:", { docId, slotDate, slotTime });
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Get doctor data
        const docData = await doctorModel.findById(docId).select('-password');
        console.log("Doctor data:", docData);

        if (!docData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        if (!docData.available) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available"
            });
        }

        // Initialize slots_booked if not exists
        let slots_booked = docData.slots_booked || {};
        console.log("Current slots_booked:", slots_booked);

        // Check if slot is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({
                    success: false,
                    message: "Slot already booked"
                });
            }
            slots_booked[slotDate].push(slotTime);
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Get user data
        const userData = await userModel.findById(userId).select('-password');
        console.log("User data:", userData);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Create appointment
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees, // Changed from fee to fees to match doctor model
            slotTime,
            slotDate,
            date: new Date().toISOString().split('T')[0],
            cancelled: false
        };

        console.log("Creating appointment with data:", appointmentData);

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update doctor's booked slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: newAppointment
        });

    } catch (error) {
        console.error("Book appointment error details:", {
            error: error.message,
            stack: error.stack,
            body: req.body,
            user: req.user
        });
        return res.status(500).json({
            success: false,
            message: "Failed to book appointment",
            error: error.message
        });
    }
};

//  api to get all appointments of user
// const listAppointment = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const appointments = await appointmentModel.find({ userId });
//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// }
const listAppointment = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// api cancel appointment
// const cancelAppointment = async (req, res) => {
//     try {

//         const { userId, appointmentId } = req.body;

//         const appointmentData = await appointmentModel.findById(appointmentId);

//         // verify appointment user
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
//         }
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
//         // return res.json({ success: true, message: "Appointment cancelled successfully" });

//         // release booked slot
//         const { docId, sloatDate, sloatTime } = appointmentData;
//         let slots_booked = doctorData.slots_booked;
//         slots_booked[sloatDate] = slots_booked[sloatDate].filter(e => e !== sloatTime);

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });
//         return res.json({ success: true, message: "Appointment cancelled successfully" });


//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// }

const cancelAppointment = async (req, res) => {
    try {
        // auth middleware बाट आएको userId
        const userIdFromToken = req.user.id;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // userId verify गर्दा string मा convert गरेर तुलना गर्ने
        if (appointmentData.userId.toString() !== userIdFromToken.toString()) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // doctor data fetch गर्नुपर्नेछ release slot को लागि
        const doctorData = await doctorModel.findById(appointmentData.docId);
        if (!doctorData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const { slotDate, slotTime } = appointmentData;  // spelling fix gare

        let slots_booked = doctorData.slots_booked || {};
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        }

        await doctorModel.findByIdAndUpdate(appointmentData.docId, { slots_booked });

        return res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// api to make payment of appointment using razorpay
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// const paymentRazorpay = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: "Appointment not found or already cancelled" });
//         }
//         // create order in razorpay
//         const options = {
//             amount: appointmentData.amout * 100, // amount in paise
//             currency: process.env.CURRENCY || "USD",
//             recipt: appointmentId,
//         }
//         // create order
//         const order = await razorpayInstance.orders.create(options);
//         if (!order) {
//             return res.status(500).json({ success: false, message: "Failed to create order" });
//         }
//         return res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.error("Payment error:", error);
//         return res.status(500).json({ success: false, message: "Payment failed", error: error.message });
//     }

// }

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.status(404).json({ success: false, message: "Appointment not found or already cancelled" });
        }

        // Check if amount field is spelled correctly
        const amount = appointmentData.amount; // 🔧 FIX: 'amout' → 'amount'
        if (!amount) {
            return res.status(400).json({ success: false, message: "Invalid appointment amount" });
        }

        // Create order in Razorpay
        const options = {
            amount: amount * 100, // amount in paisa
            currency: process.env.CURRENCY || "NPR",
            receipt: String(appointmentId), // 🔧 FIX: 'recipt' → 'receipt'
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.status(500).json({ success: false, message: "Failed to create order" });
        }

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Payment error:", error);
        return res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
};

// api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_payment_id } = req.body;
        const orderInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);
        console.log(orderInfo);
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            return res.status(200).json({ success: true, message: "Payment successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

    } catch (error) {
        console.error("Razorpay verification error:", error);
        return res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
    }
}



export { create, login, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay };