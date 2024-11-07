import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ConnectToDb } from '../db.js'; // Import the database connection
import User from '../models/User.js'; // Import the User model
import bcrypt from 'bcrypt'; // Static import for bcrypt

dotenv.config();

const router = express.Router();
const secret = process.env.JWT_SECRET;

// User Sign-In Route
router.post('/signin', async (req, res) => {
    const { email, password ,role} = req.body;
  
   
    

    try {
        await ConnectToDb(); // Ensure DB connection

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email}); // Find user by email
        console.log(role);
       console.log(user.role);
       
       
        if (!user || role!=user.role) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

       
        

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch && !role==User.role) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            secret,
            { expiresIn: '1h' }
        );

        // Respond with the token
        return res.status(200).json({ message: 'Sign-in successful', token });

    } catch (err) {
        console.error('Error in /signin:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
