
import validator from 'validator';
import bcrypt from 'bcrypt';
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}