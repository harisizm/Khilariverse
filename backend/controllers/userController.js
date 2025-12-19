import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { sendWelcomeEmail, sendContactEmail } from "../utils/emailService.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Update last login
            await userModel.findByIdAndUpdate(user._id, { lastLogin: Date.now() });
            
            const token = createToken(user._id);
            return res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } })
        }
        else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            lastLogin: Date.now()
        })

        const user = await newUser.save();

        // Send Welcome Email
        await sendWelcomeEmail(email, name);

        const token = createToken(user._id);

        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token, user: { name: 'Admin', role: 'admin' } });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Admin: Get all users with enhanced stats
const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        const orders = await orderModel.find({}); // Fetch all orders to map stats

        const usersWithStats = users.map(user => {
            // Filter orders for this user
            const userOrders = orders.filter(order => order.userId === user._id.toString());
            
            // Count Active Orders (Not Delivered, Not Cancelled)
            const activeOrders = userOrders.filter(order => 
                order.status !== 'Delivered' && order.status !== 'Cancelled'
            ).length;

            return {
                ...user.toObject(),
                activeOrders,
                accountCreated: user.createdAt // Ensure model has timestamp
            };
        });

        res.json({ success: true, users: usersWithStats });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Admin: Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        await userModel.findByIdAndDelete(id);
        res.json({ success: true, message: "User Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const contactSupport = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.json({ success: false, message: "Please fill in all required fields" });
        }

        const emailSent = await sendContactEmail({ name, email, subject, message });

        if (emailSent) {
            res.json({ success: true, message: "Message sent successfully" });
        } else {
            res.json({ success: false, message: "Failed to send message" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, allUsers, deleteUser, contactSupport }
