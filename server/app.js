// app.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
// Importing routes
import signupRoute from './routes/signup.js';
import adminSignInRoute from './routes/adminSignIn.js';
import userSignInRoute from './routes/userSignIn.js';
import addQuestionRoute from './routes/addquestion.js';
import submit from './routes/submissions.js'
import About from './routes/aboutme.js'
import questions from './routes/questions.js'
import userdata from './routes/aboutme.js'
// importing database connection function 
import {ConnectToDb} from './db.js'; 
// importing cors
import cors from 'cors'

dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Set security-related HTTP headers
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors());

// Connect to the database before starting the server
const startServer = async () => {
    try {
        await ConnectToDb(); // Connect to MongoDB
        console.log('Connected to the database.');

        // Routes
        app.use('/signup', signupRoute);
        app.use('/admin', adminSignInRoute);
        app.use('/addQuestions', addQuestionRoute); 
        app.use('/user', userSignInRoute);
        app.use('/submit',submit);
        app.use('/about',About);
        app.use('/questions',questions)
        app.use('/me',userdata)

        // Public route example
        app.get('/', (req, res) => {
            res.send('Welcome to the API!');
        });

        // Handle 404 Not Found
        app.use((req, res) => {
            res.status(404).json({ message: 'Route not found.' });
        });

        // Start the server
        const PORT = process.env.PORT || 5001;
        app.listen(PORT,'0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit process if unable to connect to the database
    }
};

startServer(); // Call the function to start the server
