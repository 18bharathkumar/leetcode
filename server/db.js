import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/meetcode"; // Use the URI from .env if available

const ConnectToDb = async () => {
    try {
        // Connect to the database
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};

// Export the connection function
export { ConnectToDb };
