import express from 'express';
import { ConnectToDb } from '../db.js'; // Import the database connection
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Signup Route
router.post('/', async (req, res) => {
    try {
        await ConnectToDb(); // Ensure the database is connected

        const { name, email, password } = req.body;

        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the username already exists
        const existingUserByName = await User.findOne({ name });
        if (existingUserByName) {
            return res.status(409).json({ message: 'Username is already in use.' });
        }

        // Check if the email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        // Create a new user instance using the User model
        const newUser = new User({
            name,
            email,
            password, // Will be hashed by pre-save middleware
            role: 'user', // Default role; set to 'admin' if needed
        });

        // Save the user to the database
        await newUser.save(); // This will invoke the pre-save middleware for password hashing

        // Return success response (exclude sensitive information)
        return res.status(201).json({ message: 'User created successfully.' });

    } catch (error) {
        console.error('Error in /signup:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
