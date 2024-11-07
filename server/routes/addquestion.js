// routes/addQuestion.js

import express from 'express';
import { ConnectToDb } from '../db.js'; // Import database connection
import verifyToken from '../middlewares/verifytoken.js';
import authorizeRole from '../middlewares/authrole.js';
import { body, validationResult } from 'express-validator';
import Question from '../models/Question.js';

const router = express.Router();

// Validation rules
const questionValidationRules = [
    body('QId')
        .notEmpty().withMessage('Question ID is required.')
        .isInt({ gt: 0 }).withMessage('Question ID must be a positive integer.'),
    body('title')
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.'),
    body('description')
        .notEmpty().withMessage('Description is required.')
        .isString().withMessage('Description must be a string.'),
    body('level')
        .notEmpty().withMessage('Level is required.')
        .isIn(['Easy', 'Medium', 'Hard']).withMessage('Level must be Easy, Medium, or Hard.'),
    body('acceptanceRate')
        .notEmpty().withMessage('Acceptance rate is required.')
        .isFloat({ min: 0, max: 100 }).withMessage('Acceptance rate must be a number between 0 and 100.'),
    body('testCases')
        .isArray({ min: 1 }).withMessage('Test cases must be a non-empty array.')
        .custom((testCases) => {
            testCases.forEach((testCase, index) => {
                if (!('input' in testCase) || !('output' in testCase)) {
                    throw new Error(`Test case at index ${index} must have both input and output.`);
                }
            });
            return true;
        }),
];

// Add a new question (Admin Only)
router.post(
    '/', 
    verifyToken,                    
    authorizeRole('admin'),
    questionValidationRules,
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Ensure database connection
            await ConnectToDb();

            const { QId, title, description, level, acceptanceRate, testCases } = req.body;  

            // Check if QId already exists
            const existingQuestion = await Question.findOne({ QId: QId });
            if (existingQuestion) {
                return res.status(409).json({ message: 'Question ID already exists.' });
            }

            // Create a new question document using Mongoose's create method
            const newQuestion = await Question.create({
                QId,
                title,
                description,
                level,
                acceptanceRate,
                testCases,
            });

            // Respond with a success message
            res.status(201).json({ message: 'Question added successfully', questionId: newQuestion._id });
        } catch (error) {
            console.error('Error adding question:', error); // Log the error for debugging

            // Handle Mongoose validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }

            res.status(500).json({ error: 'An error occurred while adding the question.' });
        }
    }
);

export default router;  // Export the router to use in the main file
