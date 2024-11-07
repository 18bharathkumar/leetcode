// models/Question.js

import mongoose from 'mongoose';

// Define the TestCase Subdocument Schema
const testCaseSchema = new mongoose.Schema(
    {
        input: {
            type: mongoose.Schema.Types.Mixed, // Adjust based on your input structure
            required: [true, 'Test case input is required'],
        },
        output: {
            type: mongoose.Schema.Types.Mixed, // Adjust based on your output structure
            required: [true, 'Test case output is required'],
        },
    },
    { _id: false } // Prevent creation of _id for subdocuments
);

// Define the Question Schema
const questionSchema = new mongoose.Schema(
    {
        QId: {
            type: Number,
            required: [true, 'Question ID (QId) is required'],
            unique: true,
            min: [1, 'QId must be a positive integer'],
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [5, 'Title must be at least 5 characters long'],
            maxlength: [150, 'Title must be at most 150 characters long'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long'],
        },
        level: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: [true, 'Level is required'],
        },
        acceptanceRate: {
            type: Number,
            min: [0, 'Acceptance rate cannot be less than 0'],
            max: [100, 'Acceptance rate cannot exceed 100'],
            required: [true, 'Acceptance rate is required'],
        },
        testCases: {
            type: [testCaseSchema],
            validate: {
                validator: function (v) {
                    return Array.isArray(v) && v.length > 0;
                },
                message: 'At least one test case is required',
            },
            required: [true, 'Test cases are required'],
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Export the Question model
const Question = mongoose.model('Question', questionSchema);
export default Question;
