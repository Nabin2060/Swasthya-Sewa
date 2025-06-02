import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        // Validate against stored admin credentials
        const expectedAdmin = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        if (decoded !== expectedAdmin) {
            return res.status(401).json({ message: "Invalid admin token" });
        }

        // If valid, continue to next middleware/route
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export default authAdmin;
