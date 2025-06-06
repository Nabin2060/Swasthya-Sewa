
import jwt from 'jsonwebtoken';

const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers; // ✅ lowercase and matches frontend

        if (!dtoken) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = token_decoded.id; // ✅ save into req.docId

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export default authDoctor;
