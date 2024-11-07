// routes/submissions.js

import express from 'express';
import { ConnectToDb } from '../db.js'; // Import database connection
import verifyToken from '../middlewares/verifytoken.js';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Add a new submission
router.post(
    '/',
    verifyToken,
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Ensure database connection
            await ConnectToDb();

            const { QId, code } = req.body;
            let status;

            // Randomly assign status 
            status = Math.random() < 0.5 ? 'accepted' : 'rejected';

            // Get the email from the verifyToken middleware
            const email = req.user.email;

            // Find the user by email
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create a new submission object
            const newSubmission = {
                QId,
                code,
                status,
                time: new Date(),
            };

            // Add the new submission to the user's submissions array
            user.submissions.push(newSubmission);

            // Save the updated user document
            await user.save();

            // Respond with a success message
            res.status(201).json({ message: 'Submission added successfully', submissionId: newSubmission });
        } catch (error) {
            console.error('Error adding submission:', error); // Log the error for debugging
            res.status(500).json({ error: 'An error occurred while adding the submission.' });
        }
    }
);

export default router;
