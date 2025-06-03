// import jwt from 'jsonwebtoken';

// // Admin authentication middleware
// const authUser = (req, res, next) => {
//     try {
//         const { token } = req.headers;

//         if (!token) {
//             return res.status(401).json({ message: "You are not authorized Login Again" });
//         }

//         const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.body.userId = token_decoded.id;

//         // If valid, continue to next middleware/route
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export default authUser;

import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Please login again."
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized. Please login again."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }
        req.userId = decoded.id;


        // Get user data
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please login again."
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Please login again.",
            error: error.message
        });
    }
};

export default authUser;
