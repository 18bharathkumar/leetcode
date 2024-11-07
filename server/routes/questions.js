// routes/questions.js
import express from 'express';
import { ConnectToDb } from '../db.js';
import verifyToken from '../middlewares/verifytoken.js';
import Question from '../models/Question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    try {
        await ConnectToDb(); // Ensure the database connection is established

       
        const result = await Question.find({}).lean(); 
        console.log(result);
        res.status(200).json(result); // Send the result as JSON
    } catch (error) {
        console.error('Error fetching questions:', error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while fetching questions.' });
    }
});

// Get complete question using QId
router.get('/:QId', verifyToken, async (req, res) => {
    try {
        await ConnectToDb();
        const QId = parseInt(req.params.QId, 10);  // Convert QId from string to number

        // Search for the question by QId
        const question = await Question.findOne({ QId: QId }).lean();

        // Check if the question exists
        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        // Return the found question
        res.status(200).json(question);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router; // Export the router to use in the main file
