import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ConnectToDb } from '../db.js'; // Import the database connection
import User from '../models/User.js'; // Import the User model

dotenv.config();

const router = express.Router();
const secret = process.env.JWT_SECRET;

// Admin Sign-In Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        await ConnectToDb(); // Ensure DB connection

        // Find the admin by email
        const admin = await User.findOne({ email, role: 'admin' }).select('+password'); // Include password field for comparison
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await admin.comparePassword(password); // Use the comparePassword method from the User model
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT (exclude password)
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            secret,
            { expiresIn: '1h' }
        );

        // Respond with token
        return res.status(200).json({ message: 'Sign-in successful', token });
    } catch (err) {
        console.error('Error in /admin/signin:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
