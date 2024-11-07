// middlewares/verifyToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

// Middleware to verify JWT token
    const verifyToken = async (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided.' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(400).json({ message: 'Malformed token.' });
        }

        const token = parts[1];

        try {
            const decoded = jwt.verify(token, secret);

            // Optionally, fetch the user from the database to ensure they still exist and are active
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid token. User does not exist.' });
            }

            req.user = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
            next();
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    };

export default verifyToken;
