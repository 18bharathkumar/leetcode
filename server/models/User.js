// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const submissionSchema = new mongoose.Schema({
    QId: {
        type: Number, // Assuming QId is a number
        required: [true, 'Question ID is required'],
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected'], // Enum for accepted or rejected status
        required: [true, 'Status is required'],
    },
    time: {
        type: Date,
        default: Date.now, // Automatically set the time to now
    },
    code: {
        type: String,
        required: [true, 'Code submission is required'], // Ensure code is provided
    },
});

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name must be at most 50 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            required: [true, 'Role is required'],
        },
        submissions: [submissionSchema], // Add submissions as an array of submissionSchema
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare given password with the database hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('users', userSchema);
export default User;
